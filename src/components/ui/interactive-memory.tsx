'use client';
import { motion, useMotionValue, useMotionTemplate, useTransform } from 'framer-motion';
import { useState } from 'react';

interface Props {
  src: string;
  alt: string;
  title: string;
  hiddenText?: string;
  memoryId?: string;
}

const DUST_PARTICLES = Array.from({ length: 30 }).map((_, i) => ({
  id: i,
  left: `${(i * 17.3) % 100}%`,
  top: `${(i * 23.9) % 100}%`,
  size: (i % 3) + 1,
  duration: 15 + (i % 15),
  delay: i % 10,
  xDrift: (i % 2 === 0 ? 1 : -1) * (15 + (i % 15)),
  yDrift: -(30 + (i % 40))
}));

export const InteractiveMemory = ({ src, alt, title, hiddenText, memoryId = "ARCHIVE 01" }: Props) => {
  const [isRevealed, setIsRevealed] = useState(false);
  
  // TRACKING FOR MOONLIGHT & PARALLAX
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const normX = useMotionValue(0); 
  const normY = useMotionValue(0); 

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const rect = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - rect.left);
    mouseY.set(clientY - rect.top);
    
    normX.set(((clientX - rect.left) / rect.width - 0.5) * 2);
    normY.set(((clientY - rect.top) / rect.height - 0.5) * 2);
  }

  // INTERNAL PARALLAX HOOKS
  const textX = useTransform(normX, [-1, 1], [-4, 4]);
  const textY = useTransform(normY, [-1, 1], [-4, 4]);
  const textureX = useTransform(normX, [-1, 1], [2, -2]);

  return (
    // TIGHTER SPACING: Reduced py-12/24 to py-8/12 for cinematic connection
    <div className="relative flex flex-col items-center justify-center w-full py-8 md:py-12" style={{ perspective: '1400px' }}>

      {/* ATMOSPHERE GLOW */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="w-[80%] max-w-3xl h-[80%] blur-[120px] rounded-full mix-blend-screen" style={{ backgroundColor: 'rgba(214, 179, 112, 0.05)' }} />
      </div>

      <motion.div
        animate={{ 
          y: [0, -4, 0],
          rotateZ: [-0.5, -0.2, -0.5] 
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10"
      >
        <div 
          // PHYSICAL CURVATURE
          className="relative inline-flex flex-col items-center justify-center cursor-pointer group transition-shadow duration-700 rounded-sm"
          style={{ 
            transform: 'rotateX(0.7deg) rotateY(-0.5deg)',
            boxShadow: '0 20px 80px rgba(0,0,0,0.35)', 
            border: '1px solid rgba(255,255,255,0.04)' 
          }}
          onClick={() => hiddenText && setIsRevealed(!isRevealed)}
          onMouseMove={handleMouseMove} 
        >

          {/* THE ANCHOR */}
          <img 
            src={src} 
            alt={alt} 
            className="block w-auto h-auto min-w-[300px] max-w-[90vw] md:max-w-3xl max-h-[75vh] opacity-0 pointer-events-none select-none" 
          />

          {/* ==========================================
              STATE 1: THE FRONT
          ========================================== */}
          <div 
            className={`absolute inset-0 w-full h-full rounded-sm origin-center transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] z-30 ${
              isRevealed ? 'scale-x-0 opacity-0 pointer-events-none' : 'scale-x-100 opacity-100 pointer-events-auto'
            }`}
          >
            <img src={src} alt={alt} className="w-full h-full object-cover block rounded-sm opacity-95 grayscale-[10%]" />
            <div className="absolute inset-0 rounded-sm shadow-[inset_0_0_1px_1px_rgba(255,255,255,0.15)] pointer-events-none" />
            
            {hiddenText && (
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-sm" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
                <span className="tracking-[0.3em] px-6 py-2 md:px-8 md:py-3 rounded-full backdrop-blur-md shadow-2xl text-[10px] md:text-xs uppercase font-light" style={{ color: '#D6B370', border: '1px solid rgba(214, 179, 112, 0.5)', backgroundColor: 'rgba(0,0,0,0.6)' }}>
                  Turn Over
                </span>
              </div>
            )}
          </div>

          {/* ==========================================
              STATE 2: THE BACK (LIVING HISTORY)
          ========================================== */}
          <motion.div 
            // MEMORY BREATHING
            animate={{ filter: ['brightness(1)', 'brightness(1.015)', 'brightness(1)'] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className={`absolute inset-0 w-full h-full rounded-sm overflow-hidden origin-center transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] z-20 ${
              isRevealed ? 'scale-x-100 opacity-100 pointer-events-auto' : 'scale-x-0 opacity-0 pointer-events-none'
            }`}
            style={{ 
              backgroundColor: '#e8e2d5', 
              boxShadow: 'inset 0 0 80px rgba(0,0,0,0.08)' 
            }}
          >
            {/* Tonal Paper Depth */}
            <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: 'linear-gradient(145deg, #e8e2d5, #d8d0c4)' }} />

            {/* DIRECTIONAL LIGHT LEAKS */}
            <div className="absolute -top-10 -left-10 w-64 h-64 z-[1] opacity-30 pointer-events-none mix-blend-screen" style={{ background: 'radial-gradient(circle, rgba(164,181,196,0.15) 0%, transparent 70%)' }} />
            <div className="absolute -bottom-10 -right-10 w-64 h-64 z-[1] opacity-25 pointer-events-none mix-blend-screen" style={{ background: 'radial-gradient(circle, rgba(214,179,112,0.15) 0%, transparent 70%)' }} />

            {/* COMPOSITIONAL ANCHOR */}
            <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 opacity-[0.02] z-[2] pointer-events-none rotate-[-15deg]" viewBox="0 0 100 100" fill="none" stroke="#4a3b30" strokeWidth="0.5">
              <circle cx="50" cy="50" r="40" strokeDasharray="2 4"/>
              <path d="M50 10 L50 90 M10 50 L90 50" strokeDasharray="1 6"/>
            </svg>

            {/* REACTIVE MOONLIGHT */}
            <motion.div
              className="absolute inset-0 z-[6] pointer-events-none mix-blend-overlay"
              style={{
                background: useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.12), transparent 70%)`
              }}
            />

            {/* ANIMATED PAPER TEXTURE */}
            <motion.div 
              className="absolute inset-0 z-[10] opacity-[0.06] mix-blend-multiply pointer-events-none" 
              style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cream-paper.png')", x: textureX }} 
            />

            {/* DUST PARTICLES */}
            <div className="absolute inset-0 z-[12] pointer-events-none overflow-hidden">
              {DUST_PARTICLES.map((particle) => (
                <motion.div
                  key={particle.id}
                  className="absolute rounded-full bg-[#3e2e21]"
                  style={{ left: particle.left, top: particle.top, width: particle.size, height: particle.size }}
                  animate={{ x: [0, particle.xDrift, 0], y: [0, particle.yDrift, 0], opacity: [0, 0.08, 0] }}
                  transition={{ duration: particle.duration, delay: particle.delay, repeat: Infinity, ease: "easeInOut" }}
                />
              ))}
            </div>

            {/* PAPER CREASES */}
            <div className="absolute left-[33%] top-0 bottom-0 w-[1px] opacity-[0.05] z-[15] pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, #3e2e21, transparent)' }} />
            <div className="absolute left-[33%] top-0 bottom-0 w-[2px] -ml-[1px] opacity-[0.15] z-[15] pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, #ffffff, transparent)' }} />
            <div className="absolute top-[50%] left-0 right-0 h-[1px] opacity-[0.03] z-[15] pointer-events-none" style={{ background: 'linear-gradient(to right, transparent, #3e2e21, transparent)' }} />

            {/* MEMORY REACTION SYSTEM */}
            <div className="absolute inset-0 z-[16] pointer-events-none transition-all duration-1000 ease-out">
              <div className="absolute -bottom-16 -right-10 w-48 h-48 rounded-full border-[1.5px] border-[#4a3b30] opacity-0 group-hover:opacity-[0.04] transition-opacity duration-[1.5s] delay-100 pointer-events-none" />
              <div className="absolute top-1/4 right-2 w-8 h-12 bg-[#3e2e21] blur-md opacity-0 group-hover:opacity-[0.03] transition-opacity duration-1000 delay-300 rounded-full" />
              <span className="absolute top-12 right-12 text-[10px] rotate-[8deg] opacity-0 group-hover:opacity-[0.06] transition-opacity duration-[2s] delay-500" style={{ color: '#4a3b30', fontFamily: 'var(--font-caveat), cursive' }}>
                ...maybe not.
              </span>
            </div>

            {/* Tape Detail */}
            <div className="absolute -top-2 left-[55%] w-14 h-4 bg-white/10 backdrop-blur-sm border border-white/20 rotate-[3deg] shadow-sm z-[15]" />

            {/* CONTENT LAYER */}
            <div className="relative z-20 w-full h-full flex flex-col p-4 md:p-6">
              
              {/* Archival Labeling */}
              <div className="absolute top-5 left-5 md:top-6 md:left-6 flex flex-col gap-1 font-mono text-[8px] md:text-[9px] tracking-[0.15em] uppercase" style={{ color: '#7b6654', opacity: 0.6 }}>
                <span>{memoryId}</span>
                <span>Recovered Fragment</span>
                <span>2:14 AM</span>
              </div>
              <div className="absolute bottom-5 right-5 md:bottom-6 md:right-6 text-[9px] md:text-[10px]" style={{ color: '#7b6654', opacity: 0.6 }}>
                <span className="font-serif italic mr-1">fig.</span> 01
              </div>

              {/* PARALLAX TEXT CONTAINER */}
              <motion.div 
                style={{ x: textX, y: textY }}
                className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 pl-2 md:pl-4 pt-8 relative"
              >
                {/* ERASED WRITING UNDERLAY (Now dynamically matches your note) */}
                <p 
                  className="absolute inset-0 flex items-center justify-center text-xl md:text-3xl text-center rotate-[-3deg] -translate-y-4 pointer-events-none px-4 md:px-10"
                  style={{ 
                    color: '#3e2e21', 
                    opacity: 0.03,
                    fontFamily: 'var(--font-caveat), cursive'
                  }}
                >
                  {hiddenText ? `${hiddenText.split(' ').slice(0, 5).join(' ')}...` : ''}
                </p>

                <p 
                  className={`text-2xl md:text-4xl lg:text-5xl leading-relaxed text-center rotate-[-1.2deg] max-w-[90%] transition-all duration-1000 ease-out z-10 ${
                    isRevealed ? 'opacity-100 blur-0 delay-300' : 'opacity-0 blur-md delay-0'
                  }`}
                  style={{ 
                    color: '#3e2e21', 
                    fontFamily: 'var(--font-caveat), "Comic Sans MS", cursive, Georgia, serif',
                    textShadow: '0 1px 8px rgba(0,0,0,0.1)'
                  }}
                >
                  {hiddenText}
                </p>
              </motion.div>
            </div>

          </motion.div>

        </div>
      </motion.div>

      {/* THE RESTORED CHAPTER TITLE */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
        // TIGHTER SPACING: Reduced mt-16 to mt-8 md:mt-12
        className="mt-8 md:mt-12 z-20"
      >
        <h3 className="text-2xl md:text-4xl lg:text-5xl font-serif tracking-wide text-center drop-shadow-lg" style={{ color: '#e8e2d5' }}>
          {title}
        </h3>
      </motion.div>

    </div>
  );
};