import React from 'react';

export interface CaseStudyProps {
  title: string;
  client: string;
  scenario: string;
  challenge: string;
  solution: string;
  results: {
    key: string;
    value: string;
  }[];
}

export const CaseStudy: React.FC<CaseStudyProps> = ({ 
  title, 
  client, 
  scenario, 
  challenge, 
  solution, 
  results 
}) => {
  return (
    <div className="my-10 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden shadow-md">
      <div className="bg-primary/10 dark:bg-primary/20 p-6">
        <h3 className="text-2xl font-bold text-primary mb-1">
          {title}
        </h3>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Client: {client}
        </p>
      </div>
      
      <div className="p-6 grid gap-6">
        <div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Scenario
          </h4>
          <p className="text-gray-700 dark:text-gray-300">
            {scenario}
          </p>
        </div>
        
        <div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Challenge
          </h4>
          <p className="text-gray-700 dark:text-gray-300">
            {challenge}
          </p>
        </div>
        
        <div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Solution
          </h4>
          <p className="text-gray-700 dark:text-gray-300">
            {solution}
          </p>
        </div>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-800/50 p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Results
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {results.map((result, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                {result.key}
              </p>
              <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {result.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CaseStudy;
