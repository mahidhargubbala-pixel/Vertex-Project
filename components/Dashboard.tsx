
import React from 'react';

interface DashboardProps {
  onStartInterview: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onStartInterview }) => {
  const stats = [
    { label: 'SKILL MASTERY', value: '72%', change: '+5% from last month', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
    { label: 'ROADMAP PROGRESS', value: '4/12', subLabel: 'Next: Senior Mastery', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { label: 'INTERVIEW READINESS', value: 'Ready', subLabel: 'Mock score: 8.5/10', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
    { label: 'LEARNING HOURS', value: '24.5h', subLabel: 'Goal: 30h this month', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
  ];

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Welcome back, John!</h2>
          <p className="text-slate-500 mt-1 text-lg">Here's your career progress at a glance.</p>
        </div>
        <button 
          onClick={onStartInterview}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl text-sm font-bold flex items-center gap-3 transition-all shadow-lg active:scale-95"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Start Mock Interview
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="glass-card p-6 rounded-3xl border border-slate-100 bg-white/90">
            <div className="flex justify-between items-start mb-6">
               <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shadow-sm">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                  </svg>
               </div>
               <span className="text-[10px] font-black text-slate-400 tracking-[0.15em]">{stat.label}</span>
            </div>
            <div className="mt-2">
              <h3 className="text-4xl font-black text-slate-900 tracking-tight">{stat.value}</h3>
              <p className="text-xs mt-2 text-slate-500 font-medium">{stat.change || stat.subLabel}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card rounded-[2.5rem] p-8">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-600"></div>
              Active Roadmap: Senior Frontend Engineer
            </h3>
            <button className="text-blue-600 text-sm font-bold hover:underline transition-all">View full path &rarr;</button>
          </div>

          <div className="space-y-12 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100/80">
            <div className="relative pl-12 group">
              <div className="absolute left-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-4 border-white shadow-md z-10">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-slate-900 group-hover:text-green-600 transition-colors">Foundational Concepts</h4>
                  <p className="text-xs text-slate-500 font-medium">Jan 12 • Completed in 14 days</p>
                </div>
                <div className="bg-green-50 text-green-700 px-4 py-1.5 rounded-xl text-[10px] font-black tracking-widest uppercase border border-green-100">COMPLETED</div>
              </div>
            </div>

            <div className="relative pl-12 group">
              <div className="absolute left-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center border-4 border-white shadow-md z-10 animate-pulse"></div>
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Advanced Patterns & Architecture</h4>
                  <p className="text-xs text-blue-600 font-bold">Currently exploring unit testing patterns</p>
                </div>
                <div className="bg-blue-50 text-blue-700 px-4 py-1.5 rounded-xl text-[10px] font-black tracking-widest uppercase border border-blue-100">IN PROGRESS</div>
              </div>
            </div>

            <div className="relative pl-12 opacity-50">
              <div className="absolute left-0 w-6 h-6 bg-slate-200 rounded-full border-4 border-white shadow-sm z-10"></div>
              <div>
                <h4 className="font-bold text-slate-700">Ecosystem Specialization</h4>
                <p className="text-xs text-slate-400 font-medium">Coming up next month</p>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-50 flex items-center justify-between">
            <div className="flex-1">
              <div className="flex justify-between items-center mb-3">
                <p className="text-sm font-black text-slate-800 tracking-tight">Overall Mastery</p>
                <span className="font-black text-blue-600">45%</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                <div className="h-full bg-blue-600 rounded-full transition-all duration-1000 ease-out" style={{ width: '45%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="glass-card rounded-[2rem] p-8">
            <h3 className="font-black text-slate-900 mb-6 flex items-center gap-2">
               <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
               Skills Spotlight
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {['JavaScript', 'React', 'Python', 'TypeScript', 'Node.js', 'System Design'].map(skill => (
                <span key={skill} className="bg-slate-50 text-slate-700 border border-slate-100 px-4 py-2 rounded-xl text-xs font-bold hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100 transition-all cursor-default">
                  {skill}
                </span>
              ))}
            </div>
            <button className="w-full mt-8 py-3 bg-slate-50 text-blue-600 text-sm font-black border border-slate-100 rounded-2xl hover:bg-blue-50 transition-all uppercase tracking-widest">Update Profile</button>
          </div>

          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl transition-transform hover:scale-[1.02] duration-500 group">
             <div className="relative z-10 space-y-4">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md">
                   <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
                <h3 className="font-black text-2xl tracking-tight">Explore New Horizons</h3>
                <p className="text-slate-400 text-sm font-medium leading-relaxed mb-6">Curious about other roles? Use our AI Discovery Engine to find your next match.</p>
                <button className="bg-white text-slate-900 px-6 py-4 rounded-2xl text-sm font-black w-full transition-all group-hover:bg-blue-400 group-hover:text-white shadow-xl active:scale-95">
                  Start Discovery &rarr;
                </button>
             </div>
             <div className="absolute -right-16 -bottom-16 w-56 h-56 bg-blue-600/30 blur-[80px] rounded-full group-hover:scale-125 transition-transform duration-700"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
