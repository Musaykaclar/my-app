// app/chat/page.tsx
'use client';

import Chatbot from '@/components/Chatbot'; // Chatbot.tsx componentin varsa

export default function ChatPage() {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Chatbot />
    </main>
  );
}
