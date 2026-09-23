import React, { useState } from 'react';
import { FULL_MENU } from '../data/story';

interface SiteNavProps {
  currentTheme: 'light' | 'dark';
  onNavigate: (targetId: string) => void;
}

export const SiteNav: React.FC<SiteNavProps> = ({ currentTheme, onNavigate }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const isDark = currentTheme === 'dark';

  return (
    <>
      <header
        id="site-nav"
        className={`fixed top-0 left-0 w-full z-50 px-6 sm:px-10 py-6 sm:py-8 flex items-center justify-between transition-colors duration-500 pointer-events-none select-none ${
          isDark ? 'text-[#FAF8F3]' : 'text-[#FAF8F3] drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]'
        }`}
        style={{ opacity: 1 }}
      >
        {/* Brand */}
        <button
          onClick={() => onNavigate('dawn')}
          className="pointer-events-auto text-left font-serif tracking-[0.22em] text-base sm:text-lg md:text-xl font-medium uppercase hover:opacity-80 transition-all drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] [text-shadow:_0_1px_12px_rgba(0,0,0,0.6)]"
        >
          A Place to Pause
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-10 text-[13px] font-sans tracking-[0.22em] uppercase font-semibold">
          <button
            onClick={() => setMenuOpen(true)}
            className="pointer-events-auto hover:opacity-80 transition-all relative group py-1.5 drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)] [text-shadow:_0_1px_8px_rgba(0,0,0,0.6)]"
          >
            Menu
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-current transition-all duration-300 group-hover:w-full" />
          </button>
          <button
            onClick={() => onNavigate('slow-hour')}
            className="pointer-events-auto hover:opacity-80 transition-all relative group py-1.5 drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)] [text-shadow:_0_1px_8px_rgba(0,0,0,0.6)]"
          >
            About
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-current transition-all duration-300 group-hover:w-full" />
          </button>
          <button
            onClick={() => onNavigate('visit')}
            className="pointer-events-auto hover:opacity-80 transition-all relative group py-1.5 drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)] [text-shadow:_0_1px_8px_rgba(0,0,0,0.6)]"
          >
            Visit
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-current transition-all duration-300 group-hover:w-full" />
          </button>
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden pointer-events-auto">
          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="text-[11px] tracking-[0.18em] uppercase font-medium py-1 px-2 border border-current"
            aria-label="Toggle navigation menu"
          >
            {mobileNavOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-40 bg-[#FAF8F3]/95 backdrop-blur-md flex flex-col justify-center px-8 md:hidden text-[#211B16]">
          <nav className="flex flex-col gap-6 text-xl font-serif tracking-widest uppercase">
            <button
              onClick={() => {
                setMobileNavOpen(false);
                setMenuOpen(true);
              }}
              className="text-left py-2 border-b border-[#211B16]/10"
            >
              Full Menu
            </button>
            <button
              onClick={() => {
                setMobileNavOpen(false);
                onNavigate('slow-hour');
              }}
              className="text-left py-2 border-b border-[#211B16]/10"
            >
              Why We Exist (About)
            </button>
            <button
              onClick={() => {
                setMobileNavOpen(false);
                onNavigate('visit');
              }}
              className="text-left py-2 border-b border-[#211B16]/10"
            >
              Hours & Location
            </button>
          </nav>
          <div className="mt-12 text-xs font-sans text-[#8C857B] tracking-wider uppercase">
            07:00 — 22:00 · Tehran, Iran
          </div>
        </div>
      )}

      {/* Full Editorial Menu Modal */}
      {menuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Café Menu"
          className="fixed inset-0 z-50 bg-[#FAF8F3] text-[#211B16] overflow-y-auto px-6 py-12 sm:p-16 flex flex-col justify-between"
        >
          <div className="max-w-4xl mx-auto w-full">
            <div className="flex items-center justify-between pb-8 border-b border-[#211B16]/10">
              <div>
                <p className="text-[11px] font-sans tracking-[0.2em] uppercase text-[#8C857B]">
                  Seasonal Offering
                </p>
                <h2 className="text-3xl sm:text-4xl font-serif mt-1 font-normal">
                  The Café Menu
                </h2>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-[11px] font-sans tracking-[0.2em] uppercase border border-[#211B16] px-4 py-2 hover:bg-[#211B16] hover:text-[#FAF8F3] transition-colors"
              >
                Close (ESC)
              </button>
            </div>

            {/* Menu Sections Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 mt-12">
              {/* Breakfast */}
              <div>
                <span className="text-xs font-sans tracking-[0.2em] uppercase text-[#6D7560] block mb-4">
                  01 · Breakfast (07:00 — 11:00)
                </span>
                <div className="space-y-6">
                  {FULL_MENU.breakfast.map((item, i) => (
                    <div key={i} className="group border-b border-[#211B16]/10 pb-4">
                      <div className="flex justify-between items-baseline">
                        <h4 className="font-serif text-lg tracking-wide group-hover:translate-x-1 transition-transform duration-300">
                          {item.name}
                        </h4>
                        <span className="text-sm font-sans tracking-wider text-[#8C857B] font-mono tabular-nums">
                          {item.price}
                        </span>
                      </div>
                      <p className="text-xs text-[#8C857B] font-sans mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lunch */}
              <div>
                <span className="text-xs font-sans tracking-[0.2em] uppercase text-[#6D7560] block mb-4">
                  02 · Lunch (12:00 — 15:30)
                </span>
                <div className="space-y-6">
                  {FULL_MENU.lunch.map((item, i) => (
                    <div key={i} className="group border-b border-[#211B16]/10 pb-4">
                      <div className="flex justify-between items-baseline">
                        <h4 className="font-serif text-lg tracking-wide group-hover:translate-x-1 transition-transform duration-300">
                          {item.name}
                        </h4>
                        <span className="text-sm font-sans tracking-wider text-[#8C857B] font-mono tabular-nums">
                          {item.price}
                        </span>
                      </div>
                      <p className="text-xs text-[#8C857B] font-sans mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Coffee */}
              <div>
                <span className="text-xs font-sans tracking-[0.2em] uppercase text-[#6D7560] block mb-4">
                  03 · Single-Origin Coffee & Tea
                </span>
                <div className="space-y-6">
                  {FULL_MENU.coffee.map((item, i) => (
                    <div key={i} className="group border-b border-[#211B16]/10 pb-4">
                      <div className="flex justify-between items-baseline">
                        <h4 className="font-serif text-lg tracking-wide group-hover:translate-x-1 transition-transform duration-300">
                          {item.name}
                        </h4>
                        <span className="text-sm font-sans tracking-wider text-[#8C857B] font-mono tabular-nums">
                          {item.price}
                        </span>
                      </div>
                      <p className="text-xs text-[#8C857B] font-sans mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Evening */}
              <div>
                <span className="text-xs font-sans tracking-[0.2em] uppercase text-[#6D7560] block mb-4">
                  04 · Evening & Dessert (18:00 — 22:00)
                </span>
                <div className="space-y-6">
                  {FULL_MENU.evening.map((item, i) => (
                    <div key={i} className="group border-b border-[#211B16]/10 pb-4">
                      <div className="flex justify-between items-baseline">
                        <h4 className="font-serif text-lg tracking-wide group-hover:translate-x-1 transition-transform duration-300">
                          {item.name}
                        </h4>
                        <span className="text-sm font-sans tracking-wider text-[#8C857B] font-mono tabular-nums">
                          {item.price}
                        </span>
                      </div>
                      <p className="text-xs text-[#8C857B] font-sans mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-[#211B16]/10 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#8C857B] font-sans">
              <span>All milk is organic whole milk or steamed oat milk.</span>
              <span className="mt-2 sm:mt-0">Filtered water is complimentary on every table.</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
