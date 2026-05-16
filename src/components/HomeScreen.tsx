import { motion } from 'motion/react';
import { ChevronRight, Shield, Mic, Clock, Sparkles, CheckCircle, AudioLines, Heart, BookOpen, GraduationCap, Award, ExternalLink } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { UserProfile } from '../lib/db';
import { CATEGORY_INFO } from '../lib/categories';
import { TUTORS } from '../lib/tutors';
import { UNIDOS_COURSE } from '../lib/courses';
import { useEffect, useState } from 'react';

interface Props {
  profile: UserProfile | null;
  onSelectCategory: (id: string) => void;
  onLogout: () => void;
  onStartIntake: () => void;
  onShowCommunity: () => void;
}

export default function HomeScreen({ profile, onSelectCategory, onLogout, onStartIntake, onShowCommunity }: Props) {
  const categories = Object.values(CATEGORY_INFO);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToAreas = () => {
    const el = document.getElementById('areas');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen relative bg-zinc-950 font-sans selection:bg-indigo-500 selection:text-white">
      {/* HEADER */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-zinc-950/70 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 group cursor-pointer">
             <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
               <Sparkles size={14} className="animate-pulse" />
             </div>
             <span className="font-semibold tracking-[0.25em] uppercase text-xs text-white">Unidos AI</span>
          </div>

          {/* Nav Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-wider uppercase text-zinc-400">
             <a href="#" className="hover:text-white transition-colors">Inicio</a>
             <a href="#respaldo" className="hover:text-white transition-colors">Ciencia ProLab</a>
             <a href="#areas" className="hover:text-white transition-colors">Áreas</a>
             <a href="#tutores" className="hover:text-white transition-colors">Especialistas</a>
             {profile && (
                <button onClick={onShowCommunity} className="hover:text-white transition-colors text-amber-400 flex items-center gap-1.5 font-semibold tracking-wider uppercase">
                   <LucideIcons.Users size={14} />
                   Comunidad
                </button>
             )}
          </nav>

          {/* Right Action */}
          <div>
            {!profile ? (
              <button onClick={onStartIntake} className="text-xs font-semibold tracking-wider uppercase px-5 py-2.5 rounded-full bg-white text-black hover:bg-zinc-200 transition-all duration-300 shadow-lg shadow-white/5">
                Empezar
              </button>
            ) : (
              <div className="flex items-center gap-4">
                <span className="text-sm text-zinc-400 hidden sm:inline-block">Hola, <span className="font-medium text-white">{profile.name}</span></span>
                <button onClick={onLogout} className="text-xs font-semibold tracking-wider uppercase px-4 py-2 rounded-full border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors">
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-48 pb-32 px-6 flex flex-col items-center text-center">
        {/* Soft Aura */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none aura-animate" />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-300 uppercase tracking-widest mb-8"
          >
            <GraduationCap size={14} />
            <span>Basado en el Modelo Científico ProLab (PUCP)</span>
          </motion.div>

          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-8xl font-display font-medium tracking-tight leading-[1.05] mb-8 text-balance"
          >
            Encaminando la crianza<br/>
            <span className="text-zinc-500 italic font-normal">hacia un apego seguro.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed max-w-2xl mx-auto mb-12"
          >
            La primera infraestructura de resiliencia humana guiada por Inteligencia Artificial. Acompañamiento clínico, emocional y pedagógico en tiempo real para padres de familia, 24/7 y con privacidad absoluta.
          </motion.p>
          
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            {!profile ? (
              <>
                <button 
                  onClick={onStartIntake}
                  className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-zinc-200 transition-all duration-300 text-base shadow-xl shadow-white/5 hover:scale-[1.02]"
                >
                  Comenzar evaluación gratuita
                </button>
                <button 
                  onClick={scrollToAreas}
                  className="px-8 py-4 bg-zinc-900 text-white font-semibold rounded-full hover:bg-zinc-800 border border-zinc-800 transition-all duration-300 text-base hover:scale-[1.02]"
                >
                  Ver Áreas de Crianza
                </button>
              </>
            ) : (
              <button 
                onClick={scrollToAreas}
                className="px-10 py-5 bg-white text-black font-semibold rounded-full hover:bg-zinc-200 transition-all duration-300 text-lg hover:scale-[1.02] shadow-xl shadow-white/5"
              >
                Ingresar a mis Clases Virtuales
              </button>
            )}
          </motion.div>
        </div>
      </section>

      {/* RESPALDO CIENTÍFICO (Tesis PUCP) */}
      <section id="respaldo" className="py-24 px-6 bg-zinc-950 border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-amber-600/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-500 uppercase tracking-wider mb-6">
                <Award size={14} />
                <span>Validación Académica</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-display font-medium leading-tight mb-6">
                Un modelo de micro-learning con impacto social validado
              </h2>
              <p className="text-zinc-400 font-light leading-relaxed mb-6">
                Unidos AI no es un chatbot de consejos genéricos. Implementa el **Modelo ProLab**, formulado en la tesis de maestría de **Raúl Gonzáles Morales** en la Pontificia Universidad Católica del Perú (PUCP, Feb 2023). Basa su efectividad en la transición asistida hacia el **Estilo de Crianza Autoritativo (Baumrind)**.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="p-5 rounded-2xl bg-zinc-900/50 border border-white/5">
                  <span className="block text-3xl font-display font-semibold text-amber-500 mb-1">94%</span>
                  <span className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">de padres con interés</span>
                  <p className="text-xs text-zinc-500 mt-1">Encuestas que validan la desconexión del especialista y la necesidad de guía.</p>
                </div>
                <div className="p-5 rounded-2xl bg-zinc-900/50 border border-white/5">
                  <span className="block text-3xl font-display font-semibold text-indigo-400 mb-1">ODS 3, 4 y 8</span>
                  <span className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">Impacto Global</span>
                  <p className="text-xs text-zinc-500 mt-1">Alineado con el desarrollo evolutivo, salud mental infantil y trabajo decente.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <a 
                  href="https://tesis.pucp.edu.pe" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
                >
                  Ver repositorio PUCP <ExternalLink size={12} />
                </a>
              </div>
            </div>

            <div className="lg:pl-8">
              <div className="p-8 rounded-3xl glass border border-white/10 relative">
                <h3 className="text-xl font-display font-medium mb-6">El Espejo de la Crianza</h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
                      ✓
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-zinc-200">Estilo Autoritativo (Ideal)</h4>
                      <p className="text-xs text-zinc-400 mt-1 font-light">Establece límites claros con amor y comunicación abierta. Fomenta el apego seguro y la resiliencia.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 opacity-50">
                    <div className="w-8 h-8 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 flex items-center justify-center shrink-0">
                      ✗
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-zinc-200">Estilo Autoritario</h4>
                      <p className="text-xs text-zinc-400 mt-1 font-light">Control rígido basado en castigos y gritos, anulando la autonomía del niño.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 opacity-50">
                    <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center shrink-0">
                      ✗
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-zinc-200">Estilo Permisivo / Negligente</h4>
                      <p className="text-xs text-zinc-400 mt-1 font-light">Poca regulación y límites que resultan en inseguridad y frustración.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPLORATION / CATEGORIES */}
      <section id="areas" className="py-24 px-6 bg-zinc-950 border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-4">
              <BookOpen size={14} />
              <span>Planes de Apoyo</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-medium tracking-tight mb-4">
              ¿Dónde necesitas apoyo hoy?
            </h2>
            <p className="text-zinc-400 font-light max-w-lg mx-auto">
              Cada área cuenta con un especialista de IA entrenado bajo el Modelo ProLab para acompañarte en tu rol.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((cat, idx) => {
              // @ts-ignore
              const IconComponent = LucideIcons[cat.iconName] || LucideIcons.Circle;

              return (
                <motion.button 
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * idx, duration: 0.5, ease: "easeOut" }}
                  className={`text-left w-full glass border border-white/5 rounded-3xl p-8 transition-all duration-500 hover:shadow-[0_20px_50px_-12px_rgba(99,102,241,0.15)] hover:-translate-y-1 hover:border-indigo-500/30 flex flex-col items-start gap-8 group cursor-pointer`}
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 transition-transform duration-500 group-hover:scale-110 ${cat.iconBgClass}`}>
                     <IconComponent size={28} strokeWidth={1.5} />
                  </div>
                  <div>
                     <h3 className="text-xl font-medium mb-3 flex items-center gap-3 text-zinc-200 group-hover:text-white transition-colors font-display">
                       {cat.title}
                       <motion.span
                         animate={{ opacity: [0.3, 1, 0.3] }}
                         transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: idx * 0.2 }}
                         className="inline-block"
                       >
                          <AudioLines size={16} className="text-indigo-400" />
                       </motion.span>
                     </h3>
                     <p className="text-zinc-400 text-sm leading-relaxed font-light mb-6">
                       {cat.description}
                     </p>
                  </div>
                  <div className="mt-auto flex items-center text-xs font-semibold tracking-wider uppercase text-zinc-400 group-hover:text-white transition-all duration-300 px-4 py-2.5 rounded-full border border-zinc-800 bg-zinc-950/50 group-hover:border-indigo-500/30 group-hover:bg-indigo-950/20 w-fit">
                    Explorar especialistas <ChevronRight size={14} className="ml-1 transition-transform group-hover:translate-x-1" />
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* CURRICULO: LOS 8 MÓDULOS */}
      <section className="py-24 px-6 bg-zinc-950 border-t border-white/5 relative">
        <div className="absolute top-[20%] right-0 w-[300px] h-[300px] bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-display font-medium tracking-tight mb-4">
              La Escuela para Padres en 8 Módulos
            </h2>
            <p className="text-zinc-400 font-light max-w-lg mx-auto">
              Un viaje estructurado desde el autoanálisis hasta el legado familiar. Micro-learning de 5 minutos por sesión.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {UNIDOS_COURSE.map((mod, idx) => (
              <div key={mod.id} className="p-6 rounded-3xl bg-zinc-900/30 border border-white/5 hover:border-white/10 transition-colors flex flex-col justify-between">
                <div>
                  <div className="text-2xl mb-4">{mod.emoji}</div>
                  <span className="text-[10px] font-semibold text-indigo-400 uppercase tracking-widest block mb-2">Módulo {idx + 1}</span>
                  <h3 className="text-base font-medium text-white mb-2 font-display">{mod.title.replace(/Módulo \d+: /, '')}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed font-light">{mod.description}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Insignia: {mod.badgeName}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ESPECIALISTAS (Los Tutores de la IA) */}
      <section id="tutores" className="py-24 px-6 bg-zinc-950 border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-display font-medium tracking-tight mb-4">
              Tus Mentores de Inteligencia Artificial
            </h2>
            <p className="text-zinc-400 font-light max-w-lg mx-auto">
              Tres perfiles psicológicos y pedagógicos diseñados para abordar cada etapa del desarrollo y crisis de tus hijos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TUTORS.map((tutor) => (
              <div key={tutor.id} className="p-8 rounded-3xl glass border border-white/5 flex flex-col justify-between group hover:border-indigo-500/20 transition-all duration-300">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-sm font-semibold text-indigo-400">
                      {tutor.name[0]}
                    </div>
                    <span className="text-xs font-semibold tracking-wider text-amber-500 uppercase">{tutor.specialty}</span>
                  </div>
                  <h3 className="text-2xl font-medium mb-3 font-display text-white">{tutor.name}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed font-light mb-6">{tutor.description}</p>
                </div>
                <div className="pt-6 border-t border-white/5">
                  <button 
                    onClick={() => onSelectCategory('padres')}
                    className="w-full py-3 rounded-xl bg-white/5 hover:bg-indigo-600 hover:text-white transition-all text-xs font-semibold uppercase tracking-wider text-zinc-300"
                  >
                    Hablar con {tutor.name}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TASKS (If Authenticated) */}
      {profile && profile.tasks && profile.tasks.length > 0 && (
        <section className="px-6 py-16 bg-zinc-900/30 border-y border-white/5 relative">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-xl font-medium flex items-center gap-2 mb-8 font-display">
              <CheckCircle size={20} className="text-indigo-400" />
              Tus compromisos de honor pendientes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profile.tasks.map((task, i) => (
                <div key={i} className="flex gap-4 items-start p-6 bg-zinc-950/60 rounded-3xl border border-white/5">
                  <div className="w-6 h-6 rounded-full border-2 border-zinc-700 hover:border-indigo-500 transition-colors flex-shrink-0 mt-0.5 cursor-pointer" />
                  <p className="text-sm text-zinc-300 leading-relaxed font-light">{task.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* HOW IT WORKS */}
      <section className="py-24 px-6 bg-zinc-950 border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-display font-medium tracking-tight mb-4">¿Cómo funciona?</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-[28px] left-[15%] right-[15%] h-px bg-zinc-800/60" />
            
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="w-14 h-14 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-8 text-indigo-400 font-semibold text-lg">
                1
              </div>
              <h3 className="text-lg font-medium mb-4 font-display">Evaluación Inicial</h3>
              <p className="text-zinc-400 font-light text-sm max-w-[280px] leading-relaxed">Personalizamos la IA definiendo tu contexto familiar e identificando tu estilo de crianza actual.</p>
            </div>

            <div className="flex flex-col items-center text-center relative z-10">
              <div className="w-14 h-14 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-8 text-indigo-400 font-semibold text-lg">
                2
              </div>
              <h3 className="text-lg font-medium mb-4 font-display">Micro-clases Interactiva</h3>
              <p className="text-zinc-400 font-light text-sm max-w-[280px] leading-relaxed">Selecciona un módulo. Elena, Marcos o Sofía te guiarán de forma conversacional con el micrófono de tu celular o computadora.</p>
            </div>

            <div className="flex flex-col items-center text-center relative z-10">
              <div className="w-14 h-14 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-8 text-indigo-400 font-semibold text-lg">
                3
              </div>
              <h3 className="text-lg font-medium mb-4 font-display">Generación de Compromisos</h3>
              <p className="text-zinc-400 font-light text-sm max-w-[280px] leading-relaxed">Cada sesión termina con una tarea accionable en la vida real. Tu tutor recordará tus progresos en el siguiente encuentro.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="flex items-center gap-3 mb-6">
             <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
               <Sparkles size={14} />
             </div>
             <span className="font-semibold tracking-[0.25em] uppercase text-xs text-white">Unidos AI</span>
          </div>
          <p className="text-zinc-500 text-sm font-light mb-8 flex items-center gap-2">
            Tecnología al servicio del bienestar familiar <Heart size={14} className="text-indigo-500/50" />
          </p>
          <div className="flex gap-6 text-xs text-zinc-600">
            <a href="#" className="hover:text-zinc-400 transition-colors">Privacidad</a>
            <a href="#" className="hover:text-zinc-400 transition-colors">Términos de Servicio</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
