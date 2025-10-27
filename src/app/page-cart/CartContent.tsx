"use client";

import React from 'react';
import Link from 'next/link';

const CartContent: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>Home</li>
<li className="flex items-center space-x-2">
              <span>/</span>
              <span className="text-gray-900 font-medium">Cart</span>
            </li>
          </ol>
        </nav>

        {/* Main Content */}
        <div className="max-w-2xl mx-auto text-center">
          {/* Icon */}
          <div className="mb-8">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto">
              <svg 
                className="w-12 h-12 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5.5M7 13l2.5 5.5m0 0L17 21" 
                />
              </svg>
            </div>
          </div>

          {/* Messages */}
          <div className="space-y-4 mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Buzzkill alert
            </h1>
            <p className="text-lg text-gray-600">
              There's nothing in your cart.
            </p>
            <p className="text-gray-600">
              All this stellar refurb isn't gonna shop itself!
            </p>
          </div>

          {/* CTA Button */}
          <Link
            href="/deals"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Browse sweet deals
          </Link>

          {/* Additional Help */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-gray-600 mb-4">
              Need help with your order?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/help"
                className="text-green-600 hover:text-green-700 font-medium transition-colors"
              >
                Visit Help Center
              </Link>
              <Link
                href="/contact"
                className="text-green-600 hover:text-green-700 font-medium transition-colors"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartContent;