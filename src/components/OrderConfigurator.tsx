import React, { useState } from 'react';
import { 
  UploadCloud, 
  FileCheck, 
  Trash2, 
  ArrowRight, 
  AlertCircle
} from 'lucide-react';
import { PUNIFY_SERVICES } from '../data/services';
import { ServiceId, OrderState, CalculatedInvoice } from '../types/order';
import { DormSelector } from './DormSelector';
import { DORM_LOCATIONS } from '../data/dorms';
import { saveOrder, SavedOrder } from '../utils/orderStorage';
import { broadcastNewOrder } from '../utils/cloudSync';
import { processUploadedDocument } from '../utils/pdfHelper';
import { sounds } from '../utils/audio';

interface OrderConfiguratorProps {
  activeServiceId: ServiceId;
  onChangeService: (id: ServiceId) => void;
  onSubmitOrder: (invoice: CalculatedInvoice, orderState: OrderState, savedOrder: SavedOrder) => void;
}

export const OrderConfigurator: React.FC<OrderConfiguratorProps> = ({
  activeServiceId,
  onChangeService,
  onSubmitOrder,
}) => {
  const currentService = PUNIFY_SERVICES.find((s) => s.id === activeServiceId) || PUNIFY_SERVICES[0];

  // Configurator State
  const [colorMode, setColorMode] = useState<string>(currentService.options.colorModes?.[0]?.id || '');
  const [paperType, setPaperType] = useState<string>(currentService.options.paperTypes?.[0]?.id || '');
  const [bindingType, setBindingType] = useState<string>(currentService.options.bindingTypes?.[0]?.id || 'none');
  const [materialType, setMaterialType] = useState<string>(currentService.options.materialTypes?.[0]?.id || '');
  const [languageMode, setLanguageMode] = useState<string>(currentService.options.languages?.[0]?.id || '');
  const [speed, setSpeed] = useState<string>(currentService.options.speeds?.[0]?.id || 'regular');

  const [pageCount, setPageCount] = useState<number>(10);
  const [quantity, setQuantity] = useState<number>(1);
  const [notes, setNotes] = useState<string>('');

  const [sessionOrderId, setSessionOrderId] = useState<string>(() => {
    const randomId = Math.floor(1000 + Math.random() * 9000);
    return `PUN-${new Date().getFullYear()}-${randomId}`;
  });

  // Customer & Dorm state with localStorage persistence
  const [customerName, setCustomerName] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('punify_student_profile');
      return saved ? JSON.parse(saved).name || '' : '';
    } catch {
      return '';
    }
  });

  const [customerPhone, setCustomerPhone] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('punify_student_profile');
      return saved ? JSON.parse(saved).phone || '' : '';
    } catch {
      return '';
    }
  });

  const [dormId, setDormId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('punify_student_profile');
      return saved ? JSON.parse(saved).dormId || 'sh_tower1' : 'sh_tower1';
    } catch {
      return 'sh_tower1';
    }
  });

  const [roomNumber, setRoomNumber] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('punify_student_profile');
      return saved ? JSON.parse(saved).roomNumber || '' : '';
    } catch {
      return '';
    }
  });

  const [uploadedFile, setUploadedFile] = useState<{ 
    name: string; 
    size: string; 
    dataUrl?: string; 
    detectedPages?: number;
    isPdf?: boolean;
  } | null>({
    name: 'Dokumen_Tugas_PresUniv.pdf',
    size: '2.4 MB',
    detectedPages: 10,
    isPdf: true
  });

  const [fileNotification, setFileNotification] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>('');

  const handleSelectServiceChange = (newServiceId: ServiceId) => {
    onChangeService(newServiceId);
    const service = PUNIFY_SERVICES.find((s) => s.id === newServiceId);
    if (service) {
      setColorMode(service.options.colorModes?.[0]?.id || '');
      setPaperType(service.options.paperTypes?.[0]?.id || '');
      setBindingType(service.options.bindingTypes?.[0]?.id || 'none');
      setMaterialType(service.options.materialTypes?.[0]?.id || '');
      setLanguageMode(service.options.languages?.[0]?.id || '');
      setSpeed(service.options.speeds?.[0]?.id || 'regular');
    }
  };

  const calculatePricing = (): CalculatedInvoice => {
    let unitBase = currentService.basePrice;
    let optionDeltas = 0;

    if (colorMode && currentService.options.colorModes) {
      const opt = currentService.options.colorModes.find((c) => c.id === colorMode);
      if (opt) optionDeltas += opt.priceDelta;
    }

    if (paperType && currentService.options.paperTypes) {
      const opt = currentService.options.paperTypes.find((p) => p.id === paperType);
      if (opt) optionDeltas += opt.priceDelta;
    }

    if (materialType && currentService.options.materialTypes) {
      const opt = currentService.options.materialTypes.find((m) => m.id === materialType);
      if (opt) optionDeltas += opt.priceDelta;
    }

    if (languageMode && currentService.options.languages) {
      const opt = currentService.options.languages.find((l) => l.id === languageMode);
      if (opt) optionDeltas += opt.priceDelta;
    }

    let bindingFee = 0;
    if (bindingType && currentService.options.bindingTypes) {
      const opt = currentService.options.bindingTypes.find((b) => b.id === bindingType);
      if (opt) bindingFee = opt.priceDelta;
    }

    let speedFee = 0;
    if (speed && currentService.options.speeds) {
      const opt = currentService.options.speeds.find((s) => s.id === speed);
      if (opt) speedFee = opt.priceDelta;
    }

    let countMultiplier = 1;
    if (['printing', 'photocopy'].includes(currentService.id)) {
      countMultiplier = Math.max(1, pageCount);
    } else {
      countMultiplier = Math.max(1, quantity);
    }

    const subtotal = ((unitBase + optionDeltas) * countMultiplier) + bindingFee + speedFee;
    const selectedDorm = DORM_LOCATIONS.find((d) => d.id === dormId);
    const deliveryFee = selectedDorm ? selectedDorm.deliveryFee : 0;
    const discount = (countMultiplier >= 50 && ['printing', 'photocopy'].includes(currentService.id)) 
      ? Math.round(subtotal * 0.05) 
      : 0;

    const grandTotal = subtotal + deliveryFee - discount;

    return {
      orderId: sessionOrderId,
      serviceName: currentService.name,
      basePrice: unitBase,
      optionsTotal: optionDeltas,
      subtotal,
      deliveryFee,
      discount,
      grandTotal,
      estimatedCompletion: speed.includes('express') || speed.includes('rush') 
        ? 'Express Rush (30 - 60 Mins)' 
        : currentService.turnaroundTime,
    };
  };

  const invoice = calculatePricing();

  const handleRealFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setIsUploading(true);
      setFileNotification('');
      try {
        const processed = await processUploadedDocument(file);
        setUploadedFile({
          name: processed.name,
          size: processed.size,
          dataUrl: processed.dataUrl,
          detectedPages: processed.detectedPages,
          isPdf: processed.isPdf
        });

        if (processed.isPdf && ['printing', 'photocopy'].includes(currentService.id)) {
          setPageCount(processed.detectedPages);
          setFileNotification(`✓ PDF document detected: ${processed.detectedPages} pages synced to price calculator!`);
          sounds.playNotificationPing();
        } else {
          setFileNotification(`✓ File "${processed.name}" (${processed.size}) attached successfully.`);
          sounds.playNotificationPing();
        }
        setFormError('');
      } catch (err) {
        console.warn('File upload error', err);
        setFormError('Failed to process file.');
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleProceedOrder = () => {
    if (!customerName.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    if (!customerPhone.trim()) {
      setFormError('Please enter your WhatsApp number.');
      return;
    }
    setFormError('');

    const selectedDorm = DORM_LOCATIONS.find((d) => d.id === dormId);
    const orderQty = ['printing', 'photocopy'].includes(currentService.id) ? pageCount : quantity;

    const orderState: OrderState = {
      serviceId: activeServiceId,
      colorMode,
      paperType,
      bindingType,
      materialType,
      speed,
      languageMode,
      pageCount,
      quantity,
      notes,
      fileName: uploadedFile?.name,
      fileSize: uploadedFile?.size,
      fileDataUrl: uploadedFile?.dataUrl,
      customerName,
      customerPhone,
      customerDormId: dormId,
      customerRoomNumber: roomNumber,
    };

    // Save order permanently to localStorage
    const savedOrder: SavedOrder = {
      orderId: invoice.orderId,
      createdAt: new Date().toISOString(),
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      serviceId: activeServiceId,
      serviceName: invoice.serviceName,
      optionsSummary: [
        colorMode ? `Ink: ${colorMode}` : '',
        paperType ? `Paper: ${paperType}` : '',
        bindingType !== 'none' ? `Binding: ${bindingType}` : '',
        speed ? `Turnaround: ${speed}` : ''
      ].filter(Boolean).join(' • '),
      fileName: uploadedFile?.name,
      fileSize: uploadedFile?.size,
      fileDataUrl: uploadedFile?.dataUrl,
      dormId,
      dormName: selectedDorm?.name || 'PresUniv Hub',
      roomNumber: roomNumber || 'Lobby Desk',
      notes,
      quantityOrPages: orderQty,
      totalAmount: invoice.grandTotal,
      paymentStatus: 'pending',
      status: 'placed',
      statusHistory: [
        {
          status: 'placed',
          timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
          note: `Order submitted by student (${orderQty} ${['printing', 'photocopy'].includes(currentService.id) ? 'pages' : 'pcs'})`
        }
      ]
    };

    // Persist student profile for future visits
    try {
      localStorage.setItem('punify_student_profile', JSON.stringify({
        name: customerName.trim(),
        phone: customerPhone.trim(),
        dormId,
        roomNumber: roomNumber.trim()
      }));
    } catch (e) {
      console.warn('Unable to persist student profile', e);
    }

    sounds.playSuccessChime();
    saveOrder(savedOrder);
    broadcastNewOrder(savedOrder);
    onSubmitOrder(invoice, orderState, savedOrder);

    // Generate fresh order ID for next submission
    const nextRandomId = Math.floor(1000 + Math.random() * 9000);
    setSessionOrderId(`PUN-${new Date().getFullYear()}-${nextRandomId}`);
  };

  return (
    <section id="order-portal" className="py-16 bg-white border-b border-slate-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="mb-8">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block mb-1">
            Order Portal
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Calculator & Order Form
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Customize document options, specify page counts, and choose your dorm drop-off point.
          </p>
        </div>

        {/* Clean Service Navigation Bar (Pill tabs) */}
        <div className="flex flex-wrap gap-1.5 pb-4 mb-8 border-b border-slate-100">
          {PUNIFY_SERVICES.map((s) => (
            <button
              key={s.id}
              onClick={() => handleSelectServiceChange(s.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
                activeServiceId === s.id
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {s.name.split(' (')[0]}
            </button>
          ))}
        </div>

        {/* 2-Column Clean Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Form Controls */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Color Mode */}
            {currentService.options.colorModes && (
              <div>
                <label className="text-xs font-semibold text-slate-800 block mb-2">
                  Ink & Color Selection
                </label>
                <div className="flex flex-wrap gap-2">
                  {currentService.options.colorModes.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setColorMode(opt.id)}
                      className={`px-3.5 py-2 rounded-lg text-xs font-medium border text-left transition-colors ${
                        colorMode === opt.id
                          ? 'border-blue-600 bg-blue-50/80 text-blue-900 font-semibold'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {opt.name.split(' (')[0]}
                      <span className="text-[10px] text-slate-500 block">
                        {opt.priceDelta === 0 ? 'Base Rate' : `+Rp ${opt.priceDelta.toLocaleString('id-ID')}`}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Paper Type */}
            {currentService.options.paperTypes && (
              <div>
                <label className="text-xs font-semibold text-slate-800 block mb-2">
                  Paper Size & Weight
                </label>
                <div className="flex flex-wrap gap-2">
                  {currentService.options.paperTypes.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setPaperType(opt.id)}
                      className={`px-3.5 py-2 rounded-lg text-xs font-medium border text-left transition-colors ${
                        paperType === opt.id
                          ? 'border-blue-600 bg-blue-50/80 text-blue-900 font-semibold'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {opt.name}
                      <span className="text-[10px] text-slate-500 block">
                        {opt.priceDelta === 0 ? 'Standard' : `+Rp ${opt.priceDelta.toLocaleString('id-ID')}`}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Material Specification */}
            {currentService.options.materialTypes && (
              <div>
                <label className="text-xs font-semibold text-slate-800 block mb-2">
                  Material Specification
                </label>
                <div className="flex flex-wrap gap-2">
                  {currentService.options.materialTypes.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setMaterialType(opt.id)}
                      className={`px-3.5 py-2 rounded-lg text-xs font-medium border text-left transition-colors ${
                        materialType === opt.id
                          ? 'border-blue-600 bg-blue-50/80 text-blue-900 font-semibold'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {opt.name}
                      <span className="text-[10px] text-slate-500 block">
                        {opt.priceDelta === 0 ? 'Standard' : `+Rp ${opt.priceDelta.toLocaleString('id-ID')}`}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Binding Dropdown */}
            {currentService.options.bindingTypes && (
              <div>
                <label className="text-xs font-semibold text-slate-800 block mb-1.5">
                  Document Binding Options
                </label>
                <select
                  value={bindingType}
                  onChange={(e) => setBindingType(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 text-xs focus:outline-none focus:border-blue-600"
                >
                  {currentService.options.bindingTypes.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.name} ({opt.priceDelta === 0 ? 'No Binding' : `+Rp ${opt.priceDelta.toLocaleString('id-ID')}`})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Speed selection */}
            {currentService.options.speeds && (
              <div>
                <label className="text-xs font-semibold text-slate-800 block mb-1.5">
                  Production Turnaround Speed
                </label>
                <div className="flex gap-2">
                  {currentService.options.speeds.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSpeed(opt.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                        speed === opt.id
                          ? 'border-blue-600 bg-blue-50/80 text-blue-900 font-semibold'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {opt.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Stepper */}
            <div className="flex items-center justify-between py-3 border-t border-b border-slate-100">
              <div>
                <span className="text-xs font-semibold text-slate-900 block">
                  {['printing', 'photocopy'].includes(currentService.id)
                    ? 'Page Count'
                    : 'Quantity (Pcs)'}
                </span>
                <span className="text-[11px] text-slate-500">
                  {pageCount >= 50 && ['printing', 'photocopy'].includes(currentService.id)
                    ? 'Automatic 5% bulk discount applied for ≥ 50 pages'
                    : 'Use stepper buttons or enter count directly'}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    if (['printing', 'photocopy'].includes(currentService.id)) {
                      setPageCount((p) => Math.max(1, p - 1));
                    } else {
                      setQuantity((q) => Math.max(1, q - 1));
                    }
                  }}
                  className="w-7 h-7 rounded border border-slate-300 bg-white text-slate-800 font-bold text-xs hover:bg-slate-100 transition-colors"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={['printing', 'photocopy'].includes(currentService.id) ? pageCount : quantity}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 1;
                    if (['printing', 'photocopy'].includes(currentService.id)) {
                      setPageCount(Math.max(1, val));
                    } else {
                      setQuantity(Math.max(1, val));
                    }
                  }}
                  className="w-14 text-center py-1 rounded border border-slate-300 bg-white text-slate-900 font-mono text-xs focus:outline-none focus:border-blue-600"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (['printing', 'photocopy'].includes(currentService.id)) {
                      setPageCount((p) => p + 1);
                    } else {
                      setQuantity((q) => q + 1);
                    }
                  }}
                  className="w-7 h-7 rounded border border-slate-300 bg-white text-slate-800 font-bold text-xs hover:bg-slate-100 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* File Upload */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-800 block">
                  Upload Document File (Automatic PDF Page Detection)
                </label>
                {isUploading && (
                  <span className="text-[11px] text-blue-600 animate-pulse font-medium">
                    Analyzing document pages...
                  </span>
                )}
              </div>

              {fileNotification && (
                <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-200/80 text-blue-900 text-xs flex items-center justify-between">
                  <span className="font-medium">{fileNotification}</span>
                  <button 
                    type="button" 
                    onClick={() => setFileNotification('')} 
                    className="text-blue-500 hover:text-blue-800 text-xs font-bold ml-2"
                  >
                    ✕
                  </button>
                </div>
              )}

              {uploadedFile ? (
                <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-800">
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <FileCheck className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <div className="min-w-0">
                      <span className="text-xs font-semibold text-slate-900 truncate block">
                        {uploadedFile.name}
                      </span>
                      <div className="flex items-center space-x-2 text-[11px] text-slate-500 font-mono">
                        <span>{uploadedFile.size}</span>
                        {uploadedFile.detectedPages && (
                          <>
                            <span>•</span>
                            <span className="text-blue-700 font-semibold">{uploadedFile.detectedPages} Pages</span>
                          </>
                        )}
                        {uploadedFile.dataUrl && (
                          <>
                            <span>•</span>
                            <a 
                              href={uploadedFile.dataUrl} 
                              download={uploadedFile.name}
                              className="text-blue-600 hover:underline font-sans font-medium"
                            >
                              Preview / Download File
                            </a>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setUploadedFile(null);
                      setFileNotification('');
                    }}
                    className="text-slate-400 hover:text-rose-600 p-1 flex-shrink-0"
                    title="Remove file"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <label className="flex items-center space-x-2 py-3 px-3.5 rounded-lg border border-dashed border-slate-300 hover:border-blue-500 hover:bg-blue-50/30 bg-white cursor-pointer text-xs text-slate-600 transition-colors">
                  <UploadCloud className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <div className="flex-1">
                    <span className="font-semibold text-slate-800">Select document file from device</span>
                    <span className="block text-[11px] text-slate-400">PDF, Word, Excel, JPG, PNG (PDF page count auto-detected)</span>
                  </div>
                  <input
                    type="file"
                    onChange={handleRealFileUpload}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.zip"
                  />
                </label>
              )}
            </div>

            {/* Dormitory Drop-off */}
            <DormSelector
              selectedDormId={dormId}
              roomNumber={roomNumber}
              onSelectDorm={(id) => setDormId(id)}
              onChangeRoomNumber={(room) => setRoomNumber(room)}
            />

            {/* Notes */}
            <div>
              <label className="text-xs font-semibold text-slate-800 block mb-1">
                Additional Notes for Production Desk
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. 2 copies, blue mica cover, double-sided, etc."
                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:border-blue-600"
              />
            </div>

          </div>

          {/* Right Column: Clean Minimalist Summary */}
          <div className="lg:col-span-5 sticky top-24 pt-4 lg:pt-0">
            <div className="border-t lg:border-t-0 lg:border-l border-slate-200 lg:pl-8 space-y-5">
              
              <div>
                <span className="text-xs font-mono font-semibold text-blue-700 uppercase tracking-wider block">
                  Price Breakdown
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  {invoice.serviceName}
                </h3>
                <span className="text-[11px] font-mono text-slate-500 block">
                  Order ID: {invoice.orderId}
                </span>
              </div>

              {/* Line items list with subtle dividers */}
              <div className="divide-y divide-slate-100 text-xs">
                <div className="py-2 flex justify-between text-slate-600">
                  <span>Base Unit Price</span>
                  <span className="font-mono text-slate-900">Rp {invoice.basePrice.toLocaleString('id-ID')}</span>
                </div>
                {invoice.optionsTotal > 0 && (
                  <div className="py-2 flex justify-between text-slate-600">
                    <span>Custom Add-ons</span>
                    <span className="font-mono text-slate-900">+Rp {invoice.optionsTotal.toLocaleString('id-ID')}</span>
                  </div>
                )}
                <div className="py-2 flex justify-between text-slate-600">
                  <span>Volume</span>
                  <span className="font-mono font-semibold text-slate-900">
                    {['printing', 'photocopy'].includes(currentService.id)
                      ? `${pageCount} Pages`
                      : `${quantity} Pcs`}
                  </span>
                </div>
                <div className="py-2 flex justify-between text-slate-600">
                  <span>Dorm Delivery Fee</span>
                  <span className={invoice.deliveryFee === 0 ? 'text-emerald-700 font-semibold' : 'font-mono text-slate-900'}>
                    {invoice.deliveryFee === 0 ? 'FREE' : `Rp ${invoice.deliveryFee.toLocaleString('id-ID')}`}
                  </span>
                </div>
                {invoice.discount > 0 && (
                  <div className="py-2 flex justify-between text-emerald-700">
                    <span>Volume Discount (5%)</span>
                    <span className="font-mono">-Rp {invoice.discount.toLocaleString('id-ID')}</span>
                  </div>
                )}
              </div>

              {/* Total Calculation */}
              <div className="pt-2 flex items-baseline justify-between border-t border-slate-200">
                <span className="text-xs font-medium text-slate-500">Total Amount:</span>
                <span className="text-2xl font-mono font-extrabold text-slate-950">
                  Rp {invoice.grandTotal.toLocaleString('id-ID')}
                </span>
              </div>

              {/* Customer Inputs */}
              <div className="space-y-2.5 pt-2 text-xs">
                <div>
                  <label className="text-[11px] font-semibold text-slate-800 block mb-1">
                    Student Name *
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Full Student Name"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 text-xs focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-800 block mb-1">
                    WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="08xxxxxxxxxx"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 text-xs focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              {formError && (
                <div className="p-2.5 rounded-lg bg-rose-50 text-rose-700 text-xs flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <button
                type="button"
                onClick={handleProceedOrder}
                className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors flex items-center justify-center space-x-1.5 shadow-xs"
              >
                <span>Confirm & Proceed to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-slate-500 text-center">
                Orders are saved in the system, trackable live, and details forwarded to the admin WhatsApp.
              </p>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
