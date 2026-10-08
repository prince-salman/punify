import React from 'react';
import { GraduationCap, MapPin, MessageCircle } from 'lucide-react';
import { ADMIN_WHATSAPP_URL } from '../data/contact';

export const TeamSection: React.FC = () => {
  const teamMembers = [
    {
      name: 'Michaela Clara Layan',
      role: 'Project Lead & Operations',
      focus: 'Production Coordination & Quality Assurance',
    },
    {
      name: 'Novia Yulianti',
      role: 'Finance & Pricing Strategy',
      focus: 'Student Pricing & Financial Management',
    },
    {
      name: 'Shafira',
      role: 'Creative & Merchandise',
      focus: 'Custom Merchandise & Identity Design',
    },
    {
      name: 'Sysil Damita Mustikasari',
      role: 'Campus Relations & Logistics',
      focus: 'Campus Partnerships & Dormitory Logistics',
    },
  ];

  return (
    <section id="team" className="py-16 bg-white border-b border-slate-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="mb-10 text-left">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block mb-1">
            Project Initiators
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            The Student Team Behind PUNIFY
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Founded by President University students to solve the daily friction of finding printing shops and academic supplies around Cikarang.
          </p>
        </div>

        {/* Clean Editorial Columns without cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="space-y-1">
              <span className="text-xs font-mono font-bold text-slate-400 block mb-1">
                0{index + 1}
              </span>
              <h3 className="text-sm font-bold text-slate-900">
                {member.name}
              </h3>
              <p className="text-xs font-semibold text-blue-600">
                {member.role}
              </p>
              <p className="text-xs text-slate-500 pt-0.5 leading-relaxed">
                {member.focus}
              </p>
              <div className="pt-2 flex items-center space-x-1 text-[11px] text-slate-400">
                <GraduationCap className="w-3 h-3 text-slate-400" />
                <span>President University</span>
              </div>
            </div>
          ))}
        </div>

        {/* Minimal Context Bar */}
        <div className="mt-12 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-600">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0" />
            <span>Operations Hub: Cikarang Baru & PresUniv Student Housing Dormitories.</span>
          </div>

          <a
            href={ADMIN_WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:text-blue-700 font-semibold flex items-center space-x-1.5"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>Contact Student Team via WhatsApp ➔</span>
          </a>
        </div>

      </div>
    </section>
  );
};
