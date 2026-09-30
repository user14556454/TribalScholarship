import React from 'react';
import { MilestoneStage } from '../../types/application';
import { Check, Clock, AlertCircle } from 'lucide-react';

interface StageConfig {
  key: MilestoneStage;
  label: string;
  sublabel: string;
}

const STAGES: StageConfig[] = [
  { key: 'SUBMITTED', label: '1. Submitted', sublabel: 'Digital Receipt' },
  { key: 'DOCUMENT_VERIFICATION', label: '2. Doc Verification', sublabel: 'OCR & Scrutiny' },
  { key: 'ELIGIBILITY_VERIFICATION', label: '3. Eligibility Check', sublabel: 'Policy Engine' },
  { key: 'ADMIN_SCREENING', label: '4. Admin Screening', sublabel: 'Committee Review' },
  { key: 'SELECTION', label: '5. Selection', sublabel: 'Merit List Allocation' },
  { key: 'FINAL_DECISION', label: '6. Final Decision', sublabel: 'Award & Continuation' },
];

interface Props {
  currentStage: MilestoneStage;
  hasDeficiency?: boolean;
}

export const ApplicationProgressTracker: React.FC<Props> = ({ currentStage, hasDeficiency = false }) => {
  const currentIndex = STAGES.findIndex((s) => s.key === currentStage);

  return (
    <div className="w-full bg-white p-5 rounded-lg border border-[#E2E8F0] shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#64748B]">Application Progress Journey</h3>
        <span className="text-xs font-semibold text-[#0284C7]">
          Stage {currentIndex + 1} of {STAGES.length}
        </span>
      </div>

      {/* Horizontal Steps on Desktop */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-2 relative">
        {STAGES.map((stage, idx) => {
          const isCompleted = idx < currentIndex;
          const isCurrent = idx === currentIndex;
          const isUpcoming = idx > currentIndex;

          let badgeColor = 'bg-[#F1F5F9] text-[#64748B] border-[#CBD5E1]';
          let textColor = 'text-[#64748B]';

          if (isCompleted) {
            badgeColor = 'bg-[#ECFDF5] text-[#065F46] border-[#A7F3D0]';
            textColor = 'text-[#065F46]';
          } else if (isCurrent) {
            if (hasDeficiency) {
              badgeColor = 'bg-[#FFFBEB] text-[#92400E] border-[#FDE68A] ring-2 ring-[#FDE68A]';
              textColor = 'text-[#92400E] font-bold';
            } else {
              badgeColor = 'bg-[#0A2540] text-white border-[#0A2540] ring-2 ring-sky-300';
              textColor = 'text-[#0A2540] font-bold';
            }
          }

          return (
            <div
              key={stage.key}
              className={`p-3 rounded border flex flex-col justify-between transition-all ${
                isCurrent ? 'bg-sky-50/50 border-[#0284C7]' : 'bg-white border-[#E2E8F0]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border ${badgeColor}`}
                >
                  {isCompleted ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : isCurrent && hasDeficiency ? (
                    <AlertCircle className="w-3.5 h-3.5" />
                  ) : isCurrent ? (
                    <Clock className="w-3.5 h-3.5" />
                  ) : (
                    <span>{idx + 1}</span>
                  )}
                </span>
                {isCurrent && (
                  <span className={`text-[10px] uppercase font-bold px-1.5 py-0.2 rounded ${hasDeficiency ? 'bg-[#FFFBEB] text-[#92400E]' : 'bg-sky-100 text-[#0284C7]'}`}>
                    {hasDeficiency ? 'Action Req.' : 'Active'}
                  </span>
                )}
              </div>

              <div>
                <p className={`text-xs font-semibold leading-tight ${textColor}`}>{stage.label}</p>
                <p className="text-[11px] text-[#94A3B8] mt-0.5">{stage.sublabel}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
