import React, { useState, useEffect } from 'react';
import { Search, ArrowRight, Menu, X, MapPin, PackageCheck } from 'lucide-react';

interface NavbarProps {
  onOpenOrder: () => void;
  onOpenTracker: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenOrder, onOpenTracker }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [orderCount, setOrderCount] = useState<number>(() => {
    try {
      const raw = localStorage.getItem('punify_orders_v1');
      return raw ? JSON.parse(raw).length : 2;
    } catch {
      return 2;
    }
  });

  useEffect(() => {
    const handleUpdate = () => {
      try {
        const raw = localStorage.getItem('punify_orders_v1');
        if (raw) setOrderCount(JSON.parse(raw).length);
      } catch (e) {
        console.log(e);
      }
    };
    window.addEventListener('punify_orders_updated', handleUpdate);
    return () => window.removeEventListener('punify_orders_updated', handleUpdate);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand Identity */}
          <div className="flex items-center">
            <a href="#" className="flex items-center space-x-3 group">
              <img 
                src="/punify-logo.png" 
                alt="PUNIFY Logo" 
                className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105"
              />
              <div className="hidden sm:block border-l border-slate-200 pl-3">
                <div className="flex items-center space-x-1.5">
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200/80 px-1.5 py-0.5 rounded">
                    Student Hub
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium">
                    President University
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 block font-mono">
                  Dorm Delivery • Cikarang
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6 text-sm">
            <a href="#services" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
              Layanan
            </a>
            <a href="#order-portal" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
              Kalkulator Harga
            </a>
            <a href="#workflow" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
              Alur Pengantaran
            </a>
            <a href="#tracker" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
              Lacak Pesanan
            </a>
            <a href="#team" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
              Tim Kami
            </a>
          </nav>

          {/* CTA Actions */}
          <div className="hidden sm:flex items-center space-x-3">
            <button
              onClick={onOpenTracker}
              className="flex items-center space-x-1.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-colors"
            >
              <Search className="w-3.5 h-3.5 text-blue-600" />
              <span>Lacak Pesanan</span>
              {orderCount > 0 && (
                <span className="px-1.5 py-0.2 bg-blue-600 text-white text-[10px] font-bold rounded-full ml-0.5">
                  {orderCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenOrder}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center space-x-1.5 shadow-xs"
            >
              <span>Pesan Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-700"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden px-4 pt-3 pb-6 bg-white border-b border-slate-200 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-2 text-sm font-medium">
            <a 
              href="#services" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg bg-slate-50 text-slate-800"
            >
              6 Layanan Akademik
            </a>
            <a 
              href="#order-portal" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg bg-slate-50 text-slate-800"
            >
              Kalkulator & Form Order
            </a>
            <a 
              href="#tracker" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg bg-slate-50 text-slate-800 flex items-center justify-between"
            >
              <span>Lacak Pesanan</span>
              {orderCount > 0 && (
                <span className="px-2 py-0.5 bg-blue-600 text-white text-xs font-bold rounded-full">
                  {orderCount} aktif
                </span>
              )}
            </a>
            <a 
              href="#team" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg bg-slate-50 text-slate-800"
            >
              Profil Tim Mahasiswa
            </a>
          </div>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenOrder();
            }}
            className="w-full py-2.5 rounded-lg bg-blue-600 text-white font-semibold text-sm flex items-center justify-center space-x-2"
          >
            <span>Mulai Order</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </header>
  );
};
