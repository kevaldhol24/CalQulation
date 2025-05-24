import Link from "next/link";
import { ReactNode } from "react";

type BreadcrumbItem = {
  label: string;
  href: string;
  icon?: ReactNode;
};

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  return (
    <div className={`flex items-center ${className}`}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        
        return (
          <div key={item.href} className="flex items-center">
            {index > 0 && (
              <span className="text-gray-300 mx-2">/</span>
            )}
            
            {isLast ? (
              <span className="text-gray-300 flex items-center gap-1">
                {item.icon}
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href} 
                className="text-gray-300 hover:text-white flex items-center gap-1"
              >
                {item.icon}
                {item.label}
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
}
