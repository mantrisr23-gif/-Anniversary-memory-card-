'use client';
import React, { useEffect, useState } from 'react';
import { Chapter } from '@/schemas/story';
import { motion } from 'framer-motion';
import { InteractiveMemory } from '../ui/interactive-memory';

interface Props {
  chapter: Chapter;
}

// A safe, simple particle effect that replaces the broken constellation
const EpilogueParticles = () => {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; duration: number }[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 20 + 20,
    }));
    setParticles(generated);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-40">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, x: `${p.x}vw`, y: `${p.y}vh` }}
          animate={{ opacity: [0, 0.3, 0], y: [`${p.y}vh`, `${p.y - 5}vh`] }}
          transition={{ duration: p.duration, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[2px] h-[2px] rounded-full bg-[#E8C98F] blur-[1px]"
        />
      ))}
    </div>
  );
};

export const ChapterRenderer = ({ chapter }: Props) => {
  const bgImage = chapter.content.find(item => item.imageUrl)?.imageUrl;

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#020817] py-40 border-none outline-none overflow-hidden">
      
      {/* --- THE CINEMATIC ATMOSPHERE --- */}
      {bgImage && (
        <div 
          className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImage})`, filter: 'blur(100px)' }}
        />
      )}

      <div 
        className="absolute inset-0 z-0 pointer-events-none" 
        style={{ background: 'linear-gradient(to bottom, rgba(2,8,23,0.95) 0%, rgba(2,8,23,0.5) 50%, rgba(2,8,23,0.95) 100%)' }} 
      />

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] max-w-full h-[600px] bg-[#D6B370]/10 blur-[120px] rounded-full pointer-events-none z-0" />

      <EpilogueParticles />

      {/* --- THE CONTENT --- */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center pointer-events-none">
        
        {/* Title Container */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 2 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-32 space-y-6 pointer-events-auto"
        >
          <h1 className="font-serif text-5xl md:text-7xl text-[#F4E9D8] tracking-[0.05em] drop-shadow-[0_0_30px_rgba(244,233,216,0.15)]">
            {chapter.title}
          </h1>
          <p className="font-serif italic text-[#D6B370] tracking-[0.3em] uppercase text-sm opacity-80">
            {chapter.mood}
          </p>
        </motion.div>

        <div className="w-full space-y-40">
          {chapter.content.map((item) => (
            <div key={item.id} className="flex flex-col items-center w-full pointer-events-auto">
              
              {/* Floating Quote */}
              {item.text && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.82 }}
                  transition={{ duration: 2.5 }}
                  viewport={{ once: true }}
                  className="font-serif text-center max-w-3xl mx-auto text-[#E8C98F] mb-16 drop-shadow-lg"
                  style={{ fontStyle: 'italic', letterSpacing: '0.03em', fontSize: '1.4rem', lineHeight: '2' }}
                >
                  {item.text}
                </motion.p>
              )}

              {/* Image & Flip Card Logic */}
              {item.imageUrl && (
                // @ts-ignore
                item.secretNote ? (
                  <InteractiveMemory 
                    src={item.imageUrl} 
                    alt="Memory" 
                    // @ts-ignore
                    hiddenText={item.secretNote} 
                  />
                ) : (
                  <img src={item.imageUrl} className="w-full max-w-4xl h-auto rounded-sm shadow-[0_30px_60px_rgba(0,0,0,0.6)]" />
                )
              )}

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};