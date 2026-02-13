import React, { useMemo } from 'react';
import { Stock } from '../types';

interface OrderBookProps {
  stock: Stock;
}

const OrderBook: React.FC<OrderBookProps> = ({ stock }) => {
  // Generate mock order book based on current price
  const asks = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) => {
      const price = stock.price + (10 - i) * (stock.price > 100000 ? 500 : 100);
      return {
        price,
        amount: Math.floor(Math.random() * 500) + 10,
        percent: ((price - stock.prevClose) / stock.prevClose) * 100
      };
    });
  }, [stock.price, stock.prevClose]);

  const bids = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) => {
      const price = stock.price - (i) * (stock.price > 100000 ? 500 : 100);
      return {
        price,
        amount: Math.floor(Math.random() * 800) + 10,
        percent: ((price - stock.prevClose) / stock.prevClose) * 100
      };
    });
  }, [stock.price, stock.prevClose]);

  return (
    <div className="flex flex-col h-full bg-hts-panel border border-hts-border rounded-lg overflow-hidden text-xs font-mono select-none">
       <div className="bg-hts-bg p-2 border-b border-hts-border font-bold text-center text-hts-muted">
         Order Book
       </div>
       <div className="flex-1 overflow-y-auto no-scrollbar relative">
         {/* Asks */}
         <div className="flex flex-col justify-end">
           {asks.map((ask, idx) => (
             <div key={`ask-${idx}`} className="flex items-center h-7 hover:bg-hts-bg cursor-pointer bg-[#3b82f6]/10">
               <div className="w-1/3 text-right pr-2 text-hts-down">{ask.price.toLocaleString()}</div>
               <div className="w-1/6 text-right pr-2 text-[10px] text-hts-down">{ask.percent.toFixed(2)}%</div>
               <div className="w-1/2 relative h-full flex items-center">
                  <div className="absolute left-0 top-1 bottom-1 bg-[#3b82f6]/20" style={{ width: `${Math.min(ask.amount / 10, 100)}%` }}></div>
                  <span className="z-10 pl-2 text-hts-muted">{ask.amount.toLocaleString()}</span>
               </div>
             </div>
           ))}
         </div>

         {/* Bids */}
         <div className="flex flex-col border-t border-hts-border">
           {bids.map((bid, idx) => (
             <div key={`bid-${idx}`} className="flex items-center h-7 hover:bg-hts-bg cursor-pointer bg-[#ef4444]/10">
               <div className="w-1/3 text-right pr-2 text-hts-up">{bid.price.toLocaleString()}</div>
               <div className="w-1/6 text-right pr-2 text-[10px] text-hts-up">{bid.percent.toFixed(2)}%</div>
               <div className="w-1/2 relative h-full flex items-center justify-end pr-2">
                  <div className="absolute right-0 top-1 bottom-1 bg-[#ef4444]/20" style={{ width: `${Math.min(bid.amount / 10, 100)}%` }}></div>
                  <span className="z-10 text-hts-muted">{bid.amount.toLocaleString()}</span>
               </div>
             </div>
           ))}
         </div>
       </div>
    </div>
  );
};

export default OrderBook;
