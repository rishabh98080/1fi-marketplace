import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [msg, setMsg] = useState('');
  const [chatLog, setChatLog] = useState([
    { sender: 'bot', text: 'Hi! Looking to buy devices on 0% EMI with your mutual funds? Ask me anything!' }
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!msg.trim()) return;
    const userMsg = msg;
    setChatLog((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setMsg('');

    setTimeout(() => {
      setChatLog((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: `Great question! With 1Fi, your mutual funds are never redeemed—they stay invested and continue compounding while you pay monthly EMIs at 0% interest.`
        }
      ]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-white rounded-3xl w-80 sm:w-88 shadow-2xl border border-slate-100 overflow-hidden mb-3 animate-in fade-in slide-in-from-bottom-5">
          <div className="bg-[#6222E4] text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">
                1Fi
              </div>
              <div>
                <h4 className="font-bold text-sm">1Fi Assistant</h4>
                <p className="text-[10px] text-purple-200">Online • Instant Help</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3.5 h-64 overflow-y-auto space-y-2.5 text-xs bg-slate-50">
            {chatLog.map((c, i) => (
              <div
                key={i}
                className={`p-2.5 rounded-2xl max-w-[85%] ${
                  c.sender === 'user'
                    ? 'ml-auto bg-[#6222E4] text-white'
                    : 'bg-white border border-slate-200 text-slate-800'
                }`}
              >
                {c.text}
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} className="p-2.5 bg-white border-t border-slate-100 flex items-center space-x-2">
            <input
              type="text"
              placeholder="Ask about 0% MF EMI..."
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              className="flex-1 px-3 py-1.5 text-xs bg-slate-100 rounded-full focus:outline-none focus:ring-1 focus:ring-[#6222E4]"
            />
            <button
              type="submit"
              className="w-8 h-8 rounded-full bg-[#6222E4] text-white flex items-center justify-center hover:bg-[#5019C3]"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      ) : null}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all"
        title="Chat with 1Fi Support"
      >
        <MessageCircle className="w-7 h-7 fill-white text-[#25D366]" />
      </button>
    </div>
  );
}
