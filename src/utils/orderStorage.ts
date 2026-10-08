import { OrderStatus, ServiceId } from '../types/order';

export interface SavedOrder {
  orderId: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  serviceId: ServiceId;
  serviceName: string;
  optionsSummary: string;
  fileName?: string;
  fileSize?: string;
  fileDataUrl?: string;
  dormId: string;
  dormName: string;
  roomNumber: string;
  notes: string;
  quantityOrPages: number;
  totalAmount: number;
  paymentStatus: 'pending' | 'paid';
  paymentMethod?: string;
  courierName?: string;
  status: OrderStatus;
  statusHistory: {
    status: OrderStatus;
    timestamp: string;
    note: string;
  }[];
}

const STORAGE_KEY = 'punify_orders_v1';

const SEED_ORDERS: SavedOrder[] = [
  {
    orderId: 'PUN-2026-4821',
    createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    customerName: 'Michaela Clara',
    customerPhone: '081298765432',
    serviceId: 'printing',
    serviceName: 'Printing (Cetak Dokumen)',
    optionsSummary: 'A4 80gsm • Hitam Putih • Jilid Softcover',
    fileName: 'Draft_Skripsi_Bab1-5_Final.pdf',
    fileSize: '4.8 MB',
    dormId: 'sh_tower1',
    dormName: 'Student Housing — Tower 1 Lobby Drop',
    roomNumber: 'Kamar 412',
    notes: 'Cover warna biru tua, rangkap 2 untuk dosen penguji',
    quantityOrPages: 84,
    totalAmount: 62000,
    paymentStatus: 'paid',
    status: 'in_production',
    statusHistory: [
      { status: 'placed', timestamp: '19:15 WIB', note: 'Pesanan masuk via web PUNIFY' },
      { status: 'verified', timestamp: '19:22 WIB', note: 'Pembayaran transfer QRIS terverifikasi admin' },
      { status: 'in_production', timestamp: '19:30 WIB', note: 'Mesin cetak sedang memproses 84 halaman' }
    ]
  },
  {
    orderId: 'PUN-2026-3109',
    createdAt: new Date(Date.now() - 120 * 60 * 1000).toISOString(),
    customerName: 'Shafira Putri',
    customerPhone: '085712345678',
    serviceId: 'nametag',
    serviceName: 'Name Tag Making',
    optionsSummary: 'Akrilik Eksklusif + Pin Magnet • Edisi Ospek PresUniv',
    fileName: 'Desain_Nametag_Panitia_Batch2.png',
    fileSize: '1.2 MB',
    dormId: 'sh_tower2',
    dormName: 'Student Housing — Tower 2 Lobby Drop',
    roomNumber: 'Lobby Utama Meja Satpam',
    notes: 'Total 15 pcs name tag panitia ospek',
    quantityOrPages: 15,
    totalAmount: 390000,
    paymentStatus: 'paid',
    status: 'ready_pickup',
    statusHistory: [
      { status: 'placed', timestamp: '17:40 WIB', note: 'Pesanan masuk' },
      { status: 'verified', timestamp: '17:50 WIB', note: 'Desain file dikonfirmasi' },
      { status: 'in_production', timestamp: '18:10 WIB', note: 'Proses cutting akrilik & UV print' },
      { status: 'quality_check', timestamp: '19:10 WIB', note: 'QC magnet & packaging selesai' },
      { status: 'ready_pickup', timestamp: '19:45 WIB', note: 'Paket siap diambil di Lobby Tower 2' }
    ]
  }
];

export const getSavedOrders = (): SavedOrder[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_ORDERS));
      return SEED_ORDERS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : SEED_ORDERS;
  } catch {
    return SEED_ORDERS;
  }
};

export const saveOrder = (order: SavedOrder): void => {
  try {
    const orders = getSavedOrders();
    const existingIndex = orders.findIndex((o) => o.orderId === order.orderId);
    let updated: SavedOrder[];
    if (existingIndex >= 0) {
      updated = [...orders];
      updated[existingIndex] = order;
    } else {
      updated = [order, ...orders];
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('punify_orders_updated'));
  } catch (e) {
    console.error('Failed to save order to localStorage', e);
  }
};

export const getOrderById = (orderId: string): SavedOrder | undefined => {
  const orders = getSavedOrders();
  const normalized = orderId.trim().toUpperCase();
  return orders.find((o) => o.orderId.toUpperCase() === normalized);
};

export const updateOrderStatus = (
  orderId: string, 
  status: OrderStatus, 
  note?: string,
  paymentStatus?: 'pending' | 'paid',
  paymentMethod?: string,
  courierName?: string
): SavedOrder | undefined => {
  const orders = getSavedOrders();
  const order = orders.find((o) => o.orderId.toUpperCase() === orderId.trim().toUpperCase());
  if (!order) return undefined;

  const nowTime = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';
  
  order.status = status;
  if (paymentStatus) {
    order.paymentStatus = paymentStatus;
  }
  if (paymentMethod) {
    order.paymentMethod = paymentMethod;
  }
  if (courierName) {
    order.courierName = courierName;
  }
  
  order.statusHistory.push({
    status,
    timestamp: nowTime,
    note: note || `Status diperbarui menjadi ${status}`
  });

  saveOrder(order);
  return order;
};
