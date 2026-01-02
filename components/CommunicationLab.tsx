
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Type } from "@google/genai";

enum LabTab {
  CHAT = 'AI Coach',
  QUIZZES = 'Grammar Quizzes',
  ANALYSIS = 'Speaking Analysis',
  VIDEO_GEN = 'AI Video Gen'
}

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const CommunicationLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<LabTab>(LabTab.ANALYSIS);
  const [analysisText, setAnalysisText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{ mistakes: string[], corrections: string[], overview: string } | null>(null);
  
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'model', text: string }[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isChatting, setIsChatting] = useState(false);

  const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  // Video Gen State
  const [videoPrompt, setVideoPrompt] = useState('');
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoStatus, setVideoStatus] = useState('');

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const handleAnalyze = async () => {
    if (!analysisText.trim()) return;
    setIsAnalyzing(true);
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analyze this text for grammar mistakes and professional tone: "${analysisText}". Provide a JSON response with: { "mistakes": ["list of mistakes"], "corrections": ["how to fix each"], "overview": "short paragraph summarizing the tone and quality" }`,
        config: { responseMimeType: 'application/json' }
      });
      const data = JSON.parse(response.text || '{}');
      setAnalysisResult(data);
    } catch (error) {
      console.error("Analysis failed", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;
    const userMsg = { role: 'user' as const, text: chatInput };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setIsChatting(true);

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [...chatMessages, userMsg].map(m => ({ parts: [{ text: m.text }], role: m.role })),
        config: { systemInstruction: "You are a professional communication coach. Help the user improve their English, grammar, and professional speaking style." }
      });
      setChatMessages(prev => [...prev, { role: 'model', text: response.text || "I'm sorry, I couldn't process that." }]);
    } catch (error) {
      console.error("Chat error", error);
    } finally {
      setIsChatting(false);
    }
  };

  const generateQuiz = async (level: string) => {
    setIsGeneratingQuiz(true);
    setQuizComplete(false);
    setQuizScore(0);
    setCurrentQuizIndex(0);
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Generate 5 multiple choice grammar questions for ${level} professional English. Return as JSON array of objects: { "question": "", "options": ["", "", "", ""], "correctIndex": 0, "explanation": "" }`,
        config: { 
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                question: { type: Type.STRING },
                options: { type: Type.ARRAY, items: { type: Type.STRING } },
                correctIndex: { type: Type.NUMBER },
                explanation: { type: Type.STRING }
              },
              required: ['question', 'options', 'correctIndex', 'explanation']
            }
          }
        }
      });
      setQuiz(JSON.parse(response.text || '[]'));
    } catch (error) {
      console.error("Quiz generation failed", error);
    } finally {
      setIsGeneratingQuiz(false);
    }
  };

  const handleVideoGeneration = async () => {
    if (!videoPrompt.trim()) return;
    setIsGeneratingVideo(true);
    setVideoStatus('Connecting to Veo models...');
    setVideoUrl(null);

    try {
      const genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });
      let operation = await genAI.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: `A high quality professional scene: ${videoPrompt}`,
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '16:9'
        }
      });

      setVideoStatus('AI is rendering your professional scenario...');
      
      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        operation = await genAI.operations.getVideosOperation({ operation: operation });
        setVideoStatus('Fine-tuning details and lighting...');
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        setVideoUrl(`${downloadLink}&key=${process.env.API_KEY}`);
        setVideoStatus('Video Ready!');
      }
    } catch (error) {
      console.error("Video Gen error", error);
      setVideoStatus('Error generating video. Ensure billing is active.');
    } finally {
      setIsGeneratingVideo(false);
    }
  };

  const handleQuizAnswer = (index: number) => {
    if (index === quiz[currentQuizIndex].correctIndex) {
      setQuizScore(prev => prev + 1);
    }
    if (currentQuizIndex + 1 < quiz.length) {
      setCurrentQuizIndex(prev => prev + 1);
    } else {
      setQuizComplete(true);
    }
  };

  return (
    <div className="space-y-12 py-4">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Communication Lab</h2>
        <p className="text-slate-500 text-lg">Powered by Gemini AI for professional mastery.</p>
      </div>

      <div className="flex justify-center">
        <div className="bg-slate-100 p-1.5 rounded-2xl flex gap-1">
          {Object.values(LabTab).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8">
        {activeTab === LabTab.ANALYSIS && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 space-y-6">
              <h3 className="text-xl font-bold text-slate-800">Analyze Delivery</h3>
              <textarea
                value={analysisText}
                onChange={(e) => setAnalysisText(e.target.value)}
                placeholder="Paste your professional text here..."
                className="w-full h-48 bg-slate-50 border border-slate-200 rounded-2xl p-6 text-sm text-black outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button 
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white py-4 rounded-xl font-bold shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                {isAnalyzing ? "Processing..." : "Run AI Diagnostic"}
              </button>
            </div>
            <div className="bg-slate-50 rounded-3xl border border-slate-200 p-8 flex flex-col justify-center">
              {analysisResult ? (
                <div className="space-y-6">
                  <h4 className="font-bold text-slate-900 text-black">Grammar Overview</h4>
                  <p className="text-sm text-slate-600">{analysisResult.overview}</p>
                  <div className="space-y-3">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Mistakes Identified</p>
                    {analysisResult.mistakes.map((m, i) => (
                      <div key={i} className="bg-red-50 p-3 rounded-lg text-xs border border-red-100">
                        <span className="font-bold text-red-700">Mistake:</span> {m}
                        <br />
                        <span className="font-bold text-green-700">Suggestion:</span> {analysisResult.corrections[i]}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center text-slate-400 py-10">
                  <p>Results will appear here after analysis</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === LabTab.CHAT && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm h-[600px] flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
              {chatMessages.length === 0 && (
                <div className="text-center text-slate-400 mt-20">Start a conversation with your AI Communication Coach.</div>
              )}
              {chatMessages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm ${
                    m.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-sm'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isChatting && <div className="text-xs text-slate-400 italic">Coach is typing...</div>}
            </div>
            <div className="p-4 border-t border-slate-200 bg-white flex gap-3">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask for feedback or practice a scenario..."
                className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-black outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button onClick={handleSendMessage} className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700">Send</button>
            </div>
          </div>
        )}

        {activeTab === LabTab.QUIZZES && (
          <div className="max-w-2xl mx-auto space-y-8">
            {quiz.length === 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {['Beginner', 'Intermediate', 'Advanced'].map(lvl => (
                  <button 
                    key={lvl}
                    onClick={() => generateQuiz(lvl)}
                    disabled={isGeneratingQuiz}
                    className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-500 transition-all text-center"
                  >
                    <p className="font-bold text-slate-900">{lvl}</p>
                    <p className="text-xs text-slate-400 mt-2">AI Generated</p>
                  </button>
                ))}
              </div>
            ) : quizComplete ? (
              <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-lg text-center space-y-6">
                <h3 className="text-3xl font-bold text-slate-900 text-black">Quiz Results</h3>
                <div className="text-6xl font-black text-blue-600">{quizScore} / {quiz.length}</div>
                <p className="text-slate-500">Great job! Here's a quick summary of what you've learned.</p>
                <button onClick={() => setQuiz([])} className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold">New Quiz</button>
              </div>
            ) : (
              <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-lg space-y-8">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Question {currentQuizIndex + 1} of {quiz.length}</span>
                  <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600" style={{ width: `${((currentQuizIndex + 1) / quiz.length) * 100}%` }}></div>
                  </div>
                </div>
                <h4 className="text-xl font-bold text-slate-900 text-black">{quiz[currentQuizIndex].question}</h4>
                <div className="grid grid-cols-1 gap-4">
                  {quiz[currentQuizIndex].options.map((opt, i) => (
                    <button 
                      key={i}
                      onClick={() => handleQuizAnswer(i)}
                      className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all text-sm font-medium text-slate-700"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {isGeneratingQuiz && <div className="text-center py-10 text-slate-400 animate-pulse">Gemini is curating your personalized quiz...</div>}
          </div>
        )}

        {activeTab === LabTab.VIDEO_GEN && (
          <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in duration-500">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-10 space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-800">AI Video Generation (Veo)</h3>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                Enter a professional scenario (e.g., "A tech leader explaining system architecture in a boardroom"). Our Veo AI will generate a reference video of high-level body language and communication style.
              </p>
              <div className="space-y-4">
                <input
                  type="text"
                  value={videoPrompt}
                  onChange={(e) => setVideoPrompt(e.target.value)}
                  placeholder="Describe the professional setting..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-6 text-sm text-black outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleVideoGeneration}
                  disabled={isGeneratingVideo || !videoPrompt}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white py-4 rounded-xl font-bold shadow-lg flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
                >
                  {isGeneratingVideo ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      {videoStatus}
                    </>
                  ) : (
                    "Generate Professional Scenario Video"
                  )}
                </button>
              </div>

              {videoUrl && (
                <div className="mt-8 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-black aspect-video flex items-center justify-center">
                  <video src={videoUrl} controls autoPlay loop className="w-full h-full object-cover" />
                </div>
              )}
              {!videoUrl && !isGeneratingVideo && (
                <div className="aspect-video bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center text-slate-300">
                  <svg className="w-16 h-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" /></svg>
                  <p className="text-sm font-bold tracking-widest uppercase">Video Preview Area</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunicationLab;
