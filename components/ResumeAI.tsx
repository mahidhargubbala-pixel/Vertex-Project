
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

const ResumeAI: React.FC = () => {
  const [targetRole, setTargetRole] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{ match: number, suggestedRoles: string[], gaps: string[], highlights: string[] } | null>(null);
  const [fileName, setFileName] = useState('');

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
      // In a real app, we would use FileReader or a PDF library to extract text
    }
  };

  const runAnalysis = async () => {
    if (!targetRole) return;
    setIsAnalyzing(true);
    try {
      // For demo, we simulate the content if we can't extract it directly in this env
      const simulatedResumeContent = "Experienced software engineer with 5 years in React, Node.js, and Cloud Infrastructure. Proficient in TypeScript and system design.";
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `Analyze this resume content: "${simulatedResumeContent}" against the target role: "${targetRole}". Provide a detailed evaluation in JSON format: { "match": 85, "suggestedRoles": ["Senior Frontend Eng", "Fullstack Developer", "Tech Lead"], "gaps": ["Missing GraphQL experience", "Unit testing coverage"], "highlights": ["Strong architecture skills", "5 years seniority"] }`,
        config: { 
          responseMimeType: 'application/json',
          thinkingConfig: { thinkingBudget: 4000 }
        }
      });

      const data = JSON.parse(response.text || '{}');
      setAnalysisResult(data);
    } catch (error) {
      console.error("Analysis failed", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 py-12">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-slate-900 tracking-tight">AI Resume Analyzer</h2>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          Gemini-powered analysis to navigate the modern job market.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 space-y-6">
            <div>
              <label className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-2 block">Target Job Title</label>
              <input 
                type="text" 
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g. Senior Frontend Engineer"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-2 block">Upload Resume</label>
              <div className="relative border-2 border-dashed border-slate-200 bg-slate-50 rounded-xl p-6 text-center group cursor-pointer hover:bg-slate-100 transition-all">
                <input type="file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                <svg className="w-8 h-8 mx-auto mb-2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-xs font-bold text-slate-500">{fileName || "PDF, DOCX supported"}</p>
              </div>
            </div>

            <button 
              onClick={runAnalysis}
              disabled={isAnalyzing || !targetRole}
              className="w-full bg-slate-900 hover:bg-black disabled:bg-slate-400 text-white py-4 rounded-xl font-bold transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
            >
              {isAnalyzing ? "Analyzing..." : "Analyze with Gemini Pro"}
            </button>
          </div>
        </div>

        <div className="lg:col-span-2">
          {analysisResult ? (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-10 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Analysis Result</h3>
                  <p className="text-sm text-slate-500">Based on competitive market benchmarks</p>
                </div>
                <div className="relative w-24 h-24">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <path className="text-slate-100" strokeDasharray="100, 100" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" stroke="currentColor"/>
                    <path className="text-blue-600" strokeDasharray={`${analysisResult.match}, 100`} strokeWidth="3" strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" stroke="currentColor"/>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center font-bold text-lg text-slate-900">{analysisResult.match}%</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">You're also a match for:</h4>
                    <div className="space-y-3">
                      {analysisResult.suggestedRoles.map((role, i) => (
                        <div key={i} className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                          <span className="text-sm font-semibold text-slate-700">{role}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Critical Skill Gaps</h4>
                    <div className="space-y-2">
                      {analysisResult.gaps.map((gap, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-red-600 font-medium">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                          {gap}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Resume Highlights</h4>
                    <div className="space-y-2">
                      {analysisResult.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-green-600 font-medium">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {h}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-100/50 rounded-3xl border border-slate-200 border-dashed h-full min-h-[400px] flex flex-col items-center justify-center p-12 text-center group">
               <div className="w-20 h-20 bg-white rounded-full shadow-sm flex items-center justify-center text-slate-200 mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
               </div>
               <h4 className="text-xl font-bold text-slate-400 mb-2">Ready for Analysis</h4>
               <p className="text-slate-400 text-sm max-w-xs leading-relaxed">
                 Enter your target role and upload your resume to see your career fit analytics.
               </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeAI;
