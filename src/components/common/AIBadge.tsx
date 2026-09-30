import React from 'react';
import { Sparkles } from 'lucide-react';

interface AIBadgeProps {
  label?: string;
  confidence?: number;
}

export const AIBadge: React.FC<AIBadgeProps> = ({ label = 'AI-Assisted Match', confidence }) => {
  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-semibold bg-[#F1F5F9] text-[#1B365D] border border-[#CBD5E1]">
      <Sparkles className="w-3 h-3 text-[#0284C7]" />
      <span>{label}</span>
      {confidence !== undefined && (
        <span className="text-slate-500 font-mono text-[10px]">
          ({Math.round(confidence * 100)}%)
        </span>
      )}
    </span>
  );
};
