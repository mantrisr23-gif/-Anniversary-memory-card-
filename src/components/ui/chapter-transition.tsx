'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export const ChapterTransition = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track the scroll progress of THIS specific chapter
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // "start start" = top of chapter hits top of viewport (starts sinking)
    // "end start" = bottom of chapter hits top of viewport (fully faded)
    offset: ["start start", "end start"] 
  });

  // The Cinematic Math:
  // As the chapter scrolls up (0 to 1), it fades out, shrinks slightly, and pushes down
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]); 

  return (
    <motion.div 
      ref={containerRef} 
      style={{ opacity, scale, y }} 
      className="relative origin-top"
    >
      {children}
    </motion.div>
  );
};