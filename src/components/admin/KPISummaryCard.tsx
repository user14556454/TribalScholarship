import React from 'react';
import { Card } from '../common/Card';

interface Props {
  title: string;
  value: string | number;
  subtext?: string;
  changeText?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: React.ReactNode;
  badgeText?: string;
}

export const KPISummaryCard: React.FC<Props> = ({
  title,
  value,
  subtext,
  changeText,
  changeType = 'neutral',
  icon,
  badgeText
}) => {
  return (
    <Card className="p-5 flex flex-col justify-between hover:border-[#CBD5E1] transition-all">
      <div className="flex items-start justify-between gap-3 mb-2">
        <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">{title}</span>
        {icon && <div className="text-[#0284C7] p-1.5 bg-[#F0F9FF] rounded">{icon}</div>}
      </div>

      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-2xl font-bold text-[#0F172A] tracking-tight">{value}</span>
        {badgeText && (
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#F1F5F9] text-[#475569] border border-[#CBD5E1]">
            {badgeText}
          </span>
        )}
      </div>

      {(subtext || changeText) && (
        <div className="flex items-center gap-2 text-xs mt-1">
          {changeText && (
            <span
              className={`font-semibold ${
                changeType === 'positive'
                  ? 'text-[#065F46]'
                  : changeType === 'negative'
                  ? 'text-[#991B1B]'
                  : 'text-[#64748B]'
              }`}
            >
              {changeText}
            </span>
          )}
          {subtext && <span className="text-[#64748B]">{subtext}</span>}
        </div>
      )}
    </Card>
  );
};
