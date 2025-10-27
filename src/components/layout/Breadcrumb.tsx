"use client";

import React from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface BreadcrumbProps {
  breadcrumbTitle: string;
  items?: { label: string; href: string }[];
}

export default function Breadcrumb({ breadcrumbTitle, items = [] }: BreadcrumbProps) {
  const defaultItems = [
    { label: "Home", href: "/" },
    { label: breadcrumbTitle, href: `/${breadcrumbTitle.toLowerCase().replace(/\s+/g, "-")}` },
  ];

  const breadcrumbItems = items.length > 0 ? items : defaultItems;

  return (
    <nav className="bg-white border-b border-gray-200 py-4 shadow-sm" aria-label="Breadcrumb">
      <div className="container mx-auto px-4">
        <ol className="flex items-center flex-wrap gap-2 text-sm text-gray-500">
          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1;
            return (
              <li key={index} className="flex items-center">
                {isLast ? (
                  <span
                    className="text-gray-900 font-semibold bg-gradient-to-r from-green-500 to-teal-400 bg-clip-text text-transparent"
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-green-600 transition-colors duration-200 font-medium"
                  >
                    {item.label}
                  </Link>
                )}
                {!isLast && (
                  <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
