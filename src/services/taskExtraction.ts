import { GoogleGenAI } from '@google/genai';

export async function extractTaskFromTranscript(transcript: string): Promise<{ task: string, summary: string }> {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  
  const prompt = `Analiza la siguiente transcripción de la sesión entre el coach/especialista y el usuario.
1. Identifica la "micro-tarea" o "ejercicio" propuesto. Si no hubo, usa "NADA".
2. Escribe un "resumen" breve (2-3 oraciones) de lo conversado para guardarlo como historial de la sesión.

Devuelve la respuesta ESTRICTAMENTE en este formato JSON:
{
  "task": "La tarea a realizar o NADA",
  "summary": "El resumen breve de la sesión"
}

Transcripción:
${transcript}`;

  const response = await ai.models.generateContent({
    model: 'gemini-3.1-flash',
    contents: prompt,
    config: {
      responseMimeType: 'application/json'
    }
  });

  const text = (response.text || "").trim();
  try {
    const data = JSON.parse(text);
    return {
      task: data.task && data.task.toUpperCase() !== "NADA" ? data.task : "",
      summary: data.summary || "Sesión completada."
    };
  } catch (e) {
    console.error("Error parsing task/summary JSON", e);
    return { task: "", summary: "Sesión completada." };
  }
}

