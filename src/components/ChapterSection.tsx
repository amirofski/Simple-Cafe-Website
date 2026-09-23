import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChapterData } from '../data/story';
import { IMAGES } from '../data/images';
import { MaskedLines, MaskedWords } from '../utils/textSplitter';

gsap.registerPlugin(ScrollTrigger);

interface ChapterSectionProps {
  chapter: ChapterData;
  onActive: (index: number) => void;
  onThemeChange: (theme: 'light' | 'dark') => void;
}

export const ChapterSection: React.FC<ChapterSectionProps> = ({
  chapter,
  onActive,
  onThemeChange,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const imgMainRef = useRef<HTMLImageElement>(null);
  const imgDetailRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const photo = IMAGES[chapter.id] || IMAGES.dawn;

  useGSAP(
    () => {
      const section = sectionRef.current;
      const stage = stageRef.current;
      if (!section || !stage) return;

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Master scroll trigger for stage pinning & active detection
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        onEnter: () => {
          onActive(chapter.index);
          onThemeChange(chapter.theme);
        },
        onEnterBack: () => {
          onActive(chapter.index);
          onThemeChange(chapter.theme);
        },
      });

      if (prefersReduced) return;

      const mm = gsap.matchMedia();

      // ==========================================
      // CHAPTER 01: DAWN (06:42 AM)
      // ==========================================
      if (chapter.id === 'dawn') {
        mm.add('(min-width: 768px)', () => {
          // Entrance triggered animation
          const tlEntrance = gsap.timeline({ delay: 0.2 });
          if (imgMainRef.current) {
            tlEntrance.fromTo(
              imgMainRef.current,
              { scale: 1.04, opacity: 0.9 },
              { scale: 1, opacity: 1, duration: 2.2, ease: 'power2.out' }
            );
          }

          const lines = stage.querySelectorAll('.split-line');
          if (lines.length > 0) {
            tlEntrance.fromTo(
              lines,
              { yPercent: 110, opacity: 0 },
              { yPercent: 0, opacity: 1, duration: 1.2, stagger: 0.08, ease: 'power3.out' },
              '-=1.4'
            );
          }

          const meta = stage.querySelector('.chapter-meta');
          if (meta) {
            tlEntrance.fromTo(
              meta,
              { opacity: 0, y: 12 },
              { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
              '-=0.7'
            );
          }

          // Scroll-bound scrub
          const scrollTl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.8,
            },
          });

          if (imgMainRef.current) {
            scrollTl.to(imgMainRef.current, { scale: 1.08, ease: 'none' }, 0);
          }
          if (contentRef.current) {
            scrollTl.to(
              contentRef.current,
              { yPercent: -20, opacity: 0.1, ease: 'power1.in' },
              0.2
            );
          }
        });

        // Mobile responsive
        mm.add('(max-width: 767px)', () => {
          const lines = stage.querySelectorAll('.split-line');
          if (lines.length > 0) {
            gsap.fromTo(
              lines,
              { yPercent: 80, opacity: 0 },
              { yPercent: 0, opacity: 1, duration: 1, stagger: 0.08, ease: 'power3.out', delay: 0.3 }
            );
          }
        });
      }

      // ==========================================
      // CHAPTER 02: FIRST TABLE (07:03 AM)
      // ==========================================
      else if (chapter.id === 'first-table') {
        mm.add('(min-width: 768px)', () => {
          const scrollTl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: 'bottom top',
              scrub: 1,
            },
          });

          if (imgMainRef.current) {
            scrollTl.fromTo(
              imgMainRef.current,
              { scale: 1.04, xPercent: 3 },
              { scale: 1, xPercent: 0, ease: 'power2.out' },
              0
            );
          }

          // Title entrance triggered
          ScrollTrigger.create({
            trigger: section,
            start: 'top 40%',
            onEnter: () => {
              const lines = stage.querySelectorAll('.split-line');
              gsap.fromTo(
                lines,
                { yPercent: 110, opacity: 0 },
                { yPercent: 0, opacity: 1, duration: 1.2, stagger: 0.08, ease: 'power3.out' }
              );
            },
          });
        });
      }

      // ==========================================
      // CHAPTER 03: BREAKFAST (08:15 AM)
      // ==========================================
      else if (chapter.id === 'breakfast') {
        mm.add('(min-width: 768px)', () => {
          const scrollTl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: 'bottom top',
              scrub: 1,
            },
          });

          if (imgMainRef.current) {
            scrollTl.fromTo(
              imgMainRef.current,
              { scale: 1.12, yPercent: 5 },
              { scale: 1, yPercent: 0, ease: 'power2.out' },
              0
            );
          }

          // Trigger title word reveal & line draw
          ScrollTrigger.create({
            trigger: section,
            start: 'top 45%',
            onEnter: () => {
              const words = stage.querySelectorAll('.split-word');
              if (words.length > 0) {
                gsap.fromTo(
                  words,
                  { opacity: 0, y: 35 },
                  { opacity: 1, y: 0, duration: 0.9, stagger: 0.06, ease: 'power2.out' }
                );
              }

              if (lineRef.current) {
                gsap.fromTo(
                  lineRef.current,
                  { scaleX: 0 },
                  { scaleX: 1, duration: 1, ease: 'power2.out', delay: 0.2 }
                );
              }

              const items = stage.querySelectorAll('.menu-reveal-item');
              if (items.length > 0) {
                gsap.fromTo(
                  items,
                  { opacity: 0, y: 20 },
                  { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power2.out', delay: 0.4 }
                );
              }
            },
          });
        });
      }

      // ==========================================
      // CHAPTER 04: WORK / STUDY (10:27 AM)
      // ==========================================
      else if (chapter.id === 'work-study') {
        mm.add('(min-width: 768px)', () => {
          const scrollTl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: 'bottom top',
              scrub: 1,
            },
          });

          if (imgMainRef.current) {
            scrollTl.fromTo(
              imgMainRef.current,
              { scale: 1.05 },
              { scale: 1.12, ease: 'none' },
              0
            );
          }
          if (imgDetailRef.current) {
            scrollTl.fromTo(
              imgDetailRef.current,
              { y: 40 },
              { y: -20, ease: 'none' },
              0
            );
          }

          // Sequential word reveal with pause
          ScrollTrigger.create({
            trigger: section,
            start: 'top 40%',
            onEnter: () => {
              const words = stage.querySelectorAll('.work-word');
              const tl = gsap.timeline();
              words.forEach((word) => {
                tl.fromTo(
                  word,
                  { opacity: 0, y: 25 },
                  { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
                );
                tl.to({}, { duration: 0.25 }); // quiet pause
              });

              const sub = stage.querySelector('.work-subtitle');
              if (sub) {
                tl.fromTo(
                  sub,
                  { opacity: 0, y: 15 },
                  { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' },
                  '+=0.1'
                );
              }
            },
          });
        });
      }

      // ==========================================
      // CHAPTER 05: LUNCH (01:16 PM)
      // ==========================================
      else if (chapter.id === 'lunch') {
        mm.add('(min-width: 768px)', () => {
          const scrollTl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: 'bottom top',
              scrub: 1.2,
            },
          });

          // Clip-path reveal on foreground photo
          if (imgDetailRef.current) {
            scrollTl.fromTo(
              imgDetailRef.current,
              { clipPath: 'inset(0 0 100% 0)' },
              { clipPath: 'inset(0 0 0% 0)', ease: 'power2.inOut' },
              0
            );
            scrollTl.to(imgDetailRef.current, { x: -20, ease: 'none' }, 0);
          }

          // Title reveals at ~60% visibility
          ScrollTrigger.create({
            trigger: section,
            start: 'top 30%',
            onEnter: () => {
              const lines = stage.querySelectorAll('.split-line');
              gsap.fromTo(
                lines,
                { yPercent: 100, opacity: 0 },
                { yPercent: 0, opacity: 1, duration: 1, stagger: 0.08, ease: 'power3.out' }
              );
              const items = stage.querySelectorAll('.menu-reveal-item');
              gsap.fromTo(
                items,
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, delay: 0.3 }
              );
            },
          });
        });
      }

      // ==========================================
      // CHAPTER 06: THE SLOW HOUR (04:38 PM)
      // ==========================================
      else if (chapter.id === 'slow-hour') {
        mm.add('(min-width: 768px)', () => {
          // Extremely subtle scale
          const scrollTl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: 'bottom top',
              scrub: 1.4,
            },
          });

          if (imgMainRef.current) {
            scrollTl.fromTo(
              imgMainRef.current,
              { scale: 1 },
              { scale: 1.025, ease: 'none' },
              0
            );
          }

          // Slow line reveal with clip-path
          ScrollTrigger.create({
            trigger: section,
            start: 'top 45%',
            onEnter: () => {
              const lines = stage.querySelectorAll('.slow-line');
              gsap.fromTo(
                lines,
                { opacity: 0, clipPath: 'inset(0 0 100% 0)' },
                {
                  opacity: 1,
                  clipPath: 'inset(0 0 0% 0)',
                  duration: 1.4,
                  stagger: 0.14,
                  ease: 'power3.out',
                }
              );

              const words = stage.querySelectorAll('.about-word');
              if (words.length > 0) {
                gsap.fromTo(
                  words,
                  { opacity: 0, y: 15 },
                  { opacity: 1, y: 0, duration: 0.7, stagger: 0.04, delay: 0.8, ease: 'power2.out' }
                );
              }
            },
          });
        });
      }

      // ==========================================
      // CHAPTER 07: EVENING (07:12 PM)
      // ==========================================
      else if (chapter.id === 'evening') {
        mm.add('(min-width: 768px)', () => {
          const scrollTl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: 'bottom top',
              scrub: 1,
            },
          });

          // 2.5D layered illusion
          const bgLayer = stage.querySelector('.layer-bg');
          const midLayer = stage.querySelector('.layer-mid');
          const fgLayer = stage.querySelector('.layer-fg');

          if (bgLayer) scrollTl.to(bgLayer, { y: -15, ease: 'none' }, 0);
          if (midLayer) scrollTl.to(midLayer, { y: -35, ease: 'none' }, 0);
          if (fgLayer) scrollTl.to(fgLayer, { y: -60, ease: 'none' }, 0);

          ScrollTrigger.create({
            trigger: section,
            start: 'top 45%',
            onEnter: () => {
              const eveningTitle = stage.querySelector('.evening-title');
              const eveningTime = stage.querySelector('.evening-time');
              const eveningUnderline = stage.querySelector('.evening-underline');

              if (eveningTitle) {
                gsap.fromTo(
                  eveningTitle,
                  { x: -50, opacity: 0 },
                  { x: 0, opacity: 1, duration: 1.1, ease: 'power3.out' }
                );
              }
              if (eveningTime) {
                gsap.fromTo(
                  eveningTime,
                  { x: 50, opacity: 0 },
                  { x: 0, opacity: 1, duration: 1.1, ease: 'power3.out' }
                );
              }
              if (eveningUnderline) {
                gsap.fromTo(
                  eveningUnderline,
                  { scaleX: 0 },
                  { scaleX: 1, duration: 1.2, delay: 0.4, ease: 'power2.out' }
                );
              }
            },
          });
        });
      }

      // ==========================================
      // CHAPTER 08: AFTER THE LAST TABLE (09:47 PM)
      // ==========================================
      else if (chapter.id === 'closing') {
        mm.add('(min-width: 768px)', () => {
          const scrollTl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: 'bottom top',
              scrub: 1.4,
            },
          });

          // Symmetrical slow zoom OUT
          if (imgMainRef.current) {
            scrollTl.fromTo(
              imgMainRef.current,
              { scale: 1.06 },
              { scale: 1, ease: 'power2.out' },
              0
            );
          }

          ScrollTrigger.create({
            trigger: section,
            start: 'top 45%',
            onEnter: () => {
              const lines = stage.querySelectorAll('.split-line');
              gsap.fromTo(
                lines,
                { yPercent: 110, opacity: 0 },
                { yPercent: 0, opacity: 1, duration: 1.3, stagger: 0.1, ease: 'power3.out' }
              );
            },
          });
        });
      }

      return () => {
        mm.revert();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id={chapter.id}
      className={`chapter relative w-full ${
        chapter.id === 'dawn' || chapter.id === 'closing' ? 'h-[160vh]' : 'h-[180vh] md:h-[210vh]'
      } ${chapter.theme === 'dark' ? 'bg-[#18130F] text-[#FAF8F3]' : 'bg-[#F2EEE6] text-[#211B16]'}`}
    >
      {/* Sticky Stage Container */}
      <div
        ref={stageRef}
        className="chapter__stage sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-between"
      >
        {/* ================= CHAPTER SPECIFIC COMPOSITIONS ================= */}

        {/* 1. HERO / DAWN */}
        {chapter.id === 'dawn' && (
          <div className="relative w-full h-full flex flex-col justify-between p-8 sm:p-12 md:p-16">
            {/* Background Full Viewport Image */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img
                ref={imgMainRef}
                src={photo.src}
                alt={photo.alt}
                loading="eager"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transform-gpu will-change-transform"
              />
              {/* Subtle cream vignette for editorial legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#211B16]/60 via-[#211B16]/20 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-[#FAF8F3]/10 pointer-events-none" />
            </div>

            {/* Top metadata spacer */}
            <div className="relative z-10 pt-16 sm:pt-20">
              <div className="chapter-meta text-[11px] font-mono tracking-[0.25em] uppercase text-[#FAF8F3]/80">
                {chapter.meta}
              </div>
            </div>

            {/* Large Hero Title */}
            <div ref={contentRef} className="relative z-10 max-w-4xl pb-12 sm:pb-16 text-[#FAF8F3]">
              <MaskedLines
                lines={chapter.titleLines}
                as="h1"
                className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-normal leading-[0.92] tracking-tight uppercase"
              />
              <p className="font-sans text-xs sm:text-sm tracking-[0.14em] uppercase text-[#FAF8F3]/80 mt-6 max-w-md font-light">
                {chapter.subtitle}
              </p>
            </div>
          </div>
        )}

        {/* 2. FIRST TABLE */}
        {chapter.id === 'first-table' && (
          <div className="relative w-full h-full flex flex-col justify-center p-8 sm:p-16 lg:p-24">
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img
                ref={imgMainRef}
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transform-gpu will-change-transform"
              />
              <div className="absolute inset-0 bg-[#F2EEE6]/30 pointer-events-none" />
            </div>

            <div className="relative z-10 max-w-2xl bg-[#FAF8F3]/90 backdrop-blur-sm p-8 sm:p-12 shadow-sm border border-[#211B16]/5">
              <span className="text-[10px] font-mono tracking-[0.22em] uppercase text-[#8C857B] block mb-3">
                {chapter.meta}
              </span>
              <MaskedLines
                lines={chapter.titleLines}
                as="h2"
                className="font-serif text-4xl sm:text-6xl font-normal tracking-tight uppercase"
              />
              <p className="font-sans text-xs sm:text-sm text-[#5A4638] mt-4 leading-relaxed max-w-lg">
                {chapter.narrative}
              </p>
            </div>
          </div>
        )}

        {/* 3. BREAKFAST */}
        {chapter.id === 'breakfast' && (
          <div className="relative w-full h-full flex flex-col md:flex-row items-center justify-between p-6 sm:p-12 md:p-16 gap-8">
            {/* Left Typography & Menu */}
            <div className="relative z-10 w-full md:w-5/12 flex flex-col justify-center">
              <span className="text-[10px] font-mono tracking-[0.22em] uppercase text-[#6D7560] block mb-2">
                {chapter.meta}
              </span>
              <MaskedWords
                text="BREAKFAST"
                as="h2"
                className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight uppercase"
              />
              <div
                ref={lineRef}
                className="w-24 h-[1px] bg-[#211B16]/30 origin-left my-6 transform-gpu will-change-transform"
              />
              <p className="text-xs sm:text-sm text-[#8C857B] font-sans mb-8 leading-relaxed max-w-md">
                {chapter.narrative}
              </p>

              {/* Editorial Menu Items */}
              <div className="space-y-4">
                {chapter.menuItems?.map((item, i) => (
                  <div key={i} className="menu-reveal-item border-b border-[#211B16]/10 pb-3">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-serif text-base tracking-wide">{item.name}</h4>
                      <span className="text-xs font-mono text-[#8C857B] tabular-nums">
                        {item.price}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#8C857B] font-sans mt-0.5">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Large Negative Space Photograph */}
            <div className="relative z-0 w-full md:w-7/12 h-[50vh] md:h-[80vh] overflow-hidden">
              <img
                ref={imgMainRef}
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center shadow-lg transform-gpu will-change-transform"
              />
            </div>
          </div>
        )}

        {/* 4. WORK / STUDY */}
        {chapter.id === 'work-study' && (
          <div className="relative w-full h-full flex flex-col justify-center items-center p-8 sm:p-16">
            {/* Background Layer */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img
                ref={imgMainRef}
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center opacity-75 filter grayscale-[20%] transform-gpu will-change-transform"
              />
              <div className="absolute inset-0 bg-[#F2EEE6]/60 pointer-events-none" />
            </div>

            {/* Foreground Detail Layer */}
            {photo.detailSrc && (
              <div className="hidden lg:block absolute right-16 bottom-16 z-10 w-72 h-80 overflow-hidden shadow-2xl border border-[#211B16]/10">
                <img
                  ref={imgDetailRef}
                  src={photo.detailSrc}
                  alt={photo.detailAlt || 'Coffee and desk detail'}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transform-gpu will-change-transform"
                />
              </div>
            )}

            {/* Quiet 3 statements text */}
            <div className="relative z-20 text-center max-w-2xl px-6 py-12">
              <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#8C857B] block mb-6">
                {chapter.meta}
              </span>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 font-serif text-5xl sm:text-7xl lg:text-8xl font-normal tracking-tight">
                <span className="work-word inline-block">WORK.</span>
                <span className="work-word inline-block">STUDY.</span>
                <span className="work-word inline-block">MEET.</span>
              </div>
              <p className="work-subtitle text-xs sm:text-sm font-sans tracking-[0.16em] uppercase text-[#5A4638] mt-8 font-light">
                {chapter.subtitle}
              </p>
              <p className="text-xs text-[#8C857B] font-sans mt-3 max-w-md mx-auto leading-relaxed">
                {chapter.narrative}
              </p>
            </div>
          </div>
        )}

        {/* 5. LUNCH */}
        {chapter.id === 'lunch' && (
          <div className="relative w-full h-full flex flex-col md:flex-row items-center justify-between p-6 sm:p-12 md:p-16 gap-10">
            {/* Left Photo & Reveal Layer */}
            <div className="relative w-full md:w-6/12 h-[45vh] md:h-[75vh] overflow-hidden">
              <img
                ref={imgMainRef}
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              {photo.detailSrc && (
                <div
                  ref={imgDetailRef}
                  className="absolute top-10 left-10 w-4/5 h-4/5 overflow-hidden shadow-2xl z-10 border border-[#FAF8F3]/40"
                  style={{ clipPath: 'inset(0 0 100% 0)' }}
                >
                  <img
                    src={photo.detailSrc}
                    alt={photo.detailAlt || 'Tactile lunch plate detail'}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            {/* Right Editorial Info */}
            <div className="w-full md:w-5/12 z-20">
              <span className="text-[10px] font-mono tracking-[0.22em] uppercase text-[#6D7560] block mb-2">
                {chapter.meta}
              </span>
              <MaskedLines
                lines={chapter.titleLines}
                as="h2"
                className="font-serif text-5xl sm:text-7xl font-normal tracking-tight uppercase"
              />
              <p className="text-xs sm:text-sm text-[#8C857B] font-sans my-6 leading-relaxed">
                {chapter.narrative}
              </p>

              <div className="space-y-4">
                {chapter.menuItems?.map((item, i) => (
                  <div key={i} className="menu-reveal-item border-b border-[#211B16]/10 pb-3">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-serif text-base tracking-wide">{item.name}</h4>
                      <span className="text-xs font-mono text-[#8C857B] tabular-nums">
                        {item.price}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#8C857B] font-sans mt-0.5">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 6. THE SLOW HOUR (Emotional Center & About) */}
        {chapter.id === 'slow-hour' && (
          <div className="relative w-full h-full flex flex-col justify-center p-8 sm:p-16 lg:p-24">
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img
                ref={imgMainRef}
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transform-gpu will-change-transform"
              />
              <div className="absolute inset-0 bg-[#FAF8F3]/50 pointer-events-none" />
            </div>

            <div className="relative z-10 max-w-3xl">
              <div className="space-y-1">
                {chapter.titleLines.map((line, i) => (
                  <h2
                    key={i}
                    className="slow-line font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-[#211B16] leading-[1.02]"
                  >
                    {line}
                  </h2>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t border-[#211B16]/20 max-w-xl">
                <span className="text-[10px] font-sans tracking-[0.24em] uppercase text-[#6D7560] font-semibold block mb-3">
                  {chapter.subtitle}
                </span>
                <p className="font-serif text-xl sm:text-2xl text-[#211B16] leading-relaxed font-light">
                  {chapter.narrative?.split(' ').map((word, wIdx) => (
                    <span key={wIdx} className="about-word inline-block mr-1.5">
                      {word}
                    </span>
                  ))}
                </p>
                <div className="mt-6 text-[11px] font-mono tracking-widest text-[#8C857B] uppercase">
                  Single Estate Coffee · Natural Wines · Architecture & Stillness
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 7. EVENING */}
        {chapter.id === 'evening' && (
          <div className="relative w-full h-full flex flex-col justify-between p-8 sm:p-14 lg:p-20 text-[#FAF8F3]">
            {/* 3-layer parallax simulation */}
            <div className="absolute inset-0 z-0 overflow-hidden layer-bg">
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#18130F] via-[#18130F]/40 to-transparent" />
            </div>

            <div className="relative z-10 flex justify-between items-baseline pt-16">
              <h2 className="evening-title font-serif text-5xl sm:text-7xl lg:text-9xl font-normal tracking-tight uppercase">
                EVENING.
              </h2>
              <span className="evening-time text-xs sm:text-sm font-mono tracking-[0.2em] text-[#FAF8F3]/60">
                07:12 PM
              </span>
            </div>

            <div className="relative z-10 max-w-xl pb-10">
              <div className="text-xs font-sans tracking-[0.2em] uppercase text-[#FAF8F3]/70 mb-2">
                Drinks & Desserts
              </div>
              <div className="evening-underline w-full h-[1px] bg-[#FAF8F3]/30 origin-left mb-6" />
              <p className="text-xs sm:text-sm font-sans text-[#FAF8F3]/80 leading-relaxed">
                {chapter.narrative}
              </p>

              <div className="mt-8 space-y-4">
                {chapter.menuItems?.map((item, i) => (
                  <div key={i} className="border-b border-[#FAF8F3]/15 pb-3">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-serif text-lg text-[#FAF8F3]">{item.name}</h4>
                      <span className="text-xs font-mono text-[#FAF8F3]/70 tabular-nums">
                        {item.price}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#FAF8F3]/60 font-sans mt-0.5">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 8. AFTER THE LAST TABLE */}
        {chapter.id === 'closing' && (
          <div className="relative w-full h-full flex flex-col justify-center p-8 sm:p-16 lg:p-24 text-[#FAF8F3]">
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img
                ref={imgMainRef}
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter brightness-[0.55] contrast-[1.1] transform-gpu will-change-transform"
              />
              <div className="absolute inset-0 bg-[#18130F]/40" />
            </div>

            <div className="relative z-10 max-w-3xl">
              <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#FAF8F3]/50 block mb-4">
                {chapter.meta}
              </span>
              <MaskedLines
                lines={chapter.titleLines}
                as="h2"
                className="font-serif text-5xl sm:text-7xl lg:text-8xl font-normal leading-[0.95] tracking-tight uppercase"
              />
              <p className="font-sans text-xs sm:text-sm text-[#FAF8F3]/70 mt-6 max-w-md leading-relaxed">
                {chapter.narrative}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
