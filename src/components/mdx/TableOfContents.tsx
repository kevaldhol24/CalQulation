"use client";

import React from "react";
import { FiChevronRight } from "react-icons/fi";
import Link from "next/link";

interface TOCItem {
  id: string;
  text: string;
  children: TOCItem[];
}

interface TableOfContentsProps {
  className?: string;
  headings?: TOCItem[];
}

const TableOfContents: React.FC<TableOfContentsProps> = ({
  className = "",
  headings = [],
}) => {
  // Smooth scroll function for better user experience and fallback for browsers
  // that don't support CSS scroll-behavior
  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    
    if (element && window) {
      // Get the header height for offset (adjust as needed)
      const headerHeight = 80;
      
      // Calculate the position to scroll to
      const targetPosition = element.getBoundingClientRect().top + window.scrollY - headerHeight;
      
      // Scroll to the element
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      // Update URL hash after scrolling
      window.history.pushState(null, '', `#${id}`);
    }
  };
  
  if (headings.length === 0) {
    return null;
  }

  return (
    <div
      className={`toc-container bg-gray-50 dark:bg-gray-900 p-4 rounded-lg mb-8 border border-gray-200 dark:border-gray-800 ${className}`}
    >
      <h3 className="text-base font-semibold mb-4 text-gray-800 dark:text-gray-200 pb-2 border-b border-gray-200 dark:border-gray-800">
        Table of Contents
      </h3>
      <nav aria-label="Table of contents">
        <ul className="space-y-2">
          {headings.map((item) => (
            <li key={item.id} className="toc-item">
              <Link
                href={`#${item.id}`}
                onClick={(e) => handleScrollToSection(e, item.id)}
                className={`flex items-center cursor-pointer pl-2 py-1 rounded hover:bg-gray-200 hover:dark:bg-gray-800 text-gray-700 dark:text-gray-300`}
              >
                <FiChevronRight className="mr-2 flex-shrink-0" size={16} />
                <span className="truncate">{item.text}</span>
              </Link>

              {item.children.length > 0 && (
                <ul className="pl-6 mt-1 space-y-1 border-l border-gray-200 dark:border-gray-700">
                  {item.children.map((child) => (
                    <li key={child.id}>
                      <Link
                        href={`#${child.id}`}
                        onClick={(e) => handleScrollToSection(e, child.id)}
                        className={`flex items-center cursor-pointer py-1 text-sm hover:text-primary text-gray-700 dark:text-gray-300`}
                      >
                        <span className="truncate">{child.text}</span>
                      </Link>

                      {child.children.length > 0 && (
                        <ul className="pl-4 mt-1 space-y-1 border-l border-gray-200 dark:border-gray-700">
                          {child.children.map((subChild) => (
                            <li key={subChild.id}>
                              <Link
                                href={`#${subChild.id}`}
                                onClick={(e) => handleScrollToSection(e, subChild.id)}
                                className={`cursor-pointer py-1 text-xs hover:text-primary text-gray-700 dark:text-gray-300`}
                              >
                                <span className="truncate">
                                  {subChild.text}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default TableOfContents;
