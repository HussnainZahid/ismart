"use client";

import React from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

// --- 1. Interface Definitions ---

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  /** The label for the current (last) page, used if no 'items' array is provided. */
  breadcrumbTitle: string;
  /** Optional array of custom breadcrumb items for complex paths. */
  items?: BreadcrumbItem[];
}

// --- 2. Utility Function (Typed) ---

/** Generates a clean URL slug from a string. */
const toSlug = (text: string): string => 
  text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');


// --- 3. Component (Typed) ---

export default function Breadcrumb({ 
    breadcrumbTitle, 
    items 
}: BreadcrumbProps) {

  // Use useMemo to calculate the breadcrumb items once, ensuring correct typing.
  const breadcrumbItems: BreadcrumbItem[] = React.useMemo(() => {
    
    // Explicitly type the default array to avoid Type 'never[]' error (2322)
    const defaultItems: BreadcrumbItem[] = [
      { label: "Home", href: "/" },
      { 
        label: breadcrumbTitle, 
        href: `/${toSlug(breadcrumbTitle)}` 
      },
    ];

    // If 'items' is provided and has content, use it. Otherwise, use default.
    return items && items.length > 0 ? items : defaultItems;
    
  }, [items, breadcrumbTitle]); // Recalculate only when props change

  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm py-3 sm:py-4 font-inter" aria-label="Breadcrumb">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ol className="flex items-center flex-wrap gap-x-2 text-sm">
          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1;
            const key = `${item.label}-${index}`; // Unique key is essential for lists

            return (
              <li key={key} className="flex items-center">
                {isLast ? (
                  // Current page (not a link, bold text)
                  <span
                    className="text-gray-900 font-semibold text-base sm:text-sm"
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                ) : (
                  // Intermediate link
                  <Link
                    href={item.href}
                    className="text-gray-500 hover:text-indigo-600 transition-colors duration-200 font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-md"
                  >
                    {item.label}
                  </Link>
                )}
                
                {/* Separator Icon, only shown before the last item */}
                {!isLast && (
                  <ChevronRight className="w-4 h-4 text-gray-400 ml-2 flex-shrink-0" />
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
