import React from 'react';
import { SchemeDefinition } from '../../types/scheme';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { useNavigate } from 'react-router-dom';
import { Calendar, Award, CheckCircle, ArrowRight, BookOpen } from 'lucide-react';

interface Props {
  scheme: SchemeDefinition;
  onOpenGuidelines?: (scheme: SchemeDefinition) => void;
}

export const SchemeCard: React.FC<Props> = ({ scheme, onOpenGuidelines }) => {
  const navigate = useNavigate();

  return (
    <Card className="flex flex-col justify-between hover:border-[#CBD5E1] hover:shadow-sm transition-all h-full">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs font-bold text-[#0284C7] bg-[#F0F9FF] px-2.5 py-0.5 rounded border border-[#BAE6FD]">
            {scheme.code}
          </span>
          <span className="text-xs font-semibold text-[#0E766E] flex items-center gap-1 bg-[#ECFDF5] px-2 py-0.5 rounded border border-[#A7F3D0]">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Applications Open</span>
          </span>
        </div>

        <h3 className="text-base font-bold text-[#0F172A] leading-snug mb-2">{scheme.title}</h3>
        <p className="text-xs text-[#64748B] mb-4 leading-relaxed">{scheme.shortDescription}</p>

        {/* Stipend / Award Info */}
        <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded p-3 mb-4">
          <div className="flex items-start gap-2">
            <Award className="w-4 h-4 text-[#0A2540] shrink-0 mt-0.5" />
            <div>
              <p className="text-[11px] font-semibold text-[#64748B] uppercase">Financial Assistance</p>
              <p className="text-xs font-bold text-[#0A2540] mt-0.5">{scheme.stipendOrAwardText}</p>
            </div>
          </div>
        </div>

        {/* Key Guidelines List */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-[#0F172A] mb-1.5">Key Eligibility Criteria:</p>
          <ul className="text-xs text-[#475569] space-y-1">
            {scheme.eligibilityRules.slice(0, 2).map((r) => (
              <li key={r.id} className="flex items-start gap-1.5">
                <span className="text-[#0284C7] font-bold">•</span>
                <span>{r.description}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pt-4 border-t border-[#F1F5F9] mt-2">
        <div className="flex items-center justify-between text-xs text-[#64748B] mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-[#94A3B8]" />
            <span>Deadline: <strong className="text-[#0F172A]">{scheme.applicationDeadline}</strong></span>
          </span>
          <span className="font-semibold text-slate-500">Slots: {scheme.quotas.totalSlots}</span>
        </div>

        <div className="flex items-center gap-2">
          {onOpenGuidelines && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onOpenGuidelines(scheme)}
              className="flex-1"
              leftIcon={<BookOpen className="w-3.5 h-3.5" />}
            >
              Guidelines
            </Button>
          )}
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate(`/applicant/apply/${scheme.id}`)}
            className="flex-1"
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            Apply Now
          </Button>
        </div>
      </div>
    </Card>
  );
};
