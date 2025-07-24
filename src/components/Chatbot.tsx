'use client';

import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react'; 

export default function Chatbot() {
  const [messages, setMessages] = useState<{ type: 'user' | 'bot'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { type: 'user' as const, text: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Simüle edilmiş cevap
    setTimeout(() => {
      const botMessage = {
        type: 'bot' as const,
        text: 'Merhaba! Size nasıl yardımcı olabilirim?',
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    
    <div className="w-full max-w-md mx-auto h-[600px] bg-white shadow-2xl rounded-2xl flex flex-col overflow-hidden border">
      <div className="bg-[#fb7185] text-white text-xl font-semibold px-4 py-3">
        Sözleşme Asistanı
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 bg-pink-50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`px-4 py-2 rounded-xl max-w-[75%] text-sm ${
                msg.type === 'user'
                  ? 'bg-[#fb7185] text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="p-3 border-t flex gap-2 bg-white">
        <input
          type="text"
          placeholder="Mesajınızı yazın..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#fb7185]"
        />
        <button
          onClick={handleSend}
          className="bg-[#fb7185] text-white px-4 py-2 rounded-full hover:bg-[#f43f5e] transition flex items-center justify-center"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
