import React, { ReactNode } from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

export interface PullQuoteProps {
  children: ReactNode;
  author?: string;
  role?: string;
}

export const PullQuote: React.FC<PullQuoteProps> = ({ children, author, role }) => {
  return (
    <figure className="my-12 px-8 py-8 bg-gray-50 dark:bg-gray-800/50 rounded-xl border-l-4 border-primary shadow-lg relative">
      <div className="absolute top-6 left-4 text-primary/20 dark:text-primary/30">
        <FaQuoteLeft size={30} />
      </div>
      <blockquote className="pl-8 text-xl italic font-medium text-gray-700 dark:text-gray-300 leading-relaxed">
        <span>{children}</span>
        {/* <span className="text-3xl text-primary">&rdquo;</span> */}
      </blockquote>
      {(author || role) && (
        <figcaption className="mt-6 text-right flex items-center justify-end">
          {/* <div className="w-12 h-0.5 bg-primary/30 mr-3"></div> */}
          <div>
            {author && (
              <span className="font-medium text-gray-900 dark:text-gray-100 block">{author}</span>
            )}
            {role && (
              <span className="text-gray-500 dark:text-gray-400 text-sm">{role}</span>
            )}
          </div>
        </figcaption>
      )}
    </figure>
  );
};

export default PullQuote;
