
import React, { useState, useRef, useEffect } from 'react';
import { Navbar } from './widgets/navbar/ui/Navbar';
import { Button } from './shared/ui/Button';
import { Glow } from './shared/ui/Glow';
import { ReviewCard } from './entities/review/ui/ReviewCard';
import { scrollToSection } from './shared/lib/scroll';
import { PROFILE_DATA, TRUST_FACTS, CAREER_TRACK, PROBLEM_INSIGHTS, SERVICES, REVIEWS } from './data';

const App = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [openProblemIndex, setOpenProblemIndex] = useState<number | null>(null);
  const [selectedProblemForForm, setSelectedProblemForForm] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeTrackIndex, setActiveTrackIndex] = useState(0);
  const formRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Initialize AOS once the component is mounted
    // Fix: Access AOS via type casting to avoid Window type errors
    const aos = (window as any).AOS;
    if (aos) {
      aos.init({
        duration: 800,
        once: true,
        offset: 100,
        delay: 50,
        easing: 'ease-out-cubic'
      });
    }

    // Handle initial load and potential layout shifts
    const timer = setTimeout(() => {
      // Fix: Access AOS via type casting to avoid Window type errors
      const aos = (window as any).AOS;
      if (aos) aos.refresh();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Refresh AOS when dynamic content changes height
  useEffect(() => {
    // Fix: Access AOS via type casting to avoid Window type errors
    const aos = (window as any).AOS;
    if (aos) {
      // Small delay to allow browser to calculate new height
      setTimeout(() => {
        aos.refresh();
      }, 100);
    }
  }, [activeTrackIndex, openProblemIndex]);

  const toggleProblem = (index: number) => {
    setOpenProblemIndex(openProblemIndex === index ? null : index);
  };

  const handleApplyProblem = (problem: string) => {
    setSelectedProblemForForm(problem);
    scrollToSection('contact');
    setTimeout(() => {
      if (formRef.current) formRef.current.focus();
    }, 800);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setSelectedProblemForForm('');
    }, 3000);
  };

  return (
    <div className="bg-[#F9F8F6] min-h-screen selection:bg-indigo-100 selection:text-indigo-900 overflow-x-hidden">
      <Navbar />
      
      {activeVideo && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm" onClick={() => setActiveVideo(null)}>
          <button className="absolute top-4 right-4 md:top-8 md:right-8 text-white/50 hover:text-white text-3xl" onClick={() => setActiveVideo(null)}>
            <i className="fa-solid fa-xmark"></i>
          </button>
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-xl md:rounded-2xl overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
            <iframe src={activeVideo + "?autoplay=1"} className="w-full h-full border-0" allow="autoplay; encrypted-media" allowFullScreen />
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-28 md:pt-24 pb-20 md:pb-0 overflow-hidden">
        <Glow className="top-[-100px] right-[-100px]" />
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
          <div className="order-2 lg:order-1" data-aos="fade-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[9px] md:text-[10px] font-bold uppercase tracking-widest mb-6 md:mb-8 border border-indigo-100">
              Personal & Business Psychology
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.1] mb-6 md:mb-8 text-neutral-900 font-unbounded">
              Ваш масштаб <br className="hidden sm:block"/>начинается <br/><span className="text-indigo-600 italic">внутри.</span>
            </h1>
            <p className="text-base md:text-lg text-neutral-500 mb-8 md:mb-12 max-w-xl leading-relaxed font-light">
              {PROFILE_DATA.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="premium" className="w-full sm:w-auto text-center" onClick={() => scrollToSection('contact')}>
                Записаться на сессию
              </Button>
              <Button variant="outline" className="w-full sm:w-auto px-10 py-5 rounded-2xl text-xs text-center" onClick={() => scrollToSection('track')}>
                Мой путь
              </Button>
            </div>
          </div>
          <div className="relative order-1 lg:order-2" data-aos="fade-left">
            <div className="aspect-[4/5] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl shadow-indigo-100/30 bg-neutral-100 p-1.5 md:p-2">
              <img 
                src={PROFILE_DATA.heroImage} 
                alt="Юлия Телегина" 
                className="w-full h-full object-cover rounded-[1.8rem] md:rounded-[2rem] transition-opacity duration-1000"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section id="about" className="py-20 md:py-32 bg-white relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 md:mb-20" data-aos="fade-up">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-medium mb-6 font-unbounded text-neutral-900 px-4">Почему мне доверяют?</h2>
            <div className="h-1 w-16 md:w-20 bg-indigo-600 mx-auto"></div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {TRUST_FACTS.map((fact, i) => (
              <div 
                key={i} 
                data-aos="fade-up" 
                data-aos-delay={i * 100}
                className="p-6 md:p-8 rounded-[2rem] border border-neutral-100 hover:border-indigo-100 transition-all group hover:bg-neutral-50/50"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-neutral-50 flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all text-indigo-600">
                  <i className={`fa-solid ${fact.icon} text-lg md:text-xl`}></i>
                </div>
                <h3 className="text-base md:text-lg font-bold mb-3 text-neutral-900 leading-snug">{fact.title}</h3>
                <p className="text-xs md:text-sm text-neutral-500 leading-relaxed">{fact.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Track Slider Section */}
      <section id="track" className="py-24 md:py-40 bg-[#111111] text-white relative z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-600/5 blur-[120px] rounded-full"></div>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mb-16 md:mb-24" data-aos="fade-up">
            <h2 className="text-2xl md:text-5xl font-medium font-unbounded leading-tight mb-8">
              Путь от твердого бизнеса <br/> 
              <span className="text-indigo-400 italic">к психологии смыслов</span>
            </h2>
            <div className="flex flex-wrap gap-4 md:gap-8">
              {CAREER_TRACK.map((item, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveTrackIndex(idx)}
                  className={`text-base md:text-xl font-unbounded transition-all duration-500 pb-2 border-b-2 ${
                    activeTrackIndex === idx ? 'text-indigo-400 border-indigo-400 opacity-100' : 'text-white/30 border-transparent hover:text-white/60 opacity-50'
                  }`}
                >
                  {item.year}
                </button>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div className="fade-in duration-700">
              <p className="text-[10px] md:text-[12px] font-bold uppercase tracking-[0.3em] text-indigo-400 mb-6 block">
                {CAREER_TRACK[activeTrackIndex].label}
              </p>
              <p className="text-lg md:text-2xl font-light leading-relaxed text-neutral-300 min-h-[120px]">
                {CAREER_TRACK[activeTrackIndex].event}
              </p>
            </div>
            <div className="relative group">
              <div className="aspect-[16/10] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl relative z-10 bg-neutral-900">
                <img 
                  key={CAREER_TRACK[activeTrackIndex].image}
                  src={CAREER_TRACK[activeTrackIndex].image} 
                  alt="Experience" 
                  className="w-full h-full object-cover transition-all duration-1000 scale-105 group-hover:scale-100 animate-in fade-in"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-600/20 blur-3xl rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Insights Section */}
      <section className="py-24 md:py-40 bg-white relative z-10">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16 md:mb-24" data-aos="fade-up">
            <h2 className="text-2xl md:text-5xl font-medium font-unbounded text-neutral-900 mb-8 px-4">В чем ваш запрос?</h2>
            <p className="text-neutral-500 text-sm md:text-lg font-light">Выберите ситуацию, которая откликается вам сейчас — я покажу, что за ней стоит на самом деле.</p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {PROBLEM_INSIGHTS.map((problem, i) => (
              <div 
                key={i} 
                data-aos="fade-up"
                className={`group border-b border-neutral-100 transition-all duration-500 ${openProblemIndex === i ? 'pb-12' : 'pb-8'}`}
              >
                <button 
                  onClick={() => toggleProblem(i)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <span className={`text-lg md:text-2xl font-medium font-unbounded transition-all duration-500 pr-8 ${openProblemIndex === i ? 'text-indigo-600' : 'text-neutral-900 group-hover:text-indigo-600'}`}>
                    {problem.title}
                  </span>
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full border flex items-center justify-center transition-all duration-500 shrink-0 ${openProblemIndex === i ? 'bg-indigo-600 border-indigo-600 text-white rotate-45' : 'bg-transparent border-neutral-200 text-neutral-400 group-hover:border-indigo-600 group-hover:text-indigo-600'}`}>
                    <i className="fa-solid fa-plus text-xs md:text-sm"></i>
                  </div>
                </button>
                
                <div className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${openProblemIndex === i ? 'max-h-[800px] opacity-100 mt-10' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                  <div className="grid md:grid-cols-[1fr_auto_1fr] gap-8 items-start">
                    <div className="space-y-4">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block">Психологический инсайт</span>
                      <p className="text-sm md:text-base text-neutral-600 leading-relaxed italic">"{problem.insight}"</p>
                    </div>
                    <div className="hidden md:block w-px h-full bg-neutral-100"></div>
                    <div className="space-y-6">
                      <div className="p-6 bg-indigo-50/50 rounded-2xl border border-indigo-100">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 block mb-2">Ваш результат</span>
                        <p className="text-sm md:text-base font-bold text-indigo-900 leading-snug">{problem.result}</p>
                      </div>
                      <Button variant="outline" className="w-full" onClick={() => handleApplyProblem(problem.title)}>
                        Разобрать мой случай
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 md:py-40 bg-[#F9F8F6] relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 md:mb-24" data-aos="fade-up">
            <h2 className="text-2xl md:text-5xl font-medium font-unbounded text-neutral-900 mb-6">Форматы работы</h2>
            <p className="text-neutral-500 font-light max-w-xl mx-auto">Индивидуальные решения для тех, кто ценит глубину и твердый результат.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {SERVICES.map((s, i) => (
              <div 
                key={s.id} 
                data-aos="fade-up" 
                data-aos-delay={i * 100}
                className="light-glass p-10 rounded-[3rem] flex flex-col group h-full"
              >
                <div className="mb-8">
                  <h3 className="text-xl md:text-2xl font-bold mb-4 group-hover:text-indigo-600 transition-colors">{s.title}</h3>
                  <p className="text-neutral-500 text-sm font-light leading-relaxed">{s.description}</p>
                </div>
                <div className="flex-grow space-y-4 mb-10">
                  {s.features.map((f, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-xs text-neutral-600">
                      <i className="fa-solid fa-circle-check text-indigo-400"></i>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-8 border-t border-neutral-100">
                  <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">{s.duration}</div>
                  <div className="text-2xl font-medium font-unbounded mb-8">{s.price}</div>
                  <Button variant="primary" className="w-full" onClick={() => scrollToSection('contact')}>Записаться</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Grid Section */}
      <section className="py-24 md:py-40 bg-white relative z-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-8" data-aos="fade-up">
            <div className="max-w-2xl">
              <h2 className="text-2xl md:text-5xl font-medium font-unbounded text-neutral-900 mb-6">Истории <br/>изменений</h2>
              <p className="text-neutral-500 font-light">Результаты, которые можно измерить не только в деньгах, но и в качестве жизни.</p>
            </div>
            <div className="hidden md:flex gap-4">
              <div className="p-4 rounded-2xl bg-indigo-50 text-indigo-600 font-bold text-sm">
                400+ часов практики
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {REVIEWS.map((review, i) => (
              <div key={i} data-aos="fade-up" data-aos-delay={i * 100}>
                <ReviewCard 
                  {...review}
                  onWatchVideo={review.videoUrl ? (url) => setActiveVideo(url) : undefined}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-40 bg-[#F9F8F6] relative z-10">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto bg-white rounded-[3rem] md:rounded-[4rem] overflow-hidden grid lg:grid-cols-[1fr_1.5fr] shadow-[0_48px_100px_-24px_rgba(0,0,0,0.1)] border border-neutral-50" data-aos="zoom-in-up">
            <div className="p-10 md:p-14 lg:p-20 bg-[#111111] text-white flex flex-col justify-between relative overflow-hidden">
              <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full"></div>
              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-medium font-unbounded leading-tight mb-8">
                  Начнем <br/>
                  <span className="text-indigo-400">работу?</span>
                </h2>
                <p className="text-neutral-400 font-light leading-relaxed max-w-[320px] mb-12">
                  Оставьте заявку, и мы выберем время для ознакомительной сессии.
                </p>
                <div className="space-y-6">
                  <a href={PROFILE_DATA.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 group">
                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                      <i className="fa-brands fa-instagram text-lg"></i>
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-300">@BY_TELEGINA</span>
                  </a>
                  <div className="flex items-center gap-6 group">
                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center">
                      <i className="fa-regular fa-envelope text-lg"></i>
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-300">HELLO@TELEGINA.PRO</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-10 md:p-14 lg:p-20 bg-white flex flex-col justify-center relative">
              {isSubmitted ? (
                <div className="text-center py-12 space-y-6 animate-in zoom-in duration-700">
                  <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto text-3xl">
                    <i className="fa-solid fa-check"></i>
                  </div>
                  <h3 className="text-2xl font-bold font-unbounded text-neutral-900">Заявка принята</h3>
                  <p className="text-neutral-500 font-light">Я свяжусь с вами в ближайшее время.</p>
                </div>
              ) : (
                <form className="space-y-10" onSubmit={handleFormSubmit}>
                  <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
                    <div className="space-y-2 group">
                      <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block group-focus-within:text-indigo-600 transition-colors">Ваше имя</label>
                      <input type="text" required className="w-full border-b border-neutral-100 py-4 focus:border-indigo-500 outline-none transition-all text-neutral-900 text-lg font-light" placeholder="Александр" />
                    </div>
                    <div className="space-y-2 group">
                      <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block group-focus-within:text-indigo-600 transition-colors">Telegram / Телефон</label>
                      <input type="text" required className="w-full border-b border-neutral-100 py-4 focus:border-indigo-500 outline-none transition-all text-neutral-900 text-lg font-light" placeholder="@username" />
                    </div>
                  </div>
                  <div className="space-y-2 group">
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block group-focus-within:text-indigo-600 transition-colors">Запрос</label>
                    <textarea ref={formRef} value={selectedProblemForForm} onChange={(e) => setSelectedProblemForForm(e.target.value)} className="w-full border-b border-neutral-100 py-4 focus:border-indigo-500 outline-none transition-all h-24 resize-none text-neutral-900 text-lg font-light" placeholder="О чем бы вы хотели поговорить?"></textarea>
                  </div>
                  <div className="pt-4 max-w-md">
                    <button type="submit" className="w-full bg-[#111111] text-white py-6 rounded-2xl text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-indigo-600 transition-all duration-500 shadow-xl">ОТПРАВИТЬ ЗАЯВКУ</button>
                    <p className="text-[9px] text-neutral-400 text-center mt-6 uppercase tracking-widest">Конфиденциальность гарантирована</p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 md:py-24 border-t border-neutral-100 bg-white relative z-10 text-center sm:text-left">
        <div className="container mx-auto px-6">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-12">
            <div className="col-span-full md:col-span-1">
              <div className="font-unbounded font-medium text-lg text-neutral-900 mb-4 cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>ЮЛИЯ <span className="text-indigo-600">ТЕЛЕГИНА</span></div>
              <p className="text-neutral-400 text-[10px] uppercase tracking-widest font-bold">Магистр психологии НИУ ВШЭ</p>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-[11px] font-bold uppercase tracking-widest text-neutral-900">Документы</h4>
              <a href="#privacy" className="text-neutral-400 hover:text-indigo-600 text-[10px] uppercase transition-colors">Политика конфиденциальности</a>
              <a href="#offer" className="text-neutral-400 hover:text-indigo-600 text-[10px] uppercase transition-colors">Публичная оферта</a>
            </div>
            <div className="text-neutral-400 text-[10px] uppercase leading-loose">
              <h4 className="text-[11px] font-bold uppercase text-neutral-900">Реквизиты</h4>
              <p>ИП ТЕЛЕГИНА ЮЛИЯ АЛЕКСАНДРОВНА</p>
              <p>ИНН: 123456789012</p>
              <p className="mt-6 opacity-40">&copy; 2025 Все права защищены</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
