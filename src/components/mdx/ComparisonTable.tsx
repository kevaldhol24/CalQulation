import React from 'react';

export interface ComparisonTableProps {
  features: {
    name: string;
    basic: string | boolean;
    advanced: string | boolean;
  }[];
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ features }) => {
  return (
    <div className="my-8 overflow-hidden border border-gray-200 dark:border-gray-800 rounded-lg shadow-md">
      <table className="w-full">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-100">Feature</th>
            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 dark:text-gray-100">Basic Calculators</th>
            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 dark:text-gray-100">Advanced Calculators</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {features.map((feature, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800/50'}>
              <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">{feature.name}</td>
              <td className="px-6 py-4 text-center text-sm text-gray-700 dark:text-gray-300">
                {typeof feature.basic === 'boolean' ? (
                  feature.basic ? (
                    <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      Yes
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-800 dark:bg-red-900/30 dark:text-red-400">
                      No
                    </span>
                  )
                ) : (
                  feature.basic
                )}
              </td>
              <td className="px-6 py-4 text-center text-sm text-gray-700 dark:text-gray-300">
                {typeof feature.advanced === 'boolean' ? (
                  feature.advanced ? (
                    <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      Yes
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-800 dark:bg-red-900/30 dark:text-red-400">
                      No
                    </span>
                  )
                ) : (
                  feature.advanced
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonTable;
