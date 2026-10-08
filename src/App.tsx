import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesGrid } from './components/ServicesGrid';
import { OrderConfigurator } from './components/OrderConfigurator';
import { OrderTracker } from './components/OrderTracker';
import { WorkflowTimeline } from './components/WorkflowTimeline';
import { TeamSection } from './components/TeamSection';
import { Footer } from './components/Footer';
import { OrderSummaryModal } from './components/OrderSummaryModal';
import { ServiceId, CalculatedInvoice, OrderState } from './types/order';

export function App() {
  const [selectedServiceId, setSelectedServiceId] = useState<ServiceId>('printing');
  const [activeModalInvoice, setActiveModalInvoice] = useState<CalculatedInvoice | null>(null);
  const [activeOrderState, setActiveOrderState] = useState<OrderState | null>(null);
  const [trackedOrderId, setTrackedOrderId] = useState<string>('PUN-2026-4821');

  const handleSelectServiceFromGrid = (serviceId: ServiceId) => {
    setSelectedServiceId(serviceId);
    const element = document.getElementById('order-portal');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStartOrderFromHero = () => {
    const element = document.getElementById('order-portal');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToTracker = () => {
    const element = document.getElementById('tracker');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmitOrder = (invoice: CalculatedInvoice, orderState: OrderState) => {
    setActiveModalInvoice(invoice);
    setActiveOrderState(orderState);
    setTrackedOrderId(invoice.orderId);
  };

  const handleViewTrackerFromModal = (orderId: string) => {
    setTrackedOrderId(orderId);
    handleScrollToTracker();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Navigation */}
      <Navbar 
        onOpenOrder={handleStartOrderFromHero}
        onOpenTracker={handleScrollToTracker}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero 
          onStartOrder={handleStartOrderFromHero}
          onExploreServices={handleExploreServices}
        />

        {/* 6 Services Catalog Showcase */}
        <ServicesGrid 
          selectedServiceId={selectedServiceId}
          onSelectService={handleSelectServiceFromGrid}
        />

        {/* Live Order Configurator & Real-time Price Calculator */}
        <OrderConfigurator 
          activeServiceId={selectedServiceId}
          onChangeService={(id) => setSelectedServiceId(id)}
          onSubmitOrder={handleSubmitOrder}
        />

        {/* Operational Workflow Timeline */}
        <WorkflowTimeline />

        {/* Live Order Status Tracker */}
        <OrderTracker 
          initialOrderId={trackedOrderId}
        />

        {/* Founding Team Section */}
        <TeamSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Order Summary & QRIS/WhatsApp Modal */}
      {activeModalInvoice && activeOrderState && (
        <OrderSummaryModal
          invoice={activeModalInvoice}
          orderState={activeOrderState}
          onClose={() => {
            setActiveModalInvoice(null);
            setActiveOrderState(null);
          }}
          onViewTracker={handleViewTrackerFromModal}
        />
      )}
    </div>
  );
}

export default App;
