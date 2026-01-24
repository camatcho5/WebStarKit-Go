
import { GoogleGenAI, Type } from "@google/genai";
import { products } from "../data/products";

// Use direct environment variable for the API key as per @google/genai guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getProductRecommendations = async (userInput: string) => {
  const model = 'gemini-3-flash-preview';
  
  const productContext = products.map(p => ({
    id: p.id,
    name: p.name,
    tagline: p.tagline,
    category: p.category,
    description: p.description
  }));

  const prompt = `Based on the user's request: "${userInput}", recommend the best tech services (Hosting, VPN, AI, Email, Productivity) from our catalog. 
  Our catalog includes: ${JSON.stringify(productContext)}.
  Provide exactly 2 recommendations with a short specific reason for each, focused on reliability and value.`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              productId: { type: Type.STRING },
              reason: { type: Type.STRING }
            },
            required: ["productId", "reason"]
          }
        }
      }
    });

    // Access text property directly as per @google/genai extraction rules
    const text = response.text || '[]';
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
};
