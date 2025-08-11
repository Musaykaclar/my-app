'use client';
import { useTranslations } from 'next-intl';
import { useState, useRef, useEffect } from "react";
import { Send, RefreshCw, Edit  } from "lucide-react";
import Parse from "@/utils/parse/Parse";
import { ensureAnonymousUser } from "@/utils/ensureAnonymousUser";
import { useLocale } from 'next-intl';

// Thread ID oluşturma fonksiyonu
const generateThreadId = (): string => {
  return 'thread_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
};

// Local storage için thread ID yönetimi
const getOrCreateThreadId = (): string => {
  if (typeof window === 'undefined') return generateThreadId();
  
  let threadId = localStorage.getItem('chatbot_thread_id');
  if (!threadId) {
    threadId = generateThreadId();
    localStorage.setItem('chatbot_thread_id', threadId);
  }
  return threadId;
};

// Message interface
interface Message {
  type: "user" | "bot";
  text: string;
  timestamp?: Date;
}

export default function Chatbot() {
  const t = useTranslations("Chatbot");
  const locale = useLocale();

  // States
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [threadId, setThreadId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'connecting'>('connecting');
  
  // Refs
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Component mount olduğunda thread ID'yi ayarla ve geçmiş mesajları yükle
  useEffect(() => {
    const initializeChat = async () => {
      try {
        setConnectionStatus('connecting');
        await ensureAnonymousUser();
        
        const currentThreadId = getOrCreateThreadId();
        setThreadId(currentThreadId);
        
        // Geçmiş mesajları yükle
        await loadChatHistory(currentThreadId);
        setConnectionStatus('connected');
      } catch (error) {
        console.error(t('error.startup'), error);
        setConnectionStatus('disconnected');
      } finally {
        setIsLoading(false);
      }
    };

    initializeChat();
  }, []);

  // Mesajlar değiştiğinde scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Input'a focus
  useEffect(() => {
    if (!isLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isLoading]);

  // Chat geçmişini yükle
  const loadChatHistory = async (threadId: string) => {
    try {
      console.log(t('log.loadingHistory'), threadId);
      
      const history = await Parse.Cloud.run("loadChatHistory", {
        threadId: threadId
      });
      
      if (history && Array.isArray(history)) {
        const formattedHistory = history.map(msg => ({
          ...msg,
          timestamp: new Date()
        }));
        setMessages(formattedHistory);
        console.log(t('log.historyLoaded'), history.length);
      }
    } catch (error) {
      console.error(t('error.loadingHistory'), error);
      setMessages([]);
    }
  };

  // Yeni chat başlat
  const startNewChat = async () => {
    try {
      const newThreadId = generateThreadId();
      localStorage.setItem('chatbot_thread_id', newThreadId);
      setThreadId(newThreadId);
      setMessages([]);
      
      // Input'a focus
      if (inputRef.current) {
        inputRef.current.focus();
      }
      
      console.log(t('log.newChatStarted'), newThreadId);
    } catch (error) {
      console.error(t('error.newChat'), error);
    }
  };

  // Mesaj gönder
  const handleSend = async () => {
    if (!input.trim() || !threadId || isTyping) return;

    const userMessage: Message = { 
      type: "user", 
      text: input.trim(),
      timestamp: new Date()
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      console.log(t('log.sendingMessage'), userMessage.text);
      console.log(t('log.threadId'), threadId);

      const reply = await Parse.Cloud.run("chatWithOpenAI", {
        message: userMessage.text,
        threadId: threadId
      });

      const botMessage: Message = { 
        type: "bot", 
        text: typeof reply === 'string' ? reply : t('error.noResponse'),
        timestamp: new Date()
      };
      
      setMessages((prev) => [...prev, botMessage]);
      console.log(t('log.botResponseReceived'));
      
    } catch (error) {
      console.error(t('error.chat'), error);
      const errorMessage: Message = {
        type: "bot",
        text: t('error.generic'),
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  // Enter tuşu ile gönder
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Sözleşme editörünü aç
  const handleOpenEditor = () => {
    const lastBotMessage = messages.findLast(m => m.type === 'bot' && m.text.length > 100)?.text;
    if (!lastBotMessage) {
      alert(t('alert.createContractFirst'));
      return;
    }

    // Editör sayfasına yönlendir ve sözleşme içeriğini URL parametresi olarak gönder
    const encodedContent = encodeURIComponent(lastBotMessage);
    const editorUrl = `/${locale}/sozlesme-editor?content=${encodedContent}&threadId=${threadId}`;
    window.open(editorUrl, "_blank");
  };

  // Editör butonunu göster koşulu
  const shouldShowEditorButton = messages.some((m) => 
    m.type === "bot" && 
    m.text && 
    typeof m.text === 'string' && 
    (m.text.includes(t('contractKeyWords.contract')) || m.text.includes(t('contractKeyWords.article')) || m.text.length > 500)
  );

  // Connection status indicator color
  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'connected': return 'bg-green-500';
      case 'disconnected': return 'bg-red-500';
      case 'connecting': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="w-full max-w-md mx-auto h-[600px] bg-white shadow-2xl rounded-2xl flex items-center justify-center border">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#fb7185] mx-auto mb-4"></div>
          <div className="text-gray-500">{t('loading.chatbotLoading')}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto h-[600px] bg-white shadow-2xl rounded-2xl flex flex-col overflow-hidden border">
      {/* Header */}
      <div className="bg-[#fb7185] text-white px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${getStatusColor()}`} title={connectionStatus}></div>
          <div className="text-xl font-semibold">
            {t('chatbotTitle')}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={startNewChat}
            className="text-xs bg-white/20 px-2 py-1 rounded hover:bg-white/30 transition flex items-center gap-1"
            title={t('button.newChatTitle')}
          >
            <RefreshCw className="w-3 h-3" />
            {t('button.newChat')}
          </button>
          <div className="text-xs bg-white/20 px-2 py-1 rounded font-mono" title={`${t('tooltip.threadId')} ${threadId}`}>
            {threadId.slice(-8)}...
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 bg-pink-50">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-10">
            <div className="text-4xl mb-4">⚖️</div>
            <p className="font-medium">{t('welcome.greeting')}</p>
            <p className="text-sm mt-2">{t('welcome.description')}</p>
            <div className="mt-4 text-xs text-gray-400">
              <p>{t('welcome.example1')}</p>
              <p>{t('welcome.example2')}</p>
            </div>
          </div>
        )}
        
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`px-4 py-2 rounded-xl max-w-[85%] text-sm relative group ${
              msg.type === "user"
                ? "bg-[#fb7185] text-white"
                : "bg-gray-200 text-gray-800"
            }`}>
              <div className="whitespace-pre-wrap">{msg.text || t('messageLoadError')}</div>
              
              {/* Timestamp */}
              {msg.timestamp && (
                <div className={`text-xs mt-1 opacity-70 ${
                  msg.type === "user" ? "text-white/80" : "text-gray-500"
                }`}>
                  {msg.timestamp.toLocaleTimeString(locale, { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="px-4 py-2 rounded-xl max-w-[75%] text-sm bg-gray-200 text-gray-800 flex items-center gap-2">
              <TypingDots />
              <span className="text-xs text-gray-500">{t('typing.aiThinking')}</span>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Editor Button */}
      {shouldShowEditorButton && (
        <div className="text-center p-3 border-t bg-white">
          <button
            onClick={handleOpenEditor}
            className="bg-[#fb7185] text-white px-4 py-2 rounded hover:bg-[#f43f5e] transition flex items-center gap-2 mx-auto"
          >
            <Edit className="w-4 h-4" />
            {t('button.viewContract')}
          </button>
        </div>
      )}

      {/* Input */}
      <div className="p-3 border-t flex gap-2 bg-white">
        <input
          ref={inputRef}
          type="text"
          placeholder={threadId ? t('placeholder.messageInput') : t('placeholder.connecting')}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#fb7185] disabled:bg-gray-100"
          disabled={!threadId || isTyping}
          maxLength={1000}
        />
        <button
          onClick={handleSend}
          disabled={!threadId || !input.trim() || isTyping}
          className="bg-[#fb7185] text-white px-4 py-2 rounded-full hover:bg-[#f43f5e] transition flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isTyping ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <Send className="w-5 h-5" />
          )}
        </button>
      </div>

      
    </div>
  );
}

// Typing animation component
function TypingDots() {
  return (
    <div className="flex space-x-1">
      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
    </div>
  );
}
