import { ApplicationState } from '../../types/application';
import { DocumentVerificationStatus } from '../../types/document';


interface BadgeProps {
  status: ApplicationState | DocumentVerificationStatus | string;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({ status, size = 'md' }) => {
  const normStatus = status.toUpperCase();

  const getStyle = () => {
    switch (normStatus) {
      case 'APPROVED':
      case 'SELECTED':
      case 'VERIFIED':
      case 'COMPLETED':
        return {
          bg: 'bg-[#ECFDF5]',
          text: 'text-[#065F46]',
          border: 'border-[#A7F3D0]',
          label: normStatus === 'APPROVED' ? 'Approved' : normStatus === 'SELECTED' ? 'Selected' : 'Verified',
          icon: <CheckCircle2 className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
        };

      case 'DEFICIENCY_RAISED':
      case 'ACTION_REQUIRED':
      case 'RESUBMISSION_REQUIRED':
        return {
          bg: 'bg-[#FFFBEB]',
          text: 'text-[#92400E]',
          border: 'border-[#FDE68A]',
          label: 'Action Required',
          icon: <AlertTriangle className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
        };

      case 'UNDER_REVIEW':
      case 'DOCUMENT_VERIFICATION':
      case 'ELIGIBILITY_VERIFICATION':
      case 'SCREENING':
      case 'RESUBMITTED':
        return {
          bg: 'bg-[#F0F9FF]',
          text: 'text-[#075985]',
          border: 'border-[#BAE6FD]',
          label: normStatus === 'RESUBMITTED' ? 'Resubmitted' : 'Under Review',
          icon: <Clock className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
        };

      case 'REJECTED':
      case 'NOT_SELECTED':
        return {
          bg: 'bg-[#FEF2F2]',
          text: 'text-[#991B1B]',
          border: 'border-[#FECACA]',
          label: 'Rejected',
          icon: <XCircle className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
        };

      case 'SUBMITTED':
      default:
        return {
          bg: 'bg-[#F1F5F9]',
          text: 'text-[#334155]',
          border: 'border-[#CBD5E1]',
          label: normStatus === 'SUBMITTED' ? 'Submitted' : normStatus.replace(/_/g, ' '),
          icon: <ShieldCheck className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
        };
    }
  };

  const { bg, text, border, label, icon } = getStyle();

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-semibold rounded ${bg} ${text} ${border} border ${
        size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs'
      }`}
    >
      {icon}
      <span>{label}</span>
    </span>
  );
};
