import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, MicOff, Check } from 'lucide-react';
import { LiveAudioService } from '../services/liveAudio';
import { getFredoSystemPrompt } from '../services/prompt';
import { extractProfileFromTranscript } from '../services/extraction';
import { UserProfile } from '../lib/db';

interface Props {
  onComplete: (profile: UserProfile) => void;
}

export default function IntakeScreen({ onComplete }: Props) {
  const [isActive, setIsActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [micOn, setMicOn] = useState(false);
  const [transcripts, setTranscripts] = useState<string[]>([]);
  const liveSvc = useRef<LiveAudioService | null>(null);

  useEffect(() => {
    liveSvc.current = new LiveAudioService();
    return () => {
      liveSvc.current?.disconnect();
    };
  }, []);

  const handleStart = async () => {
    setIsActive(true);
    setMicOn(true);
    if (!liveSvc.current) return;
    try {
      await liveSvc.current.connect({
        systemInstruction: getFredoSystemPrompt(null),
        onTranscription: (text, isUser) => {
           setTranscripts(prev => [...prev, `${isUser ? 'Usuario' : 'Fredo'}: ${text}`]);
        }
      });
      liveSvc.current.setMicActive(true);
      // Saludo inicial
      liveSvc.current.sendTextMessage("¡Hola Fredo! Estoy listo para empezar mi entrevista inicial.");
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

  const handleFinish = async () => {
    if (!liveSvc.current) return;
    setIsProcessing(true);
    liveSvc.current.disconnect();
    
    const ts = liveSvc.current.getSessionTranscripts().map(t => `Fredo: ${t.text}`).join('\n');
    let finalTs = ts;
    if (ts.length < 10) {
       // fallback if no transcripts recorded
       finalTs = transcripts.join('\\n');
    }
    
    try {
        const timeoutPromise = new Promise<UserProfile>((_, reject) => 
            setTimeout(() => reject(new Error("Timeout")), 8000)
        );
        const extractPromise = extractProfileFromTranscript(finalTs);
        
        const profile = await Promise.race([extractPromise, timeoutPromise]);
        
        setIsProcessing(false);
        onComplete(profile);
    } catch (e) {
        console.error("Extraction error", e);
        setIsProcessing(false);
        onComplete({
            name: 'Amigo',
            age: '',
            focusArea: 'Bienestar',
            initialWellbeing: 5,
            triggerEvent: '',
            previousAttempts: '',
            definitionOfWellbeing: '',
            timeConstraint: '',
            firstSessionDate: new Date().toISOString(),
            intakeSummary: 'Entrevista completada.',
            sessionsComplete: 0,
            completedTasks: [],
            history: [],
            unlockedModules: ['m1']
        });
    }
  };

  return (
    <div className="flex flex-col h-full min-h-screen">
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        {!isActive ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 max-w-sm"
          >
             <h2 className="text-[2.5rem] font-display font-medium tracking-tight leading-tight">Evaluación Inicial</h2>
             <p className="text-gray-400 font-light text-lg">
               Fredo (coach principal) hará algunas preguntas simples para conocerte mejor. Responde con tu voz.
             </p>
             <button
                onClick={handleStart}
                className="w-full py-4 bg-white text-black font-semibold rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-200 mt-8 shadow-[0_0_40px_rgba(255,255,255,0.15)] active:scale-95 transition-transform"
              >
                Comenzar Entrevista
              </button>
          </motion.div>
        ) : isProcessing ? (
           <motion.div className="space-y-4">
              <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <h2 className="text-2xl font-light">Preparando tu perfil...</h2>
              <p className="text-gray-400 text-sm mt-2">Nuestra IA está analizando la conversación.<br/>Esto puede tomar unos segundos.</p>
           </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full flex flex-col items-center justify-between h-[80vh]"
          >
            <div className="flex-1 flex flex-col items-center justify-center w-full relative">
               <div className="w-40 h-40 rounded-full bg-gradient-to-tr from-indigo-900 to-purple-800 flex items-center justify-center shadow-[0_0_50px_rgba(79,70,229,0.3)] mb-8 relative">
                   <span className="text-5xl">🪷</span>
                   {/* Waves animation */}
                   {micOn && (
                     <div className="absolute inset-0 rounded-full border-2 border-indigo-500 animate-ping opacity-20" />
                   )}
               </div>
               <p className="text-xl font-medium mb-2">Escuchando...</p>
               <p className="text-sm text-gray-500">Responde de forma natural.</p>
            </div>

            <div className="w-full space-y-4">
               <button
                  onClick={toggleMic}
                  className={`w-full py-4 rounded-2xl flex items-center justify-center gap-3 transition-colors ${micOn ? 'bg-zinc-800 text-white' : 'bg-red-900/50 text-red-100'}`}
                >
                  {micOn ? <Mic size={20} /> : <MicOff size={20} />}
                  {micOn ? 'Silenciar micrófono' : 'Activar micrófono'}
                </button>
               <button
                  onClick={handleFinish}
                  className="w-full py-4 bg-indigo-600 text-white font-semibold rounded-2xl flex items-center justify-center gap-3 hover:bg-indigo-700"
                >
                  <Check size={20} />
                  Terminar Entrevista
                </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
