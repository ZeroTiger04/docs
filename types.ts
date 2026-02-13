export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  high: number;
  low: number;
  open: number;
  prevClose: number;
  sector: string;
}

export interface ChartDataPoint {
  time: string;
  price: number;
  volume: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface OrderBookItem {
  price: number;
  amount: number;
  total: number;
  type: 'ask' | 'bid';
}

export interface PortfolioPosition {
  symbol: string;
  shares: number;
  avgPrice: number;
}

export enum TabView {
  CHART = 'CHART',
  AI_ANALYSIS = 'AI_ANALYSIS',
  NEWS = 'NEWS',
  HOLDINGS = 'HOLDINGS'
}
