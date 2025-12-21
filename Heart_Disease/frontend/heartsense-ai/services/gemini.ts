import { GoogleGenAI, Type, Schema } from "@google/genai";
import { PredictionData, PredictionResult } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    riskLevel: {
      type: Type.STRING,
      enum: ['Low', 'Moderate', 'High'],
      description: "The assessed risk level of heart disease based on the input metrics."
    },
    summary: {
      type: Type.STRING,
      description: "A short, professional medical summary of the analysis (approx 50 words)."
    },
    recommendations: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A list of 5 specific, actionable recommendations for the user to improve their heart health."
    },
    disclaimer: {
      type: Type.STRING,
      description: "A standard medical disclaimer stating this is AI generated and not a doctor's diagnosis."
    }
  },
  required: ["riskLevel", "summary", "recommendations", "disclaimer"]
};

export const generatePrediction = async (data: PredictionData): Promise<PredictionResult> => {
  const modelId = "gemini-2.5-flash"; // Efficient for text/json tasks

  const prompt = `
    Analyze the following patient data for heart disease risk assessment:
    - Age: ${data.age}
    - Sex: ${data.sex}
    - Chest Pain Type: ${data.chestPainType}
    - Resting Blood Pressure: ${data.restingBP} mm Hg
    - Cholesterol: ${data.cholesterol} mg/dl
    - Fasting Blood Sugar > 120 mg/dl: ${data.fastingBS ? 'Yes' : 'No'}
    - Resting ECG Results: ${data.restingECG}
    - Max Heart Rate Achieved: ${data.maxHeartRate}

    Provide a professional assessment including risk level, a summary, and actionable next steps.
  `;

  try {
    const result = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        systemInstruction: "You are an expert cardiologist AI assistant. You analyze patient vitals and provide preliminary heart health risk assessments. Your tone is professional, calm, and medical but accessible.",
      },
    });

    if (result.text) {
      return JSON.parse(result.text) as PredictionResult;
    }
    throw new Error("No data returned from AI");
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate prediction. Please try again.");
  }
};