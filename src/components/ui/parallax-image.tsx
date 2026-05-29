'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export const ParallaxImage = ({ src, alt }: { src: string; alt: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"], 
  });

  // Softer parallax since we are displaying the full image
  const y = useTransform(scrollYProgress, [0, 1], ["-2%", "2%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.02, 1.05]);

  return (
    // No fixed height, no forced aspect ratio. It grows to fit the image.
    <div ref={containerRef} className="relative w-full overflow-hidden rounded-sm">
      <motion.div style={{ y, scale }} className="w-full origin-center">
        {/* Using a standard img tag with h-auto guarantees zero cropping */}
        <img
          src={src}
          alt={alt}
          className="w-full h-auto block"
        />
      </motion.div>
    </div>
  );
};