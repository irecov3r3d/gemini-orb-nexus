import { GoogleGenAI, Type } from "@google/genai";

const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || (process as any).env?.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const geminiService = {
  async determineApps(task: string, availableAppsList: string): Promise<string[]> {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: `The user wants to: "${task}".
        From the following list of available mini-apps, select the up to 4 most relevant app IDs that should be displayed in the hub.

        Available Apps:
        ${availableAppsList}

        Return ONLY a JSON array of string IDs.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        }
      });

      return JSON.parse(response.text);
    } catch (e) {
      console.error("Failed to determine apps", e);
      return ['multi-model-search', 'chat-with-docs', 'info-genius', 'research-viz'];
    }
  },

  async generateSpeech(text: string): Promise<string | null> {
    try {
      // Note: Multimodal audio output is supported on specific models like gemini-1.5-flash
      const response = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: [{ parts: [{ text }] }],
        config: {
          // @ts-ignore - responseModalities might not be in all type defs yet
          responseModalities: ["AUDIO"],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      return base64Audio || null;
    } catch (e) {
      console.error("TTS failed", e);
      return null;
    }
  }
};
