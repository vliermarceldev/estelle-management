"use client";

import React, { useState, useEffect } from "react";

export const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-8 animate-in slide-in-from-bottom-full duration-700">
      <div className="max-w-7xl mx-auto bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-6 md:p-8 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 transition-colors">
        <div className="flex-1">
          <h4 className="text-xs uppercase tracking-[0.3em] font-medium mb-2 text-zinc-900 dark:text-zinc-100">
            Privacy & Cookies
          </h4>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light leading-relaxed max-w-2xl">
            Wir nutzen Cookies, um das Nutzererlebnis auf unserer Stage zu
            optimieren. Durch die Nutzung von Estelle Management stimmst du
            unserer Verwendung von Cookies zu.
          </p>
        </div>
        <div className="flex items-center gap-8">
          <button
            onClick={() => setIsVisible(false)}
            className="text-[10px] uppercase tracking-widest text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer"
          >
            Ablehnen
          </button>
          <button
            onClick={handleAccept}
            className="bg-zinc-900 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-950 px-10 py-3 text-[10px] uppercase tracking-[0.2em] font-medium hover:bg-zinc-800 dark:hover:bg-white transition-all cursor-pointer"
          >
            Akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
};
