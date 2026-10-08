import React from 'react';

export const WorkflowTimeline: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Choose Service Online',
      desc: 'Open PUNIFY and select the exact service you need (document printing, photocopying, custom name tags, thesis typing, keychains, or translation).',
    },
    {
      num: '02',
      title: 'Upload Your Files',
      desc: 'Upload your PDF/Word document directly or send it via WhatsApp along with any specific margins or binding requests.',
    },
    {
      num: '03',
      title: 'Transparent Pricing & QRIS',
      desc: 'Review the itemized invoice, pay seamlessly via QRIS or e-wallet, and confirm instantly with our admin on WhatsApp.',
    },
    {
      num: '04',
      title: 'Production & Printing',
      desc: 'Our production desk prints with high-precision laser equipment and binds your documents to official university standards.',
    },
    {
      num: '05',
      title: 'Quality Control Inspection',
      desc: 'Every order undergoes a strict double-check to ensure zero missing pages, crisp smudge-free text, and clean cut edges.',
    },
    {
      num: '06',
      title: 'Delivered to Dorm Lobby',
      desc: 'Our campus courier delivers your order directly to the Student Housing (Tower 1–4) security desk, NBH, or campus meeting points.',
    },
  ];

  return (
    <section id="workflow" className="py-16 bg-white border-b border-slate-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="mb-10 text-left">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block mb-1">
            Service Workflow
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How It Works
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            6 straightforward steps from your dorm room without needing to leave campus.
          </p>
        </div>

        {/* Clean Linear Grid */}
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
