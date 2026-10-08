import React, { useState, useEffect } from 'react';
import { Bell, MapPin, ExternalLink, X, MessageCircle, CheckCircle, ArrowRight } from 'lucide-react';
import { SavedOrder } from '../utils/orderStorage';
import { sounds } from '../utils/audio';

interface LiveOrderToastProps {
  onViewOrder: (orderId: string) => void;
}

export const LiveOrderToast: React.FC<LiveOrderToastProps> = ({ onViewOrder }) => {
  const [activeNotification, setActiveNotification] = useState<{
    order: SavedOrder;
    type: 'new' | 'update';
  } | null>(null);

  useEffect(() => {
    const handleRemoteNew = (e: Event) => {
      const custom = e as CustomEvent<SavedOrder>;
      if (custom.detail) {
        setActiveNotification({
          order: custom.detail,
          type: 'new'
        });
        sounds.playNotificationPing();
      }
    };

    const handleRemoteUpdate = (e: Event) => {
      const custom = e as CustomEvent<SavedOrder>;
      if (custom.detail) {
        setActiveNotification({
          order: custom.detail,
          type: 'update'
        });
      }
    };

    window.addEventListener('punify_remote_new_order', handleRemoteNew);
    window.addEventListener('punify_remote_status_updated', handleRemoteUpdate);

    return () => {
      window.removeEventListener('punify_remote_new_order', handleRemoteNew);
      window.removeEventListener('punify_remote_status_updated', handleRemoteUpdate);
    };
  }, []);

  // Auto-dismiss after 10 seconds
  useEffect(() => {
    if (!activeNotification) return;
    const timer = setTimeout(() => {
      setActiveNotification(null);
    }, 10000);
    return () => clearTimeout(timer);
  }, [activeNotification]);

  if (!activeNotification) return null;

  const { order, type } = activeNotification;

  return (
    <div className="fixed top-20 right-4 z-50 max-w-sm w-full animate-bounce-short shadow-2xl rounded-2xl bg-white border-2 border-blue-600 text-slate-900 p-4 transition-all duration-300">
      <div className="flex items-start justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span>
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
            {type === 'new' ? 'New Incoming Order!' : 'Order Status Updated'}
          </span>
        </div>
        <button
          onClick={() => setActiveNotification(null)}
          className="text-slate-400 hover:text-slate-700 p-1 rounded-md"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-2 text-xs space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="font-mono font-bold text-blue-700 text-sm">{order.orderId}</span>
          <span className="font-bold text-slate-900">Rp {order.totalAmount.toLocaleString('id-ID')}</span>
        </div>

        <p className="font-semibold text-slate-800">{order.serviceName}</p>
        <p className="text-[11px] text-slate-500 truncate">{order.optionsSummary}</p>

        <div className="flex items-center space-x-1.5 text-slate-600 text-[11px] pt-1">
          <MapPin className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
          <span className="truncate">{order.customerName} • {order.dormName} ({order.roomNumber})</span>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
        <button
          onClick={() => {
            onViewOrder(order.orderId);
            setActiveNotification(null);
          }}
          className="flex-1 py-1.5 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center justify-center space-x-1 shadow-xs transition-colors"
        >
          <span>Open in Tracker</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <a
          href={`https://wa.me/${order.customerPhone.replace(/^0/, '62')}?text=${encodeURIComponent(`Hello ${order.customerName}, your PUNIFY order (${order.orderId}) has been received at our print desk!`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
          title="WhatsApp Customer"
        >
          <MessageCircle className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};
