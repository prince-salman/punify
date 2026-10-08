import React, { useState, useEffect } from 'react';
import { Search, ArrowRight, Menu, X, MapPin, PackageCheck, Download } from 'lucide-react';

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
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand Identity */}
          <div className="flex items-center">
            <a href="#" className="flex items-center gap-2.5 group">
              <img 
                src="/punify-logo.png" 
                alt="PUNIFY" 
                className="h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </a>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <a 
              href="#services" 
              className="px-3.5 py-1.5 text-xs lg:text-[13px] font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 rounded-full transition-colors whitespace-nowrap"
            >
              Services
            </a>
            <a 
              href="#order-portal" 
              className="px-3.5 py-1.5 text-xs lg:text-[13px] font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 rounded-full transition-colors whitespace-nowrap"
            >
              Price Calculator
            </a>
            <a 
              href="#workflow" 
              className="px-3.5 py-1.5 text-xs lg:text-[13px] font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 rounded-full transition-colors whitespace-nowrap"
            >
              Delivery Flow
            </a>
            <a 
              href="#tracker" 
              className="px-3.5 py-1.5 text-xs lg:text-[13px] font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 rounded-full transition-colors whitespace-nowrap"
            >
              Track Order
            </a>
            <a 
              href="#team" 
              className="px-3.5 py-1.5 text-xs lg:text-[13px] font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 rounded-full transition-colors whitespace-nowrap"
            >
              Our Team
            </a>
          </nav>

          {/* CTA Actions */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Install PWA App Button */}
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event('punify_trigger_pwa_install'))}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-full transition-colors whitespace-nowrap border border-blue-200"
              title="Install PUNIFY App"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Install App</span>
            </button>

            <button
              onClick={onOpenTracker}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 rounded-full transition-colors whitespace-nowrap"
            >
              <Search className="w-3.5 h-3.5 text-slate-500" />
              <span>Track</span>
              {orderCount > 0 && (
                <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 bg-blue-600 text-white text-[10px] font-bold rounded-full">
                  {orderCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenOrder}
              className="group inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-all shadow-xs active:scale-95 whitespace-nowrap"
            >
              <span>Order Now</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-slate-100 text-slate-700 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-3 pb-6 bg-white border-b border-slate-200 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-2 text-sm font-medium">
            <a 
              href="#services" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg bg-slate-50 text-slate-800"
            >
              6 Academic Services
            </a>
            <a 
              href="#order-portal" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg bg-slate-50 text-slate-800"
            >
              Calculator & Order Form
            </a>
            <a 
              href="#tracker" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg bg-slate-50 text-slate-800 flex items-center justify-between"
            >
              <span>Track Order</span>
              {orderCount > 0 && (
                <span className="px-2 py-0.5 bg-blue-600 text-white text-xs font-bold rounded-full">
                  {orderCount} active
                </span>
              )}
            </a>
            <a 
              href="#team" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg bg-slate-50 text-slate-800"
            >
              Student Team Profile
            </a>
          </div>
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              window.dispatchEvent(new Event('punify_trigger_pwa_install'));
            }}
            className="w-full py-2.5 px-4 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 font-bold text-xs flex items-center justify-center space-x-2 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Install PUNIFY App</span>
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenOrder();
            }}
            className="w-full py-2.5 rounded-lg bg-blue-600 text-white font-semibold text-sm flex items-center justify-center space-x-2"
          >
            <span>Start Order</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </header>
  );
};
