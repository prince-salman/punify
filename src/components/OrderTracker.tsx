import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  PackageCheck, 
  Truck, 
  ShieldCheck, 
  FileText, 
  User, 
  Phone, 
  Download,
  ExternalLink,
  MessageCircle,
  Wrench,
  Sparkles
} from 'lucide-react';
import { getOrderById, getSavedOrders, updateOrderStatus, SavedOrder } from '../utils/orderStorage';
import { OrderStatus } from '../types/order';
import { sounds } from '../utils/audio';
import { ADMIN_WHATSAPP_INTL } from '../data/contact';

interface OrderTrackerProps {
  initialOrderId?: string;
}

export const OrderTracker: React.FC<OrderTrackerProps> = ({ initialOrderId = 'PUN-2026-4821' }) => {
  const [searchId, setSearchId] = useState(initialOrderId);
  const [currentOrder, setCurrentOrder] = useState<SavedOrder | undefined>(() => getOrderById(initialOrderId));
  const [allOrders, setAllOrders] = useState<SavedOrder[]>(() => getSavedOrders());
  const [feedbackMsg, setFeedbackMsg] = useState<string>('');
  const [viewMode, setViewMode] = useState<'student' | 'operator'>('student');
  const [selectedCourier, setSelectedCourier] = useState<string>('Dimas (Courier SH Tower 1 & 2)');

  // URL deep-link listener
  useEffect(() => {
    const handleUrlCheck = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const trackParam = urlParams.get('track');
      const hash = window.location.hash;
      let targetId = trackParam;

      if (!targetId && hash.includes('id=')) {
        targetId = hash.split('id=')[1]?.split('&')[0];
      }

      if (targetId) {
        const found = getOrderById(targetId);
        if (found) {
          setSearchId(targetId);
          setCurrentOrder(found);
        }
      }
    };

    handleUrlCheck();
    window.addEventListener('popstate', handleUrlCheck);
    return () => window.removeEventListener('popstate', handleUrlCheck);
  }, []);

  // Listen to order storage updates from other components
  useEffect(() => {
    const refreshData = () => {
      const orders = getSavedOrders();
      setAllOrders(orders);
      if (searchId) {
        const matching = orders.find(o => o.orderId.toUpperCase() === searchId.toUpperCase());
        if (matching) setCurrentOrder(matching);
      }
    };
    window.addEventListener('punify_orders_updated', refreshData);
    return () => window.removeEventListener('punify_orders_updated', refreshData);
  }, [searchId]);

  const handleSearch = (idToSearch: string) => {
    const found = getOrderById(idToSearch);
    setSearchId(idToSearch);
    if (found) {
      setCurrentOrder(found);
      setFeedbackMsg('');
    } else {
      setFeedbackMsg(`Order with ID "${idToSearch}" was not found.`);
    }
  };

  const handleAdvanceStatus = (newStatus: OrderStatus, note: string, courier?: string) => {
    if (!currentOrder) return;
    sounds.playNotificationPing();
    const updated = updateOrderStatus(
      currentOrder.orderId, 
      newStatus, 
      note, 
      undefined, 
      undefined, 
      courier || selectedCourier
    );
    if (updated) {
      setCurrentOrder({ ...updated });
      setAllOrders(getSavedOrders());
      setFeedbackMsg(`✓ Order status for "${currentOrder.orderId}" updated: "${newStatus}"!`);
      setTimeout(() => setFeedbackMsg(''), 3000);
    }
  };

  const getStepNumber = (status: OrderStatus): number => {
    switch (status) {
      case 'placed': return 1;
      case 'verified': return 2;
      case 'in_production': return 3;
      case 'quality_check': return 4;
      case 'ready_pickup': return 5;
      case 'completed': return 5;
      default: return 1;
    }
  };

  const activeStep = currentOrder ? getStepNumber(currentOrder.status) : 1;

  const steps = [
    { id: 1, key: 'placed' as OrderStatus, title: 'Order Received', time: 'Stage 1', desc: 'File queued in production system' },
    { id: 2, key: 'verified' as OrderStatus, title: 'File Verified', time: 'Stage 2', desc: 'Document specs & payment validated' },
    { id: 3, key: 'in_production' as OrderStatus, title: 'In Production', time: 'Stage 3', desc: 'Printing, binding & physical craft' },
    { id: 4, key: 'quality_check' as OrderStatus, title: 'Quality Check', time: 'Stage 4', desc: 'Inspection for completeness & neatness' },
    { id: 5, key: 'ready_pickup' as OrderStatus, title: 'Ready at Dorm', time: 'Stage 5', desc: 'Delivered to lobby security desk' },
  ];

  return (
    <section id="tracker" className="py-16 bg-white border-b border-slate-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-4 border-b border-slate-100 gap-4">
          <div>
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block mb-1">
              Live Order Tracker & Operational Desk
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Real-Time Order Tracking
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Directly synced to President University printing queues and student housing couriers.
            </p>

            {/* Mode Switcher Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg text-xs font-semibold w-fit mt-3">
              <button
                type="button"
                onClick={() => setViewMode('student')}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  viewMode === 'student'
                    ? 'bg-white text-blue-700 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                👤 Student View
              </button>
              <button
                type="button"
                onClick={() => setViewMode('operator')}
                className={`px-3 py-1.5 rounded-md transition-colors flex items-center space-x-1.5 ${
                  viewMode === 'operator'
                    ? 'bg-blue-600 text-white shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Wrench className="w-3.5 h-3.5" />
                <span>Print Desk & Courier Panel</span>
              </button>
            </div>
          </div>

          {/* Search Input */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(searchId);
            }}
            className="flex items-center space-x-2"
          >
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value.toUpperCase())}
                placeholder="PUN-2026-XXXX"
                className="pl-8 pr-3 py-2 rounded-lg border border-slate-200 text-xs font-mono text-slate-900 focus:outline-none focus:border-blue-600 w-44"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs"
            >
              Track
            </button>
          </form>
        </div>

        {/* Quick select existing stored orders */}
        <div className="mb-6 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-500">Select Stored Order:</span>
          {allOrders.map((ord) => (
            <button
              key={ord.orderId}
              onClick={() => handleSearch(ord.orderId)}
              className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                currentOrder?.orderId === ord.orderId
                  ? 'bg-blue-600 text-white font-bold'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {ord.orderId} ({ord.customerName.split(' ')[0]})
            </button>
          ))}
        </div>

        {feedbackMsg && (
          <div className="mb-4 p-3 rounded-lg bg-blue-50 text-blue-900 text-xs flex items-center justify-between">
            <span>{feedbackMsg}</span>
          </div>
        )}

        {currentOrder ? (
          <div className="space-y-6">
            
            {/* Real Order Detail Box */}
            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-2">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-mono font-bold text-blue-700">{currentOrder.orderId}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      currentOrder.paymentStatus === 'paid'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {currentOrder.paymentStatus === 'paid' ? 'PAID (QRIS)' : 'Payment Pending'}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mt-1">{currentOrder.serviceName}</h3>
                  <p className="text-xs text-slate-600 mt-0.5">{currentOrder.optionsSummary}</p>
                </div>

                <div className="flex flex-col sm:items-end">
                  <span className="text-xs text-slate-500 block">Total Amount</span>
                  <span className="text-xl font-mono font-extrabold text-slate-900">
                    Rp {currentOrder.totalAmount.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              {/* Specific metadata */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs text-slate-700">
                <div className="flex items-start space-x-2">
                  <User className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block text-[11px]">Student:</span>
                    <strong className="text-slate-900">{currentOrder.customerName}</strong>
                    <span className="text-slate-500 block font-mono">{currentOrder.customerPhone}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block text-[11px]">Drop Point:</span>
                    <strong className="text-slate-900">{currentOrder.dormName}</strong>
                    <span className="text-slate-500 block">{currentOrder.roomNumber}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <FileText className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block text-[11px]">Attached File:</span>
                    <strong className="text-slate-900 truncate block max-w-[180px]">{currentOrder.fileName || 'Send via WhatsApp'}</strong>
                    <span className="text-slate-500 block font-mono">{currentOrder.quantityOrPages} Pages / Pcs</span>
                    {currentOrder.fileDataUrl && (
                      <a
                        href={currentOrder.fileDataUrl}
                        download={currentOrder.fileName || 'document.pdf'}
                        className="text-blue-600 hover:underline font-semibold block text-[11px] mt-0.5"
                      >
                        Download Document
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <Truck className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block text-[11px]">Dorm Courier:</span>
                    <strong className="text-slate-900">{currentOrder.courierName || 'PresUniv Courier'}</strong>
                    <span className="text-slate-500 block text-[11px]">Drop to Lobby Security Desk</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 pt-2">
              {steps.map((step) => {
                const isCompleted = step.id < activeStep;
                const isCurrent = step.id === activeStep;

                return (
                  <div key={step.id} className="border-t-2 pt-3 transition-colors" style={{ borderColor: isCurrent ? '#2563EB' : isCompleted ? '#059669' : '#E2E8F0' }}>
                    <span className={`text-[10px] font-mono font-semibold block ${isCurrent ? 'text-blue-600' : isCompleted ? 'text-emerald-700' : 'text-slate-400'}`}>
                      {step.time}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 mt-0.5">
                      {step.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {step.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Mode-Dependent Operational Views */}
            {viewMode === 'operator' ? (
              /* OPERATOR / ADMIN DESK */
              <div className="p-5 rounded-xl border-2 border-blue-200 bg-blue-50/40 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-blue-200 gap-2">
                  <div className="flex items-center space-x-2">
                    <Wrench className="w-4 h-4 text-blue-700" />
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Print Desk & Delivery Operations (Admin Dashboard)
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs">
                    {currentOrder.fileDataUrl && (
                      <a
                        href={currentOrder.fileDataUrl}
                        download={currentOrder.fileName || 'document.pdf'}
                        className="flex items-center space-x-1 px-2.5 py-1.5 rounded bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-semibold"
                      >
                        <Download className="w-3.5 h-3.5 text-blue-600" />
                        <span>Download Document</span>
                      </a>
                    )}
                    <a
                      href={`https://wa.me/${currentOrder.customerPhone.replace(/^0/, '62')}?text=${encodeURIComponent(`Hello ${currentOrder.customerName}, your PUNIFY order (${currentOrder.orderId}) is now being processed at our print desk.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 px-2.5 py-1.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp Student</span>
                    </a>
                  </div>
                </div>

                {/* Courier Assignment */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs">
                  <span className="text-slate-700 font-semibold">Assign Dorm Courier:</span>
                  <select
                    value={selectedCourier}
                    onChange={(e) => setSelectedCourier(e.target.value)}
                    className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-xs font-medium focus:outline-none focus:border-blue-600"
                  >
                    <option value="Dimas (Courier SH Tower 1 & 2)">Dimas (Courier SH Tower 1 & 2)</option>
                    <option value="Rian (Courier SH Tower 3 & 4)">Rian (Courier SH Tower 3 & 4)</option>
                    <option value="Siti (Courier New Beverly Hills / NBH)">Siti (Courier New Beverly Hills / NBH)</option>
                    <option value="Budi (Staff FAB & Main Hub)">Budi (Staff FAB & Main Hub)</option>
                  </select>
                </div>

                {/* Direct Action Pipeline */}
                <div>
                  <span className="text-[11px] font-semibold text-slate-700 block mb-2">
                    Advance Production Pipeline (Click to update student tracker & delivery stage):
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-xs">
                    <button
                      onClick={() => handleAdvanceStatus('placed', 'File and order format verified by admin')}
                      className={`p-2.5 rounded-lg border text-left transition-colors ${
                        currentOrder.status === 'placed' ? 'bg-blue-600 text-white font-bold' : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800'
                      }`}
                    >
                      <span className="block font-bold">1. File Queued</span>
                      <span className="text-[10px] opacity-80 block">Production Queue</span>
                    </button>

                    <button
                      onClick={() => handleAdvanceStatus('verified', 'QRIS payment verified & file ready for press')}
                      className={`p-2.5 rounded-lg border text-left transition-colors ${
                        currentOrder.status === 'verified' ? 'bg-blue-600 text-white font-bold' : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800'
                      }`}
                    >
                      <span className="block font-bold">2. Payment Verified</span>
                      <span className="text-[10px] opacity-80 block">QRIS Validated</span>
                    </button>

                    <button
                      onClick={() => handleAdvanceStatus('in_production', `Currently printing on offset machine (${currentOrder.quantityOrPages} pages/pcs)`)}
                      className={`p-2.5 rounded-lg border text-left transition-colors ${
                        currentOrder.status === 'in_production' ? 'bg-blue-600 text-white font-bold' : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800'
                      }`}
                    >
                      <span className="block font-bold">3. Start Print</span>
                      <span className="text-[10px] opacity-80 block">Press & Binding Active</span>
                    </button>

                    <button
                      onClick={() => handleAdvanceStatus('quality_check', 'Quality control completed: print clarity & binding passed testing')}
                      className={`p-2.5 rounded-lg border text-left transition-colors ${
                        currentOrder.status === 'quality_check' ? 'bg-blue-600 text-white font-bold' : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800'
                      }`}
                    >
                      <span className="block font-bold">4. QC Passed</span>
                      <span className="text-[10px] opacity-80 block">Packaging Ready</span>
                    </button>

                    <button
                      onClick={() => handleAdvanceStatus('ready_pickup', `Delivered by ${selectedCourier} and arrived at security desk ${currentOrder.dormName}`, selectedCourier)}
                      className={`p-2.5 rounded-lg border text-left transition-colors ${
                        currentOrder.status === 'ready_pickup' || currentOrder.status === 'completed'
                          ? 'bg-emerald-600 text-white font-bold' 
                          : 'bg-emerald-50 border-emerald-300 text-emerald-800 hover:bg-emerald-100'
                      }`}
                    >
                      <span className="block font-bold">5. At Dorm Lobby</span>
                      <span className="text-[10px] opacity-80 block">Arrived at Security Desk</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* STUDENT VIEW */
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 flex-shrink-0">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">
                      {currentOrder.status === 'ready_pickup' 
                        ? 'Order Has Arrived at Your Dormitory!' 
                        : currentOrder.status === 'in_production'
                        ? 'Currently Printing at Production Desk'
                        : 'Order Queued in Campus System'}
                    </h4>
                    <p className="text-slate-500 text-[11px] mt-0.5">
                      Courier: <strong className="text-slate-800">{currentOrder.courierName || 'Dimas (PresUniv Courier)'}</strong> • Drop to Security Desk {currentOrder.dormName}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={`https://wa.me/${ADMIN_WHATSAPP_INTL}?text=${encodeURIComponent(`Hello PUNIFY Admin, I would like to check on my order:\n• Order ID: ${currentOrder.orderId}\n• Name: ${currentOrder.customerName}\n• Drop Point: ${currentOrder.dormName} (${currentOrder.roomNumber})`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-2xs flex items-center space-x-1"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Chat Admin WA</span>
                  </a>
                  <button
                    onClick={() => setViewMode('operator')}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-2xs flex items-center space-x-1"
                  >
                    <Wrench className="w-3.5 h-3.5" />
                    <span>Open Operator Panel</span>
                  </button>
                </div>
              </div>
            )}

            {/* Status History Log */}
            {currentOrder.statusHistory && currentOrder.statusHistory.length > 0 && (
              <div className="text-xs text-slate-600 space-y-1.5 pt-2">
                <span className="font-semibold text-slate-900 block mb-1">Live Activity History Log:</span>
                {currentOrder.statusHistory.map((hist, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-[11px]">
                    <span className="font-mono text-slate-400">{hist.timestamp}</span>
                    <span className="text-slate-300">•</span>
                    <span className="font-medium text-slate-800">{hist.note}</span>
                  </div>
                ))}
              </div>
            )}

          </div>
        ) : (
          <div className="p-8 text-center border border-dashed border-slate-200 rounded-xl text-slate-500 text-xs">
            Order not found. Please enter a valid Order ID above or place a new order.
          </div>
        )}

      </div>
    </section>
  );
};
