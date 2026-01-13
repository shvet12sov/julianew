
import React from 'react';

interface ReviewProps {
  name: string;
  role: string;
  text: string;
  image: string;
  videoUrl?: string;
  onWatchVideo?: (url: string) => void;
}

export const ReviewCard = ({ name, role, text, image, videoUrl, onWatchVideo }: ReviewProps) => (
  <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-neutral-100 flex flex-col h-full group">
    <div className="mb-6">
      <i className="fa-solid fa-quote-left text-3xl text-indigo-100 mb-4 block"></i>
      <p className="text-base leading-relaxed text-neutral-700 italic font-light">"{text}"</p>
    </div>
    
    <div className="mt-auto pt-8 border-t border-neutral-50 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <img src={image} alt={name} className="w-12 h-12 rounded-full grayscale object-cover" />
        <div>
          <div className="font-bold text-sm text-neutral-900">{name}</div>
          <div className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">{role}</div>
        </div>
      </div>
      
      {videoUrl && onWatchVideo && (
        <button 
          onClick={() => onWatchVideo(videoUrl)}
          className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
        >
          <i className="fa-solid fa-play ml-0.5 text-xs"></i>
        </button>
      )}
    </div>
  </div>
);
