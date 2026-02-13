import { Stock } from './types';

export const INITIAL_STOCKS: Stock[] = [
  {
    symbol: '005930',
    name: 'Samsung Elec',
    price: 72500,
    change: 500,
    changePercent: 0.69,
    volume: 12504300,
    high: 73000,
    low: 71800,
    open: 72000,
    prevClose: 72000,
    sector: 'Technology'
  },
  {
    symbol: '000660',
    name: 'SK hynix',
    price: 132000,
    change: -1500,
    changePercent: -1.12,
    volume: 3402000,
    high: 134500,
    low: 131000,
    open: 134000,
    prevClose: 133500,
    sector: 'Technology'
  },
  {
    symbol: '373220',
    name: 'LG Energy',
    price: 415000,
    change: 8000,
    changePercent: 1.96,
    volume: 250100,
    high: 418000,
    low: 405000,
    open: 408000,
    prevClose: 407000,
    sector: 'Energy'
  },
  {
    symbol: '005380',
    name: 'Hyundai Motor',
    price: 198000,
    change: 0,
    changePercent: 0.00,
    volume: 540300,
    high: 199500,
    low: 196500,
    open: 198000,
    prevClose: 198000,
    sector: 'Auto'
  },
  {
    symbol: '035420',
    name: 'NAVER',
    price: 205500,
    change: -3000,
    changePercent: -1.44,
    volume: 680200,
    high: 209000,
    low: 204000,
    open: 208500,
    prevClose: 208500,
    sector: 'Internet'
  },
  {
    symbol: '035720',
    name: 'Kakao',
    price: 54300,
    change: 200,
    changePercent: 0.37,
    volume: 1200500,
    high: 54800,
    low: 53900,
    open: 54100,
    prevClose: 54100,
    sector: 'Internet'
  }
];

export const MOCK_NEWS = [
  { id: 1, time: '14:30', title: 'Global semi-conductor sales surge in Q3', source: 'MarketWire' },
  { id: 2, time: '13:15', title: 'Central bank hints at rate stabilization', source: 'EconToday' },
  { id: 3, time: '11:45', title: 'Tech sector rally continues amidst AI boom', source: 'TechDaily' },
  { id: 4, time: '10:20', title: 'Oil prices fluctuate due to supply concerns', source: 'EnergyNews' },
  { id: 5, time: '09:05', title: 'Opening bell: Markets start mixed', source: 'MorningCall' },
];
