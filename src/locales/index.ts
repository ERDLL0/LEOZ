import type { Locale } from '@/i18n/locale';
import en from './en';
import tr from './tr';
import ar from './ar';

/** The English dictionary defines the contract every locale must satisfy. */
export type Dictionary = typeof en;

export const dictionaries: Record<Locale, Dictionary> = { en, tr, ar };
