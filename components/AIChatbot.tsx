
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: 'Hi! I am your Vertex Career Assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user' as const, text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [...messages, userMsg].map(m => ({ parts: [{ text: m.text }], role: m.role })),
        config: {
          systemInstruction: "You are a world-class career coach and assistant for the Vertex platform. Help users with career advice, resume tips, and platform navigation."
        }
      });
      setMessages(prev => [...prev, { role: 'model', text: response.text || "I'm sorry, I'm having trouble connecting right now." }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', text: "Error: AI services are currently busy. Please try again later." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {isOpen ? (
        <div className="bg-white w-80 h-96 rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          <div className="bg-slate-900 p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-bold text-sm">Vertex AI Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:text-slate-300">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-xl text-xs leading-relaxed ${
                  m.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none shadow-sm'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && <div className="text-[10px] text-slate-400 animate-pulse">Assistant is thinking...</div>}
          </div>
          <div className="p-3 bg-white border-t border-slate-100 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-black outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button onClick={handleSend} className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-slate-900 text-white p-4 rounded-full shadow-xl hover:scale-110 transition-transform active:scale-95 group relative"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white"></span>
          <div className="absolute left-full ml-4 whitespace-nowrap bg-white text-slate-900 text-[10px] font-bold py-1 px-3 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
            Chat with Career AI
          </div>
        </button>
      )}
    </div>
  );
};

export default AIChatbot;
