import { motion } from 'motion/react';
import { UserProfile } from '../lib/db';
import { UNIDOS_COURSE } from '../lib/courses';
import { BookOpen, Users, Star, Zap, Shield, Heart, ChevronRight, GraduationCap, Sparkles, Lock } from 'lucide-react';

interface Props {
  profile: UserProfile | null;
  onSelectCategory: (id: string) => void;
  onStartIntake: () => void;
  onLogout: () => void;
  onShowCommunity: () => void;
}

const STATS = [
  { value: '1,926', label: 'Sesiones IA', icon: Sparkles },
  { value: '3,279', label: 'Padres Capacitados', icon: Users },
  { value: '8', label: 'Módulos', icon: BookOpen },
  { value: '100%', label: 'Satisfacción', icon: Star },
];

const TUTORES = [
  {
    name: 'Elena',
    role: 'Psicóloga Familiar IA',
    specialty: 'Comunicación, Disciplina Positiva y Vínculos Emocionales',
    modules: 'Módulos 1–3',
    emoji: '👩‍🏫',
    color: 'rgba(46,202,198,0.08)',
    border: 'rgba(46,202,198,0.2)',
  },
  {
    name: 'Marcos',
    role: 'Especialista en Desarrollo IA',
    specialty: 'Etapas del Desarrollo, Educación y Rutinas Familiares',
    modules: 'Módulos 4–6',
    emoji: '👨‍💼',
    color: 'rgba(93,213,207,0.06)',
    border: 'rgba(93,213,207,0.15)',
  },
  {
    name: 'Sofía',
    role: 'Consejera de Resiliencia IA',
    specialty: 'Proyecto de Vida Familiar, Metas y Bienestar Integral',
    modules: 'Módulos 7–8',
    emoji: '👩‍⚕️',
    color: 'rgba(46,202,198,0.05)',
    border: 'rgba(46,202,198,0.12)',
  },
];

const PILARES = [
  { icon: Zap, title: 'Potenciando Capacidades', desc: 'Fomentamos las habilidades parentales desde la primera instancia familiar.' },
  { icon: Shield, title: 'Reforzando las Bases', desc: 'Aunados a la familia, reforzamos las bases del desarrollo emocional.' },
  { icon: Heart, title: 'Instrucción Familiar', desc: 'Actividades para lograr autoestima y autorrealización en los hijos.' },
  { icon: GraduationCap, title: 'Sistema Educativo Eficiente', desc: 'Promovemos un sistema que no limite la independencia del niño.' },
];

export default function HomeScreen({ profile, onSelectCategory, onStartIntake, onLogout, onShowCommunity }: Props) {
  const unlockedMods = profile?.unlockedModules || ['m1'];

  return (
    <div className="min-h-screen text-zinc-50 overflow-x-hidden">

      {/* ── NAVBAR ── */}
      <nav className="sticky top-0 z-50 border-b border-white/5"
        style={{ background: 'rgba(5,5,5,0.85)', backdropFilter: 'blur(20px)' }}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-zinc-950 text-lg"
              style={{ background: 'linear-gradient(135deg, #2ECAC6, #5dd5cf)' }}>
              Ü
            </div>
            <span className="font-bold text-sm tracking-[0.15em] uppercase text-white">Unidos AI</span>
          </div>

          {/* Nav Links — desktop */}
          <div className="hidden md:flex items-center gap-8 text-sm text-zinc-400">
            <a href="#cursos" className="hover:text-teal-400 transition-colors">Cursos</a>
            <a href="#especialistas" className="hover:text-teal-400 transition-colors">Especialistas IA</a>
            <a href="#nosotros" className="hover:text-teal-400 transition-colors">Nosotros</a>
            <button onClick={onShowCommunity} className="hover:text-teal-400 transition-colors">Comunidad</button>
          </div>

          {/* CTA */}
          {profile ? (
            <div className="flex items-center gap-3">
              <button onClick={() => onSelectCategory('padres')}
                className="btn-teal text-xs px-4 py-2">
                Mis Módulos
              </button>
              <button onClick={onLogout}
                className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
                Salir
              </button>
            </div>
          ) : (
            <button onClick={onStartIntake} className="btn-teal text-xs px-5 py-2.5">
              Iniciar sesión
            </button>
          )}
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Background image overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent z-10" />
          <div className="w-full h-full bg-zinc-900"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1609220136736-443140cffec6?w=1400&q=80')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center right',
            }} />
        </div>

        {/* Organic decorative shapes */}
        <div className="absolute right-[5%] top-[10%] w-64 h-64 blob opacity-30 z-5"
          style={{ background: 'linear-gradient(135deg, rgba(46,202,198,0.3), rgba(93,213,207,0.1))' }} />
        <div className="absolute right-[15%] bottom-[15%] w-32 h-32 blob-2 opacity-20 z-5"
          style={{ background: 'rgba(46,202,198,0.4)' }} />

        <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 py-24">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-xs font-bold tracking-[0.3em] uppercase mb-5"
              style={{ color: '#2ECAC6' }}>
              EDUCACIÓN ONLINE PARA PADRES
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.05] tracking-tight mb-8 max-w-2xl">
              Potencia tus{' '}
              <span style={{ color: '#2ECAC6' }}>habilidades</span>{' '}
              y contribuye al desarrollo de tus hijos.
            </h1>
            <p className="text-zinc-400 text-lg font-light leading-relaxed max-w-xl mb-4">
              ¿Quieres involucrarte en el desarrollo de tus hijos, en cualquier momento y en cualquier lugar?
            </p>
            <p className="text-zinc-300 font-medium max-w-xl mb-10 leading-relaxed">
              Haz crecer tu conocimiento y construye un correcto desarrollo emocional y educativo de tus hijos con IA disponible 24/7.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={profile ? () => onSelectCategory('padres') : onStartIntake}
                className="btn-teal px-8 py-4 text-sm flex items-center gap-2.5 shadow-teal">
                <Users size={16} />
                {profile ? 'Continuar mi ruta' : 'Ver todos los módulos'}
              </button>
              <button
                onClick={onShowCommunity}
                className="btn-outline-teal px-8 py-4 text-sm">
                Comunidad Unidos
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-20 border-y border-white/5" style={{ background: 'rgba(46,202,198,0.03)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <p className="text-4xl md:text-5xl font-bold font-display mb-2"
                  style={{ color: '#2ECAC6' }}>
                  {s.value}
                </p>
                <p className="text-xs text-zinc-500 uppercase tracking-[0.2em] font-semibold">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT / PILARES ── */}
      <section id="nosotros" className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Organic image collage */}
          <div className="relative h-[480px] hidden md:block">
            <div className="absolute top-0 left-0 w-56 h-56 blob overflow-hidden border-4 border-zinc-900">
              <img src="https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?w=400&q=80" className="w-full h-full object-cover" alt="Familia" />
            </div>
            <div className="absolute top-[30%] right-0 w-48 h-48 blob-2 overflow-hidden border-4 border-zinc-900">
              <img src="https://images.unsplash.com/photo-1581952976147-5a2d15560349?w=400&q=80" className="w-full h-full object-cover" alt="Padre e hijo" />
            </div>
            <div className="absolute bottom-0 left-[20%] w-52 h-52 blob overflow-hidden border-4 border-zinc-900">
              <img src="https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=400&q=80" className="w-full h-full object-cover" alt="Familia feliz" />
            </div>
            {/* Decorative Ü */}
            <div className="absolute top-[45%] left-[38%] text-8xl font-bold opacity-10 select-none pointer-events-none"
              style={{ color: '#2ECAC6' }}>Ü</div>
            {/* Dot patterns */}
            <div className="absolute top-[10%] right-[10%] grid grid-cols-5 gap-2">
              {Array.from({ length: 25 }).map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-teal-500/30" />
              ))}
            </div>
          </div>

          {/* Right: Content */}
          <div>
            <p className="text-xs font-bold tracking-[0.3em] uppercase mb-4" style={{ color: '#2ECAC6' }}>
              EDUCACIÓN ONLINE PARA PADRES
            </p>
            <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight mb-6 tracking-tight">
              ¡Desarrolla tus habilidades desde cualquier lugar!
            </h2>
            <p className="text-zinc-400 font-light leading-relaxed mb-4">
              Entendemos que el aprendizaje en línea supone un cambio significativo para llegar a los padres de todo el mundo.
            </p>
            <p className="text-zinc-300 font-medium leading-relaxed mb-10">
              Unidos AI dota a los padres de una educación que posibilita un correcto desarrollo emocional y educativo de sus hijos, usando la tecnología de Inteligencia Artificial para promover su participación consciente y activa.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-10">
              {PILARES.map((p) => (
                <div key={p.title} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: 'rgba(46,202,198,0.1)', border: '1px solid rgba(46,202,198,0.2)' }}>
                    <p.icon size={14} style={{ color: '#2ECAC6' }} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white mb-1">{p.title}</p>
                    <p className="text-xs text-zinc-500 leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={profile ? () => onSelectCategory('padres') : onStartIntake}
              className="btn-teal px-7 py-3.5 text-sm flex items-center gap-2">
              <BookOpen size={15} /> Ver todos los módulos
            </button>
          </div>
        </div>
      </section>

      {/* ── TUTORES IA (Especialistas) ── */}
      <section id="especialistas" className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-bold tracking-[0.3em] uppercase mb-4" style={{ color: '#2ECAC6' }}>
              ESPECIALISTA DEL CURSO
            </p>
            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4">
              Tutores IA de Unidos
            </h2>
            <p className="text-zinc-400 font-light max-w-xl mx-auto leading-relaxed">
              ¡Nuestras clases están acreditadas por el Modelo ProLab (PUCP)!<br />
              ¡Descubre la mejor experiencia en cursos virtuales para padres!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TUTORES.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="rounded-3xl p-7 cursor-pointer group"
                style={{ background: t.color, border: `1px solid ${t.border}` }}
                onClick={profile ? () => onSelectCategory('padres') : onStartIntake}
              >
                <div className="text-5xl mb-5">{t.emoji}</div>
                <h3 className="text-xl font-display font-bold text-white mb-1">{t.name}</h3>
                <p className="text-xs font-bold mb-4" style={{ color: '#2ECAC6' }}>{t.role}</p>
                <p className="text-sm text-zinc-400 font-light leading-relaxed mb-6">{t.specialty}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-500 font-medium">{t.modules}</span>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform"
                    style={{ background: 'rgba(46,202,198,0.15)' }}>
                    <ChevronRight size={14} style={{ color: '#2ECAC6' }} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MÓDULOS (Course Grid) ── */}
      <section id="cursos" className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-bold tracking-[0.3em] uppercase mb-4" style={{ color: '#2ECAC6' }}>
              APRENDE A TU PROPIO RITMO
            </p>
            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4">
              Nuestros módulos populares
            </h2>
            <p className="text-zinc-400 font-light max-w-xl mx-auto">
              ¡Explora todos nuestros módulos y elige los adecuados para comenzar a aprender con nosotros!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {UNIDOS_COURSE.map((mod, i) => {
              const isUnlocked = unlockedMods.includes(mod.id) || i === 0;
              const isCompleted = isUnlocked && i < unlockedMods.length - 1;
              const isActive = isUnlocked && i === unlockedMods.length - 1;

              return (
                <motion.div
                  key={mod.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 3) * 0.1 }}
                  whileHover={isUnlocked ? { y: -4, transition: { duration: 0.2 } } : {}}
                  onClick={() => { if (isUnlocked) onSelectCategory('padres'); else if (!profile) onStartIntake(); }}
                  className={`rounded-3xl overflow-hidden border transition-all duration-300 ${isUnlocked ? 'cursor-pointer' : 'opacity-60 cursor-default'}`}
                  style={{
                    background: isActive ? 'rgba(46,202,198,0.07)' : 'rgba(255,255,255,0.03)',
                    borderColor: isActive ? 'rgba(46,202,198,0.3)' : 'rgba(255,255,255,0.07)',
                  }}
                >
                  {/* Card header */}
                  <div className="p-6 pb-0">
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-3xl">{mod.emoji}</span>
                      {isCompleted ? (
                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
                          style={{ background: 'rgba(46,202,198,0.15)', color: '#2ECAC6' }}>
                          Completado
                        </span>
                      ) : isActive ? (
                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
                          style={{ background: 'rgba(46,202,198,0.2)', color: '#2ECAC6', border: '1px solid rgba(46,202,198,0.3)' }}>
                          Activo
                        </span>
                      ) : isUnlocked ? null : (
                        <Lock size={14} className="text-zinc-600 mt-1" />
                      )}
                    </div>
                    <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-600 mb-2">
                      Módulo {i + 1}
                    </p>
                    <h3 className="text-base font-display font-bold text-white mb-3 leading-snug">
                      {mod.title.replace(`Módulo ${i + 1}: `, '')}
                    </h3>
                    <p className="text-xs text-zinc-500 font-light leading-relaxed mb-5">
                      {mod.description}
                    </p>
                  </div>

                  {/* Card footer */}
                  <div className="px-6 py-4 flex items-center justify-between border-t border-white/5">
                    <div className="flex items-center gap-2 text-zinc-500 text-xs">
                      <Sparkles size={11} style={{ color: '#2ECAC6' }} />
                      <span>Tutor IA · {mod.tutorId === 'elena' ? 'Elena' : mod.tutorId === 'marcos' ? 'Marcos' : 'Sofía'}</span>
                    </div>
                    {isUnlocked && (
                      <ChevronRight size={14} className="text-zinc-600" />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {!profile && (
            <div className="text-center mt-14">
              <button onClick={onStartIntake} className="btn-teal px-10 py-4 text-sm">
                Únete gratis ahora
              </button>
              <p className="text-xs text-zinc-600 mt-3">
                Accede a la mejor manera de involucrarte en el desarrollo de tu hijo.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="py-24 border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(46,202,198,0.05) 0%, transparent 70%)' }} />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <p className="text-xs font-bold tracking-[0.3em] uppercase mb-5" style={{ color: '#2ECAC6' }}>
            PILARES DE ENSEÑANZA
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-6">
            Accede a Unidos AI<br />
            <span className="text-zinc-400 font-light">Una plataforma educativa que promueve un buen sistema familiar</span>
          </h2>
          <p className="text-zinc-400 font-light leading-relaxed mb-2 max-w-xl mx-auto">
            Un sistema de enseñanza para potenciar a los padres, permitirá dar a conocer la importancia del desarrollo de todos los factores parentales, dotando a la sociedad de buenos miembros.
          </p>
          <p className="text-xs text-zinc-600 mb-10">
            Basado en la Tesis ProLab PUCP · Raúl Gonzáles Morales
          </p>
          <button onClick={profile ? () => onSelectCategory('padres') : onStartIntake}
            className="btn-teal px-12 py-4 text-sm shadow-teal">
            ¡Comienza Ya!
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/5 py-12 px-6" style={{ background: 'rgba(0,0,0,0.4)' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-zinc-950 text-base"
              style={{ background: 'linear-gradient(135deg, #2ECAC6, #5dd5cf)' }}>
              Ü
            </div>
            <span className="font-bold text-xs tracking-[0.15em] uppercase text-zinc-400">Unidos AI</span>
          </div>
          <p className="text-xs text-zinc-600 flex items-center gap-2">
            Tecnología al servicio del bienestar familiar <Heart size={12} style={{ color: '#2ECAC6' }} />
          </p>
          <div className="flex gap-6 text-xs text-zinc-600">
            <a href="#" className="hover:text-zinc-400 transition-colors">Privacidad</a>
            <a href="#" className="hover:text-zinc-400 transition-colors">Términos</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
