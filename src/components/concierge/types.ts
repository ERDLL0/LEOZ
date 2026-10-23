export type MessageSender = 'concierge' | 'user';

export type ConciergeIntent =
  | 'greeting'
  | 'book'
  | 'palm'
  | 'difc'
  | 'services'
  | 'reviews'
  | 'whatsapp'
  | 'hours'
  | 'unknown';

export interface ConciergeQuickAction {
  id: string;
  label: string;
  intent: ConciergeIntent;
}

export interface ChatMessage {
  id: string;
  sender: MessageSender;
  text: string;
  actions?: ConciergeQuickAction[];
  escalate?: boolean;
  intent?: ConciergeIntent;
}
