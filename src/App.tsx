import React, { useEffect, useRef, useState, useCallback } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CHAPTERS } from './data/story';
import { ChapterSection } from './components/ChapterSection';
import { FinalSection } from './components/FinalSection';
import { SiteNav } from './components/SiteNav';
import { TimeIndicator } from './components/TimeIndicator';

gsap.registerPlugin(ScrollTrigger);

export function App() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis + GSAP Ticker Synchronization
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // Normal native scrolling when reduced motion is preferred
      const handleNativeScroll = () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight > 0) {
          setProgress(window.scrollY / totalHeight);
        }
      };
      window.addEventListener('scroll', handleNativeScroll, { passive: true });
      return () => {
        window.removeEventListener('scroll', handleNativeScroll);
      };
    }

    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    // Sync Lenis scroll with ScrollTrigger
    lenis.on('scroll', (e) => {
      ScrollTrigger.update();
      if (e.progress !== undefined) {
        setProgress(e.progress);
      }
    });

    // Add Lenis to GSAP Ticker for single unified animation loop
    const tickerUpdate = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerUpdate);
    gsap.ticker.lagSmoothing(0);

    // Initial ScrollTrigger refresh after images & layout stabilize
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      clearTimeout(refreshTimer);
      gsap.ticker.remove(tickerUpdate);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Smooth scroll to chapter or section
  const handleNavigate = useCallback((targetId: string) => {
    const el = document.getElementById(targetId);
    if (!el) return;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: 0, duration: 1.4 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleSelectChapter = useCallback(
    (index: number) => {
      const chapter = CHAPTERS[index];
      if (chapter) {
        handleNavigate(chapter.id);
      }
    },
    [handleNavigate]
  );

  return (
    <div className="relative min-h-screen w-full bg-[#F2EEE6] selection:bg-[#211B16] selection:text-[#FAF8F3]">
      {/* Global Minimal Navigation */}
      <SiteNav currentTheme={currentTheme} onNavigate={handleNavigate} />

      {/* Global Time & Chapter Indicator */}
      <TimeIndicator
        activeIndex={activeIndex}
        progress={progress}
        currentTheme={currentTheme}
        onSelectChapter={handleSelectChapter}
      />

      {/* Story Chapters Pinned Stages */}
      <main className="relative w-full">
        {CHAPTERS.map((chapter) => (
          <ChapterSection
            key={chapter.id}
            chapter={chapter}
            onActive={setActiveIndex}
            onThemeChange={setCurrentTheme}
          />
        ))}

        {/* Final Transition & Contact / Visit */}
        <FinalSection onThemeChange={setCurrentTheme} />
      </main>
    </div>
  );
}

export default App;
