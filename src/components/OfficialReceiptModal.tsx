import React from 'react';
import { X, Printer, CheckCircle, ShieldCheck } from 'lucide-react';
import { SavedOrder } from '../utils/orderStorage';

interface OfficialReceiptModalProps {
  order: SavedOrder;
  onClose: () => void;
}

export const OfficialReceiptModal: React.FC<OfficialReceiptModalProps> = ({ order, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-xl my-6 rounded-2xl bg-white border border-slate-300 shadow-2xl overflow-hidden text-slate-900 print:m-0 print:border-none print:shadow-none print:w-full print:max-w-none">
        
        {/* Modal Top Bar (Hidden during print) */}
        <div className="p-4 bg-slate-100 border-b border-slate-200 flex items-center justify-between print:hidden">
          <span className="text-xs font-semibold text-slate-700">
            Pratinjau Nota Resmi / Bukti Transaksi PUNIFY
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak Nota (Print / PDF)</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Official Receipt Body */}
        <div className="p-8 space-y-6 bg-white font-sans text-xs">
          
          {/* Header */}
          <div className="flex items-start justify-between border-b-2 border-slate-900 pb-5">
            <div className="flex items-center space-x-3">
              <img src="/punify-logo.png" alt="PUNIFY" className="h-10 w-auto object-contain" />
              <div>
                <h2 className="text-base font-extrabold tracking-tight text-slate-900">
                  PUNIFY STUDENT SERVICES
                </h2>
                <span className="text-[11px] text-slate-500 block font-medium">
                  President University Hub • Cikarang Baru
                </span>
                <span className="text-[10px] text-slate-400 block font-mono">
                  WhatsApp Support: +62 878-9519-7606
                </span>
              </div>
            </div>

            <div className="text-right font-mono">
              <span className="text-[10px] text-slate-400 block uppercase">No. Transaksi</span>
              <strong className="text-sm text-blue-700 block">{order.orderId}</strong>
              <span className="text-[10px] text-slate-500 block">
                {new Date(order.createdAt).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })} • {new Date(order.createdAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB
              </span>
            </div>
          </div>

          {/* Student & Delivery Information */}
          <div className="grid grid-cols-2 gap-4 py-2 border-b border-slate-200">
            <div>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                Data Pemesan
              </span>
              <p className="font-bold text-slate-900 text-sm mt-0.5">{order.customerName}</p>
              <p className="text-slate-600 font-mono text-[11px]">{order.customerPhone}</p>
              <p className="text-slate-500 text-[11px]">Mahasiswa President University</p>
            </div>

            <div>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                Tujuan Pengantaran Asrama
              </span>
              <p className="font-bold text-slate-900 text-sm mt-0.5">{order.dormName}</p>
              <p className="text-blue-700 font-semibold font-mono text-[11px]">{order.roomNumber || 'Meja Satpam Lobby'}</p>
              {order.courierName && (
                <p className="text-slate-500 text-[11px] mt-0.5">Petugas Kurir: {order.courierName}</p>
              )}
            </div>
          </div>

          {/* Itemized Service Table */}
          <div>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase">
                  <th className="py-2">Deskripsi Layanan & Spesifikasi</th>
                  <th className="py-2 text-center">Volume</th>
                  <th className="py-2 text-right">Jumlah (IDR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-xs">
                <tr>
                  <td className="py-3 font-sans">
                    <strong className="text-slate-900 block">{order.serviceName}</strong>
                    <span className="text-slate-500 text-[11px] block">{order.optionsSummary}</span>
                    {order.fileName && (
                      <span className="text-blue-600 text-[11px] block truncate max-w-xs">
                        Berkas: {order.fileName}
                      </span>
                    )}
                  </td>
                  <td className="py-3 text-center font-bold text-slate-800">
                    {order.quantityOrPages} {order.serviceId === 'nametag' || order.serviceId === 'keychain' ? 'Pcs' : 'Hlm'}
                  </td>
                  <td className="py-3 text-right font-bold text-slate-900">
                    Rp {order.totalAmount.toLocaleString('id-ID')}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Calculation & Stamp */}
          <div className="flex items-center justify-between pt-4 border-t-2 border-slate-200">
            {/* Verification Stamp */}
            <div className="p-3 border-2 border-dashed rounded-xl flex items-center space-x-2.5 max-w-[260px]" style={{
              borderColor: order.paymentStatus === 'paid' ? '#059669' : '#D97706',
              backgroundColor: order.paymentStatus === 'paid' ? '#ECFDF5' : '#FFFBEB'
            }}>
              {order.paymentStatus === 'paid' ? (
                <>
                  <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                  <div>
                    <strong className="text-emerald-900 block text-xs tracking-wider uppercase font-extrabold">
                      LUNAS / VERIFIED
                    </strong>
                    <span className="text-[10px] text-emerald-700 block font-mono">
                      Metode: {order.paymentMethod || 'QRIS PresUniv'}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-6 h-6 text-amber-600 flex-shrink-0" />
                  <div>
                    <strong className="text-amber-900 block text-xs tracking-wider uppercase font-extrabold">
                      MENUNGGU BAYAR
                    </strong>
                    <span className="text-[10px] text-amber-700 block font-mono">
                      Bayar via QRIS di web
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Total */}
            <div className="text-right space-y-1 font-mono">
              <span className="text-slate-500 text-xs block">Total Pembayaran:</span>
              <span className="text-2xl font-extrabold text-slate-950 block">
                Rp {order.totalAmount.toLocaleString('id-ID')}
              </span>
              <span className="text-[10px] text-slate-400 block font-sans">
                Sudah termasuk PPN & drop asrama
              </span>
            </div>
          </div>

          {/* Instructions */}
          <div className="pt-4 border-t border-slate-200 text-[11px] text-slate-500 space-y-1">
            <p className="font-semibold text-slate-700">Petunjuk Pengambilan Berkas:</p>
            <p>1. Tunjukkan nomor Order ID atau bukti nota ini ke petugas kurir / satpam lobby dorm Anda.</p>
            <p>2. Konfirmasi pesanan via WhatsApp jika ada revisi halaman atau perubahan nomor kamar.</p>
          </div>

        </div>

      </div>
    </div>
  );
};
