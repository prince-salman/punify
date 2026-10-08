import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  QrCode, 
  Copy, 
  Check, 
  ExternalLink, 
  MessageCircle,
  Clock,
  ShieldCheck,
  Sparkles,
  Loader2
} from 'lucide-react';
import { CalculatedInvoice, OrderState } from '../types/order';
import { DORM_LOCATIONS } from '../data/dorms';
import { updateOrderStatus, getOrderById, encodeOrderForUrl } from '../utils/orderStorage';
import { broadcastOrderUpdate } from '../utils/cloudSync';
import { sounds } from '../utils/audio';
import { ADMIN_WHATSAPP_INTL } from '../data/contact';

interface OrderSummaryModalProps {
  invoice: CalculatedInvoice;
  orderState: OrderState;
  onClose: () => void;
  onViewTracker: (orderId: string) => void;
}

export const OrderSummaryModal: React.FC<OrderSummaryModalProps> = ({
  invoice,
  orderState,
  onClose,
  onViewTracker,
}) => {
  const [copied, setCopied] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<string>('GoPay');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(15 * 60);
  const [trxRef] = useState(`QRIS-${Math.floor(100000 + Math.random() * 900000)}`);

  const selectedDorm = DORM_LOCATIONS.find((d) => d.id === orderState.customerDormId);

  // Countdown timer for realistic payment window
  useEffect(() => {
    if (paymentDone) return;
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [paymentDone]);

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentSavedOrder = getOrderById(invoice.orderId);
  const encodedPayload = currentSavedOrder ? encodeOrderForUrl(currentSavedOrder) : '';
  const trackingUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/#tracker?id=${invoice.orderId}${encodedPayload ? `&d=${encodedPayload}` : ''}`
    : `https://punify.netlify.app/#tracker?id=${invoice.orderId}`;

  const waMessage = encodeURIComponent(
`*PUNIFY ORDER CONFIRMATION*
==========================
*Order ID:* ${invoice.orderId}
*Student Name:* ${orderState.customerName}
*WhatsApp:* ${orderState.customerPhone}
*Service:* ${invoice.serviceName}
*Volume:* ${['printing', 'photocopy', 'typing', 'translate'].includes(orderState.serviceId) ? `${orderState.pageCount} Pages` : `${orderState.quantity} Pcs`}
*File:* ${orderState.fileName || 'Send via WhatsApp'}
*Drop Point:* ${selectedDorm?.name || 'PresUniv Hub'} (${orderState.customerRoomNumber || 'Lobby Desk'})
*Notes:* ${orderState.notes || '-'}
--------------------------
*Total Amount:* Rp ${invoice.grandTotal.toLocaleString('id-ID')}
*Payment Status:* ${paymentDone ? `PAID (${selectedWallet} - Ref: ${trxRef})` : 'Pending Payment'}
*Live Tracking Link:* ${trackingUrl}
==========================
Hello PUNIFY Admin, I would like to confirm my order for immediate processing. Thank you!`
  );

  const adminWhatsAppUrl = `https://wa.me/${ADMIN_WHATSAPP_INTL}?text=${waMessage}`;

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(invoice.orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulatePayment = () => {
    if (paymentDone || isProcessingPayment) return;
    setIsProcessingPayment(true);

    setTimeout(() => {
      setIsProcessingPayment(false);
      setPaymentDone(true);
      sounds.playSuccessChime();

      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (e) {
        console.log(e);
      }

      const updated = updateOrderStatus(
        invoice.orderId, 
        'verified', 
        `Payment verified via ${selectedWallet} (Ref: ${trxRef})`, 
        'paid',
        selectedWallet
      );
      if (updated) {
        broadcastOrderUpdate(updated);
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-xl my-6 rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden text-slate-800">
        
        {/* Header */}
        <div className="p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src="/punify-logo.png" alt="PUNIFY" className="h-9 w-auto object-contain" />
            <div>
              <h3 className="text-sm font-bold text-slate-900">Order Saved Successfully</h3>
              <p className="text-[11px] font-mono text-slate-500">Order ID: {invoice.orderId}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          
          {/* Receipt Card */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Student</span>
              <span className="font-semibold text-slate-900">{orderState.customerName} ({orderState.customerPhone})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Service</span>
              <span className="font-semibold text-blue-700">{invoice.serviceName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Drop Point</span>
              <span className="text-slate-800 text-right">{selectedDorm?.name} ({orderState.customerRoomNumber || 'Lobby Desk'})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Est. Completion</span>
              <span className="text-slate-800">{invoice.estimatedCompletion}</span>
            </div>
            <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
              <span className="text-xs text-slate-500">Total Amount:</span>
              <span className="text-xl font-mono font-bold text-slate-900">
                Rp {invoice.grandTotal.toLocaleString('id-ID')}
              </span>
            </div>
          </div>

          {/* QRIS Clean Block */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                <QrCode className="w-4 h-4 text-blue-600" />
                <span>Bank Indonesia Standard QRIS</span>
              </span>
              <span className="flex items-center space-x-1 text-[11px] font-mono font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                <Clock className="w-3 h-3 text-amber-600" />
                <span>{paymentDone ? 'PAID' : formatTimer(secondsRemaining)}</span>
              </span>
            </div>

            <div className="mx-auto w-40 h-40 bg-white p-2.5 rounded-xl border border-slate-200 flex items-center justify-center shadow-xs">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=00020101021226670014ID.LINKAJA.WWW01189360091800000000000215PUNIFY-PRESUNIV5204581253033605802ID5906PUNIFY6008CIKARANG6304&total=${invoice.grandTotal}`}
                alt="QRIS PUNIFY"
                className="w-full h-full object-contain"
              />
            </div>

            <p className="text-[11px] text-slate-500 font-mono">
              Merchant: PUNIFY PRESUNIV • NMID: ID1020039281744
            </p>

            {/* Wallet Selector Tabs */}
            {!paymentDone && (
              <div className="space-y-2 pt-1">
                <span className="text-[11px] text-slate-600 font-medium block">
                  Select payment method to simulate gateway response:
                </span>
                <div className="flex justify-center flex-wrap gap-1.5 text-xs">
                  {['GoPay', 'BCA Mobile', 'ShopeePay', 'Dana', 'OVO'].map((w) => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => setSelectedWallet(w)}
                      className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors ${
                        selectedWallet === w
                          ? 'bg-blue-600 text-white shadow-2xs'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {w}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleSimulatePayment}
                  disabled={isProcessingPayment}
                  className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold text-xs transition-colors flex items-center justify-center space-x-1.5 shadow-xs mt-2"
                >
                  {isProcessingPayment ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Verifying Transaction with Gateway...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>Simulate Payment via {selectedWallet} (Real-time)</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {paymentDone && (
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-900 font-semibold text-xs flex flex-col items-center justify-center space-y-1 animate-fade-in">
                <div className="flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>✓ PAYMENT VERIFIED & CONFIRMED</span>
                </div>
                <span className="text-[11px] font-mono text-emerald-700 font-normal">
                  Method: {selectedWallet} • Ref: {trxRef}
                </span>
              </div>
            )}
          </div>

          {/* Final Action: WhatsApp Dispatch */}
          <div className="space-y-2.5">
            <a
              href={adminWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm flex items-center justify-center space-x-2 transition-colors shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Forward Order Details to Admin WhatsApp</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </a>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={handleCopyOrderId}
                className="py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 font-medium flex items-center justify-center space-x-1 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Order ID'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onViewTracker(invoice.orderId);
                }}
                className="py-2.5 rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 font-semibold text-center truncate transition-colors"
              >
                Track Status ➔
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
