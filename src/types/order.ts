export type ServiceId = 
  | 'printing'
  | 'photocopy'
  | 'nametag'
  | 'typing'
  | 'keychain'
  | 'translate';

export interface ServiceOption {
  id: string;
  name: string;
  description?: string;
  priceDelta: number; // in IDR
}

export interface ServiceItem {
  id: ServiceId;
  name: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  basePrice: number; // in IDR
  priceUnit: string;
  iconName: string;
  turnaroundTime: string;
  popular?: boolean;
  options: {
    paperTypes?: ServiceOption[];
    colorModes?: ServiceOption[];
    bindingTypes?: ServiceOption[];
    materialTypes?: ServiceOption[];
    speeds?: ServiceOption[];
    languages?: ServiceOption[];
  };
}

export interface DormLocation {
  id: string;
  name: string;
  zone: 'Student Housing' | 'New Beverly Hills' | 'Campus Hub' | 'Off-Campus';
  notes: string;
  deliveryFee: number;
}

export interface OrderState {
  serviceId: ServiceId;
  colorMode: string;
  paperType: string;
  bindingType: string;
  materialType: string;
  speed: string;
  languageMode: string;
  pageCount: number;
  quantity: number;
  notes: string;
  fileName?: string;
  fileSize?: string;
  fileDataUrl?: string;
  customerName: string;
  customerPhone: string;
  customerDormId: string;
  customerRoomNumber: string;
}

export interface CalculatedInvoice {
  orderId: string;
  serviceName: string;
  basePrice: number;
  optionsTotal: number;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  grandTotal: number;
  estimatedCompletion: string;
}

export type OrderStatus = 'placed' | 'verified' | 'in_production' | 'quality_check' | 'ready_pickup' | 'completed';

export interface TrackedOrder {
  orderId: string;
  customerName: string;
  serviceName: string;
  status: OrderStatus;
  pickupLocation: string;
  timestamp: string;
  totalAmount: number;
  estimatedReady: string;
}
