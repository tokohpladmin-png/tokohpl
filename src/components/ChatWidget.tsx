'use client';
import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

function parseContent(text: string, viewProductLabel: string) {
  // Convert **bold**, links /products/... and line breaks
  const lines = text.split('\n');
  return lines.map((line, i) => {
    // Replace **text** with bold
    const parts = line.split(/(\*\*[^*]+\*\*|\[.*?\]\(.*?\))/g);
    const rendered = parts.map((part, j) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={j}>{part.slice(2, -2)}</strong>;
      }
      // Product link pattern: /products/slug
      const linkMatch = part.match(/\/products\/([a-z0-9-]+)/);
      if (linkMatch) {
        return (
          <a key={j} href={`/products/${linkMatch[1]}`}
            className="text-hpl-accent underline underline-offset-2 hover:no-underline"
            target="_blank" rel="noreferrer">
            {viewProductLabel}
          </a>
        );
      }
      // Strikethrough ~~text~~
      if (part.startsWith('~~') && part.endsWith('~~')) {
        return <span key={j} className="line-through text-hpl-400">{part.slice(2,-2)}</span>;
      }
      return <span key={j}>{part}</span>;
    });
    return <p key={i} className={line.startsWith('-') ? 'pl-2' : ''}>{rendered}</p>;
  });
}

export function ChatWidget() {
  const t = useTranslations('ChatWidget');
  const suggested = t.raw('suggested') as string[];
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ role: 'assistant', content: t('greeting') }]);
    }
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  async function send(text: string) {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: 'user', content: text };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      setMessages([...next, { role: 'assistant', content: data.message }]);
    } catch {
      setMessages([...next, { role: 'assistant', content: t('errorFallback') }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-20 right-4 sm:right-6 z-[200] w-[calc(100vw-2rem)] sm:w-[400px] max-h-[600px] flex flex-col bg-white border border-hpl-line shadow-luxury">

          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 bg-hpl-ink shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-400 rounded-full"/>
              <div>
                <p className="text-[13px] font-semibold text-white">{t('assistantName')}</p>
                <p className="text-[10px] text-white/50">{t('assistantSubtitle')}</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)}
              className="text-white/50 hover:text-white transition-colors">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 min-h-0">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'assistant' && (
                  <div className="w-6 h-6 bg-hpl-ink flex items-center justify-center shrink-0 mt-0.5 mr-2">
                    <span className="text-white text-[7px] font-black">HPL</span>
                  </div>
                )}
                <div className={`max-w-[85%] rounded-none px-3.5 py-2.5 text-[13px] leading-6 space-y-1 ${
                  msg.role === 'user'
                    ? 'bg-hpl-ink text-white'
                    : 'bg-hpl-50 text-hpl-700 border border-hpl-line'
                }`}>
                  {msg.role === 'assistant' ? parseContent(msg.content, t('viewProduct')) : msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="w-6 h-6 bg-hpl-ink flex items-center justify-center shrink-0 mr-2">
                  <span className="text-white text-[7px] font-black">HPL</span>
                </div>
                <div className="bg-hpl-50 border border-hpl-line px-4 py-3 flex gap-1.5 items-center">
                  {[0,1,2].map(i => (
                    <span key={i} className="w-1.5 h-1.5 bg-hpl-400 rounded-full animate-bounce"
                      style={{animationDelay: `${i * 0.15}s`}}/>
                  ))}
                </div>
              </div>
            )}

            {/* Suggested questions — show only on first message */}
            {messages.length === 1 && !loading && (
              <div className="space-y-2 pt-1">
                <p className="text-[10px] tracking-[0.14em] uppercase text-hpl-400">{t('commonQuestionsLabel')}</p>
                {suggested.map((q) => (
                  <button key={q} onClick={() => send(q)}
                    className="block w-full text-left text-[12px] text-hpl-600 border border-hpl-line px-3 py-2 hover:bg-hpl-50 hover:text-hpl-ink hover:border-hpl-400 transition-colors">
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div ref={bottomRef}/>
          </div>

          {/* Input */}
          <div className="shrink-0 border-t border-hpl-line flex">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && send(input)}
              placeholder={t('inputPlaceholder')}
              className="flex-1 px-4 py-3.5 text-[13px] outline-none bg-white placeholder:text-hpl-300"
              disabled={loading}
            />
            <button
              onClick={() => send(input)}
              disabled={loading || !input.trim()}
              className="px-4 bg-hpl-ink text-white hover:bg-hpl-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M14 8L2 2l2.5 6L2 14l12-6z" fill="currentColor"/>
              </svg>
            </button>
          </div>

          {/* Footer */}
          <div className="shrink-0 border-t border-hpl-line px-4 py-2 flex items-center justify-between">
            <p className="text-[9px] text-hpl-400">{t('poweredByNote')}</p>
            <a href="https://wa.me/62811945224" target="_blank" rel="noreferrer"
              className="text-[9px] text-green-600 font-semibold hover:underline">
              {t('chatWhatsapp')}
            </a>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen(v => !v)}
        className={`fixed bottom-4 right-4 sm:right-6 z-[200] w-14 h-14 flex items-center justify-center shadow-luxury transition-all duration-200 ${
          open ? 'bg-hpl-500 rotate-0' : 'bg-hpl-ink hover:bg-hpl-700'
        }`}
        aria-label={t('toggleAria')}>
        {open ? (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M1 1L15 15M15 1L1 15" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z"
              stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="8" cy="10" r="1" fill="white"/>
            <circle cx="12" cy="10" r="1" fill="white"/>
            <circle cx="16" cy="10" r="1" fill="white"/>
          </svg>
        )}
      </button>
    </>
  );
}
