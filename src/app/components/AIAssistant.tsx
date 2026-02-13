import { useState, useEffect, useRef } from 'react';
import { Send, Sparkles, X, Minimize2 } from 'lucide-react';

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AIAssistant({ isOpen, onClose }: AIAssistantProps) {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ role: 'user' | 'ai'; text: string }>>([
    {
      role: 'ai',
      text: 'Hallo! Ich bin die SIDES KI. Wie kann ich dir heute helfen?'
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const handleSend = () => {
    if (!message.trim()) return;

    setChatHistory([...chatHistory, { role: 'user', text: message }]);
    
    setTimeout(() => {
      let response = '';
      const msg = message.toLowerCase();
      
      if (msg.includes('umsatz')) {
        response = 'Der heutige Umsatz liegt bei 2.847€. Das sind 12% mehr als gestern. Großartig! 🎉';
      } else if (msg.includes('schließen') || msg.includes('close')) {
        response = 'Store wird geschlossen. Kassenabrechnungen werden vorbereitet. ✅';
      } else if (msg.includes('statistik')) {
        response = 'Diese Woche: 18.230€ Umsatz, 347 Bestellungen, Ø Bestellwert 52,50€ 📊';
      } else if (msg.includes('personal') || msg.includes('mitarbeiter')) {
        response = 'Aktuell sind 8 von 12 Mitarbeitern im Dienst. Maria ist heute krank gemeldet. 👥';
      } else if (msg.includes('marketing')) {
        response = 'Du hast 2 aktive Kampagnen mit einem ROI von durchschnittlich 3.8x. Möchtest du eine neue Kampagne starten? 📈';
      } else if (msg.includes('bewertung')) {
        response = 'Deine durchschnittliche Bewertung ist 4.7 Sterne. Diese Woche hast du 8 neue Bewertungen erhalten! ⭐';
      } else if (msg.includes('bestellung') || msg.includes('waren')) {
        response = 'Warnung: Tomaten und Mozzarella erreichen kritischen Bestand. Soll ich eine Bestellung vorbereiten? 📦';
      } else {
        response = 'Verstanden! Ich kümmere mich darum. 👍';
      }
      
      setChatHistory(prev => [...prev, { role: 'ai', text: response }]);
    }, 500);

    setMessage('');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Chat Panel */}
      <div className="fixed inset-x-0 bottom-16 top-0 md:bottom-0 md:right-0 md:left-auto md:w-96 bg-card z-50 flex flex-col shadow-2xl md:border-l border-border">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-chart-1 text-primary-foreground px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur-sm w-10 h-10 flex items-center justify-center" style={{ borderRadius: 'var(--radius)' }}>
              <Sparkles size={20} />
            </div>
            <div>
              <h3 className="text-lg" style={{ fontWeight: 'var(--font-weight-bold)' }}>SIDES KI</h3>
              <p className="text-xs opacity-90">Dein persönlicher Assistent</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            style={{ borderRadius: 'var(--radius)' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-auto p-4 space-y-3 bg-background">
          {chatHistory.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] px-4 py-3 rounded-2xl ${
                  msg.role === 'user'
                    ? 'bg-primary text-primary-foreground rounded-br-sm shadow-sm'
                    : 'bg-card text-foreground rounded-bl-sm border border-border shadow-sm'
                }`}
              >
                <p className="text-sm leading-relaxed">{msg.text}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-card border-t border-border">
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Frage die SIDES KI..."
              className="px-4 py-3 bg-input-background border border-border outline-none focus:ring-2 focus:ring-primary transition-all text-sm"
              style={{ borderRadius: 'var(--radius-input)', fontWeight: 'var(--font-weight-regular)', width: 'calc(100% - 3.5rem)' }}
            />
            <button
              onClick={handleSend}
              disabled={!message.trim()}
              className="bg-primary text-primary-foreground w-12 h-12 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ borderRadius: 'var(--radius-button)' }}
            >
              <Send size={20} />
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Frage nach Umsatz, Personal, Marketing, Bewertungen oder Waren
          </p>
        </div>
      </div>
    </>
  );
}