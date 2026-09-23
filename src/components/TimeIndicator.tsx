import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { CHAPTERS } from '../data/story';

interface TimeIndicatorProps {
  activeIndex: number;
  progress: number;
  currentTheme: 'light' | 'dark';
  onSelectChapter: (index: number) => void;
}

export const TimeIndicator: React.FC<TimeIndicatorProps> = ({
  activeIndex,
  progress,
  currentTheme,
  onSelectChapter,
}) => {
  const timeTextRef = useRef<HTMLDivElement>(null);
  const prevTimeRef = useRef<string>(CHAPTERS[0].time);
  const railRef = useRef<HTMLDivElement>(null);

  const isDark = currentTheme === 'dark';
  const currentChapter = CHAPTERS[activeIndex] || CHAPTERS[0];

  // Subtle animated time change when activeIndex changes
  useEffect(() => {
    if (prevTimeRef.current !== currentChapter.time && timeTextRef.current) {
      const el = timeTextRef.current;
      gsap.to(el, {
        opacity: 0,
        y: -8,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          el.innerText = currentChapter.time;
          gsap.fromTo(
            el,
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
          );
          prevTimeRef.current = currentChapter.time;
        },
      });
    }
  }, [activeIndex, currentChapter.time]);

  // Update progress rail directly via style
  useEffect(() => {
    if (railRef.current) {
      railRef.current.style.transform = `scaleY(${progress})`;
    }
  }, [progress]);

  return (
    <>
      {/* Desktop Indicator - Right Viewport */}
      <aside
        aria-label="Story Timeline"
        className={`hidden md:flex fixed right-8 lg:right-12 top-1/2 -translate-y-1/2 z-40 flex-col items-end pointer-events-none select-none transition-colors duration-500 ${
          isDark ? 'text-[#FAF8F3]' : 'text-[#211B16]'
        }`}
      >
        {/* Time Display */}
        <div className="flex flex-col items-end mb-6 font-mono">
          <span className="text-[9px] uppercase tracking-[0.25em] opacity-40 mb-1">
            Hour
          </span>
          <div
            ref={timeTextRef}
            className="text-xs sm:text-sm tracking-[0.16em] font-medium font-mono tabular-nums"
          >
            {CHAPTERS[0].time}
          </div>
          <span className="text-[10px] uppercase font-sans tracking-[0.18em] opacity-50 mt-1">
            {currentChapter.label}
          </span>
        </div>

        {/* Timeline Rail & Chapter Nodes */}
        <div className="relative h-64 flex flex-col items-center pointer-events-auto">
          {/* Background Track */}
          <div
            className={`absolute top-0 bottom-0 w-[1px] ${
              isDark ? 'bg-[#FAF8F3]/15' : 'bg-[#211B16]/15'
            }`}
          />
          {/* Active Progress Line */}
          <div
            ref={railRef}
            className={`absolute top-0 w-[1px] h-full origin-top transition-transform duration-75 ${
              isDark ? 'bg-[#FAF8F3]' : 'bg-[#211B16]'
            }`}
            style={{ transform: `scaleY(${progress})` }}
          />

          {/* Chapter Nodes */}
          <div className="relative h-full flex flex-col justify-between py-1">
            {CHAPTERS.map((ch, idx) => {
              const isActive = idx === activeIndex;
              const isPast = idx < activeIndex;

              return (
                <button
                  key={ch.id}
                  onClick={() => onSelectChapter(idx)}
                  className="group relative flex items-center justify-center p-1.5 focus:outline-none"
                  aria-label={`Jump to ${ch.time} — ${ch.label}`}
                >
                  <span
                    className={`block rounded-full transition-all duration-300 ${
                      isActive
                        ? `w-2 h-2 ${isDark ? 'bg-[#FAF8F3]' : 'bg-[#211B16]'} scale-150 shadow-sm`
                        : isPast
                        ? `w-1.5 h-1.5 ${isDark ? 'bg-[#FAF8F3]/60' : 'bg-[#211B16]/60'}`
                        : `w-1 h-1 ${isDark ? 'bg-[#FAF8F3]/25' : 'bg-[#211B16]/25'} group-hover:scale-125`
                    }`}
                  />
                  {/* Tooltip on hover */}
                  <span
                    className={`absolute right-6 px-2 py-1 text-[9px] uppercase tracking-widest font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none ${
                      isDark ? 'text-[#FAF8F3] bg-[#211B16]/90' : 'text-[#211B16] bg-[#FAF8F3]/90'
                    } border ${isDark ? 'border-[#FAF8F3]/10' : 'border-[#211B16]/10'}`}
                  >
                    {ch.time} · {ch.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </aside>

      {/* Mobile Indicator - Bottom Bar */}
      <div
        className={`md:hidden fixed bottom-0 left-0 w-full z-40 px-6 py-3 border-t backdrop-blur-md transition-colors duration-500 flex items-center justify-between text-[11px] font-mono select-none ${
          isDark
            ? 'bg-[#211B16]/90 border-[#FAF8F3]/10 text-[#FAF8F3]'
            : 'bg-[#FAF8F3]/90 border-[#211B16]/10 text-[#211B16]'
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="text-[9px] uppercase tracking-widest opacity-50">Time</span>
          <span className="font-medium tracking-wider tabular-nums">
            {currentChapter.time}
          </span>
        </div>

        {/* Minimal horizontal progress */}
        <div className="flex-1 mx-4 relative h-[2px] bg-current/15 overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-current transition-all duration-150"
            style={{ width: `${Math.min(100, Math.max(0, progress * 100))}%` }}
          />
        </div>

        <span className="text-[9px] uppercase tracking-widest opacity-60 truncate max-w-[120px]">
          {currentChapter.label}
        </span>
      </div>
    </>
  );
};
