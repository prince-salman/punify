import mqtt, { MqttClient } from 'mqtt';
import { SavedOrder, getSavedOrders, saveOrder } from './orderStorage';
import { sounds } from './audio';

const SYNC_TOPIC = 'punify/global/sync_v2';
const LIVE_TOPIC = 'punify/global/live_v2';

// Unique device session ID to avoid echoing own notifications
export const DEVICE_SESSION_ID = typeof window !== 'undefined'
  ? 'device_' + (sessionStorage.getItem('punify_device_id') || (() => {
      const id = Math.random().toString(36).substring(2, 10);
      sessionStorage.setItem('punify_device_id', id);
      return id;
    })())
  : 'server_' + Math.random().toString(36).substring(2, 8);

let client: MqttClient | null = null;
let connectionStatus: 'connected' | 'connecting' | 'disconnected' = 'disconnected';
const statusListeners = new Set<(status: 'connected' | 'connecting' | 'disconnected') => void>();

export const getCloudSyncStatus = () => connectionStatus;

export const onCloudStatusChange = (cb: (status: 'connected' | 'connecting' | 'disconnected') => void) => {
  statusListeners.add(cb);
  cb(connectionStatus);
  return () => {
    statusListeners.delete(cb);
  };
};

const notifyStatus = (status: 'connected' | 'connecting' | 'disconnected') => {
  connectionStatus = status;
  statusListeners.forEach((cb) => cb(status));
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('punify_cloud_status', { detail: status }));
  }
};

export const initCloudSync = () => {
  if (typeof window === 'undefined') return;
  if (client) return;

  notifyStatus('connecting');

  try {
    // Primary broker: EMQX Public Secure WebSocket Broker
    client = mqtt.connect('wss://broker.emqx.io:8084/mqtt', {
      clientId: `punify_${Math.random().toString(16).substring(2, 10)}`,
      keepalive: 30,
      reconnectPeriod: 3000,
      connectTimeout: 8000,
      clean: true
    });

    client.on('connect', () => {
      notifyStatus('connected');

      // Subscribe to live events and retained state
      client?.subscribe([LIVE_TOPIC, SYNC_TOPIC], { qos: 1 }, (err) => {
        if (err) {
          console.warn('[PUNIFY CloudSync] Subscription warning:', err);
        }
      });
    });

    client.on('message', (topic, payload) => {
      try {
        const rawStr = payload.toString();
        const data = JSON.parse(rawStr);

        // 1. Live Instant Event from another device
        if (topic === LIVE_TOPIC) {
          if (data.deviceId === DEVICE_SESSION_ID) {
            // Own device echo, ignore
            return;
          }

          if (data.type === 'NEW_ORDER' && data.order) {
            const incoming: SavedOrder = data.order;
            saveOrder(incoming, false); // Save without re-broadcasting

            sounds.playNotificationPing();

            // Dispatch global event for toast notification & tracker update
            window.dispatchEvent(
              new CustomEvent('punify_remote_new_order', {
                detail: incoming
              })
            );
          } else if (data.type === 'STATUS_UPDATED' && data.order) {
            const incoming: SavedOrder = data.order;
            saveOrder(incoming, false);

            sounds.playNotificationPing();

            window.dispatchEvent(
              new CustomEvent('punify_remote_status_updated', {
                detail: incoming
              })
            );
          }
        }

        // 2. Retained State Synchronization (Catch-up for newly opened devices)
        if (topic === SYNC_TOPIC && Array.isArray(data.orders)) {
          const remoteOrders: SavedOrder[] = data.orders;
          const localOrders = getSavedOrders();

          let hasChanges = false;
          const mergedMap = new Map<string, SavedOrder>();

          // Load local orders first
          localOrders.forEach((o) => mergedMap.set(o.orderId.toUpperCase(), o));

          // Merge remote orders
          remoteOrders.forEach((remote) => {
            const key = remote.orderId.toUpperCase();
            const local = mergedMap.get(key);

            if (!local) {
              mergedMap.set(key, remote);
              hasChanges = true;
            } else {
              // If remote has newer history or advance status, prioritize latest
              const remoteHistoryCount = remote.statusHistory?.length || 0;
              const localHistoryCount = local.statusHistory?.length || 0;

              if (remoteHistoryCount > localHistoryCount) {
                mergedMap.set(key, remote);
                hasChanges = true;
              }
            }
          });

          if (hasChanges) {
            const mergedList = Array.from(mergedMap.values());
            localStorage.setItem('punify_orders_v1', JSON.stringify(mergedList));
            window.dispatchEvent(new Event('punify_orders_updated'));
          }
        }
      } catch (err) {
        console.warn('[PUNIFY CloudSync] Message parse error:', err);
      }
    });

    client.on('error', (err) => {
      console.warn('[PUNIFY CloudSync] Connection error:', err);
      notifyStatus('disconnected');
    });

    client.on('close', () => {
      notifyStatus('disconnected');
    });

    client.on('reconnect', () => {
      notifyStatus('connecting');
    });
  } catch (err) {
    console.warn('[PUNIFY CloudSync] Failed to initialize MQTT:', err);
    notifyStatus('disconnected');
  }
};

// Broadcast when a student places a new order on this device
export const broadcastNewOrder = (order: SavedOrder) => {
  if (!client || connectionStatus !== 'connected') {
    // If not connected, init immediately
    initCloudSync();
  }

  try {
    const payload = JSON.stringify({
      type: 'NEW_ORDER',
      deviceId: DEVICE_SESSION_ID,
      timestamp: Date.now(),
      order
    });

    client?.publish(LIVE_TOPIC, payload, { qos: 1 });

    // Update retained cloud state with all recent orders
    const all = getSavedOrders();
    const syncPayload = JSON.stringify({
      updatedAt: Date.now(),
      orders: all.slice(0, 20) // Keep 20 most recent
    });

    client?.publish(SYNC_TOPIC, syncPayload, { qos: 1, retain: true });
  } catch (err) {
    console.warn('[PUNIFY CloudSync] Broadcast new order failed:', err);
  }
};

// Broadcast when an order status is updated (e.g. by admin / operator)
export const broadcastOrderUpdate = (order: SavedOrder) => {
  if (!client || connectionStatus !== 'connected') {
    initCloudSync();
  }

  try {
    const payload = JSON.stringify({
      type: 'STATUS_UPDATED',
      deviceId: DEVICE_SESSION_ID,
      timestamp: Date.now(),
      order
    });

    client?.publish(LIVE_TOPIC, payload, { qos: 1 });

    // Update retained cloud state
    const all = getSavedOrders();
    const syncPayload = JSON.stringify({
      updatedAt: Date.now(),
      orders: all.slice(0, 20)
    });

    client?.publish(SYNC_TOPIC, syncPayload, { qos: 1, retain: true });
  } catch (err) {
    console.warn('[PUNIFY CloudSync] Broadcast order update failed:', err);
  }
};
