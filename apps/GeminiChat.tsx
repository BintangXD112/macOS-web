
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";

interface Message {
  role: 'user' | 'model';
  text: string;
}

const GeminiChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chat, setChat] = useState<Chat | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      if (!process.env.API_KEY) {
        setMessages([{ role: 'model', text: 'Error: API_KEY environment variable not set. Please configure it to use the Gemini Chat.' }]);
        return;
      }
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const chatInstance = ai.chats.create({
        model: 'gemini-2.5-flash-preview-04-17',
        config: {
          systemInstruction: 'You are a helpful and friendly assistant running inside a web-based macOS interface. Be concise and helpful.',
        }
      });
      setChat(chatInstance);
    } catch (error) {
       console.error("Gemini initialization failed:", error);
       setMessages([{ role: 'model', text: `Initialization failed: ${error instanceof Error ? error.message : 'Unknown error'}` }]);
    }
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading || !chat) return;

    const userMessage: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await chat.sendMessageStream({ message: input });

      let currentModelText = '';
      setMessages(prev => [...prev, { role: 'model', text: '' }]);
      
      for await (const chunk of result) {
        currentModelText += chunk.text;
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { role: 'model', text: currentModelText };
          return newMessages;
        });
      }
    } catch (error) {
      console.error("Gemini API error:", error);
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      setMessages(prev => [...prev, { role: 'model', text: `Error: ${errorMessage}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-zinc-800 text-white font-sf">
      <div ref={chatContainerRef} className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.length === 0 && (
            <div className="text-center text-zinc-400 mt-8">
                <p className="text-lg">Selamat datang di Gemini Chat</p>
                <p>Ajukan pertanyaan untuk memulai.</p>
            </div>
        )}
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xl rounded-2xl px-4 py-2 ${msg.role === 'user' ? 'bg-blue-600' : 'bg-zinc-700'}`}>
              <p className="whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}
         {isLoading && messages[messages.length-1].role === 'user' && (
            <div className="flex justify-start">
                 <div className="max-w-lg rounded-2xl px-4 py-2 bg-zinc-700">
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-zinc-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                        <div className="w-2 h-2 bg-zinc-400 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                        <div className="w-2 h-2 bg-zinc-400 rounded-full animate-pulse"></div>
                    </div>
                </div>
            </div>
        )}
      </div>
      <div className="p-4 border-t border-zinc-700">
        <div className="flex items-center bg-zinc-700 rounded-lg">
          <input
            type="text"
            className="flex-1 bg-transparent p-3 focus:outline-none"
            placeholder="Ketik pesan Anda di sini..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            disabled={isLoading || !chat}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim() || !chat}
            className="p-3 text-zinc-400 disabled:text-zinc-600 hover:text-white disabled:cursor-not-allowed"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 16 16">
              <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeminiChat;
