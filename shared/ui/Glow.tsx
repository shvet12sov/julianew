
import React from 'react';

export const Glow = ({ className = "" }: { className?: string }) => (
  <div className={`absolute pointer-events-none w-[600px] h-[600px] bg-indigo-600/5 blur-[120px] rounded-full z-0 ${className}`} />
);
