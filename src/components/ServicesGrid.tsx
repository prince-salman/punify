import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import { PUNIFY_SERVICES } from '../data/services';
import { ServiceId } from '../types/order';

interface ServicesGridProps {
  onSelectService: (serviceId: ServiceId) => void;
  selectedServiceId: ServiceId;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({ 
  onSelectService, 
  selectedServiceId 
}) => {
  return (
    <section id="services" className="py-16 bg-white border-b border-slate-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="mb-8">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block mb-1">
            Service Catalog
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Academic & Campus Services
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Click on any service to customize options, preview pages, and compute your total cost.
          </p>
        </div>

        {/* Seamless Clean List */}
        <div className="divide-y divide-slate-100 border-t border-b border-slate-100">
          {PUNIFY_SERVICES.map((service, index) => {
            const isSelected = selectedServiceId === service.id;

            return (
              <div
                key={service.id}
                onClick={() => onSelectService(service.id)}
                className={`py-5 px-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer transition-colors ${
                  isSelected ? 'bg-blue-50/60' : 'hover:bg-slate-50/80'
                }`}
              >
                {/* Left: Info */}
                <div className="space-y-1 max-w-xl">
                  <div className="flex items-center space-x-2.5">
                    <span className="text-xs font-mono font-bold text-slate-400">
                      0{index + 1}
                    </span>
                    <h3 className="text-base font-bold text-slate-900">
                      {service.name}
                    </h3>
                    <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {service.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pl-6">
                    {service.shortDesc}
                  </p>
                  <div className="pl-6 pt-0.5 flex items-center gap-1.5 text-[11px] text-slate-500">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>Turnaround: {service.turnaroundTime}</span>
                  </div>
                </div>

                {/* Right: Pricing & CTA */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center pl-6 sm:pl-0 pt-2 sm:pt-0 gap-1 flex-shrink-0">
                  <div className="text-left sm:text-right">
                    <span className="text-[11px] text-slate-400 block">Starting from</span>
                    <span className="text-sm font-bold text-slate-900 font-mono">
                      Rp {service.basePrice.toLocaleString('id-ID')}
                    </span>
                    <span className="text-[10px] text-slate-500 ml-1">
                      {service.priceUnit}
                    </span>
                  </div>

                  <button
                    className={`mt-1 text-xs font-semibold flex items-center space-x-1 ${
                      isSelected ? 'text-blue-700 font-bold' : 'text-slate-500 hover:text-blue-600'
                    }`}
                  >
                    <span>{isSelected ? 'Selected ✓' : 'Configure & Order'}</span>
                    {!isSelected && <ArrowRight className="w-3 h-3" />}
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
