// src/components/ui/particle.tsx
'use client';
import { motion } from 'framer-motion';

export const Particle = () => (
  <motion.div
    initial={{ opacity: 0, x: Math.random() * 500 - 250, y: Math.random() * 500 - 250 }}
    animate={{ opacity: [0, 0.5, 0], y: [0, -100, -200], x: [0, 50, 0] }}
    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
    className="absolute w-[2px] h-[2px] bg-[#D6B370] rounded-full"
  />
);