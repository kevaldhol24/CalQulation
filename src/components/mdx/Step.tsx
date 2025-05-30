import React from 'react';

export interface StepProps {
  number: number;
  title: string;
  description: string;
}

export const Step: React.FC<StepProps> = ({ number, title, description }) => {
  return (
    <div className="flex gap-6 mb-10 group">
      <div className="relative">
        <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white text-xl font-bold ring-4 ring-primary/10 group-hover:ring-primary/20 transition-all duration-300">
          {number}
        </div>
        {number < 5 && (
          <div className="absolute top-14 bottom-0 left-1/2 w-0.5 -translate-x-1/2 bg-gray-200 dark:bg-gray-700 h-16 z-0"></div>
        )}
      </div>
      <div className="pt-1">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default Step;
