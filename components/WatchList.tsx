import React from 'react';
import { Stock } from '../types';
import { TrendingUp, TrendingDown, Search } from 'lucide-react';

interface WatchListProps {
  stocks: Stock[];
  selectedSymbol: string;
  onSelect: (stock: Stock) => void;
}

const WatchList: React.FC<WatchListProps> = ({ stocks, selectedSymbol, onSelect }) => {
  return (
    <div className="flex flex-col h-full bg-hts-panel border-r border-hts-border w-64">
      {/* Header */}
      <div className="p-3 border-b border-hts-border bg-hts-bg">
        <h2 className="text-hts-accent font-bold text-sm mb-2">KOSPI 200</h2>
        <div className="relative">
          <Search size={14} className="absolute left-2 top-2 text-hts-muted" />
          <input 
            type="text" 
            placeholder="Search symbol" 
            className="w-full bg-hts-panel border border-hts-border rounded px-8 py-1.5 text-xs text-white focus:outline-none focus:border-hts-accent"
          />
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        <table className="w-full text-xs">
          <thead className="text-hts-muted bg-hts-bg sticky top-0 z-10 font-normal">
             <tr>
               <th className="text-left p-2 font-medium">Symbol</th>
               <th className="text-right p-2 font-medium">Price</th>
               <th className="text-right p-2 font-medium">Chg%</th>
             </tr>
          </thead>
          <tbody>
            {stocks.map(stock => {
              const isUp = stock.change >= 0;
              const isSelected = stock.symbol === selectedSymbol;
              return (
                <tr 
                  key={stock.symbol} 
                  onClick={() => onSelect(stock)}
                  className={`
                    cursor-pointer transition-colors border-b border-hts-border/50
                    ${isSelected ? 'bg-hts-border' : 'hover:bg-hts-border/50'}
                  `}
                >
                  <td className="p-2">
                    <div className="text-white font-medium">{stock.name}</div>
                    <div className="text-hts-muted text-[10px]">{stock.symbol}</div>
                  </td>
                  <td className={`p-2 text-right font-mono ${isUp ? 'text-hts-up' : 'text-hts-down'}`}>
                    {stock.price.toLocaleString()}
                  </td>
                  <td className={`p-2 text-right font-mono ${isUp ? 'text-hts-up' : 'text-hts-down'}`}>
                    <div className="flex items-center justify-end gap-1">
                       {isUp ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                       {stock.changePercent.toFixed(2)}%
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {/* Footer Summary */}
      <div className="p-2 border-t border-hts-border text-[10px] text-hts-muted flex justify-between bg-hts-bg">
         <span>Total: {stocks.length}</span>
         <span>Conn: <span className="text-green-500">Stable</span></span>
      </div>
    </div>
  );
};

export default WatchList;
