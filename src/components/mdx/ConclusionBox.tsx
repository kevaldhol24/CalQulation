import Link from "next/link";
import React from "react";
import { FiCheckCircle, FiArrowRight } from "react-icons/fi";

export interface ConclusionBoxProps {
  title: string;
  summary: string;
  actionItems?: string[];
  callToAction?: string;
  callToActionUrl?: string;
}

export const ConclusionBox: React.FC<ConclusionBoxProps> = ({
  title,
  summary,
  actionItems = [],
  callToAction,
  callToActionUrl = "#",
}) => {
  return (
    <div className="my-12 p-8 bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-xl border border-primary/20 shadow-lg">
      <h3 className="text-2xl font-bold text-primary mb-5 flex items-center">
        <span className="inline-flex items-center justify-center rounded-full bg-primary/15 w-10 h-10 mr-3 flex-shrink-0">
          <FiCheckCircle className="w-5 h-5 text-primary" />
        </span>
        {title}
      </h3>

      <p className="text-lg text-gray-800 dark:text-gray-200 mb-6 leading-relaxed">
        {summary}
      </p>

      {actionItems.length > 0 && (
        <div className="mb-8">
          <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Key Takeaways:
          </h4>
          <ul className="space-y-3 pl-5">
            {actionItems.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-flex items-center justify-center rounded-full bg-primary/20 w-7 h-7 mr-3 flex-shrink-0 text-primary font-medium">
                  {index + 1}
                </span>
                <span className="text-gray-800 dark:text-gray-200">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {callToAction && (
        <div className="text-center mt-8">
          <Link
            href={callToActionUrl}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 transition-colors gap-2"
          >
            {callToAction}
            <FiArrowRight className="ml-1" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default ConclusionBox;
