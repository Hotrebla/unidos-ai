import { motion } from 'motion/react';
import { ChevronRight, Shield, Mic, Clock, Sparkles, Filter, CheckCircle, AudioLines, Heart } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { UserProfile } from '../lib/db';
import { CATEGORY_INFO } from '../lib/categories';
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
    <div className="flex flex-col min-h-screen relative bg-zinc-950 font-sans">
      {/* HEADER */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-zinc-950/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
             <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
               <Sparkles size={12} />
             </div>
             <span className="font-semibold tracking-[0.2em] uppercase text-xs">Unidos AI</span>
          </div>

          {/* Nav Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
             <a href="#" className="hover:text-white transition-colors">Inicio</a>
             <a href="#areas" className="hover:text-white transition-colors">Áreas</a>
             {profile && (
                <button onClick={onShowCommunity} className="hover:text-white transition-colors text-amber-400 flex items-center gap-1.5">
                   <LucideIcons.Users size={16} />
                   Comunidad
                </button>
             )}
             <a href="#metodologia" className="hover:text-white transition-colors">Metodología</a>
          </nav>

          {/* Right Action */}
          <div>
            {!profile ? (
              <button onClick={onStartIntake} className="text-sm font-medium text-white hover:text-indigo-300 transition-colors">
                Iniciar Sesión
              </button>
            ) : (
              <div className="flex items-center gap-4">
                <span className="text-sm text-zinc-400 hidden sm:inline-block">Hola, {profile.name}</span>
                <button onClick={onLogout} className="text-xs px-3 py-1.5 rounded-full border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors">
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-40 pb-24 md:pt-48 md:pb-32 px-6 flex flex-col items-center text-center">
        {/* Soft Aura */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl font-display font-medium tracking-tight leading-[1.1] mb-6"
          >
            La ayuda que necesitas,<br/>
            <span className="text-zinc-400 italic">en el momento que la necesitas.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed max-w-2xl mx-auto mb-10"
          >
            Bienvenido a Unidos AI. Una plataforma de acompañamiento emocional y estratégico que utiliza inteligencia artificial avanzada para escucharte y guiarte en tiempo real, 24/7 y con total privacidad.
          </motion.p>
          
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {!profile ? (
              <button 
                onClick={onStartIntake}
                className="px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-zinc-200 transition-colors text-lg"
              >
                Comenzar mi transformación
              </button>
            ) : (
              <button 
                onClick={scrollToAreas}
                className="px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-zinc-200 transition-colors text-lg"
              >
                Ir a mis sesiones
              </button>
            )}
          </motion.div>
        </div>
      </section>

      {/* TASKS (If Authenticated) */}
      {profile && profile.tasks && profile.tasks.length > 0 && (
        <section className="px-6 py-12 bg-zinc-900/30 border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-xl font-medium flex items-center gap-2 mb-6">
              <CheckCircle size={20} className="text-indigo-400" />
              Tus Tareas Pendientes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {profile.tasks.map((task, i) => (
                <div key={i} className="flex gap-3 items-start p-4 bg-zinc-900 rounded-2xl border border-white/5">
                  <div className="w-5 h-5 rounded-full border border-zinc-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-zinc-300 leading-relaxed">{task.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* BENEFITS */}
      <section className="py-24 px-6 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-medium tracking-tight mb-4">¿Por qué Unidos?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center md:items-start"
            >
              <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6 text-zinc-300">
                <Shield size={24} strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-medium mb-3">Privacidad Total</h3>
              <p className="text-zinc-400 font-light leading-relaxed">Tus conversaciones son encriptadas y anónimas. Un espacio seguro para ser tú mismo, sin juicios.</p>
            </motion.div>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center md:items-start"
            >
              <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6 text-zinc-300">
                <Mic size={24} strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-medium mb-3">Voz en Tiempo Real</h3>
              <p className="text-zinc-400 font-light leading-relaxed">Olvida los chats fríos. Habla de forma natural con nuestras IAs entrenadas en psicología y coaching.</p>
            </motion.div>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center md:items-start"
            >
              <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6 text-zinc-300">
                <Clock size={24} strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-medium mb-3">Disponibilidad 24/7</h3>
              <p className="text-zinc-400 font-light leading-relaxed">No hay listas de espera. Tu equipo de apoyo está listo cuando tú los necesites, en cualquier momento.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* EXPLORATION / CATEGORIES */}
      <section id="areas" className="py-24 px-6 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-medium tracking-tight mb-4">Nuestras Áreas de Apoyo</h2>
            <p className="text-zinc-400 font-light">Un especialista para cada aspecto de tu vida.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  className={`text-left w-full bg-zinc-900/60 backdrop-blur-md border border-zinc-700/50 rounded-3xl p-8 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:-translate-y-1 hover:bg-zinc-900/80 ${cat.hoverBorderClass} flex flex-col items-start gap-6 group cursor-pointer`}
                >
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl shrink-0 transition-colors ${cat.iconBgClass}`}>
                     <IconComponent size={28} strokeWidth={1.5} />
                  </div>
                  <div>
                     <h3 className="text-xl font-medium mb-3 flex items-center gap-3 text-zinc-200 group-hover:text-white transition-colors">
                       {cat.title}
                       <motion.span
                         animate={{ opacity: [0.3, 1, 0.3] }}
                         transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: idx * 0.2 }}
                         className="inline-block"
                       >
                          <AudioLines size={16} className="text-zinc-600 group-hover:text-zinc-400" />
                       </motion.span>
                     </h3>
                     <p className="text-zinc-400 text-sm leading-relaxed font-light">
                       {cat.description}
                     </p>
                  </div>
                  <div className="mt-auto pt-4 flex items-center text-xs font-medium text-zinc-400 group-hover:text-white transition-colors px-4 py-2 rounded-full border border-zinc-800 bg-zinc-950/50 group-hover:border-zinc-500 group-hover:bg-zinc-800 w-fit">
                    Explorar especialistas <ChevronRight size={14} className="ml-1" />
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="metodologia" className="py-24 px-6 bg-zinc-900/20 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-medium tracking-tight mb-4">¿Cómo funciona?</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-[28px] left-[15%] right-[15%] h-px bg-zinc-800/40" />
            
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="w-14 h-14 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center mb-8 text-zinc-400 font-medium text-lg">
                1
              </div>
              <h3 className="text-lg font-medium mb-4">Haz la Evaluación</h3>
              <p className="text-zinc-400 font-light text-sm max-w-[250px]">Personalizamos la IA y definimos tus objetivos iniciales para adaptar la experiencia a tus necesidades actuales.</p>
            </div>

            <div className="flex flex-col items-center text-center relative z-10">
              <div className="w-14 h-14 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center mb-8 text-zinc-400 font-medium text-lg">
                2
              </div>
              <h3 className="text-lg font-medium mb-4">Elige a tu Guía</h3>
              <p className="text-zinc-400 font-light text-sm max-w-[250px]">Selecciona el área donde necesites apoyo hoy (coaching, crianza, desarrollo profesional) y escoge a tu experto.</p>
            </div>

            <div className="flex flex-col items-center text-center relative z-10">
              <div className="w-14 h-14 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center mb-8 text-zinc-400 font-medium text-lg">
                3
              </div>
              <h3 className="text-lg font-medium mb-4">Inicia la Charla</h3>
              <p className="text-zinc-400 font-light text-sm max-w-[250px]">Conecta tu micrófono y empieza a conversar. Siente la naturalidad de una sesión guiada paso a paso.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-800 bg-zinc-950 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="flex items-center gap-3 mb-6">
             <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-white">
               <Sparkles size={12} />
             </div>
             <span className="font-semibold tracking-[0.2em] uppercase text-xs">Unidos AI</span>
          </div>
          <p className="text-zinc-500 text-sm font-light mb-8 flex items-center gap-2">
            Tecnología al servicio del bienestar humano <Heart size={14} className="text-indigo-500/50" />
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
