import React, { ReactNode } from 'react';
import { FiArrowUp, FiArrowDown, FiMinus } from 'react-icons/fi';

export interface StatCardProps {
  value: string;
  label: string;
  icon?: ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ value, label, icon, trend, trendValue }) => {
  const trendColors = {
    up: 'text-green-500 dark:text-green-400',
    down: 'text-red-500 dark:text-red-400',
    neutral: 'text-gray-500 dark:text-gray-400',
  };

  const trendIcons = {
    up: <FiArrowUp className="w-4 h-4" />,
    down: <FiArrowDown className="w-4 h-4" />,
    neutral: <FiMinus className="w-4 h-4" />,
  };

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            {label}
          </p>
          <p className="mt-1 text-3xl font-semibold text-gray-900 dark:text-gray-100 tracking-tight">{value}</p>
          
          {trend && trendValue && (
            <div className={`mt-2 flex items-center ${trendColors[trend]}`}>
              {trendIcons[trend]}
              <span className="ml-1.5 text-sm font-medium">{trendValue}</span>
            </div>
          )}
        </div>
        
        {icon && (
          <div className="rounded-full bg-primary/15 p-3.5 text-primary ring-4 ring-primary/5">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
