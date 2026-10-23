import type { ConciergeQuickAction } from './types';

interface QuickActionsProps {
  actions: ConciergeQuickAction[];
  onSelect: (action: ConciergeQuickAction) => void;
}

export function QuickActions({ actions, onSelect }: QuickActionsProps) {
  return (
    <div className="flex flex-wrap gap-1.5 pt-2">
      {actions.map((action) => (
        <button
          key={action.id}
          type="button"
          onClick={() => onSelect(action)}
          className="rounded-full border border-line bg-carbon/70 px-3 py-1.5 text-xs text-bone transition-all hover:border-brass/60 hover:bg-obsidian hover:text-brass"
        >
          {action.label}
        </button>
      ))}
    </div>
  );
}
