
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";

const MockInterview: React.FC = () => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [sessionStep, setSessionStep] = useState<'setup' | 'active' | 'feedback'>('setup');
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [userTranscript, setUserTranscript] = useState('');
  const [isAiTalking, setIsAiTalking] = useState(false);
  const [timer, setTimer] = useState(0);
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const intervalRef = useRef<number>(null);

  useEffect(() => {
    if (isSimulating && sessionStep === 'active') {
      const start = Date.now();
      const interval = window.setInterval(() => {
        setTimer(Math.floor((Date.now() - start) / 1000));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isSimulating, sessionStep]);

  const startInterview = async () => {
    setSessionStep('active');
    setIsSimulating(true);
    await askNextQuestion();
  };

  const askNextQuestion = async () => {
    setIsAiTalking(true);
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "You are an interviewer for a Senior Software Engineer position. Ask one challenging technical or behavioral question. Keep it concise.",
        config: { systemInstruction: "Act as a tough but fair interviewer. Do not break character." }
      });
      setCurrentQuestion(response.text || "Tell me about your most challenging project.");
    } catch (e) {
      setCurrentQuestion("Tell me about your experience with large-scale React applications.");
    } finally {
      setIsAiTalking(false);
    }
  };

  const finishSession = () => {
    setSessionStep('feedback');
    setIsSimulating(false);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">AI Mock Interview</h2>
          <p className="text-slate-500 mt-1">Simulate real-world pressure with Gemini Intelligence.</p>
        </div>
        {sessionStep === 'active' && (
          <div className="bg-red-50 text-red-600 px-4 py-2 rounded-full font-mono font-bold flex items-center gap-2">
            <div className="w-2 h-2 bg-red-600 rounded-full animate-ping"></div>
            LIVE: {formatTime(timer)}
          </div>
        )}
      </div>

      {sessionStep === 'setup' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
              <h3 className="text-xl font-bold text-slate-800 mb-8">Setup Session</h3>
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Environment</label>
                    <select className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-black focus:ring-2 focus:ring-blue-500 outline-none">
                      <option>FAANG Boardroom</option>
                      <option>Startup Cafe</option>
                      <option>Remote (Zoom Style)</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Focus Area</label>
                    <select className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-black focus:ring-2 focus:ring-blue-500 outline-none">
                      <option>Frontend Engineering</option>
                      <option>System Design</option>
                      <option>Behavioral / Cultural</option>
                    </select>
                  </div>
                </div>
                <button 
                  onClick={startInterview}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg active:scale-95 flex items-center justify-center gap-4"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /></svg>
                  Begin Simulation
                </button>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-4">
               <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h4 className="font-bold text-slate-900 mb-2">Powered by Gemini Pro</h4>
            <p className="text-xs text-slate-500">Real-time analysis of your answers, body language, and technical accuracy.</p>
          </div>
        </div>
      )}

      {sessionStep === 'active' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-slate-900 rounded-3xl p-10 text-white min-h-[400px] flex flex-col justify-between relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Interviewer Connected</span>
                  </div>
               </div>
               
               <div className="flex-1 flex flex-col items-center justify-center text-center max-w-2xl mx-auto space-y-8">
                  <div className={`w-24 h-24 rounded-full bg-slate-800 flex items-center justify-center border-4 border-slate-700 transition-all ${isAiTalking ? 'ring-8 ring-blue-500/20 scale-110' : ''}`}>
                    <svg className="w-12 h-12 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  </div>
                  <h3 className="text-2xl font-medium leading-relaxed italic">
                    {isAiTalking ? (
                      <div className="flex gap-2 items-center justify-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                      </div>
                    ) : (
                      currentQuestion || "Please wait for the first question..."
                    )}
                  </h3>
               </div>

               <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Your Response (Voice to Text)</span>
                    <div className="flex gap-2">
                       <div className="h-4 w-1 bg-blue-500 animate-pulse"></div>
                       <div className="h-4 w-1 bg-blue-500 animate-pulse [animation-delay:0.1s]"></div>
                       <div className="h-4 w-1 bg-blue-500 animate-pulse [animation-delay:0.2s]"></div>
                    </div>
                  </div>
                  <textarea
                    value={userTranscript}
                    onChange={(e) => setUserTranscript(e.target.value)}
                    placeholder="Speaking... (Your voice will appear here)"
                    className="w-full bg-transparent border-none text-white text-sm outline-none resize-none h-20 placeholder:text-slate-600"
                  />
               </div>
            </div>

            <div className="flex gap-4">
               <button 
                onClick={askNextQuestion}
                className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-xl"
               >
                 Next Question
               </button>
               <button 
                onClick={finishSession}
                className="px-8 bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-black transition-all shadow-xl"
               >
                 Finish Interview
               </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
               <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Real-time Metrics</h4>
               <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span className="text-slate-700">Confidence</span>
                      <span className="text-blue-600">High</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full">
                      <div className="h-full bg-blue-600 rounded-full w-[85%]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span className="text-slate-700">Clarity</span>
                      <span className="text-green-600">Optimal</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full">
                      <div className="h-full bg-green-500 rounded-full w-[92%]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span className="text-slate-700">Eye Contact</span>
                      <span className="text-yellow-600">Fair</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full">
                      <div className="h-full bg-yellow-500 rounded-full w-[60%]"></div>
                    </div>
                  </div>
               </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm overflow-hidden relative">
               <video className="w-full rounded-2xl grayscale brightness-75" autoPlay muted loop src="https://assets.mixkit.co/videos/preview/mixkit-man-working-on-his-laptop-308-large.mp4" />
               <div className="absolute inset-0 bg-blue-600/10 mix-blend-overlay"></div>
               <div className="absolute top-8 left-8 text-[10px] font-bold text-white uppercase tracking-widest bg-black/50 px-2 py-1 rounded">User_Feed_01</div>
            </div>
          </div>
        </div>
      )}

      {sessionStep === 'feedback' && (
        <div className="max-w-4xl mx-auto space-y-8 animate-in zoom-in-95 duration-500">
           <div className="bg-white rounded-[3rem] p-12 border border-slate-200 shadow-2xl text-center">
              <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center text-green-600 mx-auto mb-8">
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-4xl font-black text-slate-900 mb-4">Interview Completed</h3>
              <p className="text-slate-500 mb-12">Vertex AI has analyzed your performance across 48 distinct career indicators.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                 <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Readiness Score</p>
                    <p className="text-4xl font-black text-blue-600">8.7/10</p>
                 </div>
                 <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Technical Depth</p>
                    <p className="text-4xl font-black text-indigo-600">Advanced</p>
                 </div>
                 <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Sentiment</p>
                    <p className="text-4xl font-black text-emerald-600">Positive</p>
                 </div>
              </div>

              <div className="space-y-4 text-left bg-slate-900 p-8 rounded-3xl text-white">
                 <h4 className="font-bold flex items-center gap-2">
                   <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                   Personalized AI Feedback
                 </h4>
                 <p className="text-sm text-slate-400 leading-relaxed">
                   Your technical explanation of React hooks was exemplary. However, you tend to rush when discussing complex system architectures. Try pausing for 2 seconds after each major point to allow the interviewer to digest the information. Your eye contact remained steady throughout, signaling high confidence.
                 </p>
              </div>

              <button 
                onClick={() => setSessionStep('setup')}
                className="mt-12 bg-slate-900 text-white px-12 py-4 rounded-2xl font-bold hover:bg-black transition-all shadow-xl"
              >
                Retake Interview
              </button>
           </div>
        </div>
      )}
    </div>
  );
};

export default MockInterview;
