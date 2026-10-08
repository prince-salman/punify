import { ServiceItem } from '../types/order';

export const PUNIFY_SERVICES: ServiceItem[] = [
  {
    id: 'printing',
    name: 'Document & Thesis Printing',
    category: 'Academic & Documents',
    shortDesc: 'Fast, high-resolution printing for coursework, lab reports, theses, and lecture slides.',
    fullDesc: 'Crisp laser printing with smudge-free ink on standard A4/F4 paper. Perfect for daily submissions, research journals, or final thesis defense.',
    basePrice: 500,
    priceUnit: '/ page',
    iconName: 'Printer',
    turnaroundTime: '15 - 45 Mins',
    popular: true,
    options: {
      colorModes: [
        { id: 'bw', name: 'Black & White (B&W)', description: 'Crisp text for papers & lecture notes', priceDelta: 0 },
        { id: 'color_standard', name: 'Standard Color (Charts & Diagrams)', description: 'Ideal for illustrated reports', priceDelta: 1000 },
        { id: 'color_full', name: 'Full Color (High-Gloss / Photo)', description: 'Premium photo prints & presentation posters', priceDelta: 2000 },
      ],
      paperTypes: [
        { id: 'a4_70', name: 'A4 70 gsm (Standard)', description: 'Economical daily document paper', priceDelta: 0 },
        { id: 'a4_80', name: 'A4 80 gsm (Smooth Premium)', description: 'Recommended for Theses & Capstone Projects', priceDelta: 200 },
        { id: 'f4_70', name: 'F4 / Folio 70 gsm', description: 'Legal folio size for official documents & forms', priceDelta: 300 },
      ],
      bindingTypes: [
        { id: 'none', name: 'No Binding', description: 'Loose collated pages', priceDelta: 0 },
        { id: 'staple', name: 'Corner Staple + Black Tape', description: 'Neat and durable for short essays', priceDelta: 1500 },
        { id: 'plastic_clip', name: 'Clear Mica Cover + Tape', description: 'Standard university assignment submission', priceDelta: 4000 },
        { id: 'spiral_wire', name: 'Metal Wire Spiral Binding', description: 'Course packs, handbooks, and presentations', priceDelta: 12000 },
        { id: 'softcover', name: 'Thermal Softcover (Laminated)', description: 'Standard thesis defense draft', priceDelta: 20000 },
      ],
      speeds: [
        { id: 'regular', name: 'Regular (Ready in 1-2 Hours)', description: 'Standard dorm delivery slot', priceDelta: 0 },
        { id: 'express', name: 'Rush Express (Ready in 20-30 Mins)', description: 'Priority print queue', priceDelta: 3000 },
      ]
    }
  },
  {
    id: 'photocopy',
    name: 'Photocopying & Duplication',
    category: 'Academic & Documents',
    shortDesc: 'Cost-effective duplication for lecture packs, course modules, and study notes.',
    fullDesc: 'Clear duplication for peer notes, past exam papers, and course packets with bulk page discounts.',
    basePrice: 350,
    priceUnit: '/ page',
    iconName: 'Copy',
    turnaroundTime: '20 - 60 Mins',
    options: {
      colorModes: [
        { id: 'single_side', name: 'Single-Sided', description: 'Standard lab worksheets', priceDelta: 0 },
        { id: 'double_side', name: 'Double-Sided (Duplex)', description: 'Saves paper and reduces bulk', priceDelta: 250 },
      ],
      paperTypes: [
        { id: 'a4_70', name: 'A4 70 gsm', description: 'Standard photocopy paper', priceDelta: 0 },
        { id: 'f4_70', name: 'F4 / Folio 70 gsm', description: 'Folio size paper', priceDelta: 150 },
      ],
      bindingTypes: [
        { id: 'none', name: 'No Binding', description: 'Neatly sorted loose sheets', priceDelta: 0 },
        { id: 'staple', name: 'Corner Staple', description: 'Fastened with heavy-duty staple', priceDelta: 1000 },
        { id: 'plastic_clip', name: 'Mica & Tape Binding', description: 'Standard course pack binding', priceDelta: 4000 },
      ],
      speeds: [
        { id: 'regular', name: 'Regular (1-2 Hours)', description: 'Standard batch queue', priceDelta: 0 },
        { id: 'express', name: 'Express Rush', description: 'Immediate machine priority', priceDelta: 2500 },
      ]
    }
  },
  {
    id: 'nametag',
    name: 'Custom Student Name Tag',
    category: 'Campus Events & Clubs',
    shortDesc: 'Orientation name tags, campus committee badges, seminar kits, and internship IDs.',
    fullDesc: 'Custom identity badges for student clubs, faculty events, PUMA, internships, and freshman orientation.',
    basePrice: 12000,
    priceUnit: '/ pcs',
    iconName: 'BadgeCheck',
    turnaroundTime: '1 - 2 Days',
    popular: true,
    options: {
      materialTypes: [
        { id: 'plastic_case_lanyard', name: 'Plastic Holder + PresUniv Lanyard', description: 'Event committee & club standard', priceDelta: 0 },
        { id: 'acrylic_pin', name: 'Clear Engraved Acrylic + Pin', description: 'Durable and water-resistant', priceDelta: 8000 },
        { id: 'acrylic_magnet', name: 'Executive Acrylic + Magnetic Backing', description: 'Protects blazer and formal suit fabric', priceDelta: 14000 },
      ],
      speeds: [
        { id: 'regular', name: 'Regular Production (1-2 Working Days)', description: 'Standard batch schedule', priceDelta: 0 },
        { id: 'rush_same_day', name: 'Same-Day Rush (< 6 Hours)', description: 'Emergency event preparation', priceDelta: 6000 },
      ]
    }
  },
  {
    id: 'typing',
    name: 'Assignment Typing & Formatting',
    category: 'Academic Assistance',
    shortDesc: 'Handwritten notes transcription, APA/IEEE thesis formatting, and table typesetting.',
    fullDesc: 'Convert lecture notes to clean Word/PDF, automated table of contents, Mendeley/APA citation styling, and mathematical formula typesetting.',
    basePrice: 5000,
    priceUnit: '/ page',
    iconName: 'FileText',
    turnaroundTime: '3 - 8 Hours',
    options: {
      materialTypes: [
        { id: 'standard_text', name: 'Standard Text Typing (EN / ID)', description: 'Essays, general coursework, audio transcription', priceDelta: 0 },
        { id: 'formula_tables', name: 'Technical Text (+ Formulas, Tables & Code)', description: 'Engineering, economics, and programming tasks', priceDelta: 2500 },
        { id: 'thesis_formatting', name: 'Thesis / Journal Formatting (APA/IEEE)', description: 'Margins, heading hierarchy, and automated TOC', priceDelta: 4000 },
      ],
      speeds: [
        { id: 'regular', name: 'Regular (6-12 Hours)', description: 'Delivered today or next morning', priceDelta: 0 },
        { id: 'rush_3h', name: 'Express Rush (2-3 Hours)', description: 'Urgent assignment deadlines', priceDelta: 5000 },
      ]
    }
  },
  {
    id: 'keychain',
    name: 'Custom Acrylic Keychain',
    category: 'Merchandise & Gifts',
    shortDesc: 'Custom double-sided acrylic keychains for major clubs, graduation gifts, and student orgs.',
    fullDesc: 'Precision laser-cut acrylic accessories with double-sided UV printing. Popular for PresUniv club merch, division memorabilia, or friend graduation gifts.',
    basePrice: 15000,
    priceUnit: '/ pcs',
    iconName: 'KeyRound',
    turnaroundTime: '1 - 3 Days',
    options: {
      materialTypes: [
        { id: 'acrylic_clear', name: '3mm Clear Acrylic (Double-Sided)', description: 'Die-cut contour matching your design', priceDelta: 0 },
        { id: 'acrylic_glitter', name: 'Holographic Glitter Acrylic', description: 'Sparkle shimmer effect under lighting', priceDelta: 5000 },
        { id: 'presuniv_edition', name: 'President University Official Club Edition', description: 'Curated campus and major templates', priceDelta: 3000 },
      ],
      speeds: [
        { id: 'regular', name: 'Regular Batch (2-3 Days)', description: 'Standard UV production run', priceDelta: 0 },
        { id: 'express', name: '24-Hour Express', description: 'Priority UV print scheduling', priceDelta: 5000 },
      ]
    }
  },
  {
    id: 'translate',
    name: 'Academic Translation (ID ⇄ EN)',
    category: 'Academic Assistance',
    shortDesc: 'Accurate EN ⇄ ID translation for thesis abstracts, research papers, and academic essays.',
    fullDesc: 'Context-aware manual translation by high-achieving bilingual students. Preserves academic nuance, avoids robotic translation errors, and includes proofreading.',
    basePrice: 35000,
    priceUnit: '/ page (~300 words)',
    iconName: 'Languages',
    turnaroundTime: '4 - 24 Hours',
    popular: true,
    options: {
      languages: [
        { id: 'id_to_en', name: 'Bahasa Indonesia ➔ English (Academic)', description: 'Thesis abstract, motivation letter, CV', priceDelta: 0 },
        { id: 'en_to_id', name: 'English ➔ Bahasa Indonesia', description: 'International research papers, textbook chapters', priceDelta: -5000 },
      ],
      materialTypes: [
        { id: 'general_academic', name: 'General Academic (Business & Humanities)', description: 'Management, communications, international relations', priceDelta: 0 },
        { id: 'stem_technical', name: 'STEM & Technical (Engineering / IT / Med)', description: 'Specialized terminology & technical formulas', priceDelta: 8000 },
        { id: 'proofreading_only', name: 'Proofreading & Grammar Polish Only', description: 'Stylistic review of existing English text', priceDelta: -15000 },
      ],
      speeds: [
        { id: 'regular', name: 'Regular (24 Hours)', description: 'Thorough double-check accuracy', priceDelta: 0 },
        { id: 'rush_6h', name: 'Rush (< 6 Hours)', description: 'Same-day abstract submission', priceDelta: 15000 },
      ]
    }
  }
];
