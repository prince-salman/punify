import { ServiceItem } from '../types/order';

export const PUNIFY_SERVICES: ServiceItem[] = [
  {
    id: 'printing',
    name: 'Printing (Cetak Dokumen)',
    category: 'Akademik & Dokumen',
    shortDesc: 'Cetak tugas, laporan praktikum, skripsi, dan materi kuliah cepat berkualitas tinggi.',
    fullDesc: 'Layanan print dokumen dengan kualitas tajam, anti-luntur, dan pilihan kertas standar A4/F4. Cocok untuk submission harian, jurnal, ataupun skripsi final.',
    basePrice: 500,
    priceUnit: '/ lembar',
    iconName: 'Printer',
    turnaroundTime: '15 - 45 Menit',
    popular: true,
    options: {
      colorModes: [
        { id: 'bw', name: 'Hitam Putih (Black & White)', description: 'Tajam untuk teks makalah & materi kuliah', priceDelta: 0 },
        { id: 'color_standard', name: 'Warna Standar (Grafik/Diagram)', description: 'Cocok untuk laporan bergambar', priceDelta: 1000 },
        { id: 'color_full', name: 'Warna Penuh (Full High-Gloss/Foto)', description: 'Hasil foto & poster presentasi premium', priceDelta: 2000 },
      ],
      paperTypes: [
        { id: 'a4_70', name: 'A4 70 gsm (Standar)', description: 'Kertas dokumen harian ekonomis', priceDelta: 0 },
        { id: 'a4_80', name: 'A4 80 gsm (Tebal & Halus)', description: 'Rekomendasi untuk Skripsi / Tugas Akhir', priceDelta: 200 },
        { id: 'f4_70', name: 'F4 / Folio 70 gsm', description: 'Ukuran legal untuk berkas & formulir', priceDelta: 300 },
      ],
      bindingTypes: [
        { id: 'none', name: 'Tanpa Jilid', description: 'Hanya cetak lembaran', priceDelta: 0 },
        { id: 'staple', name: 'Staples Sudut + Lakban', description: 'Rapi dan kuat untuk makalah ringkas', priceDelta: 1500 },
        { id: 'plastic_clip', name: 'Jilid Mika + Lakban Hitam', description: 'Standar pengumpulan tugas kuliah', priceDelta: 4000 },
        { id: 'spiral_wire', name: 'Jilid Spiral Kawat Metal', description: 'Buku panduan, modul, & presentasi', priceDelta: 12000 },
        { id: 'softcover', name: 'Softcover Lem Panas (Laminasi)', description: 'Standar draft sidang skripsi', priceDelta: 20000 },
      ],
      speeds: [
        { id: 'regular', name: 'Reguler (Siap dalam 1-2 Jam)', description: 'Jadwal pengantaran reguler dorm', priceDelta: 0 },
        { id: 'express', name: 'Kilat Express (Siap dalam 20-30 Menit)', description: 'Prioritas mesin cetak langsung', priceDelta: 3000 },
      ]
    }
  },
  {
    id: 'photocopy',
    name: 'Photocopying (Fotokopi)',
    category: 'Akademik & Dokumen',
    shortDesc: 'Penggandaan materi kuliah, modul dosen, dan catatan ujian praktis & murah.',
    fullDesc: 'Fotokopi tajam dan bersih untuk catatan teman, bank soal ujian, dan diktat kuliah dengan diskon khusus untuk cetak dalam jumlah lembar banyak.',
    basePrice: 350,
    priceUnit: '/ lembar',
    iconName: 'Copy',
    turnaroundTime: '20 - 60 Menit',
    options: {
      colorModes: [
        { id: 'single_side', name: '1 Sisi (Single Page)', description: 'Standar lembar kerja praktikum', priceDelta: 0 },
        { id: 'double_side', name: 'Bolak-Balik (Duplex)', description: 'Hemat kertas dan lebih tipis', priceDelta: 250 },
      ],
      paperTypes: [
        { id: 'a4_70', name: 'A4 70 gsm', description: 'Kertas standar fotokopi', priceDelta: 0 },
        { id: 'f4_70', name: 'F4 / Folio 70 gsm', description: 'Kertas ukuran folio', priceDelta: 150 },
      ],
      bindingTypes: [
        { id: 'none', name: 'Tanpa Jilid', description: 'Lepasan rapi terurut', priceDelta: 0 },
        { id: 'staple', name: 'Staples Pojok', description: 'Disatukan dengan staples', priceDelta: 1000 },
        { id: 'plastic_clip', name: 'Jilid Mika & Lakban', description: 'Standar diktat & buku materi', priceDelta: 4000 },
      ],
      speeds: [
        { id: 'regular', name: 'Reguler (1-2 Jam)', description: 'Proses santai', priceDelta: 0 },
        { id: 'express', name: 'Express Kilat', description: 'Langsung naik mesin utama', priceDelta: 2500 },
      ]
    }
  },
  {
    id: 'nametag',
    name: 'Name Tag Making',
    category: 'Event & Kampus',
    shortDesc: 'Name tag ospek, panitia event kampus, seminar kit, dan kartu magang.',
    fullDesc: 'Pembuatan tanda pengenal kustom untuk kepanitiaan organisasi mahasiswa, event fakultas, PUMA, internship, dan name tag ospek mahasiswa baru.',
    basePrice: 12000,
    priceUnit: '/ pcs',
    iconName: 'BadgeCheck',
    turnaroundTime: '1 - 2 Hari',
    popular: true,
    options: {
      materialTypes: [
        { id: 'plastic_case_lanyard', name: 'Case Plastik + Lanyard Tali', description: 'Standar panitia event & kepengurusan', priceDelta: 0 },
        { id: 'acrylic_pin', name: 'Akrilik Bening Grafir / Insert', description: 'Elegan dan tahan air', priceDelta: 8000 },
        { id: 'acrylic_magnet', name: 'Akrilik Eksklusif + Pin Magnet', description: 'Tidak merusak kain pakaian jas / almamater', priceDelta: 14000 },
      ],
      speeds: [
        { id: 'regular', name: 'Produksi Reguler (1-2 Hari Kerja)', description: 'Standar antrean batch', priceDelta: 0 },
        { id: 'rush_same_day', name: 'Same Day Rush (< 6 Jam)', description: 'Darurat H-1 event atau ospek', priceDelta: 6000 },
      ]
    }
  },
  {
    id: 'typing',
    name: 'Assignment Typing (Ketik Tugas)',
    category: 'Bantuan Akademik',
    shortDesc: 'Bantuan pengetikan cepat, transkripsi catatan tulis tangan, & formatting skripsi.',
    fullDesc: 'Layanan pengetikan catatan kuliah tangan ke format Word/PDF, perapihan margin, daftar isi otomatis, sitasi Mendeley/APA, dan pengetikan rumus matematika.',
    basePrice: 5000,
    priceUnit: '/ halaman',
    iconName: 'FileText',
    turnaroundTime: '3 - 8 Jam',
    options: {
      materialTypes: [
        { id: 'standard_text', name: 'Ketik Teks Standar (Bahasa Indo/Inggris)', description: 'Makalah, essay umum, transkripsi audio', priceDelta: 0 },
        { id: 'formula_tables', name: 'Teks Kompleks (+ Rumus, Tabel & Chart)', description: 'Tugas teknik, ekonomi, coding snippets', priceDelta: 2500 },
        { id: 'thesis_formatting', name: 'Perapihan Format Skripsi / Jurnal (APA/IEEE)', description: 'Format margin, heading, dan daftar isi otomatis', priceDelta: 4000 },
      ],
      speeds: [
        { id: 'regular', name: 'Reguler (6-12 Jam)', description: 'Selesai hari ini / besok pagi', priceDelta: 0 },
        { id: 'rush_3h', name: 'Express Rush (2-3 Jam)', description: 'Deadline tugas mepet', priceDelta: 5000 },
      ]
    }
  },
  {
    id: 'keychain',
    name: 'Custom Keychain (Gantungan Kunci)',
    category: 'Merchandise & Hadiah',
    shortDesc: 'Gantungan kunci akrilik kustom foto, logo jurusan, club kampus, atau wisuda.',
    fullDesc: 'Aksesoris gantungan kunci akrilik UV print 2 sisi dengan potongan laser presisi. Populer untuk merchandise club kampus PresUniv, kenang-kenangan divisi, ataupun hadiah wisuda sahabat.',
    basePrice: 15000,
    priceUnit: '/ pcs',
    iconName: 'KeyRound',
    turnaroundTime: '1 - 3 Hari',
    options: {
      materialTypes: [
        { id: 'acrylic_clear', name: 'Akrilik Bening 2 Sisi 3mm', description: 'Potong mengikuti bentuk custom (die-cut)', priceDelta: 0 },
        { id: 'acrylic_glitter', name: 'Akrilik Glitter Sparkle Hologram', description: 'Efek berkilau premium saat terkena cahaya', priceDelta: 5000 },
        { id: 'presuniv_edition', name: 'Special Edition PresUniv / Major Club', description: 'Desain template resmi kampus & prodi', priceDelta: 3000 },
      ],
      speeds: [
        { id: 'regular', name: 'Batch Reguler (2-3 Hari)', description: 'Waktu produksi standar cetak UV', priceDelta: 0 },
        { id: 'express', name: 'Express 24 Jam', description: 'Prioritas antrean cetak UV', priceDelta: 5000 },
      ]
    }
  },
  {
    id: 'translate',
    name: 'Academic Translate (Penerjemahan)',
    category: 'Bantuan Akademik',
    shortDesc: 'Penerjemahan abstrak skripsi, jurnal ilmiah, dan essay English ↔ Indonesia akurat.',
    fullDesc: 'Penerjemahan manual oleh mahasiswa bilingual berprestasi. Menjamin konteks akademik terjaga, tidak kaku seperti mesin terjemahan, dan lolos proofreading.',
    basePrice: 35000,
    priceUnit: '/ halaman (~300 kata)',
    iconName: 'Languages',
    turnaroundTime: '4 - 24 Jam',
    popular: true,
    options: {
      languages: [
        { id: 'id_to_en', name: 'Bahasa Indonesia ➔ English (Akademik)', description: 'Abstrak skripsi, motivation letter, resume', priceDelta: 0 },
        { id: 'en_to_id', name: 'English ➔ Bahasa Indonesia', description: 'Jurnal rujukan internasional, bab buku teks', priceDelta: -5000 },
      ],
      materialTypes: [
        { id: 'general_academic', name: 'Teks Akademik Umum (Humaniora/Bisnis)', description: 'Kosakata standar manajemen, komunikasi, hukum', priceDelta: 0 },
        { id: 'stem_technical', name: 'Teks Khusus Teknik / Kedokteran / IT', description: 'Terminologi mendalam & rumus teknis', priceDelta: 8000 },
        { id: 'proofreading_only', name: 'Proofreading & Grammar Polish Saja', description: 'Pemeriksaan teks yang sudah dalam bahasa Inggris', priceDelta: -15000 },
      ],
      speeds: [
        { id: 'regular', name: 'Reguler (24 Jam)', description: 'Pemeriksaan ketat dan akurat', priceDelta: 0 },
        { id: 'rush_6h', name: 'Rush (< 6 Jam)', description: 'Untuk deadline submit abstrak hari ini', priceDelta: 15000 },
      ]
    }
  }
];
