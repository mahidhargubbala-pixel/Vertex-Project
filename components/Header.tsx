
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-10">
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search skills, jobs, resources..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-right hidden sm:block">
          <p className="text-[9px] text-slate-400 font-black tracking-[0.2em] leading-none uppercase">REACH YOUR CAREER PEAK</p>
          <p className="text-xs font-black text-slate-800 leading-tight tracking-wider">VERTEX</p>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="text-slate-400 hover:text-slate-600 transition-colors p-1 relative">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-0 right-0 w-2 h-2 bg-blue-500 rounded-full border border-white"></span>
          </button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-slate-100 shadow-inner overflow-hidden border border-slate-200">
               <img src="https://picsum.photos/32/32" alt="Avatar" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
