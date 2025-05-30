import React, { ReactNode } from 'react';
import { FiInfo, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi';

export interface CalloutProps {
  children: ReactNode;
  type?: 'info' | 'warning' | 'tip';
}

export const Callout: React.FC<CalloutProps> = ({ children, type = 'info' }) => {
  const bgColor = {
    info: 'bg-blue-50 border-blue-300 dark:bg-blue-900/20 dark:border-blue-800',
    warning: 'bg-yellow-50 border-yellow-300 dark:bg-yellow-900/20 dark:border-yellow-800',
    tip: 'bg-green-50 border-green-300 dark:bg-green-900/20 dark:border-green-800',
  };
  
  const textColor = {
    info: 'text-blue-800 dark:text-blue-300',
    warning: 'text-yellow-800 dark:text-yellow-300',
    tip: 'text-green-800 dark:text-green-300',
  };
  
  const icons = {
    info: <FiInfo size={24} className="flex-shrink-0" />,
    warning: <FiAlertTriangle size={24} className="flex-shrink-0" />,
    tip: <FiCheckCircle size={24} className="flex-shrink-0" />
  };

  return (
    <div className={`my-8 flex gap-4 rounded-lg border shadow-sm ${bgColor[type]} p-5`}>
      <div className={textColor[type]}>
        {icons[type]}
      </div>
      <div className={`${textColor[type]} prose-lg dark:prose-invert`}>
        {children}
      </div>
    </div>
  );
};

export default Callout;
