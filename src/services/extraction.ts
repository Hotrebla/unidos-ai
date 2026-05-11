import { GoogleGenAI, Type } from '@google/genai';
import { UserProfile } from '../lib/db';

export async function extractProfileFromTranscript(transcript: string): Promise<UserProfile> {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  
  const prompt = `Analiza la siguiente transcripción de una entrevista psicológica inicial.
Extrae la información clave y genera un perfil de usuario en formato JSON.
Si no se mencionó algo, usa valores por defecto (ej. string vacío o 5).

Transcripción (puede contener solo las respuestas del coach, trata de inferir las respuestas del usuario):
${transcript}`;

  const response = await ai.models.generateContent({
    model: 'gemini-3.1-flash',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          age: { type: Type.STRING },
          focusArea: { type: Type.STRING },
          initialWellbeing: { type: Type.NUMBER },
          triggerEvent: { type: Type.STRING },
          previousAttempts: { type: Type.STRING },
          definitionOfWellbeing: { type: Type.STRING },
          timeConstraint: { type: Type.STRING },
          intakeSummary: { type: Type.STRING, description: "Resumen completo del caso en 1 o 2 párrafos." }
        },
        required: ["name", "focusArea", "initialWellbeing", "intakeSummary"]
      }
    }
  });

  const text = response.text || "{}";
  let data: any = {};
  try {
     data = JSON.parse(text);
  } catch (e) {
     console.error("JSON parse error:", e);
  }

  return {
    name: data.name || 'Usuario',
    age: data.age || '',
    focusArea: data.focusArea || 'Bienestar general',
    initialWellbeing: typeof data.initialWellbeing === 'number' ? data.initialWellbeing : 5,
    triggerEvent: data.triggerEvent || '',
    previousAttempts: data.previousAttempts || '',
    definitionOfWellbeing: data.definitionOfWellbeing || '',
    timeConstraint: data.timeConstraint || '',
    firstSessionDate: new Date().toISOString(),
    intakeSummary: data.intakeSummary || 'Sesión inicial completada.',
    sessionsComplete: 0,
    completedTasks: [],
    history: [ data.intakeSummary || 'Entrevista intake completada.' ]
  };
}
