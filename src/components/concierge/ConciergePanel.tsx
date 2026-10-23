import { useState, useRef, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';
import type { Locale } from '@/i18n/locale';
import { useLocale } from '@/i18n/LocaleContext';
import { X, Send } from 'lucide-react';
import { QuickActions } from './QuickActions';
import { LocationChoice } from './LocationChoice';
import { WhatsAppEscalation } from './WhatsAppEscalation';
import { getQuickActions, getVerifiedAnswer } from './intent';
import type { ChatMessage, ConciergeQuickAction } from './types';

interface ConciergePanelProps {
  isOpen: boolean;
  onClose: () => void;
  locale: Locale;
}

export function ConciergePanel({ isOpen, onClose, locale }: ConciergePanelProps) {
  const { dict } = useLocale();
  const reduceMotion = useReducedMotion();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [activeEscalation, setActiveEscalation] = useState<{
    branchId: 'palm-jumeirah' | 'difc';
    branchName: string;
    intentText: string;
  } | null>(null);
  const [needsLocation, setNeedsLocation] = useState(false);
  const [pendingIntentText, setPendingIntentText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Initialize greeting on locale change
  useEffect(() => {
    const greetingText =
      locale === 'tr'
        ? 'LEOZ Concierge’a hoş geldiniz. Size şubelerimiz, imza hizmetlerimiz veya rezervasyon konusunda nasıl yardımcı olabilirim?'
        : locale === 'ar'
          ? 'أهلاً بك في ليو كونسيرج. كيف يمكننا مساعدتك اليوم بخصوص فروعنا، خدماتنا الراقية، أو حجز موعدك؟'
          : 'Welcome to LEOZ Concierge. How may I assist you with our locations, signature grooming, or appointment bookings today?';

    setMessages([
      {
        id: 'msg-greeting',
        sender: 'concierge',
        text: greetingText,
        actions: getQuickActions(locale),
      },
    ]);
    setActiveEscalation(null);
    setNeedsLocation(false);
  }, [locale]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView?.({ behavior: reduceMotion ? 'auto' : 'smooth' });
    }
  }, [messages, isOpen, needsLocation, activeEscalation, reduceMotion]);

  useEffect(() => {
    if (!isOpen) return;
    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])') ?? [],
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  function handleActionClick(action: ConciergeQuickAction) {
    // Append user message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: action.label,
    };

    const answer = getVerifiedAnswer(action.intent, locale);
    const conciergeMsg: ChatMessage = {
      id: `concierge-${Date.now()}`,
      sender: 'concierge',
      text: answer.text,
      escalate: answer.escalate,
      intent: action.intent,
    };

    setMessages((prev) => [...prev, userMsg, conciergeMsg]);

    if (answer.escalate) {
      setActiveEscalation(null);
      setNeedsLocation(true);
      setPendingIntentText(action.label);
    } else {
      setNeedsLocation(false);
      setActiveEscalation(null);
    }
  }

  function handleLocationSelect(branchId: 'palm-jumeirah' | 'difc', branchName: string) {
    setNeedsLocation(false);
    setActiveEscalation({
      branchId,
      branchName,
      intentText: pendingIntentText || 'Appointment Booking',
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;

    const query = input.trim();
    setInput('');

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
    };

    // Evaluate query keywords
    const lower = query.toLowerCase();
    let detectedIntent: import('./types').ConciergeIntent;

    if (lower.includes('palm') || lower.includes('palmiye') || lower.includes('نخلة') || lower.includes('جميرا')) {
      detectedIntent = 'palm';
    } else if (lower.includes('difc') || lower.includes('sky gardens') || lower.includes('سكاي جاردنز') || lower.includes('المركز المالي')) {
      detectedIntent = 'difc';
    } else if (lower.includes('review') || lower.includes('rating') || lower.includes('puan') || lower.includes('yorum') || lower.includes('تقييم') || lower.includes('مراجعات') || lower.includes('آراء')) {
      detectedIntent = 'reviews';
    } else if (lower.includes('service') || lower.includes('cut') || lower.includes('beard') || lower.includes('hizmet') || lower.includes('خدمة') || lower.includes('خدمات') || lower.includes('حلاقة') || lower.includes('لحية')) {
      detectedIntent = 'services';
    } else {
      detectedIntent = 'book';
    }


    const answer = getVerifiedAnswer(detectedIntent, locale);
    const conciergeMsg: ChatMessage = {
      id: `concierge-${Date.now()}`,
      sender: 'concierge',
      text: answer.text,
      escalate: answer.escalate,
      intent: detectedIntent,
    };

    setMessages((prev) => [...prev, userMsg, conciergeMsg]);

    if (answer.escalate) {
      setActiveEscalation(null);
      setNeedsLocation(true);
      setPendingIntentText(query);
    } else {
      setNeedsLocation(false);
      setActiveEscalation(null);
    }
  }

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label={dict.common.concierge.aria}
      className="fixed z-50 flex flex-col overflow-hidden rounded-xl border border-brass/40 bg-obsidian/95 shadow-2xl backdrop-blur-xl
        bottom-[max(5.5rem,calc(env(safe-area-inset-bottom)+5.5rem))] right-4
        w-[calc(100vw-2rem)] sm:w-[380px] md:w-[400px]
        h-[min(560px,75vh)]
        [dir='rtl']:right-auto [dir='rtl']:left-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-brass/20 bg-carbon px-4 py-3.5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-brass/40 bg-obsidian">
            <img src="/images/lion.webp" alt="Lion" className="h-5 w-auto mix-blend-screen" />
          </div>
          <div>
            <h2 className="font-display text-sm tracking-wider text-ivory">LEOZ CONCIERGE</h2>
            <div className="flex items-center gap-1.5 text-[10px] text-brass">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>{locale === 'tr' ? 'Çevrimiçi' : locale === 'ar' ? 'متصل الآن' : 'Available'}</span>
            </div>
          </div>
        </div>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="flex h-11 w-11 items-center justify-center rounded-lg text-stone transition-colors hover:bg-obsidian hover:text-ivory"
          aria-label={dict.common.concierge.close}
        >
          <X size={17} />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div
        role="log"
        aria-live="polite"
        className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-lg p-3 leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-brass text-obsidian font-medium'
                  : 'border border-line bg-carbon/90 text-bone'
              }`}
            >
              <p className="whitespace-pre-line">{msg.text}</p>
            </div>

            {msg.actions && msg.actions.length > 0 && (
              <QuickActions actions={msg.actions} onSelect={handleActionClick} />
            )}
          </div>
        ))}

        {needsLocation && (
          <div className="rounded-lg border border-brass/30 bg-carbon/80 p-3">
            <LocationChoice locale={locale} onSelect={handleLocationSelect} />
          </div>
        )}

        {activeEscalation && (
          <WhatsAppEscalation
            branchId={activeEscalation.branchId}
            branchName={activeEscalation.branchName}
            locale={locale}
            intentText={activeEscalation.intentText}
          />
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <form onSubmit={handleSubmit} className="border-t border-line bg-carbon/60 p-2.5">
        <div className="flex items-center gap-2 rounded-lg border border-line bg-obsidian px-3 py-1.5 focus-within:border-brass/70">
          <input
            aria-label={dict.common.concierge.input}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              locale === 'tr'
                ? 'Bir soru sorun...'
                : locale === 'ar'
                  ? 'اطرح سؤالاً...'
                  : 'Ask about appointments, branches...'
            }
            className="flex-1 bg-transparent text-xs text-ivory placeholder-stone focus:outline-none"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            aria-label={dict.common.concierge.send}
            className="flex h-11 w-11 items-center justify-center rounded-md bg-brass text-obsidian transition-opacity disabled:opacity-30"
          >
            <Send size={13} />
          </button>
        </div>
      </form>
    </div>
  );
}
