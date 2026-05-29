'use client';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

// Priority 2: Safe Dust Particles (Hydration-Error Free)
const DustParticles = () => {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; duration: number }[]>([]);

  useEffect(() => {
    // Generates random particles ONLY on the client to prevent SSR mismatch
    const generatedParticles = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage based
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      duration: Math.random() * 15 + 15, // Very slow: 15-30 seconds
    }));
    setParticles(generatedParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, x: `${p.x}vw`, y: `${p.y}vh` }}
          animate={{ 
            opacity: [0, 0.4, 0], 
            y: [`${p.y}vh`, `${p.y - 10}vh`] 
          }}
          transition={{ 
            duration: p.duration, 
            repeat: Infinity, 
            ease: "linear",
            delay: Math.random() * 5 // Staggered starts
          }}
          className="absolute rounded-full bg-[#E8C98F] blur-[1px]"
          style={{ width: p.size, height: p.size }}
        />
      ))}
    </div>
  );
};

export const BookCover = ({ onOpen }: { onOpen: () => void }) => {
  // Priority 4: Cinematic Camera Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 20; // Subtle movement limits
    const y = (clientY / window.innerHeight - 0.5) * 20;
    mouseX.set(x);
    mouseY.set(y);
  };

  // Parallax depths (Foreground moves slightly, Background moves more)
  const backgroundX = useTransform(mouseX, (v) => v * -2);
  const backgroundY = useTransform(mouseY, (v) => v * -2);
  const textX = useTransform(mouseX, (v) => v * 0.5);
  const textY = useTransform(mouseY, (v) => v * 0.5);

  return (
    <motion.div 
      className="h-screen w-full relative bg-[#020817] flex flex-col items-center justify-center cursor-pointer overflow-hidden" 
      onClick={onOpen}
      onMouseMove={handleMouseMove}
    >
      {/* Priority 3: Slow Haze / Fog */}
      <motion.div 
        style={{ x: backgroundX, y: backgroundY }}
        className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none"
      >
        <div className="absolute top-0 left-[-10%] w-[120%] h-[50%] bg-gradient-to-b from-[#18284A]/30 to-transparent blur-[100px]" />
        <div className="absolute bottom-0 left-[-10%] w-[120%] h-[50%] bg-gradient-to-t from-[#0D1730]/40 to-transparent blur-[100px]" />
      </motion.div>

      {/* Priority 1: Huge Fading Moon Glow */}
      <motion.div 
        style={{ x: backgroundX, y: backgroundY }}
        animate={{ opacity: [0.08, 0.15, 0.08], scale: [0.98, 1.02, 0.98] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[900px] h-[900px] bg-gradient-to-tr from-[#D6B370] to-[#E8C98F] rounded-full blur-[140px] pointer-events-none"
      />

      <DustParticles />

      {/* Text Content with Parallax */}
      <motion.div 
        style={{ x: textX, y: textY }}
        className="text-center z-10 space-y-12 pointer-events-none"
      >
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="text-[#D6B370]/60 font-serif italic tracking-[0.5em] uppercase text-sm"
        >
          In the quiet of time
        </motion.p>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="text-6xl md:text-8xl font-serif text-[#F4E9D8] tracking-[0.1em] drop-shadow-[0_0_25px_rgba(214,179,112,0.15)] leading-tight"
        >
          Between The<br />Little Moments
        </motion.h1>

        <motion.p 
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="text-[#D6B370] tracking-[0.4em] uppercase text-xs"
        >
          Turn the first page
        </motion.p>
      </motion.div>
    </motion.div>
  );
};