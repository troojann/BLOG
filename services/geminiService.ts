
import { GoogleGenAI, Type } from "@google/genai";
import { MagicDraftResponse } from "../types";

export const generateMagicDraft = async (topic: string): Promise<MagicDraftResponse> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Write a high-quality developer-focused blog post about: ${topic}. 
               Include relevant code snippets using markdown syntax. 
               The tone should be professional yet engaging.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          content: { type: Type.STRING },
          excerpt: { type: Type.STRING },
          tags: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING } 
          }
        },
        required: ["title", "content", "excerpt", "tags"]
      }
    }
  });

  const text = response.text || '';
  return JSON.parse(text) as MagicDraftResponse;
};

export const summarizePost = async (content: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Summarize the following developer blog post into 3 bullet points:\n\n${content}`,
  });
  return response.text || 'No summary available.';
};
