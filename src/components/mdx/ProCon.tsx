import React from 'react';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';

export interface ProConProps {
  pros: string[];
  cons: string[];
}

export const ProCon: React.FC<ProConProps> = ({ pros, cons }) => {
  return (
    <div className="grid md:grid-cols-2 gap-6 my-10">
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
        <h3 className="text-lg font-semibold text-green-800 dark:text-green-400 mb-5 flex items-center">
          <FiCheckCircle className="w-5 h-5 mr-2" />
          Pros
        </h3>
        <ul className="space-y-3">
          {pros.map((pro, idx) => (
            <li key={idx} className="flex text-gray-700 dark:text-gray-300">
              <FiCheckCircle className="w-5 h-5 mr-2.5 text-green-600 dark:text-green-500 flex-shrink-0 mt-1" />
              <span className="text-base">{pro}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
        <h3 className="text-lg font-semibold text-red-800 dark:text-red-400 mb-5 flex items-center">
          <FiXCircle className="w-5 h-5 mr-2" />
          Cons
        </h3>
        <ul className="space-y-3">
          {cons.map((con, idx) => (
            <li key={idx} className="flex text-gray-700 dark:text-gray-300">
              <FiXCircle className="w-5 h-5 mr-2.5 text-red-600 dark:text-red-500 flex-shrink-0 mt-1" />
              <span className="text-base">{con}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProCon;
