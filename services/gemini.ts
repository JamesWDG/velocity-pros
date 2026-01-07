
// import { ... } from "@google/gemini";
// import { GoogleGenAI, Type } from "@google/genai";


// const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

// export const analyzeClaimData = async (title: string, description: string) => {
//   try {
//     const response = await ai.models.generateContent({
//       model: 'gemini-3-flash-preview',
//       contents: `Analyze this insurance claim and provide a short executive summary, an estimated risk score (0-100), and suggested next steps for the adjuster.
      
//       Claim Title: ${title}
//       Claim Description: ${description}`,
//       config: {
//         responseMimeType: "application/json",
//         responseSchema: {
//           type: Type.OBJECT,
//           properties: {
//             summary: { type: Type.STRING },
//             riskScore: { type: Type.NUMBER },
//             nextSteps: { 
//               type: Type.ARRAY,
//               items: { type: Type.STRING }
//             }
//           },
//           required: ["summary", "riskScore", "nextSteps"]
//         }
//       }
//     });

//     return JSON.parse(response.text || '{}');
//   } catch (error) {
//     console.error("AI Analysis Error:", error);
//     return null;
//   }
// };

// export const getDashboardInsights = async (claimsSummary: string) => {
//   try {
//     const response = await ai.models.generateContent({
//       model: 'gemini-3-flash-preview',
//       contents: `You are an AI Claims Manager at VelocityPRO. Given the following summary of current claims, provide 3 strategic insights or alerts for the administrator dashboard.
      
//       Summary Data: ${claimsSummary}`,
//       config: {
//         responseMimeType: "application/json",
//         responseSchema: {
//           type: Type.ARRAY,
//           items: {
//             type: Type.OBJECT,
//             properties: {
//               title: { type: Type.STRING },
//               insight: { type: Type.STRING },
//               priority: { type: Type.STRING, description: "low, medium, high" }
//             }
//           }
//         }
//       }
//     });
//     return JSON.parse(response.text || '[]');
//   } catch (error) {
//     console.error("AI Insight Error:", error);
//     return [];
//   }
// };


if (!gemini) {
  console.warn("Gemini disabled in frontend build");
}
