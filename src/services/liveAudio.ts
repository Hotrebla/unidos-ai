import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';

export interface LiveAudioConfig {
  systemInstruction?: string;
  voiceName?: string;
  onAudioMessage?: (base64PCM: string) => void;
  onTurnComplete?: () => void;
  onTranscription?: (text: string, isUser: boolean, isFinal: boolean) => void;
}

export class LiveAudioService {
  private ai: GoogleGenAI;
  private sessionPromise: any = null;
  private inAudioCtx: AudioContext | null = null;
  private outAudioCtx: AudioContext | null = null;
  private mediaStream: MediaStream | null = null;
  private processor: ScriptProcessorNode | null = null;
  private nextPlayTime: number = 0;
  private micActive = false;
  private transcripts: { role: string; text: string }[] = [];

  private activeSources: AudioBufferSourceNode[] = [];

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }

  public async connect(config: LiveAudioConfig) {
    if (this.sessionPromise) return;

    this.sessionPromise = this.ai.live.connect({
      model: 'gemini-3.1-flash-live-preview',
      config: {
        systemInstruction: config.systemInstruction,
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: { prebuiltVoiceConfig: { voiceName: config.voiceName || 'Zephyr' } }
        },
        inputAudioTranscription: { model: 'models/gemini-3.1-flash-live-preview' },
        outputAudioTranscription: { model: 'models/gemini-3.1-flash-live-preview' }
      },
      callbacks: {
        onopen: () => this.handleOpen(),
        onmessage: (msg: LiveServerMessage) => this.handleMessage(msg, config),
        onclose: () => this.disconnect(),
        onerror: (err) => console.error('Live API Error:', err)
      }
    });

    await this.sessionPromise;
  }

  private async handleOpen() {
    try {
      this.inAudioCtx = new AudioContext({ sampleRate: 16000 });
      this.outAudioCtx = new AudioContext({ sampleRate: 24000 });
      this.nextPlayTime = this.outAudioCtx.currentTime;

      this.mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const source = this.inAudioCtx.createMediaStreamSource(this.mediaStream);
      this.processor = this.inAudioCtx.createScriptProcessor(4096, 1, 1);
      
      source.connect(this.processor);
      this.processor.connect(this.inAudioCtx.destination);
      
      this.processor.onaudioprocess = (e) => {
        if (!this.micActive) return;
        const pcmFloat = e.inputBuffer.getChannelData(0);
        const pcm16 = new Int16Array(pcmFloat.length);
        for (let i = 0; i < pcmFloat.length; i++) {
          const s = Math.max(-1, Math.min(1, pcmFloat[i]));
          pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
        }
        const b64 = btoa(String.fromCharCode(...new Uint8Array(pcm16.buffer)));
        
        if (this.sessionPromise) {
          this.sessionPromise.then((session: any) => {
            session.sendRealtimeInput({
              audio: { data: b64, mimeType: 'audio/pcm;rate=16000' }
            });
          }).catch(console.error);
        }
      };
    } catch (err) {
      console.error('Mic setup failed:', err);
    }
  }

  private handleMessage(message: LiveServerMessage, config: LiveAudioConfig) {
    if (message.serverContent?.modelTurn) {
      for (const part of message.serverContent.modelTurn.parts) {
        if (part.inlineData && part.inlineData.data) {
          this.playBase64Audio(part.inlineData.data);
          if (config.onAudioMessage) config.onAudioMessage(part.inlineData.data);
        }
        if (part.text) {
           this.transcripts.push({ role: 'model', text: part.text });
           if (config.onTranscription) config.onTranscription(part.text, false, true);
        }
      }
    }
    
    // For user transcription, it usually comes under serverContent.turnComplete or clientTurn?
    // According to docs, inputAudioTranscription is returned in serverContent
    // Let's also just check message.clientContent if it exists
    
    if (message.serverContent?.interrupted) {
      this.activeSources.forEach(source => {
        try { source.stop(); } catch(e) {}
      });
      this.activeSources = [];
      this.nextPlayTime = 0;
      if (config.onTurnComplete) config.onTurnComplete();
    }
    
    if (message.serverContent?.turnComplete) {
      if (config.onTurnComplete) config.onTurnComplete();
    }
  }

  public getSessionTranscripts() {
    return this.transcripts;
  }

  private playBase64Audio(base64: string) {
    if (!this.outAudioCtx) return;
    try {
      const raw = atob(base64);
      const uint8 = new Uint8Array(raw.length);
      for(let i=0; i<raw.length; i++) uint8[i] = raw.charCodeAt(i);
      const int16 = new Int16Array(uint8.buffer);
      const float32 = new Float32Array(int16.length);
      for(let i=0; i<int16.length; i++) float32[i] = int16[i] / 32768;
      
      const buffer = this.outAudioCtx.createBuffer(1, float32.length, 24000);
      buffer.getChannelData(0).set(float32);
      
      const source = this.outAudioCtx.createBufferSource();
      source.buffer = buffer;
      source.connect(this.outAudioCtx.destination);
      
      source.onended = () => {
        this.activeSources = this.activeSources.filter(s => s !== source);
      };
      this.activeSources.push(source);
      
      if (this.nextPlayTime < this.outAudioCtx.currentTime) {
        this.nextPlayTime = this.outAudioCtx.currentTime;
      }
      source.start(this.nextPlayTime);
      this.nextPlayTime += buffer.duration;
    } catch (e) {
      console.error('Audio decode fail', e);
    }
  }

  public setMicActive(active: boolean) {
    this.micActive = active;
  }

  public isMicActive() {
    return this.micActive;
  }

  public sendTextMessage(text: string) {
    if (this.sessionPromise) {
      this.sessionPromise.then((session: any) => {
         session.sendRealtimeInput([{text}]);
      });
    }
  }

  public disconnect() {
    this.activeSources.forEach(source => {
      try { source.stop(); } catch(e) {}
    });
    this.activeSources = [];
    
    if (this.sessionPromise) {
      this.sessionPromise.then((session: any) => {
        try { session.close(); } catch {}
      });
      this.sessionPromise = null;
    }
    this.micActive = false;
    if (this.processor) {
      this.processor.disconnect();
      this.processor = null;
    }
    if (this.inAudioCtx) {
      this.inAudioCtx.close();
      this.inAudioCtx = null;
    }
    if (this.outAudioCtx) {
      this.outAudioCtx.close();
      this.outAudioCtx = null;
    }
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(t => t.stop());
      this.mediaStream = null;
    }
  }
}
