# PUNIFY Web Platform & Student Order Portal — Design Specification

## 1. Executive Summary & Brand Identity
- **Project Name:** PUNIFY
- **Tagline:** All Student Services, One Platform. — *Your needs, unified.*
- **Mission:** Empower university students (specifically President University & Cikarang dormitory residents) with a seamless, unified web platform for academic services, eliminating the friction of traveling across multiple vendors.
- **Theme & Color Palette:**
  - **Hitam (Black / Midnight Slate):** `#0B0F17` (App backdrop), `#111827`, `#1E293B` (Cards & surfaces), `#0F172A`
  - **Putih (Crisp White / Light Slate):** `#FFFFFF` (Primary text on dark, card contrasts), `#F8FAFC`, `#E2E8F0`
  - **Biru (Varsity / Electric Blue):** `#2563EB` (Primary brand blue), `#3B82F6` (Hover / highlights), `#1D4ED8`, subtle ambient blue glows `rgba(37, 99, 235, 0.2)`
  - **Gold Star Sparkle Accent:** `#F59E0B` (Academic excellence & graduation motif inspired by the logo)

---

## 2. Service Catalog & Dynamic Pricing Matrix
PUNIFY delivers 6 core student services:

1. **Printing (Cetak Dokumen):**
   - Options: Black & White (`Rp 500 / page`), Color Standard (`Rp 1.500 / page`), Full Color Heavy (`Rp 2.500 / page`).
   - Paper: A4 70gsm, A4 80gsm (`+Rp 200/page`), F4/Legal (`+Rp 300/page`).
   - Binding: Staple (`Rp 1.000`), Clip Plastic (`Rp 3.000`), Spiral Coil Wire (`Rp 10.000`), Softcover Binding (`Rp 15.000`).

2. **Photocopying (Fotokopi):**
   - Standard 1-sided (`Rp 350 / page`), Double-sided 2-sided (`Rp 600 / sheet`).
   - Bulk academic book chapter / lecture note discounts (>50 pages: 10% off).

3. **Name Tag Making (Pembuatan Name Tag):**
   - Plastic Case + Lanyard Clip (`Rp 12.000`), Acrylic Custom Laser Cut (`Rp 25.000`), Pin Magnet Name Tag (`Rp 20.000`).
   - Rush option: Standard 24h or Express 3h (`+Rp 5.000`).

4. **Assignment Typing & Formatting (Ketik Tugas & Perapihan Format):**
   - Indonesian Academic Formatting (Skripsi/Makalah/Laporan): `Rp 5.000 / page`.
   - Rush 6-hour turnaround: `Rp 8.000 / page`.
   - Table / Equation heavy: `+Rp 2.000 / page`.

5. **Custom Keychain (Gantungan Kunci Kustom):**
   - Clear 2-sided Acrylic (`Rp 15.000`), Epoxy / Glitter Finish (`Rp 22.000`), President University / Major Club Special Edition (`Rp 18.000`).

6. **Academic Translation (Jasa Penerjemahan):**
   - Abstract / Journal Translation (ID to EN or EN to ID): `Rp 40.000 / page` (~300 words).
   - Document Proofreading / Grammar Check: `Rp 20.000 / page`.

---

## 3. Order Processing & Workflow Architecture
1. **Interactive Service Configurator:**
   - Real-time page count, binding choice, turnaround speed, and dormitory drop-off selection.
   - Live subtotal, service fee, and total in IDR (`Rp`).
2. **File Staging & Upload Simulation:**
   - Dropzone accepting `.pdf`, `.docx`, `.png`, `.jpg`, with file size check and preview.
3. **Campus & Dormitory Pickup Hubs:**
   - PresUniv Student Housing (Tower 1, Tower 2, Tower 3, Tower 4).
   - New Beverly Hills (NBH) Blocks.
   - Eco Dorm / Tropikana.
   - President University Campus Hub (FAB / Main Building lobby).
4. **Order Confirmation & WhatsApp + QRIS Dispatch:**
   - Generates unique Order ID (e.g. `PUN-2026-XXXX`).
   - One-click copy & instant WhatsApp redirect formatted message.
   - Interactive QRIS payment modal with simulated auto-verification.
5. **Real-time Order Tracker:**
   - Live progress indicator: `Order Placed` ➔ `Order Verified` ➔ `In Production` ➔ `Quality Control` ➔ `Ready for Pickup / Out for Delivery`.

---

## 4. Team & Operational Profile
- **Founders:** Michaela Clara Layan, Novia Yulianti, Shafira, Sysil Damita Mustikasari.
- **Coverage:** Cikarang, West Java (President University ecosystem).
- **Communication Channels:** WhatsApp, Instagram, and PUNIFY Web Portal.
