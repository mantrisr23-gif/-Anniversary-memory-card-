'use client';
import { motion, useScroll, useTransform, useSpring, useMotionTemplate, useMotionValue } from 'framer-motion';
import { useRef, useEffect } from 'react';

type VoidTemperature = 'warm' | 'cold' | 'deep' | 'climax' | 'epilogue';

interface TransitionalVoidProps {
  echoText: string;
  temperature?: VoidTemperature;
}

// THE BACKGROUND DUST
const VOID_DUST = Array.from({ length: 12 }).map((_, i) => ({
  id: i, left: `${10 + (i * 7)}%`, top: '110%', size: (i % 2) + 1,
  duration: 25 + (i % 15), delay: i * 2, yDrift: -150 - (i * 20),
}));

// HIDDEN FRAGMENTS (Scattered randomly, only visible on hover)
const HIDDEN_FRAGMENTS = [
  { id: 1, text: "11:43 PM", top: "20%", left: "30%", rotate: "-12deg" },
  { id: 2, text: "Seen", top: "70%", left: "65%", rotate: "8deg" },
  { id: 3, text: "typing...", top: "40%", left: "75%", rotate: "-5deg" },
  { id: 4, text: "Call ended", top: "80%", left: "25%", rotate: "15deg" },
  { id: 5, text: "2 photos", top: "15%", left: "60%", rotate: "-8deg" }
];

export const TransitionalVoid = ({ echoText, temperature = 'warm' }: TransitionalVoidProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // CURSOR TRACKING FOR THE DISCOVERY FLASHLIGHT
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const rect = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - rect.left);
    mouseY.set(clientY - rect.top);
  }

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const opacity = useTransform(smoothProgress, [0.3, 0.5, 0.7], [0, 0.25, 0]);
  const yPosition = useTransform(smoothProgress, [0.3, 0.7], [15, -15]);
  const blur = useTransform(smoothProgress, [0.3, 0.5, 0.7], [8, 0, 8]);

  const getEnvironment = (temp: VoidTemperature) => {
    switch (temp) {
      case 'cold': return { bg: 'radial-gradient(circle at center, #071020 0%, #020611 100%)', color: '#6e8299', haze: 'rgba(110, 130, 153, 0.04)' };
      case 'deep': return { bg: 'radial-gradient(circle at center, #050403 0%, #000000 100%)', color: '#3e342c', haze: 'transparent' };
      case 'climax': return { bg: 'radial-gradient(circle at center, #0a0a0f 0%, #020611 100%)', color: '#a69279', haze: 'rgba(166, 146, 121, 0.08)' };
      case 'epilogue': return { bg: 'radial-gradient(circle at center, #070605 0%, #030202 100%)', color: '#5e4e3e', haze: 'transparent' };
      case 'warm': default: return { bg: 'radial-gradient(circle at center, #1a1614 0%, #070605 100%)', color: '#8a765c', haze: 'rgba(166, 146, 121, 0.05)' };
    }
  };

  const env = getEnvironment(temperature);

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-[100vh] flex items-center justify-center overflow-hidden group cursor-crosshair"
      style={{ background: env.bg }}
    >
      {/* 1. BASE DUST LAYER */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {VOID_DUST.map((p) => (
          <motion.div key={p.id} className="absolute rounded-full bg-[#d6b370]" style={{ left: p.left, top: p.top, width: p.size, height: p.size }} animate={{ y: [0, p.yDrift], opacity: [0, 0.03, 0] }} transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }} />
        ))}
      </div>

      {/* 2. THE MAIN ECHO (Always slightly visible) */}
      <motion.div style={{ opacity: opacity, y: yPosition, filter: useMotionTemplate`blur(${blur}px)` }} className="relative z-10 flex items-center justify-center pointer-events-none">
        {env.haze !== 'transparent' && (
          <motion.div animate={{ x: [-15, 15, -15], y: [-5, 5, -5], scale: [1, 1.05, 1] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute w-[300px] h-[150px] rounded-full mix-blend-screen blur-[25px]" style={{ background: `radial-gradient(circle, ${env.haze} 0%, transparent 60%)` }} />
        )}
        <motion.h2 animate={{ opacity: [1, 0.85, 0.95, 0.8, 1] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="text-lg md:text-2xl font-light tracking-[0.25em] lowercase italic relative z-10" style={{ color: env.color, fontFamily: 'var(--font-caveat), cursive, serif' }}>
          {echoText}
        </motion.h2>
      </motion.div>

      {/* 3. CURSOR DISCOVERY LAYER (The hidden fragments) */}
      <motion.div 
        className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          // This creates the "flashlight" hole that reveals this specific div
          maskImage: useMotionTemplate`radial-gradient(120px circle at ${mouseX}px ${mouseY}px, black 0%, transparent 100%)`,
          WebkitMaskImage: useMotionTemplate`radial-gradient(120px circle at ${mouseX}px ${mouseY}px, black 0%, transparent 100%)`
        }}
      >
        {HIDDEN_FRAGMENTS.map((frag) => (
          <span 
            key={frag.id} 
            className="absolute text-[10px] font-mono tracking-widest uppercase opacity-40 mix-blend-overlay"
            style={{ 
              top: frag.top, left: frag.left, 
              transform: `rotate(${frag.rotate})`,
              color: '#d6b370'
            }}
          >
            {frag.text}
          </span>
        ))}
      </motion.div>
      
    </div>
  );
};