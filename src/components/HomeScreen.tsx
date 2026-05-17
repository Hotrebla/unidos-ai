import { motion } from 'motion/react';
import { UserProfile } from '../lib/db';
import { UNIDOS_COURSE } from '../lib/courses';
import { BookOpen, Users, Star, Monitor, Award, ChevronRight, Sparkles, Lock, Search } from 'lucide-react';

interface Props {
  profile: UserProfile | null;
  onSelectCategory: (id: string) => void;
  onStartIntake: () => void;
  onLogout: () => void;
  onShowCommunity: () => void;
}

/* ── Logo SVG — doble lazo enlazado de Unidos ── */
function UnidosLogo({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 6 C6 6 6 14 12 14 C18 14 18 6 12 6Z M28 6 C22 6 22 14 28 14 C34 14 34 6 28 6Z"
        stroke="#2ECAC6" strokeWidth="2.5" fill="none"
      />
      <path
        d="M12 14 C6 14 6 34 20 34 C34 34 34 14 28 14"
        stroke="#2ECAC6" strokeWidth="2.5" fill="none" strokeLinecap="round"
      />
      <line x1="12" y1="14" x2="28" y2="14" stroke="#2ECAC6" strokeWidth="2.5" />
    </svg>
  );
}

const STATS = [
  { value: '1,926', label: 'Sesiones IA completadas' },
  { value: '3,279', label: 'Padres Capacitados' },
  { value: '98%', label: 'Nivel de Satisfacción' },
  { value: '8', label: 'Módulos del Programa' },
];

const FEATURE_CARDS = [
  { icon: Monitor, title: 'Desarrolla tus habilidades', desc: 'Involúcrate en el aprendizaje de tu hijo, repotenciando tus habilidades para un mejor futuro y diciendo adiós al pasado.', cta: '¡Empezar ahora!' },
  { icon: BookOpen, title: 'Aprende a tu propio ritmo', desc: 'En Unidos AI no conocerás barreras de tiempo ni de lugar. Sesiones de 5 minutos disponibles 24/7 con IA.', cta: '¡Empezar ahora!' },
  { icon: Award, title: 'Aprende con tutores IA', desc: 'Estudia con tutores IA especializados en diferentes áreas del desarrollo parental, disponibles cuando los necesites.', cta: '¡Empezar ahora!' },
];

const TUTORES = [
  { name: 'Elena', role: 'Psicóloga Familiar IA', specialty: 'Comunicación y Disciplina Positiva', modules: 'Módulos 1–3', emoji: '👩‍🏫' },
  { name: 'Marcos', role: 'Especialista en Desarrollo IA', specialty: 'Desarrollo Infantil y Educación', modules: 'Módulos 4–6', emoji: '👨‍💼' },
  { name: 'Sofía', role: 'Consejera de Resiliencia IA', specialty: 'Proyecto de Vida y Bienestar', modules: 'Módulos 7–8', emoji: '👩‍⚕️' },
];

export default function HomeScreen({ profile, onSelectCategory, onStartIntake, onLogout, onShowCommunity }: Props) {
  const unlockedMods = profile?.unlockedModules || ['m1'];

  return (
    <div style={{ background: '#ffffff', color: '#333333', fontFamily: 'Inter, sans-serif', minHeight: '100vh' }}>

      {/* ── NAVBAR ── */}
      <nav style={{ background: '#ffffff', borderBottom: '1px solid #e8e8e8', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <UnidosLogo size={32} />
            <span style={{ fontWeight: 700, fontSize: 15, letterSpacing: '0.12em', color: '#333', textTransform: 'uppercase' }}>Unidos</span>
          </div>

          {/* Search */}
          <div style={{ display: 'flex', alignItems: 'center', background: '#f5f5f5', borderRadius: 24, padding: '6px 14px', gap: 8, maxWidth: 240, flex: 1 }}>
            <Search size={14} color="#999" />
            <input placeholder="Buscar" style={{ border: 'none', background: 'transparent', fontSize: 13, color: '#333', outline: 'none', width: '100%' }} />
          </div>

          {/* Nav links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, fontSize: 13, color: '#555', flexShrink: 0 }}>
            <a href="#" style={{ color: '#2ECAC6', fontWeight: 600, textDecoration: 'none' }}>Home</a>
            <a href="#sobre" style={{ color: '#555', textDecoration: 'none' }}>Nosotros</a>
            <a href="#cursos" style={{ color: '#555', textDecoration: 'none' }}>Cursos</a>
            <button onClick={onShowCommunity} style={{ color: '#555', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13 }}>Comunidad</button>
          </div>

          {/* CTA */}
          {profile ? (
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
              <button onClick={() => onSelectCategory('padres')}
                style={{ background: '#2ECAC6', color: '#fff', border: 'none', borderRadius: 24, padding: '8px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                👤 Mis Módulos
              </button>
              <button onClick={onLogout} style={{ background: 'none', border: 'none', color: '#999', fontSize: 12, cursor: 'pointer' }}>Salir</button>
            </div>
          ) : (
            <button onClick={onStartIntake}
              style={{ background: '#2ECAC6', color: '#fff', border: 'none', borderRadius: 24, padding: '8px 20px', fontSize: 13, fontWeight: 600, cursor: 'pointer', flexShrink: 0 }}>
              👤 Iniciar sesión / Registrarse
            </button>
          )}
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', minHeight: '75vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        {/* Background family photo */}
        <div style={{ position: 'absolute', inset: 0 }}>
          <img
            src="https://images.unsplash.com/photo-1609220136736-443140cffec6?w=1400&q=80"
            alt="Familia aprendiendo juntos"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.55) 100%)' }} />
        </div>

        {/* Dot pattern */}
        <div style={{ position: 'absolute', left: '38%', top: '30%', display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 12, opacity: 0.6 }}>
          {Array.from({ length: 25 }).map((_, i) => (
            <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: '#2ECAC6' }} />
          ))}
        </div>

        {/* Hero content — right aligned */}
        <div style={{ position: 'relative', zIndex: 10, maxWidth: 1200, margin: '0 auto', padding: '80px 24px', width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            style={{ maxWidth: 520, color: '#fff' }}
          >
            <h1 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 700, lineHeight: 1.15, marginBottom: 20, textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
              Potencia tus habilidades con IA y contribuye en el desarrollo de tus hijos.
            </h1>
            <p style={{ fontSize: 16, lineHeight: 1.7, marginBottom: 28, opacity: 0.9 }}>
              Nuestra comunidad de padres sigue creciendo y valoran nuestra contribución a la sociedad.
            </p>
            <button
              onClick={profile ? () => onSelectCategory('padres') : onStartIntake}
              style={{ background: '#2ECAC6', color: '#fff', border: 'none', borderRadius: 6, padding: '14px 28px', fontSize: 15, fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <Users size={16} />
              Ver todos los módulos
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── 3 FEATURE CARDS ── */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 0, marginTop: -60, position: 'relative', zIndex: 20 }}>
          {FEATURE_CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              onClick={profile ? () => onSelectCategory('padres') : onStartIntake}
              style={{
                background: '#2ECAC6',
                padding: '36px 28px',
                cursor: 'pointer',
                borderRight: i < 2 ? '1px solid rgba(255,255,255,0.2)' : 'none',
              }}
            >
              <card.icon size={40} color="#fff" style={{ marginBottom: 16 }} />
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 12, lineHeight: 1.3 }}>{card.title}</h3>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.9)', lineHeight: 1.7, marginBottom: 20 }}>{card.desc}</p>
              <span style={{ color: '#fff', fontWeight: 600, fontSize: 14, textDecoration: 'underline', cursor: 'pointer' }}>{card.cta}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ background: '#f9fffe', borderTop: '1px solid #e0f7f6', borderBottom: '1px solid #e0f7f6', padding: '60px 24px', marginTop: 60 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 32, textAlign: 'center' }}>
          {STATS.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <p style={{ fontSize: 44, fontWeight: 700, color: '#2ECAC6', lineHeight: 1, marginBottom: 8 }}>{s.value}</p>
              <p style={{ fontSize: 13, color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 500 }}>{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── SOBRE NOSOTROS ── */}
      <section id="sobre" style={{ maxWidth: 1200, margin: '80px auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          {/* Collage de imágenes con formas orgánicas */}
          <div style={{ position: 'relative', height: 460 }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: 220, height: 220, borderRadius: '62% 38% 46% 54% / 60% 44% 56% 40%', overflow: 'hidden', border: '4px solid #fff', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}>
              <img src="https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?w=400&q=80" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Familia" />
            </div>
            <div style={{ position: 'absolute', top: '30%', right: 0, width: 190, height: 190, borderRadius: '38% 62% 54% 46% / 44% 60% 40% 56%', overflow: 'hidden', border: '4px solid #fff', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}>
              <img src="https://images.unsplash.com/photo-1581952976147-5a2d15560349?w=400&q=80" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Padre e hijo" />
            </div>
            <div style={{ position: 'absolute', bottom: 0, left: '20%', width: 200, height: 200, borderRadius: '50% 50% 62% 38% / 50% 50% 46% 54%', overflow: 'hidden', border: '4px solid #fff', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}>
              <img src="https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=400&q=80" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Familia feliz" />
            </div>
            {/* Dot decoration */}
            <div style={{ position: 'absolute', bottom: '10%', right: '5%', display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 8 }}>
              {Array.from({ length: 25 }).map((_, i) => (
                <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: '#2ECAC6', opacity: 0.4 }} />
              ))}
            </div>
          </div>

          {/* Content */}
          <div>
            <p style={{ color: '#2ECAC6', fontSize: 12, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 16 }}>EDUCACIÓN ONLINE PARA PADRES</p>
            <h2 style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.25, marginBottom: 20, color: '#222' }}>
              ¡Desarrolla tus habilidades desde cualquier lugar!
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: '#666', marginBottom: 12 }}>
              Entendemos que el aprendizaje en línea supone un cambio significativo para llegar a los padres de todo el mundo.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: '#555', marginBottom: 32 }}>
              Unidos AI dota a los padres de una educación que posibilita un correcto desarrollo emocional y educativo de sus hijos, usando la tecnología de Inteligencia Artificial disponible 24/7.
            </p>
            <button
              onClick={profile ? () => onSelectCategory('padres') : onStartIntake}
              style={{ background: '#2ECAC6', color: '#fff', border: 'none', borderRadius: 6, padding: '12px 24px', fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <BookOpen size={15} /> Ver todos los módulos
            </button>
          </div>
        </div>
      </section>

      {/* ── TUTORES IA ── */}
      <section style={{ background: '#f9fffe', padding: '80px 24px', borderTop: '1px solid #e0f7f6' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <p style={{ color: '#2ECAC6', fontSize: 12, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 12 }}>ESPECIALISTAS DEL CURSO</p>
            <h2 style={{ fontSize: 36, fontWeight: 700, color: '#222', marginBottom: 12 }}>Tutores IA de Unidos</h2>
            <p style={{ color: '#888', fontSize: 15, maxWidth: 500, margin: '0 auto' }}>
              ¡Nuestras clases están acreditadas por el Modelo ProLab (PUCP)!
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {TUTORES.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -4, boxShadow: '0 12px 36px rgba(46,202,198,0.15)' }}
                onClick={profile ? () => onSelectCategory('padres') : onStartIntake}
                style={{ background: '#fff', border: '1px solid #e0f7f6', borderRadius: 16, padding: '32px 28px', cursor: 'pointer', transition: 'all 0.3s' }}
              >
                <div style={{ fontSize: 48, marginBottom: 16 }}>{t.emoji}</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: '#222', marginBottom: 4 }}>{t.name}</h3>
                <p style={{ fontSize: 12, color: '#2ECAC6', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>{t.role}</p>
                <p style={{ fontSize: 14, color: '#777', lineHeight: 1.7, marginBottom: 20 }}>{t.specialty}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 12, color: '#aaa', fontWeight: 500 }}>{t.modules}</span>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#f0fcfb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ChevronRight size={14} color="#2ECAC6" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MÓDULOS ── */}
      <section id="cursos" style={{ maxWidth: 1200, margin: '80px auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <p style={{ color: '#2ECAC6', fontSize: 12, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 12 }}>APRENDE A TU PROPIO RITMO</p>
          <h2 style={{ fontSize: 36, fontWeight: 700, color: '#222', marginBottom: 12 }}>Nuestros módulos populares</h2>
          <p style={{ color: '#888', fontSize: 15, maxWidth: 480, margin: '0 auto' }}>
            Explora todos nuestros módulos y elige los adecuados para comenzar tu camino.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {UNIDOS_COURSE.map((mod, i) => {
            const isUnlocked = unlockedMods.includes(mod.id) || i === 0;
            const isCompleted = isUnlocked && i < unlockedMods.length - 1;
            const isActive = isUnlocked && i === unlockedMods.length - 1;

            return (
              <motion.div
                key={mod.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.08 }}
                whileHover={isUnlocked ? { y: -3, boxShadow: '0 8px 28px rgba(46,202,198,0.12)' } : {}}
                onClick={() => { if (isUnlocked) onSelectCategory('padres'); else if (!profile) onStartIntake(); }}
                style={{
                  background: isActive ? '#f0fcfb' : '#fff',
                  border: isActive ? '2px solid #2ECAC6' : '1px solid #eee',
                  borderRadius: 14,
                  overflow: 'hidden',
                  cursor: isUnlocked ? 'pointer' : 'default',
                  opacity: !isUnlocked ? 0.6 : 1,
                  transition: 'all 0.25s',
                }}
              >
                <div style={{ padding: '24px 22px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
                    <span style={{ fontSize: 28 }}>{mod.emoji}</span>
                    {isCompleted && (
                      <span style={{ fontSize: 10, fontWeight: 700, background: '#2ECAC6', color: '#fff', borderRadius: 20, padding: '3px 10px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>✓ Completado</span>
                    )}
                    {isActive && (
                      <span style={{ fontSize: 10, fontWeight: 700, background: '#2ECAC6', color: '#fff', borderRadius: 20, padding: '3px 10px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Activo</span>
                    )}
                    {!isUnlocked && <Lock size={14} color="#ccc" />}
                  </div>
                  <p style={{ fontSize: 10, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 6 }}>Módulo {i + 1}</p>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: '#222', lineHeight: 1.4, marginBottom: 10 }}>
                    {mod.title.replace(`Módulo ${i + 1}: `, '')}
                  </h3>
                  <p style={{ fontSize: 13, color: '#888', lineHeight: 1.6 }}>{mod.description}</p>
                </div>
                <div style={{ padding: '12px 22px', borderTop: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: isActive ? 'rgba(46,202,198,0.05)' : '#fafafa' }}>
                  <span style={{ fontSize: 12, color: '#aaa', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Sparkles size={11} color="#2ECAC6" />
                    Tutor IA · {mod.tutorId === 'elena' ? 'Elena' : mod.tutorId === 'marcos' ? 'Marcos' : 'Sofía'}
                  </span>
                  {isUnlocked && <ChevronRight size={14} color="#ccc" />}
                </div>
              </motion.div>
            );
          })}
        </div>

        {!profile && (
          <div style={{ textAlign: 'center', marginTop: 56 }}>
            <button onClick={onStartIntake}
              style={{ background: '#2ECAC6', color: '#fff', border: 'none', borderRadius: 6, padding: '14px 36px', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
              ¡Únete gratis ahora!
            </button>
            <p style={{ fontSize: 13, color: '#aaa', marginTop: 12 }}>
              Accede a la mejor manera de involucrarte en el desarrollo de tu hijo.{' '}
              <button onClick={onStartIntake} style={{ color: '#2ECAC6', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Únete gratis ahora.</button>
            </p>
          </div>
        )}
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#f5f5f5', borderTop: '1px solid #e8e8e8', padding: '40px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <UnidosLogo size={28} />
            <span style={{ fontWeight: 700, fontSize: 13, letterSpacing: '0.12em', color: '#555', textTransform: 'uppercase' }}>Unidos AI</span>
          </div>
          <p style={{ fontSize: 12, color: '#aaa' }}>Tecnología al servicio del bienestar familiar · Basado en Tesis ProLab PUCP</p>
          <div style={{ display: 'flex', gap: 20, fontSize: 12, color: '#aaa' }}>
            <a href="#" style={{ color: '#aaa', textDecoration: 'none' }}>Privacidad</a>
            <a href="#" style={{ color: '#aaa', textDecoration: 'none' }}>Términos</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
