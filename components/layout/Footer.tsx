import React from "react";
import Link from "next/link";
import { Instagram, Mail, ArrowUpRight } from "lucide-react";
// FIX: Importiere den Typ direkt aus der neuen Source of Truth
import type { Dictionary } from "@/lib/types";

interface FooterProps {
  t: Dictionary;
  lang: string;
}

export const Footer = ({ t, lang }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-900 pt-20 pb-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Column 1: Brand */}
          <div className="space-y-6">
            <Link href={`/${lang}`} className="block">
              <span className="text-2xl font-light tracking-[0.2em] uppercase text-zinc-900 dark:text-zinc-100">
                Estelle
              </span>
            </Link>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm font-light leading-relaxed max-w-xs">
              {t.footer.slogan}
            </p>
          </div>

          {/* Column 2: Company Links */}
          <div>
            <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 uppercase tracking-widest mb-6">
              {t.footer.cols.company}
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href={`/${lang}`}
                  className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 text-sm transition-colors"
                >
                  {t.footer.links.home}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/about`}
                  className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 text-sm transition-colors"
                >
                  {t.footer.links.about}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/what-we-do`}
                  className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 text-sm transition-colors"
                >
                  {t.footer.links.whatWeDo}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/models`}
                  className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 text-sm transition-colors"
                >
                  {t.footer.links.models}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/#contact`}
                  className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 text-sm transition-colors"
                >
                  {t.footer.links.apply}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal Links */}
          <div>
            <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 uppercase tracking-widest mb-6">
              {t.footer.cols.legal}
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href={`/${lang}/impressum`}
                  className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 text-sm transition-colors"
                >
                  {t.footer.links.impressum}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/privacy`}
                  className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 text-sm transition-colors"
                >
                  {t.footer.links.privacy}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Socials / Connect */}
          <div>
            <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 uppercase tracking-widest mb-6">
              {t.footer.cols.socials}
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:contact@estelle-management.com"
                  aria-label="Send us an email"
                  className="group flex items-center text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 text-sm transition-colors cursor-pointer"
                >
                  <Mail className="w-4 h-4 mr-3 stroke-[1.5]" />
                  <span>Email Us</span>
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit our Instagram profile"
                  className="group flex items-center text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 text-sm transition-colors cursor-pointer"
                >
                  <Instagram className="w-4 h-4 mr-3 stroke-[1.5]" />
                  <span>Instagram</span>
                  <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-100 dark:border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-400 dark:text-zinc-600 text-xs uppercase tracking-widest">
            © {currentYear} Estelle Management. {t.footer.rights}
          </p>

          <p className="text-zinc-300 dark:text-zinc-700 text-[10px] uppercase tracking-widest">
            GERMANY
          </p>
        </div>
      </div>
    </footer>
  );
};
