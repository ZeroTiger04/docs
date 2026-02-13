import React, { useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { ChartDataPoint } from '../types';

interface StockChartProps {
  data: ChartDataPoint[];
  color: string;
}

const StockChart: React.FC<StockChartProps> = ({ data, color }) => {
  const minPrice = useMemo(() => Math.min(...data.map(d => d.price)) * 0.995, [data]);
  const maxPrice = useMemo(() => Math.max(...data.map(d => d.price)) * 1.005, [data]);

  return (
    <div className="w-full h-full p-2 bg-hts-panel rounded-lg border border-hts-border flex flex-col">
      <div className="flex justify-between items-center mb-2 px-2">
        <h3 className="text-hts-muted text-xs font-semibold uppercase">Intraday Chart (1m)</h3>
        <div className="flex gap-2">
           <span className="text-[10px] text-hts-muted bg-hts-bg px-2 py-1 rounded border border-hts-border">MA5</span>
           <span className="text-[10px] text-hts-muted bg-hts-bg px-2 py-1 rounded border border-hts-border">MA20</span>
           <span className="text-[10px] text-hts-muted bg-hts-bg px-2 py-1 rounded border border-hts-border">VOL</span>
        </div>
      </div>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={color} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2e37" vertical={false} />
            <XAxis 
              dataKey="time" 
              tick={{ fontSize: 10, fill: '#94a3b8' }} 
              axisLine={false}
              tickLine={false}
              interval={Math.floor(data.length / 5)}
            />
            <YAxis 
              domain={[minPrice, maxPrice]} 
              tick={{ fontSize: 10, fill: '#94a3b8' }} 
              orientation="right"
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#181b21', borderColor: '#2a2e37', color: '#e2e8f0', fontSize: '12px' }}
              itemStyle={{ color: '#e2e8f0' }}
              formatter={(value: number) => [value.toLocaleString(), 'Price']}
            />
            <ReferenceLine y={data[0]?.open} stroke="#94a3b8" strokeDasharray="3 3" label={{ position: 'left', value: 'Open', fill: '#94a3b8', fontSize: 10}} />
            <Area 
              type="monotone" 
              dataKey="price" 
              stroke={color} 
              fillOpacity={1} 
              fill="url(#colorPrice)" 
              strokeWidth={2}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StockChart;
