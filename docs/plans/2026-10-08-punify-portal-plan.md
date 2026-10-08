# PUNIFY Web Platform Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a fully interactive, mobile-responsive web portal for PUNIFY featuring a 6-in-1 academic services catalog, dynamic price calculator, dormitory pickup selector, file upload staging, simulated QRIS/WhatsApp checkout, and order status tracker in the requested "hitam, putih, biru" design system.

**Architecture:** Single-page client-side React 18 + Vite + TypeScript application with Tailwind CSS for layout styling and Lucide Icons for iconography. Modular components separated by domain responsibility with reactive state management in App.

**Tech Stack:** React 18, Vite, TypeScript, Tailwind CSS, Lucide React, Canvas Confetti.

**Spec:** `docs/specs/2026-10-08-punify-portal-design.md`

## Global Constraints
- Color palette strictly enforces **Hitam** (`#0B0F17`, `#111827`, `#1E293B`), **Putih** (`#FFFFFF`, `#F8FAFC`), and **Biru** (`#2563EB`, `#3B82F6`) with gold sparkle accents (`#F59E0B`).
- All currency formatted in Indonesian Rupiah (`Rp X.XXX`).
- Responsive for mobile (students ordering from smartphones) and desktop.
- Logo from user upload must be copied into `public/punify-logo.png` and properly displayed.

---

### Task 1: Project Initialization, Logo Setup & Tailwind Theme Configuration
**Files:**
- Create: `package.json`, `vite.config.ts`, `tailwind.config.js`, `postcss.config.js`, `tsconfig.json`, `index.html`
- Copy Logo: `public/punify-logo.png`
- Create: `src/index.css`
- Test: Verify build and dependencies

### Task 2: Data Models & Service Catalog Definition
**Files:**
- Create: `src/types/order.ts`
- Create: `src/data/services.ts`
- Create: `src/data/dorms.ts`
- Test: Unit validation of service items, pricing formulas, and dorm entries

### Task 3: Navbar, Hero Section & Campus Trust Metrics
**Files:**
- Create: `src/components/Navbar.tsx`
- Create: `src/components/Hero.tsx`
- Test: Visual verification of logo, tagline, campus dorm badges, and navigation anchors

### Task 4: Interactive 6-in-1 Services Catalog Showcase
**Files:**
- Create: `src/components/ServicesGrid.tsx`
- Test: Service selection trigger updates active service in state

### Task 5: Dynamic Order Configurator, Pricing Calculator & File Dropzone
**Files:**
- Create: `src/components/OrderConfigurator.tsx`
- Create: `src/components/DormSelector.tsx`
- Test: Calculator reacts dynamically to page counts, paper types, bindings, rush delivery, and dorm selection

### Task 6: Order Summary, QRIS Payment & WhatsApp Dispatch Modal
**Files:**
- Create: `src/components/OrderSummaryModal.tsx`
- Test: Generates unique Order ID, formatted WhatsApp message URL, and interactive QRIS payment simulation

### Task 7: Live Order Status Tracker & Operational Workflow Timeline
**Files:**
- Create: `src/components/OrderTracker.tsx`
- Create: `src/components/WorkflowTimeline.tsx`
- Test: Step indicator updates correctly with sample/active Order ID

### Task 8: Team & About Section, Footer & App Integration
**Files:**
- Create: `src/components/TeamSection.tsx`
- Create: `src/components/Footer.tsx`
- Modify: `src/App.tsx`
- Test: Complete end-to-end user ordering flow and responsive verification
