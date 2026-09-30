import React from 'react';
import { RuleCheckResult } from '../../types/application';
import { CheckCircle2, AlertTriangle, XCircle, Info } from 'lucide-react';

interface Props {
  ruleChecks: RuleCheckResult[];
}

export const EligibilityChecklist: React.FC<Props> = ({ ruleChecks }) => {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-lg p-5 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-[#0F172A]">Deterministic Policy Eligibility Evaluation</h3>
          <p className="text-xs text-[#64748B]">Automated policy rules evaluated as per governing Scheme Notification</p>
        </div>
        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#F1F5F9] text-[#475569] border border-[#CBD5E1]">
          Policy Version: 2026-27.v1
        </span>
      </div>

      <div className="space-y-3">
        {ruleChecks.map((rule) => {
          let badge = {
            bg: 'bg-[#ECFDF5]',
            text: 'text-[#065F46]',
            border: 'border-[#A7F3D0]',
            icon: <CheckCircle2 className="w-3.5 h-3.5" />,
            label: 'Pass'
          };

          if (rule.status === 'NEEDS_REVIEW') {
            badge = {
              bg: 'bg-[#FFFBEB]',
              text: 'text-[#92400E]',
              border: 'border-[#FDE68A]',
              icon: <AlertTriangle className="w-3.5 h-3.5" />,
              label: 'Needs Review'
            };
          } else if (rule.status === 'FAIL') {
            badge = {
              bg: 'bg-[#FEF2F2]',
              text: 'text-[#991B1B]',
              border: 'border-[#FECACA]',
              icon: <XCircle className="w-3.5 h-3.5" />,
              label: 'Failed'
            };
          }

          return (
            <div key={rule.ruleId} className="p-3 rounded border border-[#E2E8F0] bg-[#F8FAFC]">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-[#0F172A]">{rule.ruleTitle}</span>
                <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded border ${badge.bg} ${badge.text} ${badge.border}`}>
                  {badge.icon}
                  <span>{badge.label}</span>
                </span>
              </div>

              <p className="text-xs text-[#475569] mb-2">{rule.detail}</p>

              <div className="flex items-center justify-between text-[11px] pt-1.5 border-t border-[#E2E8F0] text-[#64748B]">
                <span>Applicant Value: <strong className="text-[#0F172A]">{rule.sourceValue}</strong></span>
                <span>Rule Requirement: <strong className="text-[#0F172A]">{rule.policyThreshold}</strong></span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
