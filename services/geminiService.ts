import { GoogleGenAI } from "@google/genai";
import { Stock, ChartDataPoint } from '../types';

let ai: GoogleGenAI | null = null;

const getAI = () => {
  if (!ai) {
    // Note: In a real app, this should be handled securely. 
    // Here we rely on the env var being present as per instructions.
    if (process.env.API_KEY) {
      ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    }
  }
  return ai;
};

export const analyzeStock = async (stock: Stock, history: ChartDataPoint[]): Promise<string> => {
  const client = getAI();
  if (!client) return "API Key not configured. Please check your settings.";

  const recentHistory = history.slice(-10); // Analyze last 10 data points
  const historyStr = recentHistory.map(h => 
    `Time: ${h.time}, Close: ${h.price}, Vol: ${h.volume}`
  ).join('\n');

  const prompt = `
    Act as a professional senior stock market analyst. 
    Analyze the following real-time data for ${stock.name} (${stock.symbol}).
    
    Current Price: ${stock.price}
    Change: ${stock.change} (${stock.changePercent}%)
    Volume: ${stock.volume}
    High/Low: ${stock.high} / ${stock.low}
    
    Recent Trend Data (Last 10 intervals):
    ${historyStr}
    
    Provide a concise, 3-sentence summary of the current technical standing. 
    Then, provide a "Bullish" or "Bearish" sentiment with a confidence percentage.
    Output format:
    **Analysis:** [Your text]
    **Sentiment:** [Bullish/Bearish] ([Percentage]%)
  `;

  try {
    const response = await client.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "Analysis failed to generate.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error connecting to AI Analyst. Please try again later.";
  }
};
