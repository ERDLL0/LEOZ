import type { Locale } from '@/i18n/locale';
import { MessageCircle, AlertCircle, ArrowUpRight } from 'lucide-react';
import { getWhatsAppPhone, buildWhatsAppMessage, buildWhatsAppUrl } from './whatsapp';

interface WhatsAppEscalationProps {
  branchId: 'palm-jumeirah' | 'difc';
  branchName: string;
  locale: Locale;
  intentText: string;
}

export function WhatsAppEscalation({
  branchId,
  branchName,
  locale,
  intentText,
}: WhatsAppEscalationProps) {
  const phone = getWhatsAppPhone(branchId);
  const message = buildWhatsAppMessage(locale, branchName, intentText);

  if (!phone) {
    return (
      <div className="mt-3 rounded-lg border border-brass/30 bg-carbon/90 p-3 text-xs">
        <div className="flex items-center gap-1.5 text-brass font-medium">
          <AlertCircle size={14} />
          <span>
            {locale === 'tr'
              ? 'WhatsApp İletişim Doğrulaması Bekleniyor'
              : locale === 'ar'
                ? 'رقم WhatsApp قيد الاعتماد الرسمي'
                : 'WhatsApp Verification Pending'}
          </span>
        </div>
        <p className="mt-1 text-stone text-[11px] leading-relaxed">
          {locale === 'tr'
            ? `Bu şube (${branchName}) için resmi WhatsApp numarası henüz sisteme girilmemiştir (VERIFY_REQUIRED). Web sitemizdeki iletişim ve şube sayfalarından ayrıntılara ulaşabilirsiniz.`
            : locale === 'ar'
              ? `الرقم المعتمد لفرع (${branchName}) قيد المراجعة الرسمية. يرجى الاطلاع على صفحة الفرع للحصول على التفاصيل المعتمدة.`
              : `The approved WhatsApp contact for (${branchName}) is awaiting production configuration (VERIFY_REQUIRED). Never guessing unverified numbers.`}
        </p>
      </div>
    );
  }

  const url = buildWhatsAppUrl(phone, message);

  return (
    <div className="mt-3">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-brass px-4 py-2.5 text-xs font-bold text-obsidian tracking-wide uppercase transition-transform hover:-translate-y-0.5 hover:brightness-110"
      >
        <MessageCircle size={15} />
        <span>
          {locale === 'tr'
            ? `WhatsApp’ta Başlat (${branchName})`
            : locale === 'ar'
              ? `متابعة عبر WhatsApp (${branchName})`
              : `Continue on WhatsApp (${branchName})`}
        </span>
        <ArrowUpRight size={14} />
      </a>
    </div>
  );
}
