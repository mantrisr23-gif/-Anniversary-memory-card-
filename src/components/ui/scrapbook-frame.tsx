'use client';
import { motion } from 'framer-motion';
import React from 'react';

interface Props {
  children: React.ReactNode;
  tilt?: 'left' | 'right' | 'none';
}

export const ScrapbookFrame = ({ children, tilt = 'left' }: Props) => {
  const rotation = tilt === 'left' ? '-rotate-2' : tilt === 'right' ? 'rotate-2' : 'rotate-0';
  
  return (
    <motion.div 
      whileHover={{ scale: 1.02, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`relative p-8 md:p-12 max-w-md mx-auto ${rotation}`}
    >
      {/* 1. The Glass Parchment Base */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F5E9D2]/90 to-[#EBDCC3]/75 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-sm border border-[#ffffff]/40" />
      
      {/* 2. Paper Grain Texture */}
      <div className="absolute inset-0 opacity-30 mix-blend-multiply pointer-events-none" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cream-paper.png')" }} />
      
      {/* 3. Washi Tape Artifact */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-6 bg-[#F3DFC1]/40 backdrop-blur-sm border border-white/10 shadow-sm rotate-[-3deg]" />

      {/* 4. Text Content (Rich Brown for contrast on cream) */}
      <div className="relative z-10 text-[#4C3F34]">
        {children}
      </div>
    </motion.div>
  );
};