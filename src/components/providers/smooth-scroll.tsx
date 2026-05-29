'use client';

// Change this line to the exact path that matches the installed package
import { ReactLenis } from '@studio-freight/react-lenis';
import React from 'react';

export const SmoothScrollProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactLenis 
      root 
      options={{
        lerp: 0.05,
        duration: 1.5,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
};