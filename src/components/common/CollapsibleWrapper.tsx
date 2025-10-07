"use client";

import { FC, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface CollapsibleWrapperProps {
  children: React.ReactNode;
  title: string | React.ReactNode;
  isExpanded?: boolean;
  onToggle?: (isOpened: boolean) => void;
  id: string;
}

export const CollapsibleWrapper: FC<CollapsibleWrapperProps> = ({
  title,
  id,
  children,
  isExpanded = false,
  onToggle,
}) => {
  const [isOpened, setIsOpened] = useState(isExpanded);

  const toggleExpanded = () => {
    setIsOpened(!isOpened);
    onToggle?.(!isOpened);
  };

  return (
    <>
      <div
        className="flex items-center justify-between cursor-pointer mb-4 group"
        onClick={toggleExpanded}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleExpanded();
          }
        }}
        aria-expanded={isOpened}
        aria-controls={id}
      >
        <div className="flex items-center">
          <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-3 shadow-sm"></div>
          <h2 className="text-lg font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {title}
          </h2>
        </div>
        <div
          className="p-2 rounded-full hover:bg-gray-200/70 dark:hover:bg-gray-700/70 transition-all duration-300 hover:scale-110"
          aria-label={isOpened ? "Collapse charts" : "Expand charts"}
        >
          {isOpened ? (
            <FaChevronUp
              className="text-gray-500 dark:text-gray-400"
              aria-hidden="true"
            />
          ) : (
            <FaChevronDown
              className="text-gray-500 dark:text-gray-400"
              aria-hidden="true"
            />
          )}
        </div>
      </div>
      <div
        id={id}
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isOpened
            ? "max-h-[3000px] opacity-100 scale-100"
            : "max-h-0 opacity-0 scale-95"
        }`}
        aria-hidden={!isOpened}
        role="region"
        aria-label={id}
      >
        {children}
      </div>
    </>
  );
};
