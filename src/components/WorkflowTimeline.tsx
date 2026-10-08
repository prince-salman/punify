import React from 'react';

export const WorkflowTimeline: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Pilih Layanan di Web',
      desc: 'Buka PUNIFY dan pilih jenis kebutuhan kamu (print dokumen, fotokopi materi, name tag, ketik skripsi, gantungan kunci, atau terjemahan).',
    },
    {
      num: '02',
      title: 'Kirim / Upload Berkas',
      desc: 'Unggah file PDF/Word atau kirimkan via WhatsApp beserta catatan format margin atau jilid yang diinginkan.',
    },
    {
      num: '03',
      title: 'Konfirmasi Tarif & QRIS',
      desc: 'Periksa total biaya secara transparan, bayar melalui QRIS atau transfer, dan konfirmasi langsung ke WhatsApp admin.',
    },
    {
      num: '04',
      title: 'Proses Produksi',
      desc: 'Tim kami mencetak dengan mesin presisi, menjilid rapi, atau memproses pesanan dengan standar kualitas tinggi.',
    },
    {
      num: '05',
      title: 'Pemeriksaan Kualitas',
      desc: 'Dokumen dan barang dicek ulang agar tidak ada halaman terlewat, tinta buram, atau kesalahan potong.',
    },
    {
      num: '06',
      title: 'Diantar ke Asrama',
      desc: 'Pesanan diantar langsung ke meja lobby Student Housing (Tower 1-4), NBH, atau titik temu kampus PresUniv.',
    },
  ];

  return (
    <section id="workflow" className="py-16 bg-white border-b border-slate-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="mb-10 text-left">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block mb-1">
            Alur Layanan
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Bagaimana Cara Kerjanya?
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Cukup 6 langkah praktis dari kamar asrama kamu tanpa perlu repot keluar kampus.
          </p>
        </div>

        {/* Clean Linear Grid without boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-10">
          {steps.map((step) => (
            <div key={step.num} className="space-y-1.5">
              <span className="text-xs font-mono font-bold text-blue-600 block">
                STEP {step.num}
              </span>
              <h3 className="text-base font-bold text-slate-900">
                {step.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
