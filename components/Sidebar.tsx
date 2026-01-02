
import React from 'react';
import { AppView } from '../types';

interface SidebarProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate }) => {
  const navItems = [
    { view: AppView.DASHBOARD, icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
    { view: AppView.PROFILE, icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { view: AppView.DISCOVERY, icon: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z' },
    { view: AppView.ROADMAPS, icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
    { view: AppView.RESOURCES, icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
    { view: AppView.RESUME_AI, icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { view: AppView.COMM_LAB, icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' },
    { view: AppView.MOCK_INTERVIEW, icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' },
  ];

  return (
    <div className="w-64 bg-slate-900 flex flex-col text-slate-300">
      <div className="p-8 text-center">
        <div className="flex flex-col items-center gap-4 mb-2">
          <div className="w-16 h-16 flex items-center justify-center relative group">
             {/* Detailed Eagle-V SVG as requested */}
             <div className="animate-spin-slow w-full h-full flex items-center justify-center drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white">
                  {/* Outer wing silhouettes forming V */}
                  <path d="M10 20 L40 85 L50 95 L60 85 L90 20 L75 22 L50 75 L25 22 Z" fill="currentColor" fillOpacity="0.8" />
                  {/* Detailed Feathered Wings Layers */}
                  <path d="M15 30 L45 80 L50 85 L55 80 L85 30 L70 32 L50 70 L30 32 Z" fill="currentColor" fillOpacity="0.5" />
                  {/* Eagle head in the center facing right */}
                  <path d="M48 45 C48 40 52 38 55 38 C58 38 60 40 60 45 C60 52 55 58 50 62 C45 58 40 52 40 45 C40 40 42 38 45 38 C46 38 47 38.5 48 40" fill="currentColor" />
                  {/* Eye and Beak highlights */}
                  <circle cx="53" cy="42" r="1.5" fill="#1e293b" />
                  <path d="M56 46 L60 45 L56 44 Z" fill="#1e293b" />
                  {/* Tail/Bottom feathers */}
                  <path d="M45 80 L50 95 L55 80 L52 85 L50 82 L48 85 Z" fill="currentColor" />
                </svg>
             </div>
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-white tracking-[0.2em] leading-none">VERTEX</h1>
            <p className="text-[9px] text-slate-400 font-bold leading-tight uppercase tracking-[0.15em]">REACH YOUR CAREER PEAK</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1 mt-4">
        {navItems.map((item) => (
          <button
            key={item.view}
            onClick={() => onNavigate(item.view)}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition-all ${
              currentView === item.view
                ? 'bg-slate-800 text-white shadow-lg border-l-4 border-blue-500'
                : 'hover:bg-slate-800/50 hover:text-slate-100'
            }`}
          >
            <svg className="w-5 h-5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
            </svg>
            {item.view}
          </button>
        ))}
      </nav>

      <div className="p-6 space-y-6">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl text-sm font-bold flex items-center justify-center gap-3 transition-all shadow-xl active:scale-95">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
          AI VOICE LAB
        </button>

        <div className="flex items-center gap-3 px-3 py-4 border-t border-slate-800">
          <div className="w-10 h-10 bg-slate-700 rounded-2xl flex items-center justify-center text-xs font-bold text-white overflow-hidden ring-2 ring-slate-800 shadow-inner">
            <img src="https://picsum.photos/40/40" alt="Avatar" />
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-bold text-white truncate">John Smith</p>
            <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Peak Explorer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
