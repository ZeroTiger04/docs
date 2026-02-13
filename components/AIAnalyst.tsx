import React, { useState } from 'react';
import { Stock, ChartDataPoint } from '../types';
import { analyzeStock } from '../services/geminiService';
import { Sparkles, RefreshCw, AlertTriangle } from 'lucide-react';

interface AIAnalystProps {
  stock: Stock;
  history: ChartDataPoint[];
}

const AIAnalyst: React.FC<AIAnalystProps> = ({ stock, history }) => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    const result = await analyzeStock(stock, history);
    setAnalysis(result);
    setLoading(false);
  };

  return (
    <div className="h-full flex flex-col bg-hts-panel border border-hts-border rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2 text-hts-accent">
          <Sparkles size={18} />
          <h3 className="font-bold text-sm tracking-wide">Gemini Market Analyst</h3>
        </div>
        {!analysis && !loading && (
           <button 
             onClick={handleAnalyze}
             className="text-xs bg-hts-accent/10 text-hts-accent px-3 py-1.5 rounded hover:bg-hts-accent/20 transition-colors flex items-center gap-2"
           >
             Generate Report
           </button>
        )}
        {analysis && (
            <button 
                onClick={handleAnalyze}
                disabled={loading}
                className="text-hts-muted hover:text-white transition-colors"
            >
                <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto pr-1">
        {loading ? (
          <div className="h-full flex flex-col items-center justify-center space-y-3 text-hts-muted animate-pulse">
            <div className="w-8 h-8 rounded-full border-2 border-hts-accent border-t-transparent animate-spin"></div>
            <p className="text-xs">Analyzing market patterns...</p>
          </div>
        ) : analysis ? (
          <div className="text-sm text-gray-300 leading-relaxed space-y-3 font-mono">
            {analysis.split('\n').map((line, i) => {
              if (line.trim().startsWith('**Sentiment:**')) {
                 const isBullish = line.toLowerCase().includes('bullish');
                 return (
                    <div key={i} className={`p-3 rounded border ${isBullish ? 'bg-hts-up/10 border-hts-up/30 text-hts-up' : 'bg-hts-down/10 border-hts-down/30 text-hts-down'} font-bold`}>
                       {line.replace(/\*\*/g, '')}
                    </div>
                 )
              }
              return <p key={i}>{line.replace(/\*\*/g, '')}</p>;
            })}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center text-hts-muted/50 space-y-2">
            <Sparkles size={32} strokeWidth={1} />
            <p className="text-xs max-w-[200px]">
              Hit the button to generate a real-time technical analysis for {stock.name} using Gemini 3.
            </p>
          </div>
        )}
        
        {!process.env.API_KEY && !analysis && (
             <div className="mt-4 p-3 bg-red-900/20 border border-red-900/50 rounded flex gap-2 items-start text-red-400 text-xs">
                 <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                 <p>API Key missing. Please configure your environment.</p>
             </div>
        )}
      </div>
    </div>
  );
};

export default AIAnalyst;
