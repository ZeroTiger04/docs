import React, { useState, useEffect, useRef } from 'react';
import { Stock, ChartDataPoint, TabView, PortfolioPosition } from './types';
import { INITIAL_STOCKS, MOCK_NEWS } from './constants';
import Header from './components/Header';
import WatchList from './components/WatchList';
import StockChart from './components/StockChart';
import OrderBook from './components/OrderBook';
import AIAnalyst from './components/AIAnalyst';
import { Newspaper, Wallet, Clock, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const App: React.FC = () => {
  const [stocks, setStocks] = useState<Stock[]>(INITIAL_STOCKS);
  const [selectedStock, setSelectedStock] = useState<Stock>(INITIAL_STOCKS[0]);
  const [activeTab, setActiveTab] = useState<TabView>(TabView.AI_ANALYSIS);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioPosition[]>([
    { symbol: '005930', shares: 50, avgPrice: 71000 },
    { symbol: '035420', shares: 10, avgPrice: 210000 }
  ]);
  
  // Simulation Timer
  useEffect(() => {
    // Generate initial chart history for the selected stock
    const initialData: ChartDataPoint[] = [];
    let price = selectedStock.prevClose;
    const now = new Date();
    now.setHours(9, 0, 0, 0); // Market Open

    for (let i = 0; i < 60; i++) {
        const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
        const change = (Math.random() - 0.5) * (price * 0.005);
        price += change;
        initialData.push({
            time: timeStr,
            price: price,
            volume: Math.floor(Math.random() * 10000),
            open: price - (Math.random() * change),
            high: price + Math.abs(change),
            low: price - Math.abs(change),
            close: price
        });
        now.setMinutes(now.getMinutes() + 1);
    }
    setChartData(initialData);
  }, [selectedStock.symbol]);

  // Real-time tick simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setStocks(prevStocks => prevStocks.map(stock => {
        if (Math.random() > 0.3) return stock; // 70% chance to update

        const volatility = 0.001; // 0.1% max move per tick
        const change = stock.price * (Math.random() - 0.5) * volatility * 2;
        let newPrice = stock.price + change;
        
        // Ensure price steps (e.g. 100 KRW)
        const step = newPrice > 100000 ? 500 : 100;
        newPrice = Math.round(newPrice / step) * step;

        const priceChange = newPrice - stock.prevClose;
        const percentChange = (priceChange / stock.prevClose) * 100;

        return {
          ...stock,
          price: newPrice,
          change: priceChange,
          changePercent: percentChange,
          volume: stock.volume + Math.floor(Math.random() * 500),
          high: Math.max(stock.high, newPrice),
          low: Math.min(stock.low, newPrice)
        };
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Update chart and selected stock reference when stocks update
  useEffect(() => {
    const updated = stocks.find(s => s.symbol === selectedStock.symbol);
    if (updated) {
       setSelectedStock(updated);
       
       // Update chart live
       setChartData(prev => {
          const last = prev[prev.length - 1];
          const now = new Date();
          const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
          
          // Simple logic: if minute changed, add new point, else update last
          if (last && last.time !== timeStr) {
             return [...prev.slice(-99), {
                 time: timeStr,
                 price: updated.price,
                 volume: 0,
                 open: updated.price,
                 high: updated.price,
                 low: updated.price,
                 close: updated.price
             }];
          } else if (last) {
              const newLast = { ...last, price: updated.price, close: updated.price };
              newLast.high = Math.max(newLast.high, updated.price);
              newLast.low = Math.min(newLast.low, updated.price);
              return [...prev.slice(0, -1), newLast];
          }
          return prev;
       });
    }
  }, [stocks, selectedStock.symbol]);

  const isUp = selectedStock.change >= 0;
  const color = isUp ? '#ef4444' : '#3b82f6';

  return (
    <div className="h-screen w-screen flex flex-col bg-hts-bg text-hts-text overflow-hidden font-sans">
      <Header />
      
      <div className="flex-1 flex min-h-0">
        {/* Left Sidebar: Watchlist */}
        <WatchList stocks={stocks} selectedSymbol={selectedStock.symbol} onSelect={setSelectedStock} />

        {/* Center Main Content */}
        <div className="flex-1 flex flex-col min-w-0 bg-hts-bg">
          
          {/* Stock Header Info */}
          <div className="h-16 border-b border-hts-border flex items-center px-6 justify-between shrink-0 bg-hts-panel">
             <div>
               <div className="flex items-baseline gap-3">
                 <h1 className="text-2xl font-bold text-white tracking-tight">{selectedStock.name}</h1>
                 <span className="text-hts-muted text-sm font-mono">{selectedStock.symbol}</span>
                 <span className="text-xs px-2 py-0.5 rounded bg-hts-border text-hts-muted">{selectedStock.sector}</span>
               </div>
               <div className="flex items-center gap-4 mt-1 font-mono">
                  <span className={`text-xl font-bold ${isUp ? 'text-hts-up' : 'text-hts-down'}`}>
                    {selectedStock.price.toLocaleString()}
                  </span>
                  <div className={`flex items-center gap-1 text-sm ${isUp ? 'text-hts-up' : 'text-hts-down'}`}>
                    {isUp ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                    <span>{selectedStock.change > 0 ? '+' : ''}{selectedStock.change.toLocaleString()}</span>
                    <span>({selectedStock.changePercent.toFixed(2)}%)</span>
                  </div>
                  <div className="text-xs text-hts-muted flex gap-2 ml-4">
                     <span>Vol: <span className="text-white">{selectedStock.volume.toLocaleString()}</span></span>
                     <span>High: <span className="text-hts-up">{selectedStock.high.toLocaleString()}</span></span>
                     <span>Low: <span className="text-hts-down">{selectedStock.low.toLocaleString()}</span></span>
                  </div>
               </div>
             </div>
             
             {/* Simple Buy/Sell Buttons */}
             <div className="flex gap-2">
                <button className="px-6 py-2 bg-hts-up hover:bg-red-600 text-white font-bold rounded shadow-lg shadow-red-900/20 transition-all active:scale-95">
                   BUY
                </button>
                <button className="px-6 py-2 bg-hts-down hover:bg-blue-600 text-white font-bold rounded shadow-lg shadow-blue-900/20 transition-all active:scale-95">
                   SELL
                </button>
             </div>
          </div>

          {/* Main Workspace Grid */}
          <div className="flex-1 p-2 grid grid-cols-12 gap-2 min-h-0 overflow-y-auto">
            
            {/* Chart Area (Top Center) */}
            <div className="col-span-12 lg:col-span-9 h-[400px] lg:h-[55%]">
               <StockChart data={chartData} color={color} />
            </div>

            {/* Order Book (Right Side) */}
            <div className="col-span-12 lg:col-span-3 row-span-2 h-[500px] lg:h-full">
               <OrderBook stock={selectedStock} />
            </div>

            {/* Bottom Panel (Tabs: AI, News, Portfolio) */}
            <div className="col-span-12 lg:col-span-9 h-[300px] lg:h-auto flex flex-col bg-hts-panel border border-hts-border rounded-lg overflow-hidden">
                <div className="flex border-b border-hts-border bg-hts-bg">
                   {[
                      { id: TabView.AI_ANALYSIS, icon: <div className="p-1 rounded bg-gradient-to-br from-indigo-500 to-purple-500 mr-2 text-white"><span className="text-[10px] font-bold">AI</span></div>, label: 'Gemini Analyst' },
                      { id: TabView.NEWS, icon: <Newspaper size={16} className="mr-2" />, label: 'Market News' },
                      { id: TabView.HOLDINGS, icon: <Wallet size={16} className="mr-2" />, label: 'Portfolio' }
                   ].map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center px-4 py-3 text-sm font-medium transition-colors relative
                          ${activeTab === tab.id ? 'text-white bg-hts-panel' : 'text-hts-muted hover:text-white hover:bg-hts-panel/50'}
                        `}
                      >
                         {tab.icon}
                         {tab.label}
                         {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-hts-accent"></div>}
                      </button>
                   ))}
                </div>
                
                <div className="flex-1 p-0 overflow-hidden relative">
                   {activeTab === TabView.AI_ANALYSIS && (
                      <div className="absolute inset-0 p-2">
                        <AIAnalyst stock={selectedStock} history={chartData} />
                      </div>
                   )}
                   
                   {activeTab === TabView.NEWS && (
                      <div className="absolute inset-0 overflow-y-auto p-4">
                         <ul className="space-y-3">
                            {MOCK_NEWS.map(news => (
                               <li key={news.id} className="flex gap-4 border-b border-hts-border/50 pb-3 last:border-0 cursor-pointer group">
                                  <span className="text-hts-muted text-xs font-mono pt-1">{news.time}</span>
                                  <div>
                                     <h4 className="text-sm text-gray-200 group-hover:text-hts-accent transition-colors">{news.title}</h4>
                                     <span className="text-[10px] text-hts-muted bg-hts-border px-1.5 py-0.5 rounded mt-1 inline-block">{news.source}</span>
                                  </div>
                               </li>
                            ))}
                         </ul>
                      </div>
                   )}

                   {activeTab === TabView.HOLDINGS && (
                      <div className="absolute inset-0 overflow-y-auto">
                        <table className="w-full text-sm">
                           <thead className="text-hts-muted bg-hts-bg text-xs">
                              <tr>
                                 <th className="text-left p-3 font-medium">Symbol</th>
                                 <th className="text-right p-3 font-medium">Shares</th>
                                 <th className="text-right p-3 font-medium">Avg Price</th>
                                 <th className="text-right p-3 font-medium">Cur Price</th>
                                 <th className="text-right p-3 font-medium">P/L</th>
                              </tr>
                           </thead>
                           <tbody>
                              {portfolio.map(pos => {
                                 const current = stocks.find(s => s.symbol === pos.symbol);
                                 if (!current) return null;
                                 const pl = (current.price - pos.avgPrice) * pos.shares;
                                 const plPercent = ((current.price - pos.avgPrice) / pos.avgPrice) * 100;
                                 const isPosUp = pl >= 0;
                                 
                                 return (
                                    <tr key={pos.symbol} className="border-b border-hts-border/50 hover:bg-hts-bg/50">
                                       <td className="p-3">
                                          <div className="font-bold">{current.name}</div>
                                          <div className="text-xs text-hts-muted">{pos.symbol}</div>
                                       </td>
                                       <td className="p-3 text-right">{pos.shares}</td>
                                       <td className="p-3 text-right text-hts-muted">{pos.avgPrice.toLocaleString()}</td>
                                       <td className="p-3 text-right">{current.price.toLocaleString()}</td>
                                       <td className={`p-3 text-right font-mono font-medium ${isPosUp ? 'text-hts-up' : 'text-hts-down'}`}>
                                          <div>{pl.toLocaleString()}</div>
                                          <div className="text-xs">{plPercent.toFixed(2)}%</div>
                                       </td>
                                    </tr>
                                 )
                              })}
                           </tbody>
                        </table>
                      </div>
                   )}
                </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
