
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getChatResponse(message: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: message,
      config: {
        systemInstruction: `You are the Community Share Hub AI Bot. Your goal is to help users understand peer-to-peer lending, sustainable living, and how to use this platform. Be friendly, concise, and encourage eco-friendly habits. If users ask about CO2 savings, explain that sharing reduces the need for new manufacturing.`,
      },
    });
    return response.text || "I'm sorry, I couldn't process that.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I am currently having trouble connecting. Please try again later!";
  }
}
