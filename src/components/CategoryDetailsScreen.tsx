import { motion } from 'motion/react';
import { ArrowLeft, Play, Lock, CheckCircle2, Sparkles, Users } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { CATEGORY_INFO } from '../lib/categories';
import { TUTORS, Tutor } from '../lib/tutors';
import { UNIDOS_COURSE } from '../lib/courses';
import { UserProfile } from '../lib/db';

interface Props {
  categoryId: string;
  profile: UserProfile;
  onBack: () => void;
  onSelectExpert: (expertId: string, moduleId?: string) => void;
}

export default function CategoryDetailsScreen({ categoryId, profile, onBack, onSelectExpert }: Props) {
  const category = CATEGORY_INFO[categoryId as keyof typeof CATEGORY_INFO];
  
  if (!category) return null;

  // @ts-ignore
  const IconComponent = LucideIcons[category.iconName] || LucideIcons.Circle;

  // Filter tutors based on the category's expert list
  // 'fredo' is treated specially if he's in the list
  const categoryExperts = category.experts.map(expertId => {
    if (expertId === 'fredo') {
      return {
        id: 'fredo',
        name: 'Fredo',
        specialty: 'Coach Principal',
        description: 'Especialista en desarrollo personal, gestión emocional y mejora continua.',
        voiceName: 'Puck',
        prompt: ''
      } as Tutor;
    }
    return TUTORS.find(t => t.id === expertId);
  }).filter(Boolean) as Tutor[];

  const unlockedMods = profile.unlockedModules || ['m1'];

  return (
    <div className="flex flex-col min-h-screen p-6 relative bg-transparent overflow-y-auto pb-24 scrollbar-hide">
      <header className="pt-6 mb-10 relative z-10">
        <div className="flex items-center justify-between mb-10">
          <button onClick={onBack} className="flex items-center gap-2 text-zinc-500 hover:text-white transition-all duration-300 text-xs font-semibold uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded-full border border-white/5 hover:border-white/20">
            <ArrowLeft size={14} />
            <span>Volver</span>
          </button>
          <div className="flex items-center gap-2 opacity-30">
             <div className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center text-white">
               <Sparkles size={10} />
             </div>
             <span className="font-semibold tracking-[0.2em] uppercase text-[9px] text-white">Unidos AI</span>
          </div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${category.iconBgClass} border border-white/10 text-[10px] font-bold mb-6 uppercase tracking-[0.15em] shadow-lg shadow-black/20`}
        >
          <IconComponent size={14} />
          <span>Contenido Académico</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl font-display font-medium tracking-tight mb-4 leading-tight text-white"
        >
          {category.title}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-zinc-400 font-light leading-relaxed max-w-sm text-sm"
        >
          {category.description}
        </motion.p>
      </header>

      {categoryId === 'padres' && (
        <div className="space-y-4 relative z-10 mb-12">
          <div className="flex items-center gap-3 mb-8 mt-4">
            <div className="h-px bg-amber-500/20 flex-1" />
            <h2 className="text-sm text-amber-500 font-semibold tracking-widest uppercase flex items-center gap-2">
              <Sparkles size={14} /> Ruta de Aprendizaje
            </h2>
            <div className="h-px bg-amber-500/20 flex-1" />
          </div>
          
          <div className="relative py-8">
            {/* The vertical line */}
            <div className="absolute top-0 bottom-0 left-6 md:left-1/2 w-1 bg-zinc-900 border border-zinc-800 -translate-x-1/2 rounded-full overflow-hidden">
               {/* Progress bar fill */}
               <div 
                 className="w-full bg-gradient-to-b from-amber-400 to-amber-600 rounded-full transition-all duration-1000 ease-out" 
                 style={{ height: `${(unlockedMods.length / UNIDOS_COURSE.length) * 100}%` }}
               />
            </div>
            
            <div className="flex flex-col gap-12 relative z-10">
               {UNIDOS_COURSE.map((mod, index) => {
                 const isUnlocked = unlockedMods.includes(mod.id);
                 const actuallyUnlocked = isUnlocked || index === 0;

                 const isCompleted = actuallyUnlocked && index < unlockedMods.length - 1;
                 const isActive = actuallyUnlocked && index === unlockedMods.length - 1;
                 const isLocked = !actuallyUnlocked;

                 const isEven = index % 2 === 0;

                 return (
                   <div key={mod.id} className={`flex items-center gap-6 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                      {/* Node spacer for desktop */}
                      <div className="hidden md:block flex-1" />

                      {/* Node Icon */}
                      <div className="relative shrink-0 flex items-center justify-center w-12 h-12">
                        {isActive && (
                          <motion.div 
                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute inset-0 bg-amber-500 rounded-full"
                          />
                        )}
                        <button
                           disabled={isLocked}
                           onClick={() => onSelectExpert(mod.tutorId, mod.id)}
                           className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center border-4 transition-colors duration-500 ${
                             isCompleted ? 'bg-amber-500 border-[#050505] text-white shadow-[0_0_15px_rgba(245,158,11,0.5)]' :
                             isActive ? 'bg-zinc-900 border-amber-500 text-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.4)] cursor-pointer' :
                             'bg-zinc-950 border-zinc-800 text-zinc-600 cursor-not-allowed'
                           }`}
                        >
                           {isCompleted ? <CheckCircle2 size={20} /> :
                            isActive ? <Play fill="currentColor" size={18} className="ml-1" /> :
                            <Lock size={18} />}
                        </button>
                      </div>

                      {/* Card */}
                      <motion.div
                        whileHover={actuallyUnlocked ? { scale: 1.01, translateY: -2 } : {}}
                        onClick={() => { if(actuallyUnlocked) onSelectExpert(mod.tutorId, mod.id) }}
                        className={`flex-1 p-6 rounded-[2rem] border transition-all duration-500 ${actuallyUnlocked ? 'cursor-pointer' : ''} ${
                          isActive ? 'glass border-amber-500/40 shadow-[0_20px_50px_rgba(245,158,11,0.1)]' :
                          isCompleted ? 'bg-zinc-900/30 border-zinc-800/50 hover:border-zinc-700/50' :
                          'bg-zinc-950/20 border-zinc-900/30 opacity-40'
                        }`}
                      >
                         <div className="flex items-center justify-between mb-3">
                            <span className={`text-[10px] font-bold tracking-[0.2em] uppercase ${isActive ? 'text-amber-500' : isCompleted ? 'text-zinc-500' : 'text-zinc-600'}`}>
                              Módulo {index + 1}
                            </span>
                            {isCompleted && <CheckCircle2 size={14} className="text-amber-500/50" />}
                         </div>
                         <h3 className={`text-xl font-display font-medium mb-3 ${actuallyUnlocked ? 'text-white' : 'text-zinc-500'}`}>{mod.emoji} {mod.title.replace(`Módulo ${index+1}: `, '')}</h3>
                         <p className={`text-xs leading-relaxed font-light ${actuallyUnlocked ? 'text-zinc-400' : 'text-zinc-600'}`}>
                           {mod.description}
                         </p>
                      </motion.div>
                   </div>
                 );
               })}
            </div>
          </div>
          
          {/* Círculo Unidos (Comunidad) */}
          <div className="mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px bg-white/5 flex-1" />
              <h2 className="text-[10px] text-zinc-500 font-bold tracking-[0.3em] uppercase flex items-center gap-2">
                <Users size={12} /> Círculo de Resiliencia
              </h2>
              <div className="h-px bg-white/5 flex-1" />
            </div>

            <div className="glass border-white/5 rounded-[2.5rem] p-8 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full" />
               <h3 className="text-white font-display text-lg font-medium mb-2">Duda de la comunidad</h3>
               {unlockedMods.includes('m5') ? (
                 <>
                   <p className="text-sm text-zinc-400 mb-6">"¿Qué recomiendan preguntar en las reuniones de padres?"</p>
                   <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-5">
                     <div className="flex items-center gap-3 mb-3">
                       <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs shadow-lg shadow-indigo-500/30">
                         <Sparkles size={12} />
                       </div>
                       <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">Tutor Vitalis</span>
                     </div>
                     <p className="text-sm text-indigo-100/90 leading-relaxed font-light">
                       Otros padres de Vitalis recomiendan: en lugar de preguntar "¿Cómo se está portando?", pregunta "¿En qué área lo ve más motivado y cómo podemos potenciar eso desde casa?". El enfoque siempre debe ser de equipo.
                     </p>
                   </div>
                 </>
               ) : (
                 <>
                   <p className="text-sm text-zinc-400 mb-6">"¿Cómo reaccionar ante un berrinche en público sin perder la paciencia?"</p>
                   <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-5">
                     <div className="flex items-center gap-3 mb-3">
                       <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs shadow-lg shadow-indigo-500/30">
                         <Sparkles size={12} />
                       </div>
                       <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">Tutor Vitalis</span>
                     </div>
                     <p className="text-sm text-indigo-100/90 leading-relaxed font-light">
                       En lugar de centrarte en las miradas de otros, baja al nivel visual de tu hijo y valida su frustración. Usa una frase corta: "Sé que estás molesto, querías llevar eso. Entiendo." No pidas calma gritando, ofrécela tú. Eres su ancla emocional.
                     </p>
                   </div>
                 </>
               )}
            </div>
          </div>
          {/* Floating Bot */}
          <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 max-w-[280px]">
             {unlockedMods.length >= 4 && (
                <motion.button 
                   initial={{ opacity: 0, scale: 0.8 }}
                   animate={{ opacity: 1, scale: 1 }}
                   whileHover={{ scale: 1.05 }}
                   className="bg-red-500/20 text-red-500 border border-red-500/50 shadow-lg shadow-red-500/10 px-4 py-2 rounded-full font-semibold text-sm flex items-center gap-2 mb-2 hover:bg-red-500 hover:text-white transition-colors"
                   onClick={() => onSelectExpert('elena', 'sos')}
                >
                   <LucideIcons.AlertTriangle size={16} />
                   S.O.S. Crisis
                </motion.button>
             )}
             <div className="flex items-end gap-3">
               <motion.div 
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="bg-zinc-900 border border-zinc-800 p-3 rounded-2xl rounded-br-none shadow-2xl relative"
               >
                  <p className="text-xs text-zinc-300">¡Hola {profile.name}! ¿Listo para empezar el Módulo {Math.min(unlockedMods.length, 8)}? Solo te tomará 5 minutos.</p>
                  {/* Arrow pointing to avatar */}
                  <div className="absolute -bottom-2 right-0 w-3 h-3 bg-zinc-900 border-b border-r border-zinc-800 transform translate-x-1/2 translate-y-1/2 rotate-45"></div>
               </motion.div>
               <motion.div 
                 whileHover={{ scale: 1.1 }}
                 className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 p-1 shadow-[0_0_15px_rgba(245,158,11,0.3)] shrink-0"
               >
                  <div className="w-full h-full bg-zinc-950 rounded-full flex items-center justify-center border-2 border-transparent relative overflow-hidden">
                     <div className="absolute inset-0 bg-amber-500/20 blur-xl"></div>
                     <Sparkles size={20} className="text-amber-500 z-10" />
                  </div>
               </motion.div>
             </div>
          </div>
        </div>
      )}

      <div className="space-y-4 relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px bg-white/10 flex-1" />
          <h2 className="text-sm text-gray-500 font-semibold tracking-widest uppercase">Especialistas disponibles</h2>
          <div className="h-px bg-white/10 flex-1" />
        </div>
        
        {categoryExperts.map((expert) => (
          <motion.div 
            key={expert.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#111] border border-white/5 rounded-3xl p-5 transition-colors hover:border-white/10"
          >
            <div className="flex items-start justify-between mb-3">
               <div>
                  <h3 className="text-lg font-medium mb-1">{expert.name}</h3>
                  <span className="inline-block px-3 py-1 bg-white/5 text-gray-300 text-[10px] font-semibold rounded-full uppercase tracking-wider">
                     {expert.specialty}
                  </span>
               </div>
               <div className="w-10 h-10 rounded-full bg-indigo-900/50 border border-indigo-500/30 flex items-center justify-center text-sm font-medium shrink-0">
                 {expert.name[0]}
               </div>
            </div>
            
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
               {expert.description}
            </p>

            <button
               onClick={() => onSelectExpert(expert.id)}
               className="w-full py-3 bg-white/10 text-white text-sm font-medium rounded-xl flex items-center justify-center gap-2 hover:bg-white/20 transition-colors"
            >
               <Play size={14} fill="currentColor" />
               Hablar con {expert.name}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
