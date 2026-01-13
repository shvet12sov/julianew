
import React, { useState, useEffect } from 'react';
import { scrollToSection } from '../../../shared/lib/scroll';
import { Button } from '../../../shared/ui/Button';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
      scrolled ? 'bg-white/80 backdrop-blur-lg py-4 shadow-sm border-b border-neutral-100' : 'bg-transparent py-8'
    }`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="font-unbounded font-medium text-lg text-neutral-900 cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
          ЮЛИЯ <span className="text-indigo-600">ТЕЛЕГИНА</span>
        </div>
        
        <div className="hidden md:flex gap-12 text-[10px] uppercase tracking-widest font-bold text-neutral-500">
          {['about', 'track', 'services'].map(id => (
            <button key={id} onClick={() => scrollToSection(id)} className="hover:text-indigo-600 transition-colors uppercase">
              {id === 'about' ? 'Обо мне' : id === 'track' ? 'Опыт' : 'Услуги'}
            </button>
          ))}
        </div>

        <Button onClick={() => scrollToSection('contact')} variant={scrolled ? 'primary' : 'outline'}>
          Записаться
        </Button>
      </div>
    </nav>
  );
};
