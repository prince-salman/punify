import React from 'react';
import { MapPin, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-100 text-slate-500 text-xs">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center space-x-2.5">
              <img src="/punify-logo.png" alt="PUNIFY" className="h-9 w-auto object-contain" />
            </div>
            <p className="text-slate-600 italic text-xs">
              "All Student Services, One Platform. — Your needs, unified."
            </p>
            <p className="text-slate-500 text-xs leading-relaxed max-w-sm">
              Integrated student services for President University: academic printing, duplication, orientation name tags, assignment typing, custom acrylic merchandise, and journal translation in Cikarang.
            </p>
          </div>

          {/* 6 Services list */}
          <div className="space-y-2.5">
            <h4 className="text-slate-900 font-semibold text-xs uppercase tracking-wider">6 Services</h4>
            <ul className="space-y-1.5 text-xs text-slate-600">
              <li><a href="#order-portal" className="hover:text-blue-600">Thesis & Document Printing</a></li>
              <li><a href="#order-portal" className="hover:text-blue-600">Coursepack Photocopying</a></li>
              <li><a href="#order-portal" className="hover:text-blue-600">Event & Orientation Name Tags</a></li>
              <li><a href="#order-portal" className="hover:text-blue-600">Assignment Typing & Formatting</a></li>
              <li><a href="#order-portal" className="hover:text-blue-600">Custom Acrylic Keychains</a></li>
              <li><a href="#order-portal" className="hover:text-blue-600">Academic Translation (ID ⇄ EN)</a></li>
            </ul>
          </div>

          {/* Operational Hours */}
          <div className="space-y-2.5">
            <h4 className="text-slate-900 font-semibold text-xs uppercase tracking-wider">Operations</h4>
            <p className="text-slate-700 text-xs">
              Monday – Sunday: <br />
              <strong className="text-slate-900">07:30 – 22:00 WIB</strong>
            </p>
            <div className="pt-1 text-[11px] space-y-1 text-slate-500">
              <p className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                <span>Cikarang, Bekasi 17530</span>
              </p>
              <a 
                href="https://wa.me/6287895197606" 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-1.5 hover:text-emerald-700 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp: 0878-9519-7606</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <p>© {new Date().getFullYear()} PUNIFY. President University Student Services.</p>
          <p>Michaela Clara Layan, Novia Yulianti, Shafira, Sysil Damita Mustikasari.</p>
        </div>
      </div>
    </footer>
  );
};
