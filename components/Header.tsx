import React from 'react';
import { Activity, Bell, Settings, User } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="h-12 bg-hts-bg border-b border-hts-border flex items-center justify-between px-4 shrink-0">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-hts-accent font-bold text-lg tracking-tighter">
          <Activity size={24} />
          <span>NextGen<span className="text-white font-light">HTS</span></span>
        </div>
        
        {/* Ticker Tape */}
        <div className="hidden md:flex items-center gap-6 ml-8 text-xs font-mono">
           <div className="flex items-center gap-2">
              <span className="text-hts-muted">KOSPI</span>
              <span className="text-hts-up">2,564.21 ▲ 12.45</span>
           </div>
           <div className="flex items-center gap-2">
              <span className="text-hts-muted">KOSDAQ</span>
              <span className="text-hts-down">845.12 ▼ 3.22</span>
           </div>
           <div className="flex items-center gap-2">
              <span className="text-hts-muted">USD/KRW</span>
              <span className="text-hts-up">1,342.00 ▲ 5.00</span>
           </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="text-hts-muted hover:text-white transition-colors relative">
           <Bell size={18} />
           <span className="absolute -top-1 -right-1 w-2 h-2 bg-hts-accent rounded-full"></span>
        </button>
        <button className="text-hts-muted hover:text-white transition-colors">
           <Settings size={18} />
        </button>
        <div className="h-8 w-[1px] bg-hts-border mx-1"></div>
        <div className="flex items-center gap-2 text-sm text-hts-muted hover:text-white cursor-pointer">
           <div className="w-6 h-6 rounded-full bg-hts-panel border border-hts-border flex items-center justify-center">
              <User size={14} />
           </div>
           <span>zerotiger04</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
