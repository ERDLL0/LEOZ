import { useDict } from '@/i18n/LocaleContext';

/** Honest staging disclosure — visible, quiet, and never in the way. */
export function StagingChip() {
  const { dict } = useDict();

  return (
    <p className="staging-chip pointer-events-none fixed bottom-[5.75rem] end-[5.25rem] z-30 max-w-[calc(100%-6.5rem)] rounded-[6px] border border-line bg-obsidian/90 px-3 py-1.5 text-end text-stone md:bottom-7 md:end-[7rem] md:max-w-[calc(100%-8rem)]">
      {dict.common.staging.chip}
    </p>
  );
}
