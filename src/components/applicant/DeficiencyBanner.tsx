import React from 'react';
import { Link } from 'react-router-dom';
import { DeficiencyItem } from '../../types/deficiency';
import { AlertTriangle, ArrowRight, Calendar, FileText } from 'lucide-react';
import { Button } from '../common/Button';

interface Props {
  deficiency: DeficiencyItem;
}

export const DeficiencyBanner: React.FC<Props> = ({ deficiency }) => {
  return (
    <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-lg p-5 shadow-xs mb-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-full bg-[#FEF3C7] text-[#92400E] flex items-center justify-center shrink-0 border border-[#FCD34D]">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#92400E] bg-[#FEF3C7] px-2 py-0.5 rounded">
                Action Required · Deficiency Raised
              </span>
              <span className="text-xs text-[#92400E] flex items-center gap-1 font-semibold">
                <Calendar className="w-3.5 h-3.5" />
                <span>Deadline: {deficiency.deadline}</span>
              </span>
            </div>

            <h4 className="text-base font-bold text-[#92400E] mt-1">{deficiency.title}</h4>
            <p className="text-sm text-[#78350F] mt-1 max-w-2xl">{deficiency.description}</p>

            <div className="flex items-center gap-2 mt-2 text-xs font-medium text-[#78350F]">
              <FileText className="w-3.5 h-3.5 text-[#B45309]" />
              <span>Affected Document: <strong>{deficiency.documentTitle}</strong></span>
            </div>
          </div>
        </div>

        <div className="shrink-0 w-full md:w-auto">
          <Link to={`/applicant/deficiencies/${deficiency.applicationId}`}>
            <Button
              variant="primary"
              className="bg-[#D97706] hover:bg-[#B45309] text-white w-full md:w-auto"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Resolve Deficiency Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
