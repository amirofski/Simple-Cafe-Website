import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IMAGES } from '../data/images';

gsap.registerPlugin(ScrollTrigger);

interface FinalSectionProps {
  onThemeChange: (theme: 'light' | 'dark') => void;
}

export const FinalSection: React.FC<FinalSectionProps> = ({ onThemeChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const waitingRef = useRef<HTMLParagraphElement>(null);
  const visitBlockRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      ScrollTrigger.create({
        trigger: container,
        start: 'top 50%',
        onEnter: () => onThemeChange('dark'),
        onEnterBack: () => onThemeChange('dark'),
      });

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 60%',
        },
      });

      if (headlineRef.current) {
        tl.fromTo(
          headlineRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
        );
      }

      if (lineRef.current) {
        tl.fromTo(
          lineRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.8, ease: 'power2.out' },
          '-=0.4'
        );
      }

      if (waitingRef.current) {
        tl.fromTo(
          waitingRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          '-=0.3'
        );
      }

      if (visitBlockRef.current) {
        tl.fromTo(
          visitBlockRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
          '-=0.2'
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      id="visit"
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#14100D] text-[#FAF8F3] flex flex-col justify-between px-6 sm:px-12 md:px-20 py-24 select-none overflow-hidden"
    >
      {/* Background Photograph remaining visible beneath the darkened overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src={IMAGES.closing.src}
          alt="Atmospheric quiet café night interior"
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-25 filter contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#14100D] via-[#14100D]/85 to-[#14100D]/60" />
      </div>

      {/* Center Emotional Transition */}
      <div className="relative z-10 my-auto text-center py-16 flex flex-col items-center">
        <h2
          ref={headlineRef}
          className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-normal tracking-tight uppercase leading-[0.95]"
        >
          A Place to Pause
        </h2>

        <div
          ref={lineRef}
          className="w-16 h-[1px] bg-[#FAF8F3]/40 my-8 origin-center transform-gpu will-change-transform"
        />

        <p
          ref={waitingRef}
          className="text-xs sm:text-sm font-sans tracking-[0.24em] uppercase text-[#FAF8F3]/80 font-light"
        >
          Your table is waiting.
        </p>
      </div>

      {/* Editorial Contact & Visit Ribbon */}
      <div
        ref={visitBlockRef}
        className="relative z-10 border-t border-[#FAF8F3]/15 pt-12 mt-12 grid grid-cols-1 md:grid-cols-3 gap-10 text-xs font-sans"
      >
        {/* Hours */}
        <div>
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#FAF8F3]/50 block mb-2">
            Hours
          </span>
          <div className="font-serif text-2xl text-[#FAF8F3]">Open Today</div>
          <div className="font-mono text-sm tracking-wider text-[#FAF8F3]/70 mt-1 tabular-nums">
            07:00 — 22:00
          </div>
          <p className="text-[11px] text-[#FAF8F3]/50 mt-2">
            No reservations required. Walk-ins always welcome.
          </p>
        </div>

        {/* Location */}
        <div>
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#FAF8F3]/50 block mb-2">
            Location
          </span>
          <div className="font-serif text-2xl text-[#FAF8F3]">1401 N20 St, Tehran</div>
          <div className="text-sm tracking-wider text-[#FAF8F3]/70 mt-1">
            Tehran, Iran
          </div>
          <p className="text-[11px] text-[#FAF8F3]/50 mt-2">
            Corner courtyard with travertine entrance.
          </p>
        </div>

        {/* Interactive Text Links with Premium Hover Interaction */}
        <div className="flex flex-col justify-end space-y-3">
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#FAF8F3]/50 block mb-1">
            Inquiries
          </span>

          <a
            href="https://maps.google.com/?q=72MM%2B35X+Tehran+Iran"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between text-xs tracking-[0.18em] uppercase text-[#FAF8F3]/90 hover:text-[#FAF8F3] py-1 border-b border-[#FAF8F3]/10"
          >
            <span className="group-hover:translate-x-1 transition-transform duration-300 ease-out">
              Get Directions
            </span>
            <span className="inline-block transform group-hover:translate-x-1.5 transition-transform duration-300 ease-out font-mono">
              →
            </span>
          </a>

          <a
            href="tel:+982130000000"
            className="group flex items-center justify-between text-xs tracking-[0.18em] uppercase text-[#FAF8F3]/90 hover:text-[#FAF8F3] py-1 border-b border-[#FAF8F3]/10"
          >
            <span className="group-hover:translate-x-1 transition-transform duration-300 ease-out">
              Call (+98 21 3000 0000)
            </span>
            <span className="inline-block transform group-hover:translate-x-1.5 transition-transform duration-300 ease-out font-mono">
              →
            </span>
          </a>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between text-xs tracking-[0.18em] uppercase text-[#FAF8F3]/90 hover:text-[#FAF8F3] py-1 border-b border-[#FAF8F3]/10"
          >
            <span className="group-hover:translate-x-1 transition-transform duration-300 ease-out">
              Instagram (@aplacetopause)
            </span>
            <span className="inline-block transform group-hover:translate-x-1.5 transition-transform duration-300 ease-out font-mono">
              →
            </span>
          </a>
        </div>
      </div>

      {/* Quiet Colophon */}
      <div className="relative z-10 mt-16 pt-6 border-t border-[#FAF8F3]/10 flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono tracking-widest text-[#FAF8F3]/40 uppercase">
        <span>© 2026 A Place to Pause. All photographs original.</span>
        <span className="mt-2 sm:mt-0">Architecture · Roasted Coffee · Stillness</span>
      </div>
    </section>
  );
};
