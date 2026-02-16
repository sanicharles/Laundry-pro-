
import { GoogleGenAI } from "@google/genai";

// Use a fresh instance of GoogleGenAI for each request to ensure it uses the most up-to-date API key.
export const getLaundryAdvice = async (prompt: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: `You are 'Tini', the friendly and expert AI assistant for Laundry Ibu Tini. 
        Your goal is to provide helpful, professional, and warm advice about laundry, stain removal, fabric care, and housekeeping. 
        Keep responses concise, practical, and in Indonesian. Use friendly emojis. 
        Focus on common household stains (coffee, ink, oil) and fabric types (silk, cotton, wool).`,
        temperature: 0.7,
      },
    });
    // Use .text property directly as per guidelines.
    return response.text || "Maaf, saya sedang beristirahat sebentar. Silakan coba lagi nanti! 🧺";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Ups, sepertinya ada masalah koneksi. Coba tanya lagi ya! 💚";
  }
};

export const analyzeStainImage = async (base64Image: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64Image,
            },
          },
          {
            text: "Identify the stain in this image and the type of fabric if possible. Provide a step-by-step Indonesian guide on how to remove this specific stain safely. Keep it concise and professional.",
          },
        ],
      },
      config: {
        systemInstruction: "You are an expert dry cleaner and laundry specialist. You identify stains and fabric types accurately from images.",
      },
    });
    // Use .text property directly as per guidelines.
    return response.text || "Saya tidak bisa melihat nodanya dengan jelas. Bisa coba ambil foto lagi? 📸";
  } catch (error) {
    console.error("Gemini Vision Error:", error);
    return "Maaf, fitur analisis gambar sedang mengalami kendala. Silakan coba lagi nanti.";
  }
};
