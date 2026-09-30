import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  header,
  footer,
  ...props
}) => {
  return (
    <div
      className={`bg-white rounded-lg border border-[#E2E8F0] shadow-[0_1px_2px_0_rgba(15,23,42,0.04)] overflow-hidden ${className}`}
      {...props}
    >
      {header && (
        <div className="px-6 py-4 border-b border-[#E2E8F0] bg-white flex items-center justify-between">
          {header}
        </div>
      )}
      <div className="p-6">{children}</div>
      {footer && (
        <div className="px-6 py-3 border-t border-[#E2E8F0] bg-[#F8FAFC]">
          {footer}
        </div>
      )}
    </div>
  );
};
