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
  }
];

