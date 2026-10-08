import React from 'react';
import { ArrowRight, Check, MapPin, Clock } from 'lucide-react';

interface HeroProps {
  onStartOrder: () => void;
  onExploreServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartOrder, onExploreServices }) => {
  return (
    <section className="bg-white pt-14 pb-16 lg:pt-20 lg:pb-24 border-b border-slate-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Main Editorial Content */}
        <div className="text-left space-y-6 max-w-3xl">
          
          {/* Subtle Location Line */}
          <div className="flex items-center space-x-2 text-xs font-medium text-slate-500">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            <span>President University & Cikarang Baru</span>
            <span>•</span>
            <span className="text-blue-700 font-semibold">Student Housing 1–4 & NBH</span>
          </div>

          {/* Strong Human Headline */}
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.12]">
            Print tugas, fotokopi materi, dan bikin name tag. <br />
            <span className="text-blue-600">Langsung diantar ke asrama.</span>
          </h1>

          {/* Natural Human Copy */}
          <p className="text-lg text-slate-600 leading-relaxed font-normal">
            PUNIFY memudahkan mahasiswa President University mengakses seluruh kebutuhan akademik dan kepanitiaan dalam satu tempat. Pesan secara online, berkas dicetak rapi, dan kurir kami antar langsung ke meja lobby dormitory kamu.
          </p>

          {/* Action Row */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={onStartOrder}
              className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors flex items-center space-x-2 shadow-sm"
            >
              <span>Mulai Order & Hitung Tarif</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onExploreServices}
              className="px-5 py-3.5 text-slate-700 hover:text-blue-600 font-semibold text-sm transition-colors"
            >
              Lihat 6 Layanan ➔
            </button>
          </div>

          {/* Straightforward Value Points (Plain line, no cards or boxes) */}
          <div className="pt-8 border-t border-slate-100 flex flex-wrap items-center gap-y-3 gap-x-8 text-xs text-slate-600">
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-blue-600" />
              <span>Tarif mahasiswa mulai <strong>Rp 350 / lembar</strong></span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>Gratis antar ke <strong>Tower 1-4 & NBH</strong></span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>Tersedia pengerjaan <strong>Kilat Express</strong></span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
