'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { timeline } from '@/data/timeline';
import { BookCover } from '@/components/ui/book-cover'; 
import { InteractiveMemory } from '@/components/ui/interactive-memory';
import { TransitionalVoid } from '@/components/ui/transitional-void';

const getTransitionForChapter = (index: number) => {
  switch (index) {
    case 0: return { text: "hello...", temp: "warm" as const };
    case 1: return { text: "good morning", temp: "warm" as const };
    case 2: return { text: "don't forget this day", temp: "warm" as const };
    case 3: return { text: "seen 11:48 PM", temp: "cold" as const }; 
    case 4: return { text: "typing...", temp: "deep" as const }; 
    case 5: return { text: "are you okay?", temp: "warm" as const }; 
    case 6: return { text: "stay.", temp: "warm" as const }; 
    case 7: return { text: "remember?", temp: "climax" as const }; 
    case 8: return { text: "thank you.", temp: "epilogue" as const }; 
    default: return null; 
  }
};

export default function Home() {
  const [viewState, setViewState] = useState<'cover' | 'timeline' | 'letter'>('cover');

  useEffect(() => {
    if (viewState === 'letter') {
      setTimeout(() => window.scrollTo(0, 0), 1000);
    } else {
      window.scrollTo(0, 0);
    }
  }, [viewState]);

  return (
    <AnimatePresence mode="wait">
      
      {/* ==========================================
          PHASE 1: THE COVER
      ========================================== */}
      {viewState === 'cover' && (
        <motion.main 
          key="cover"
          exit={{ opacity: 0, transition: { duration: 1.5 } }}
          className="bg-[#020611] min-h-screen"
        >
          <div 
            onClick={() => setViewState('timeline')} 
            className="cursor-pointer hover:opacity-90 transition-opacity duration-700 min-h-screen flex items-center justify-center"
            title="Click to open the archive"
          >
            ```tsx
<BookCover onOpen={() => setViewState('timeline')} />
          </div>
        </motion.main>
      )}

      {/* ==========================================
          PHASE 2: THE TIMELINE ARCHIVE
      ========================================== */}
      {viewState === 'timeline' && (
        <motion.main 
          key="timeline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 2 } }}
          exit={{ opacity: 0, transition: { duration: 1.5 } }} 
          className="bg-[#020611] min-h-screen"
        >
          {timeline.map((chapter, index) => {
            const voidData = getTransitionForChapter(index);
            const archiveNumber = String(index + 1).padStart(2, '0');

            return (
              <div key={chapter.id} className="flex flex-col items-center w-full px-4 md:px-0">
                
                {/* 1. THE QUOTE (Always on top) */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 1 }}
                  className="w-full flex justify-center mt-24 mb-8 z-20 relative px-6"
                >
                  <p className="text-xl md:text-2xl lg:text-3xl font-serif italic text-center max-w-2xl drop-shadow-sm" style={{ color: '#d6b370' }}>
                    {chapter.content[0].text}
                  </p>
                </motion.div>

                {/* 2. THE CARD & 3. THE TITLE (InteractiveMemory component handles the title at its bottom) */}
                <InteractiveMemory 
                 src={chapter.content[0].imageUrl || ""}
                  title={chapter.title}
                  alt={chapter.title}
                  hiddenText={chapter.content[0].secretNote} 
                  memoryId={`Archive ${archiveNumber}`} 
                />

                {/* 4. THE VOID (Always at the bottom) */}
                {voidData && (
                  <div className="w-full mt-16 md:mt-24">
                    <TransitionalVoid echoText={voidData.text} temperature={voidData.temp} />
                  </div>
                )}
              </div>
            );
          })}

          <div className="w-full flex flex-col items-center justify-end relative bg-black" style={{ height: '200vh', paddingBottom: '12vh' }}>
            <div className="absolute top-0 left-0 right-0 h-[50vh] bg-gradient-to-b from-[#020611] to-black pointer-events-none" />

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ duration: 3, delay: 0.5 }} 
              className="flex flex-col items-center relative z-20 w-full"
            >
              <span className="text-[#5e4e3e] font-mono text-[10px] tracking-[0.4em] uppercase opacity-40 mb-6 select-none">
                Archive Complete
              </span>

              <div className="flex flex-col items-center gap-2 mb-12">
                <span className="text-[#8a765c] font-serif italic text-xs md:text-sm tracking-wide opacity-30 select-none">8 fragments restored.</span>
                <span className="text-[#8a765c] font-serif italic text-xs md:text-sm tracking-wide opacity-30 select-none">8 memories preserved.</span>
                <span className="text-[#8a765c] font-serif italic text-xs md:text-sm tracking-wide opacity-30 select-none">1 story remembered.</span>
              </div>

              <div 
                onClick={() => setViewState('letter')}
                className="group mt-4 p-4 cursor-pointer"
              >
                <span className="text-[#a69279] font-serif italic text-sm md:text-base tracking-widest opacity-60 group-hover:opacity-100 group-hover:text-[#d6b370] transition-all duration-700 select-none drop-shadow-[0_0_8px_rgba(166,146,121,0.15)] underline underline-offset-8 decoration-[#a69279]/30 group-hover:decoration-[#d6b370]/60">
                  A final page remains.
                </span>
              </div>
            </motion.div>
          </div>
        </motion.main>
      )}

      {/* ==========================================
          PHASE 3: THE FINAL REWARD (THE LETTER)
      ========================================== */}
      {viewState === 'letter' && (
        <motion.main 
          key="letter"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 1.5 } }} 
          className="bg-[#020611] min-h-screen flex items-center justify-center p-4 md:p-6 py-16 overflow-hidden relative"
        >
          {/* THE FINAL IMPERFECTION: A SINGLE FALLING PETAL */}
          <motion.div
            initial={{ top: '-10%', left: '45%', opacity: 0, rotate: 0 }}
            animate={{ top: '110%', left: '55%', opacity: [0, 0.8, 0], rotate: 180 }}
            transition={{ duration: 15, delay: 2, ease: "linear" }}
            className="absolute z-0 pointer-events-none"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#5e4e3e" opacity="0.3">
              <path d="M12 2C8 2 4 6 4 10c0 4 8 12 8 12s8-8 8-12c0-4-4-8-8-8z"/>
            </svg>
          </motion.div>

          <motion.div
            initial={{ y: 40, opacity: 0, rotateZ: -1 }}
            animate={{ y: 0, opacity: 1, rotateZ: 0 }}
            transition={{ duration: 2.5, delay: 1.5, ease: "easeOut" }}
            // STRUCTURE FIX: Constrained width to max-w-lg to force a portrait/letter shape
            className="max-w-lg w-full p-8 md:p-14 rounded-sm shadow-2xl relative min-h-[75vh] md:min-h-[85vh] flex flex-col justify-center"
            style={{
              backgroundColor: '#e8e2d5',
              boxShadow: '0 30px 100px rgba(0,0,0,0.8), inset 0 0 80px rgba(0,0,0,0.06)',
              backgroundImage: "url('https://www.transparenttextures.com/patterns/cream-paper.png')"
            }}
          >
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none rounded-sm" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 40%)' }} />

            {/* THE ARCHIVE STAMP */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 md:w-72 md:h-72 border-[2px] border-[#3e2e21] rounded-full opacity-[0.03] flex items-center justify-center rotate-[-15deg] pointer-events-none">
              <div className="absolute w-[92%] h-[92%] border-[1px] border-[#3e2e21] rounded-full" />
              <span className="font-mono text-[8px] md:text-[10px] tracking-[0.3em] text-[#3e2e21] uppercase text-center leading-loose">
                Archive 01 <br/> Preserved
              </span>
            </div>

            <div className="flex flex-col gap-8 md:gap-12 text-center relative z-10 px-2 md:px-4" style={{ color: '#3e2e21', fontFamily: 'var(--font-caveat), "Comic Sans MS", cursive, Georgia, serif' }}>
              
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 2, delay: 3 }}>
                <p className="text-2xl md:text-4xl leading-tight text-[#2a1f16] drop-shadow-sm px-4">
                  To the one who turned ordinary days into my favorite memories.
                </p>
                <p className="text-xs md:text-sm tracking-[0.3em] uppercase font-serif opacity-40 mt-6 md:mt-8">
                  Happy Anniversary.
                </p>
              </motion.div>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, delay: 5.5 }} className="text-lg md:text-2xl leading-relaxed opacity-90">
                Thank you for every ordinary moment that became extraordinary because it was shared with you.
              </motion.p>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, delay: 7.5 }} className="text-lg md:text-2xl leading-relaxed opacity-90">
                Here's to every page we've already written, and every page still waiting to be turned.
              </motion.p>

              {/* HANDWRITTEN SIGNATURE */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, delay: 9.5 }} className="mt-4 md:mt-6 text-right w-full pr-4 md:pr-8">
                <span className="text-xl md:text-3xl text-[#2a1f16] opacity-80" style={{ fontFamily: 'var(--font-caveat), cursive' }}>
                  — Yours, always.
                </span>
              </motion.div>

              {/* THE ULTIMATE SIGN-OFF */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 3, delay: 11.5 }} className="mt-8 flex flex-col items-center gap-4">
                <span className="text-[#3e2e21] text-xs opacity-30">♥</span>
                <span className="font-mono text-[8px] md:text-[9px] tracking-[0.4em] uppercase text-[#3e2e21] opacity-40 select-none">
                  Year One: Archived.
                </span>
              </motion.div>

            </div>
          </motion.div>
        </motion.main>
      )}

    </AnimatePresence>
  );
}