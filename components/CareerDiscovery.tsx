
import React, { useState } from 'react';

interface CareerDiscoveryProps {
  onGenerateRoadmap: () => void;
}

const CareerDiscovery: React.FC<CareerDiscoveryProps> = ({ onGenerateRoadmap }) => {
  const [goal, setGoal] = useState('');

  return (
    <div className="max-w-4xl mx-auto space-y-12 py-8">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-slate-100 rounded-full mx-auto flex items-center justify-center text-slate-400 mb-6">
           <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
           </svg>
        </div>
        <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Career Discovery Engine</h2>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          Not sure where to head next? Let our AI analyze your profile and market trends to find your perfect professional fit.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-10 flex flex-col justify-between transition-transform hover:-translate-y-1 duration-300">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900">I have a goal</h3>
            </div>
            <p className="text-slate-500 text-sm mb-8 leading-relaxed">
              Specify the role you're aiming for. We'll perform a skill-gap analysis and map out your journey.
            </p>
            <div className="relative mb-8">
              <input
                type="text"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="e.g. Solutions Architect, Product Lead..."
                className="w-full pl-10 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-sm text-black font-medium focus:ring-2 focus:ring-blue-500 transition-all outline-none"
              />
              <svg className="absolute left-3 top-4 w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <button 
            onClick={onGenerateRoadmap}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold transition-all shadow-md active:scale-[0.98]"
          >
            Generate My Roadmap &rarr;
          </button>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-10 flex flex-col justify-between transition-transform hover:-translate-y-1 duration-300">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900">I'm exploring</h3>
            </div>
            <p className="text-slate-500 text-sm mb-8 leading-relaxed">
              Let our AI scan your skills and interests to suggest high-impact career pivots you might have missed.
            </p>
            <div className="aspect-video bg-slate-50 rounded-2xl flex items-center justify-center border border-dashed border-slate-200 mb-8 overflow-hidden group">
               <div className="text-center group-hover:scale-105 transition-transform">
                  <div className="w-12 h-12 bg-white rounded-full shadow-sm mx-auto flex items-center justify-center text-indigo-600 mb-3">
                     <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                     </svg>
                  </div>
                  <p className="text-xs font-bold text-slate-400 tracking-widest uppercase">Profile Ready for Scan</p>
               </div>
            </div>
          </div>
          <button className="w-full bg-slate-900 hover:bg-black text-white py-4 rounded-xl font-bold transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-3">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.691.34a2 2 0 01-1.783 0l-.691-.34a6 6 0 00-3.86-.517l-2.387.477a2 2 0 00-1.022.547l-1.16 1.16a2 2 0 00-.437 2.218l.09.208a2 2 0 002.04 1.157l1.77-.177a6 6 0 004.242-1.758l.707-.707a2 2 0 012.828 0 l.707.707a6 6 0 004.242 1.758l1.77.177a2 2 0 002.04-1.157l.09-.208a2 2 0 00-.437-2.218l-1.16-1.16zM12 7V3m0 0l-3 3m3-3l3 3" />
            </svg>
            Scan My Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default CareerDiscovery;
