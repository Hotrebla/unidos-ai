import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Mic, MicOff, PhoneOff } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { LiveAudioService } from '../services/liveAudio';
import { Tutor } from '../lib/tutors';
import { UserProfile } from '../lib/db';
import { UNIDOS_COURSE } from '../lib/courses';
import { extractTaskFromTranscript } from '../services/taskExtraction';
import confetti from 'canvas-confetti';

interface Props {
  tutor: Tutor;
  profile: UserProfile;
  courseModuleId?: string;
  onExit: () => void;
  onComplete?: (updatedProfile: UserProfile) => void;
}

export default function TutorSessionScreen({ tutor, profile, courseModuleId, onExit, onComplete }: Props) {
  const [micOn, setMicOn] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [sessionSummary, setSessionSummary] = useState('');
  const liveSvc = useRef<LiveAudioService | null>(null);

  useEffect(() => {
    liveSvc.current = new LiveAudioService();
    // Connect automatically
    startSession();
    return () => {
      liveSvc.current?.disconnect();
    };
  }, []);

  const startSession = async () => {
    setIsActive(true);
    if (!liveSvc.current) return;
    
    const isSos = courseModuleId === 'sos';
    const module = courseModuleId && !isSos ? UNIDOS_COURSE.find(m => m.id === courseModuleId) : null;
    let basePrompt = module ? module.botPrompt : tutor.prompt;
    
    if (isSos) {
       basePrompt = `Eres experto en intervención de crisis familiares y disciplina positiva. Estás atendiendo un 'S.O.S Crisis'. El usuario está pasando por un momento de alta tensión con su hijo. Ayúdale a recuperar la calma, dale una técnica rápida de contención emocional en tiempo real y acompáñalo. Habla de forma muy calmada y breve.`;
    }
    
    try {
      await liveSvc.current.connect({
        systemInstruction: basePrompt + `\n\nEl usuario con el que hablas se llama ${profile.name}. Historial del usuario:\n${profile.history.join('\n') || 'Ninguno'}\nIMPORTANTE: ${isSos ? 'Sé breve y calmado.' : 'Haz preguntas continuamente para mantener una clase interactiva.'}`,
        voiceName: tutor.voiceName
      });
      liveSvc.current.setMicActive(true);
      
      const greeting = isSos ? `Hola, necesito ayuda ahora mismo.` : module ? `Hola ${tutor.name}, soy ${profile.name}. Listo para iniciar el ${module.title}.` : `Hola ${tutor.name}, soy ${profile.name}. Listo para nuestra sesión de hoy.`;
      liveSvc.current.sendTextMessage(greeting);
    } catch (e) {
      console.error(e);
      setMicOn(false);
    }
  };

  const toggleMic = () => {
    if (!liveSvc.current) return;
    const nextState = !micOn;
    liveSvc.current.setMicActive(nextState);
    setMicOn(nextState);
  };

  const handleEndSession = async () => {
    if (!liveSvc.current) return;
    setIsProcessing(true);
    liveSvc.current.disconnect();

    const transcripts = liveSvc.current.getSessionTranscripts();
    const joined = transcripts.map(t => `${t.role === 'model' ? tutor.name : 'Usuario'}: ${t.text}`).join('\n');
    let summary = "Sesión completada con " + tutor.name + ".";
    
    if (joined.length > 20) {
        try {
            const ext = await extractTaskFromTranscript(joined);
            summary = ext.summary;
        } catch (err) {
            console.error("Error extracted summary", err);
        }
    }
    
    setSessionSummary(summary);
    setIsProcessing(false);
    
    if (courseModuleId && courseModuleId !== 'sos') {
       setShowReward(true);
    } else {
       finishAndSave(summary);
    }
  };

  const finishAndSave = (summaryText: string) => {
    if (onComplete) {
      const updated = { ...profile };
      const prefix = courseModuleId === 'sos' ? 'S.O.S Crisis' : courseModuleId ? 'Módulo' : 'Sesión con';
      updated.history.push(`${prefix} ${tutor.name}: ${summaryText}`);
      onComplete(updated);
    } else {
      onExit();
    }
  };

  useEffect(() => {
     if (showReward) {
        if (courseModuleId === 'm8') {
           // Massive graduation confetti
           const end = Date.now() + 3 * 1000;
           const colors = ['#f59e0b', '#d97706', '#fbbf24', '#ffffff', '#6366f1'];
           
           (function frame() {
             confetti({
               particleCount: 5,
               angle: 60,
               spread: 55,
               origin: { x: 0 },
               colors: colors
             });
             confetti({
               particleCount: 5,
               angle: 120,
               spread: 55,
               origin: { x: 1 },
               colors: colors
             });
         
             if (Date.now() < end) {
               requestAnimationFrame(frame);
             }
           }());
        } else {
           confetti({
              particleCount: 150,
              spread: 70,
              origin: { y: 0.6 },
              colors: ['#f59e0b', '#d97706', '#fbbf24']
           });
        }
     }
  }, [showReward, courseModuleId]);

  if (isProcessing) {
    return (
      <div className="flex flex-col h-full items-center justify-center p-6 text-center">
         <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
         <p className="text-gray-400 font-light tracking-wide">Analizando tus respuestas y progreso...</p>
      </div>
    );
  }

  if (showReward) {
     const mod = UNIDOS_COURSE.find(m => m.id === courseModuleId);
     return (
        <div className="flex flex-col h-full min-h-screen relative p-8 justify-center items-center bg-[#050505] text-center">
           <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/20 via-[#050505] to-[#050505] -z-10" />
           <motion.div
             initial={{ scale: 0.8, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             className="w-32 h-32 bg-amber-500/10 border border-amber-500/30 rounded-full flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(245,158,11,0.2)]"
           >
              <span className="text-6xl">{mod?.emoji || '🏆'}</span>
           </motion.div>
           
           {mod?.badgeName && (
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="bg-amber-500/20 text-amber-500 px-4 py-1 rounded-full text-sm font-semibold tracking-wide mb-6 uppercase"
              >
                Insignia: {mod.badgeName}
              </motion.div>
           )}

           <motion.h2 
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ delay: 0.2 }}
             className="text-3xl font-display font-medium text-amber-500 mb-4"
           >
             {courseModuleId === 'm8' ? '¡Graduación Completada!' : '¡Clase Completada!'}
           </motion.h2>
           
           <motion.p 
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ delay: 0.3 }}
             className="text-gray-400 mb-8 max-w-sm font-light leading-relaxed px-4"
           >
             {courseModuleId === 'm8' ? (
                <>Has completado el 100% de la Escuela para Padres Vitalis. Ahora tienes un plan de ruta familiar claro. 🎉</>
             ) : (
                <>Has asimilado conceptos clave sobre <strong>{mod?.title.replace(/Módulo \d+: /, '')}</strong>. Cada minuto que inviertes aquí, estás construyendo un mejor futuro para tu familia.</>
             )}
           </motion.p>
           
           <motion.div 
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ delay: 0.4 }}
             className="w-full space-y-4 px-6"
           >
             {courseModuleId === 'm8' && (
                <button
                  className="w-full bg-white/10 text-white font-medium py-4 rounded-full border border-white/20 transition-colors hover:bg-white/20 flex items-center justify-center gap-2"
                  onClick={() => alert("Simulación: Generando Certificado PDF con tus Valores Familiares...")}
                >
                  <LucideIcons.Download size={18} />
                  Descargar Certificado
                </button>
             )}
             <button
               onClick={() => finishAndSave(sessionSummary)}
               className="w-full bg-white text-black font-semibold py-4 rounded-full transition-transform hover:scale-[1.02]"
             >
               {courseModuleId === 'm8' ? 'Ir al Círculo Vitalis' : 'Continuar Ruta'}
             </button>
           </motion.div>
        </div>
     );
  }

  const isSos = courseModuleId === 'sos';
  const module = courseModuleId && !isSos ? UNIDOS_COURSE.find(m => m.id === courseModuleId) : null;

  return (
    <div className={`flex flex-col h-full min-h-screen relative p-6 justify-between ${isSos ? 'bg-[#1a0505]' : 'bg-[#050505]'}`}>
       <header className="flex justify-between items-start z-10 pt-4 gap-4">
         {module ? (
           <div className="flex flex-col">
             <p className="text-xs tracking-widest uppercase font-semibold text-amber-500 mb-1">Clase con {tutor.name}</p>
             <p className="text-sm font-medium text-white line-clamp-1">{module.emoji} {module.title}</p>
           </div>
         ) : isSos ? (
           <div className="flex flex-col">
             <p className="text-xs tracking-widest uppercase font-semibold text-red-500 mb-1">Sesión de Crisis</p>
             <p className="text-sm font-medium text-white line-clamp-1">🚨 S.O.S.</p>
           </div>
         ) : (
           <p className="text-sm tracking-widest uppercase font-semibold text-gray-500">Sesión Especializada</p>
         )}
         <button onClick={handleEndSession} className="text-gray-600 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-full text-sm">
            Finalizar
         </button>
       </header>

       <div className="flex-1 flex flex-col items-center justify-center relative mt-[-5vh]">
          <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] ${isSos ? 'from-red-900/10' : module ? 'from-amber-900/10' : 'from-indigo-900/10'} via-transparent to-transparent -z-10`} />
          
          <motion.div
             animate={{
                scale: micOn ? [1, 1.05, 1] : 1,
                boxShadow: micOn ? [
                  `0 0 0 ${isSos ? 'rgba(239,68,68,0)' : 'rgba(245,158,11,0)'}`,
                  `0 0 60px ${isSos ? 'rgba(239,68,68,0.2)' : 'rgba(245,158,11,0.15)'}`,
                  `0 0 0 ${isSos ? 'rgba(239,68,68,0)' : 'rgba(245,158,11,0)'}`
                ] : "none"
             }}
             transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
             className="w-48 h-48 rounded-full bg-[#111] border border-white/5 flex items-center justify-center relative overflow-hidden"
          >
             <div className={`absolute inset-0 bg-gradient-to-tr ${isSos ? 'from-red-500/10' : module ? 'from-amber-500/10' : 'from-indigo-500/10'} to-transparent`} />
             <span className="text-6xl relative z-10">{isSos ? '🚨' : module ? module.emoji : tutor.name[0]}</span>
          </motion.div>
          <h2 className="text-2xl font-light mt-10">{isSos ? 'Asistencia en Crisis' : tutor.name}</h2>
          <p className={`text-sm mt-1 max-w-[250px] text-center ${isSos ? 'text-red-400' : module ? 'text-amber-400/80' : 'text-indigo-400'}`}>
            {isSos ? 'Estoy aquí para ayudarte. ¿Qué está pasando?' : module ? module.description : tutor.specialty}
          </p>
          
          {module && (
             <div className="w-[200px] h-1 bg-zinc-900 rounded-full mt-8 overflow-hidden relative border border-zinc-800">
               <motion.div 
                 initial={{ width: "0%" }}
                 animate={{ width: "100%" }}
                 transition={{ duration: 300, ease: "linear" }}
                 className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-600 to-amber-400"
               />
             </div>
          )}

          <p className="text-gray-500 text-sm mt-4">{micOn ? 'Escuchando tu respuesta...' : 'Micrófono silenciado'}</p>
       </div>

       <div className="flex items-center justify-center gap-6 pb-8 z-10">
          <button
            onClick={toggleMic}
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${micOn ? 'bg-zinc-800 text-white border border-white/10' : 'bg-red-900/50 text-red-500 border border-red-500/20'}`}
          >
             {micOn ? <Mic size={24} /> : <MicOff size={24} />}
          </button>
          
          <button
            onClick={handleEndSession}
            className="w-20 h-20 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 shadow-[0_0_30px_rgba(220,38,38,0.4)]"
          >
             <PhoneOff size={28} />
          </button>
       </div>
    </div>
  );
}
