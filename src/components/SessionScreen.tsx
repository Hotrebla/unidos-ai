import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Mic, MicOff, PhoneOff, CheckCircle } from 'lucide-react';
import { LiveAudioService } from '../services/liveAudio';
import { getFredoSystemPrompt } from '../services/prompt';
import { UserProfile } from '../lib/db';
import { extractTaskFromTranscript } from '../services/taskExtraction';

interface Props {
  profile: UserProfile;
  onComplete: (updatedProfile: UserProfile) => void;
  onExit: () => void;
}

export default function SessionScreen({ profile, onComplete, onExit }: Props) {
  const [micOn, setMicOn] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [sessionSummary, setSessionSummary] = useState("");
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
    try {
      await liveSvc.current.connect({
        systemInstruction: getFredoSystemPrompt(profile),
        onTranscription: (text, isUser) => {
           // Track transcripts for extraction later
        }
      });
      liveSvc.current.setMicActive(true);
      liveSvc.current.sendTextMessage(`Hola Fredo, soy ${profile.name}. Listo para nuestra sesión de hoy.`);
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
    const joined = transcripts.map(t => `Fredo: ${t.text}`).join('\n');
    let task = "";
    let summary = "Sesión completada.";
    if (joined.length > 20) {
        try {
            const ext = await extractTaskFromTranscript(joined);
            task = ext.task;
            summary = ext.summary;
        } catch (err) {
            console.error("Error extracted task/summary", err);
            task = "";
        }
    }
    
    setIsProcessing(false); // Make sure to stop processing
    
    if (task) {
        setNewTask(task);
        setSessionSummary(summary);
        setShowTaskModal(true);
    } else {
        finishSession(task, summary);
    }
  };

  const finishSession = (taskStr: string, summaryStr: string = "Sesión completada.") => {
    const updated = { ...profile };
    updated.sessionsComplete += 1;
    updated.history.push(`Sesión ${updated.sessionsComplete}: ${summaryStr}`);
    if (taskStr) {
      updated.completedTasks.push(taskStr);
    }
    onComplete(updated);
  };

  if (isProcessing && !showTaskModal) {
    return (
      <div className="flex flex-col h-full items-center justify-center p-6 text-center">
         <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
         <p className="text-gray-400">Analizando sesión...</p>
      </div>
    );
  }

  if (showTaskModal) {
    return (
       <div className="flex flex-col h-full min-h-screen p-6 relative">
          <div className="pt-20 flex-1 flex flex-col items-center text-center">
             <div className="w-20 h-20 bg-green-900/40 rounded-full flex items-center justify-center mb-6">
                <CheckCircle size={40} className="text-green-500" />
             </div>
             <h2 className="text-3xl font-bold mb-4">Tu Micro-Tarea</h2>
             <p className="text-gray-400 mb-8 max-w-sm">Fredo ha sugerido esta acción para que practiques antes de la próxima sesión:</p>
             <div className="bg-[#111] p-6 rounded-3xl border border-white/10 w-full mb-10 shadow-2xl">
                <p className="text-lg font-medium leading-relaxed">{newTask}</p>
             </div>
             
             <button
                onClick={() => finishSession(newTask, sessionSummary)}
                className="w-full py-4 bg-white text-black font-semibold rounded-2xl flex items-center justify-center"
              >
                Aceptar Tarea y Salir
              </button>
          </div>
       </div>
    );
  }

  return (
    <div className="flex flex-col h-full min-h-screen relative p-6 justify-between bg-[#050505]">
       <header className="flex justify-between items-center z-10 pt-4">
         <p className="text-sm tracking-widest uppercase font-semibold text-gray-500">Sesión en curso</p>
         <button onClick={onExit} className="text-gray-600 hover:text-white transition-colors">
            Cancelar
         </button>
       </header>

       <div className="flex-1 flex flex-col items-center justify-center relative mt-[-10vh]">
          {/* Subtle atmosphere background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#050505] to-[#050505] -z-10" />
          
          <motion.div
             animate={{
                scale: micOn ? [1, 1.05, 1] : 1,
                boxShadow: micOn ? ["0 0 0 rgba(79,70,229,0)", "0 0 60px rgba(79,70,229,0.4)", "0 0 0 rgba(79,70,229,0)"] : "none"
             }}
             transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
             className="w-48 h-48 rounded-full bg-[#111] border border-white/5 flex items-center justify-center relative overflow-hidden"
          >
             <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/20 to-transparent" />
             <span className="text-6xl relative z-10">🪷</span>
          </motion.div>
          <h2 className="text-2xl font-light mt-10">Fredo</h2>
          <p className="text-gray-500 text-sm mt-2">{micOn ? 'Escuchando...' : 'Micrófono silenciado'}</p>
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
