import React, { useState, useEffect } from 'react';
import { Download, X, Share2, PlusSquare, Smartphone, Check } from 'lucide-react';
import { sounds } from '../utils/audio';

export const PWAInstallBanner: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [dismissed, setDismissed] = useState(() => {
    try {
      return sessionStorage.getItem('punify_pwa_dismissed') === 'true';
    } catch {
      return false;
    }
  });
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  useEffect(() => {
    // Check if already running in standalone PWA mode
    const standaloneCheck = 
      window.matchMedia('(display-mode: standalone)').matches || 
      (window.navigator as any).standalone === true;
    
    setIsStandalone(standaloneCheck);
    if (standaloneCheck) return;

    // Detect iOS devices
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isAppleDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isAppleDevice);

    // Listen for Android/Desktop Chromium PWA prompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Listen for completed install
    const handleAppInstalled = () => {
      setIsInstallable(false);
      setDeferredPrompt(null);
      setIsStandalone(true);
      sounds.playSuccessChime();
    };

    const handleExternalTrigger = () => {
      handleInstallClick();
    };

    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('punify_trigger_pwa_install', handleExternalTrigger);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('punify_trigger_pwa_install', handleExternalTrigger);
    };
  }, [deferredPrompt, isIOS]);

  const handleInstallClick = async () => {
    if (isIOS) {
      setShowIOSGuide(true);
      return;
    }

    if (!deferredPrompt) {
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      sounds.playSuccessChime();
      setIsInstallable(false);
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem('punify_pwa_dismissed', 'true');
    } catch {
      // ignore
    }
  };

  // Do not show if already running inside installed standalone app, or dismissed
  if (isStandalone || dismissed) {
    return null;
  }

  // Show if installable OR on iOS mobile
  if (!isInstallable && !isIOS) {
    return null;
  }

  return (
    <>
      {/* Floating Bottom Install Prompt */}
      <aside 
        aria-label="PWA Install Banner"
        className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-40 bg-white/95 backdrop-blur-md border border-blue-200 rounded-2xl shadow-2xl p-4 text-slate-800 transition-all duration-300 animate-fade-in"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center space-x-3">
            <img 
              src="/icons/icon-192.png" 
              alt="PUNIFY App Icon" 
              className="w-12 h-12 rounded-xl object-contain shadow-xs border border-slate-100 flex-shrink-0"
            />
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Official App</span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              </div>
              <h4 className="text-sm font-extrabold text-slate-900 leading-tight">Install PUNIFY Application</h4>
              <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                One-tap ordering, real-time campus tracking & offline access on your home screen.
              </p>
            </div>
          </div>

          <button
            onClick={handleDismiss}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
            title="Dismiss install banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-end space-x-2">
          <button
            onClick={handleDismiss}
            className="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 rounded-lg transition-colors"
          >
            Maybe Later
          </button>
          <button
            onClick={handleInstallClick}
            className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-bold rounded-lg shadow-sm flex items-center space-x-1.5 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Install App</span>
          </button>
        </div>
      </aside>

      {/* iOS Instructions Modal */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4 border border-slate-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <Smartphone className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-bold text-slate-900">Install on iPhone / iPad</h3>
              </div>
              <button onClick={() => setShowIOSGuide(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Apple Safari requires just two quick taps to add PUNIFY to your Home Screen:
            </p>

            <ol className="text-xs space-y-2.5 text-slate-700">
              <li className="flex items-center space-x-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs flex-shrink-0">1</span>
                <span>Tap the <strong className="text-blue-600 inline-flex items-center gap-1">Share button <Share2 className="w-3.5 h-3.5" /></strong> at the bottom of Safari.</span>
              </li>
              <li className="flex items-center space-x-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs flex-shrink-0">2</span>
                <span>Scroll down and select <strong className="text-slate-900 inline-flex items-center gap-1">Add to Home Screen <PlusSquare className="w-3.5 h-3.5" /></strong>.</span>
              </li>
            </ol>

            <button
              onClick={() => setShowIOSGuide(false)}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors"
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </>
  );
};
