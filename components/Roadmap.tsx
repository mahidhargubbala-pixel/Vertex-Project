
import React, { useEffect, useState } from 'react';

const Roadmap: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-6">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
               </svg>
            </div>
          </div>
        </div>
        <div className="text-center">
           <h2 className="text-2xl font-bold text-slate-900 mb-2">Generating your personalized journey...</h2>
           <p className="text-slate-500">Analyzing skills for Senior Frontend Engineer</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 py-4 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Your Career Roadmap</h2>
          <p className="text-slate-500 mt-2">Targeting: <span className="font-bold text-slate-700">Senior Frontend Engineer</span></p>
        </div>
        <button className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Regenerate Path
        </button>
      </div>

      <div className="relative">
        <div className="absolute left-[27px] top-0 bottom-0 w-1 bg-slate-100 rounded-full"></div>
        
        {[
          { title: 'Modern JS Mastery', status: 'COMPLETED', items: ['Proxies & Reflect', 'Memory Management', 'Web Workers'] },
          { title: 'Architecture Patterns', status: 'IN_PROGRESS', items: ['Design Patterns', 'Micro-frontends', 'State Management Architecture'] },
          { title: 'System Performance', status: 'LOCKED', items: ['Core Web Vitals', 'Wasm Integration', 'Network Optimization'] },
          { title: 'Leadership & Mentoring', status: 'LOCKED', items: ['Technical Design Review', 'Stakeholder Communication'] },
        ].map((node, i) => (
          <div key={i} className={`relative pl-20 mb-16 last:mb-0 ${node.status === 'LOCKED' ? 'opacity-40' : ''}`}>
             <div className={`absolute left-0 w-14 h-14 rounded-2xl flex items-center justify-center border-4 border-white shadow-sm z-10 ${
                node.status === 'COMPLETED' ? 'bg-green-500' : 
                node.status === 'IN_PROGRESS' ? 'bg-blue-600' : 'bg-slate-200'
             }`}>
                {node.status === 'COMPLETED' ? (
                   <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                   </svg>
                ) : (
                   <span className="text-white font-bold">{i + 1}</span>
                )}
             </div>
             <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                <div className="flex justify-between items-start mb-6">
                   <h3 className="text-2xl font-bold text-slate-900">{node.title}</h3>
                   <span className={`text-[10px] font-bold tracking-widest px-3 py-1 rounded-full ${
                      node.status === 'COMPLETED' ? 'bg-green-50 text-green-700' : 
                      node.status === 'IN_PROGRESS' ? 'bg-blue-50 text-blue-700 animate-pulse' : 'bg-slate-50 text-slate-400'
                   }`}>
                      {node.status}
                   </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {node.items.map((item, j) => (
                    <div key={j} className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex items-center gap-3">
                       <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                       <span className="text-sm font-medium text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Roadmap;
