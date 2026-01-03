"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  Globe,
  ChevronDown,
  ArrowRight,
  Sun,
  Moon,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "next-themes";

// Optional: Konstante für Sprachen, falls sie öfter gebraucht wird
const LANGUAGES = [
  { code: "DE", name: "Deutsch" },
  { code: "EN", name: "English" },
  { code: "ES", name: "Español" },
  { code: "FR", name: "Français" },
  { code: "IT", name: "Italiano" },
  { code: "PT", name: "Português" },
];

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const langMenuRef = useRef<HTMLDivElement>(null);

  const { currentLang, t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  // Hydration Fix
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close Lang Menu on Outside Click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        langMenuRef.current &&
        !langMenuRef.current.contains(event.target as Node)
      ) {
        setIsLangMenuOpen(false);
      }
    }

    if (isLangMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isLangMenuOpen]);

  // Lock Body Scroll when Mobile Menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Studio Route ignorieren (hat eigene Navbar)
  if (pathname?.startsWith("/studio")) {
    return null;
  }

  const handleLangSelect = (code: string) => {
    const newLang = code.toLowerCase();
    if (!pathname) return;

    // Pfad aufteilen und Sprache austauschen
    const segments = pathname.split("/");
    // segments[0] ist leerer String bei führendem Slash
    if (segments.length > 1) {
      // Wenn das zweite Segment (Index 1) eine bekannte Sprache ist, ersetzen wir es
      // Ansonsten (z.B. Root "/"), fügen wir es ein.
      // Da wir immer /[lang]/... nutzen, ist segments[1] fast immer die Sprache.
      segments[1] = newLang;
    } else {
      segments.splice(1, 0, newLang);
    }
    const newPath = segments.join("/");

    router.push(newPath);
    setIsLangMenuOpen(false);
    setIsMenuOpen(false);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const langPrefix = `/${currentLang?.toLowerCase() || "en"}`;

  // Helper für Active State
  const isActive = (path: string) => {
    const targetPath = path === "" ? langPrefix : `${langPrefix}${path}`;

    // Exakter Match oder Sub-Route Match
    if (path === "") {
      // Home ist speziell: nur exakt matchen oder mit Slash
      return pathname === langPrefix || pathname === `${langPrefix}/`;
    }
    return pathname === targetPath || pathname?.startsWith(`${targetPath}/`);
  };

  return (
    <>
      <nav
        className="fixed w-full z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-900 transition-colors duration-300"
        role="navigation"
        aria-label="Main Navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link
              href={langPrefix}
              className="flex-shrink-0 flex items-center cursor-pointer z-50 relative"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Estelle Management Home"
            >
              <span className="text-2xl font-light tracking-[0.2em] uppercase text-zinc-900 dark:text-zinc-100 transition-colors">
                Estelle
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-12">
              <Link
                href={`${langPrefix}/about`}
                className={`text-sm font-medium transition-colors uppercase tracking-wider ${
                  isActive("/about")
                    ? "text-black dark:text-white"
                    : "text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white"
                }`}
              >
                {t.nav.about}
              </Link>

              <Link
                href={`${langPrefix}/what-we-do`}
                className={`text-sm font-medium transition-colors uppercase tracking-wider ${
                  isActive("/what-we-do")
                    ? "text-black dark:text-white"
                    : "text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white"
                }`}
              >
                {t.nav.whatWeDo}
              </Link>

              <Link
                href={`${langPrefix}/models`}
                className={`text-sm font-medium transition-colors uppercase tracking-wider ${
                  isActive("/models")
                    ? "text-black dark:text-white"
                    : "text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white"
                }`}
              >
                {t.nav.models}
              </Link>

              <Link
                href={`${langPrefix}/blog`}
                className={`text-sm font-medium transition-colors uppercase tracking-wider ${
                  isActive("/blog")
                    ? "text-black dark:text-white"
                    : "text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white"
                }`}
              >
                {t.nav.blog || "Academy"}
              </Link>

              <Link
                href={`${langPrefix}/#contact`}
                className="px-8 py-3 bg-zinc-900 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-950 text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors uppercase tracking-widest rounded-none"
              >
                {t.nav.apply}
              </Link>

              <div className="flex items-center space-x-6 border-l border-zinc-200 dark:border-zinc-800 pl-6">
                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  aria-label={
                    theme === "dark"
                      ? "Switch to light mode"
                      : "Switch to dark mode"
                  }
                  className="text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors focus:outline-none cursor-pointer"
                >
                  {mounted && theme === "dark" ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </button>

                {/* Desktop Language Dropdown */}
                <div className="relative" ref={langMenuRef}>
                  <button
                    onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                    aria-label="Select language"
                    aria-haspopup="true"
                    aria-expanded={isLangMenuOpen}
                    className="flex items-center text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors text-sm font-medium uppercase tracking-wider focus:outline-none cursor-pointer"
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    {currentLang}
                    <ChevronDown
                      className={`w-3 h-3 ml-1 transition-transform duration-200 ${
                        isLangMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isLangMenuOpen && (
                    <div
                      className="absolute right-0 mt-4 w-40 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-xl py-2 animate-in fade-in slide-in-from-top-2 duration-200 rounded-none overflow-hidden"
                      role="menu"
                    >
                      {LANGUAGES.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => handleLangSelect(lang.code)}
                          role="menuitem"
                          className={`block w-full text-left px-4 py-3 text-xs uppercase tracking-wider transition-colors cursor-pointer ${
                            currentLang === lang.code
                              ? "text-black bg-zinc-100 dark:text-white dark:bg-zinc-900"
                              : "text-zinc-500 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white"
                          }`}
                        >
                          {lang.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="md:hidden flex items-center z-50 relative gap-4">
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="text-zinc-900 dark:text-zinc-100 focus:outline-none cursor-pointer"
              >
                {mounted && theme === "dark" ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
                className="text-zinc-900 dark:text-zinc-100 p-2 focus:outline-none relative w-10 h-10 flex items-center justify-center cursor-pointer"
              >
                <div className="relative w-6 h-6">
                  <Menu
                    className={`w-6 h-6 absolute top-0 left-0 transition-all duration-400 ease-[cubic-bezier(0.65,0,0.35,1)] ${
                      isMenuOpen
                        ? "opacity-0 rotate-90 scale-0"
                        : "opacity-100 rotate-0 scale-100"
                    }`}
                  />
                  <X
                    className={`w-6 h-6 absolute top-0 left-0 transition-all duration-400 ease-[cubic-bezier(0.65,0,0.35,1)] ${
                      isMenuOpen
                        ? "opacity-100 rotate-0 scale-100"
                        : "opacity-0 -rotate-90 scale-0"
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-white/98 dark:bg-zinc-950/98 backdrop-blur-xl md:hidden transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isMenuOpen}
      >
        <div className="flex flex-col h-full pt-28 pb-10 px-6 overflow-y-auto">
          <div className="flex-1 flex flex-col items-center justify-center space-y-8">
            <Link
              href={`${langPrefix}/about`}
              onClick={() => setIsMenuOpen(false)}
              className="text-3xl font-light text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors uppercase tracking-widest"
            >
              {t.nav.about}
            </Link>

            <Link
              href={`${langPrefix}/what-we-do`}
              onClick={() => setIsMenuOpen(false)}
              className="text-3xl font-light text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors uppercase tracking-widest"
            >
              {t.nav.whatWeDo}
            </Link>

            <Link
              href={`${langPrefix}/models`}
              onClick={() => setIsMenuOpen(false)}
              className="text-3xl font-light text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors uppercase tracking-widest"
            >
              {t.nav.models}
            </Link>

            <Link
              href={`${langPrefix}/blog`}
              onClick={() => setIsMenuOpen(false)}
              className="text-3xl font-light text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors uppercase tracking-widest"
            >
              {t.nav.blog || "Academy"}
            </Link>

            <Link
              href={`${langPrefix}/#contact`}
              onClick={() => setIsMenuOpen(false)}
              className="mt-8 group flex items-center gap-4 text-zinc-900 dark:text-zinc-100 px-8 py-4 border border-zinc-200 dark:border-zinc-800 rounded-none hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all duration-300"
            >
              <span className="uppercase tracking-widest text-sm font-medium">
                {t.nav.applyMobile}
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="mt-auto border-t border-zinc-200 dark:border-zinc-800/50 pt-8">
            <p className="text-center text-xs text-zinc-500 uppercase tracking-widest mb-6">
              {t.nav.selectLang}
            </p>
            <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLangSelect(lang.code)}
                  className={`cursor-pointer text-xs px-2 py-3 text-center uppercase tracking-wider rounded-none border transition-all ${
                    currentLang === lang.code
                      ? "border-zinc-900 text-zinc-900 bg-zinc-100 dark:border-zinc-100 dark:text-zinc-100 dark:bg-zinc-900"
                      : "border-zinc-300 text-zinc-600 dark:border-zinc-800 dark:text-zinc-500 hover:border-zinc-400 dark:hover:border-zinc-600"
                  }`}
                >
                  {lang.code}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
