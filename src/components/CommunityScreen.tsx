import { motion } from 'motion/react';
import { ArrowLeft, Heart, MessageCircle, Share2, Sparkles, Trophy, Users, Play, Radio, Flame, Award } from 'lucide-react';
import { UserProfile } from '../lib/db';
import { useState } from 'react';

interface Props {
  profile: UserProfile;
  onBack: () => void;
}

export default function CommunityScreen({ profile, onBack }: Props) {
  const [activeTab, setActiveTab] = useState<'muro' | 'oraculo' | 'retos'>('muro');

  const isGraduated = profile.unlockedModules?.length === 8;

  const mockPosts = [
    {
      id: 1,
      author: "Sofía M.",
      badge: "Mentora",
      time: "Hace 2h",
      content: "¡Victoria! Hoy logré aplicar la técnica de dar opciones limitadas en vez de quitarle la tablet a la fuerza. Funcionó increíble, cero gritos. ¡Sí se puede! 💪",
      likes: 24,
      comments: 5
    },
    {
      id: 2,
      author: "Carlos P.",
      badge: "Guardián del Equilibrio",
      time: "Hace 4h",
      content: "La semana pasada tuve una sesión con el Módulo 6 sobre Emociones. Hoy pude dominar mi frustración antes de explotar. Respirar funciona, se los prometo.",
      likes: 18,
      comments: 2
    }
  ];

  return (
    <div className="flex flex-col h-full min-h-screen bg-zinc-950 pb-8">
      {/* Header */}
      <header className="px-6 py-6 border-b border-white/5 bg-zinc-950/80 sticky top-0 z-30 backdrop-blur-md">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={onBack} className="p-2 -ml-2 text-zinc-400 hover:text-white rounded-full hover:bg-white/5 transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-xl font-medium tracking-tight text-white flex items-center gap-2">
              <Users size={20} className="text-amber-500" />
              El Círculo Vitalis
            </h1>
            <p className="text-xs text-zinc-500 tracking-wider uppercase font-medium mt-1">Comunidad Privada</p>
          </div>
        </div>

        {/* Gamification / Profile Area */}
        <div className="flex items-center gap-4 bg-zinc-900 border border-zinc-800 rounded-2xl p-4 shadow-lg shadow-black/50">
           <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-lg shadow-lg shrink-0 ${isGraduated ? 'border-amber-400 bg-amber-500/20 text-amber-500 shadow-amber-500/20' : 'border-indigo-400 bg-indigo-500/20 text-indigo-400 shadow-indigo-500/20'}`}>
             {profile.name[0]}
           </div>
           <div>
             <h3 className="font-semibold text-white">{profile.name}</h3>
             <div className="flex items-center gap-2 mt-1">
                {isGraduated ? (
                  <span className="text-xs bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded flex items-center gap-1 font-medium border border-amber-500/20">
                     <Award size={10} /> Mentor
                  </span>
                ) : (
                  <span className="text-xs bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded flex items-center gap-1 font-medium border border-indigo-500/20">
                     <Sparkles size={10} /> Aprendiz
                  </span>
                )}
                <span className="text-xs text-zinc-400 flex items-center gap-1">
                  <Flame size={12} className="text-orange-500" /> 120 Karma
                </span>
             </div>
           </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mt-6 overflow-x-auto pb-2 scrollbar-hide">
           <button 
             onClick={() => setActiveTab('muro')}
             className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeTab === 'muro' ? 'bg-white text-black' : 'bg-zinc-900 text-zinc-400 hover:text-white'}`}
           >
              Muro de Sabiduría
           </button>
           <button 
             onClick={() => setActiveTab('oraculo')}
             className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeTab === 'oraculo' ? 'bg-amber-500 text-black' : 'bg-zinc-900 text-zinc-400 hover:text-white'}`}
           >
              El Oráculo IA
           </button>
           <button 
             onClick={() => setActiveTab('retos')}
             className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeTab === 'retos' ? 'bg-indigo-500 text-white' : 'bg-zinc-900 text-zinc-400 hover:text-white'}`}
           >
              Retos Grupales
           </button>
        </div>
      </header>

      {/* Content */}
      <div className="px-6 py-6 flex-1">
         {activeTab === 'muro' && (
           <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              
              {/* Write Post */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-4">
                 <input type="text" placeholder="Comparte una victoria hoy..." className="w-full bg-black/50 border border-zinc-800 rounded-2xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors" />
              </div>

              {/* Grupos por Etapa */}
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                 {['Todos', 'Pre-escolares', 'Adolescentes', 'Familia Numerosa'].map((stage, idx) => (
                    <button key={idx} className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${idx === 0 ? 'bg-amber-500/20 text-amber-500 border border-amber-500/30' : 'bg-transparent text-zinc-400 border border-zinc-700 hover:text-white'}`}>
                       {stage}
                    </button>
                 ))}
              </div>

              {/* Weekly Summary from Bot */}
              <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-3xl p-5 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 opacity-10">
                   <Sparkles size={100} />
                 </div>
                 <div className="flex items-center gap-2 text-indigo-400 mb-3">
                    <Sparkles size={16} />
                    <span className="text-xs font-semibold uppercase tracking-wider">Resumen Semanal de Fredo</span>
                 </div>
                 <p className="text-sm text-indigo-100/90 leading-relaxed">
                   "Esta semana, la comunidad aprendió que la paciencia es nuestra mejor herramienta. El consejo más destacado fue: dar opciones en vez de dar órdenes."
                 </p>
              </div>

              {/* Feed */}
              {mockPosts.map((post) => (
                 <div key={post.id} className="bg-zinc-900/50 border border-zinc-800/80 rounded-3xl p-5 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                       <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 font-bold text-sm">
                             {post.author[0]}
                          </div>
                          <div>
                             <h4 className="text-sm font-medium text-white flex items-center gap-2">
                               {post.author}
                               {post.badge === 'Mentora' && (
                                 <span className="bg-amber-500/20 text-amber-500 px-1.5 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">Mentora</span>
                               )}
                             </h4>
                             <p className="text-xs text-zinc-500">{post.time}</p>
                          </div>
                       </div>
                    </div>
                    <p className="text-sm text-zinc-300 leading-relaxed mb-5">
                       {post.content}
                    </p>
                    <div className="flex items-center gap-6 pt-4 border-t border-zinc-800/50">
                       <button className="flex items-center gap-2 text-zinc-400 hover:text-rose-500 transition-colors text-xs font-medium">
                          <Heart size={16} /> {post.likes}
                       </button>
                       <button className="flex items-center gap-2 text-zinc-400 hover:text-indigo-400 transition-colors text-xs font-medium">
                          <MessageCircle size={16} /> {post.comments}
                       </button>
                       <button className="flex items-center gap-2 text-zinc-400 hover:text-zinc-200 transition-colors text-xs font-medium ml-auto">
                          <Share2 size={16} />
                       </button>
                    </div>
                 </div>
              ))}
           </motion.div>
         )}

         {activeTab === 'oraculo' && (
           <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
              <div className="text-center mb-8">
                 <div className="w-16 h-16 mx-auto bg-amber-500/20 border border-amber-500/30 rounded-full flex items-center justify-center mb-4 text-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.2)]">
                   <Radio size={28} />
                 </div>
                 <h2 className="text-white font-medium text-lg">El Oráculo</h2>
                 <p className="text-zinc-400 text-sm mt-1">Preguntas comunes respondidas por Fredo IA</p>
              </div>

              {[
                { title: "¿Cómo manejar la adicción a las pantallas?", min: "3:45" },
                { title: "El miedo a la oscuridad en preescolares", min: "2:10" },
                { title: "Cuando un 'No' se convierte en rabieta", min: "4:20" }
              ].map((podcast, i) => (
                <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-3xl p-4 flex items-center gap-4 hover:bg-zinc-800/50 transition-colors cursor-pointer">
                   <button className="w-12 h-12 bg-amber-500 text-zinc-950 rounded-full flex items-center justify-center shrink-0 hover:scale-105 transition-transform shadow-lg shadow-amber-500/20">
                     <Play size={20} fill="currentColor" />
                   </button>
                   <div>
                     <h4 className="text-white font-medium text-sm leading-tight mb-1">{podcast.title}</h4>
                     <p className="text-zinc-500 text-xs flex items-center gap-1">
                       Podcast Vitalis • {podcast.min} min
                     </p>
                   </div>
                </div>
              ))}
           </motion.div>
         )}

         {activeTab === 'retos' && (
           <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-6 relative overflow-hidden shadow-xl shadow-indigo-500/20">
                 <div className="relative z-10">
                    <span className="bg-black/20 text-white px-2 py-1 rounded-md text-xs font-bold uppercase tracking-wider mb-3 inline-block">Reto de la Semana</span>
                    <h3 className="text-white font-display font-medium text-2xl mb-2 leading-tight">Desconexión Total</h3>
                    <p className="text-indigo-100 text-sm mb-6 max-w-[200px]">15 minutos sin pantallas al llegar a casa cada día.</p>
                    
                    <div className="bg-black/20 rounded-full p-2 flex items-center justify-between gap-4 backdrop-blur-md">
                       <div className="flex-1 bg-white/20 h-2 rounded-full overflow-hidden">
                         <div className="bg-white h-full w-[65%]" />
                       </div>
                       <span className="text-xs font-bold text-white shrink-0">150 Padres unidos</span>
                    </div>
                 </div>
                 <Trophy size={140} className="absolute -right-6 -bottom-6 text-white opacity-10 rotate-12" />
              </div>

              <button className="w-full bg-white text-black font-semibold rounded-full py-4 shadow-lg hover:shadow-white/20 transition-all active:scale-95">
                 ¡Unirme al Reto!
              </button>
           </motion.div>
         )}
      </div>
    </div>
  );
}
