
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, RefreshCcw, Sparkles } from 'lucide-react';
import { getLaundryAdvice } from '../services/geminiService';
import { ChatMessage } from '../types';

export const ChatAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Halo! Saya Tini, asisten AI Laundry Ibu Tini. Ada yang bisa saya bantu hari ini? Anda bisa tanya tips menghilangkan noda kopi atau cara merawat hijab. 🧺✨' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    const responseText = await getLaundryAdvice(userText);
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  const suggestedPrompts = [
    "Cara hilangkan noda kopi?",
    "Tips mencuci kain sutra",
    "Kenapa baju luntur?"
  ];

  return (
    <section id="ai-assistant" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-flex p-3 bg-green-50 rounded-full text-green-600 mb-4 animate-bounce">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Tanya Tini (AI Assistant)</h2>
          <p className="text-gray-600">Dapatkan tips mencuci dan perawatan kain langsung dari asisten pintar kami.</p>
        </div>

        <div className="bg-gray-50 rounded-[2.5rem] p-4 sm:p-8 border border-gray-200 shadow-inner flex flex-col h-[600px]">
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto space-y-6 pr-2 mb-6 scrollbar-thin scrollbar-thumb-gray-300"
          >
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                    msg.role === 'user' ? 'bg-green-600 text-white' : 'bg-white text-green-600 border border-green-100'
                  }`}>
                    {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                  </div>
                  <div className={`p-4 rounded-3xl text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                    ? 'bg-green-600 text-white rounded-tr-none' 
                    : 'bg-white text-gray-700 rounded-tl-none border border-green-50'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex gap-3 items-center text-green-600 font-medium text-sm animate-pulse">
                  <div className="w-10 h-10 rounded-2xl bg-white border border-green-100 flex items-center justify-center">
                    <Loader2 className="w-5 h-5 animate-spin" />
                  </div>
                  <span>Sedang berpikir...</span>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {suggestedPrompts.map((p) => (
                <button 
                  key={p} 
                  onClick={() => setInput(p)}
                  className="text-xs font-semibold px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-full hover:border-green-600 hover:text-green-600 transition-all active:scale-95"
                >
                  {p}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Tanyakan sesuatu tentang laundry..."
                className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 text-sm pr-16 focus:ring-4 focus:ring-green-100 focus:border-green-600 transition-all outline-none"
              />
              <button 
                type="submit"
                disabled={!input.trim() || isLoading}
                className="absolute right-2 top-2 bottom-2 px-4 bg-green-600 text-white rounded-xl hover:bg-green-700 disabled:opacity-50 transition-all active:scale-90"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
