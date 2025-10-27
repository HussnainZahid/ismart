"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// --- Interfaces for TypeScript Type Checking ---
interface Checkpoint {
  icon: string; // Path to icon image
  text: string;
}

interface ComparisonRow {
  label: string;
  backMarketStatus: 'check' | 'cross';
  competitorStatus: 'check' | 'cross';
}

// --- Data for each carousel slide, matching the provided images ---
const carouselSlides = [
  // Image 1: What is Verified Refurbished?
  {
    type: 'verified',
    id: 'slide1',
    heading: 'What is <span class="highlight">Verified Refurbished</span>?',
    subheading: 'How ISmart ensures quality for your mobiles.',
    buttonText: 'Learn more',
    buttonLink: '/verified-refurbished',
    checkpoints: [
      { icon: '/images/magnifying-glass.svg', text: '25-point professional inspection' },
      { icon: '/images/shield.svg', text: 'Strict Quality Charter that protects you' },
      { icon: '/images/factory.svg', text: 'Vetted refurbishers' },
      { icon: '/images/flask.svg', text: 'Innovation Lab' },
      { icon: '/images/warranty.svg', text: 'Free warranty with every purchase' },
      { icon: '/images/return.svg', text: '30 days to change your mind' },
    ],
  },
  // Image 2: Back Market is better than used.
  {
    type: 'comparison',
    id: 'slide2',
    heading: 'ISmart is <span class="highlight">better than used.</span>',
    subheading: 'Verified Refurbished vs used mobiles.',
    buttonText: 'Learn more',
    buttonLink: '/compare-used',
    comparisonHeadingLeft: 'Back Market',
    comparisonHeadingRight: 'Used tech',
    comparisonRows: [
      { label: 'Professionally refurbished', backMarketStatus: 'check', competitorStatus: 'cross' },
      { label: 'Free warranty and 30-day returns', backMarketStatus: 'check', competitorStatus: 'cross' },
      { label: 'Customer support', backMarketStatus: 'check', competitorStatus: 'cross' },
      { label: 'Pay-as-you-go', backMarketStatus: 'check', competitorStatus: 'cross' },
    ],
  },
  // Image 3: Back Market is better than new.
  {
    type: 'comparison',
    id: 'slide3',
    heading: 'ISmart is <span class="highlight">better than new.</span>',
    subheading: 'Verified Refurbished vs new mobiles.',
    buttonText: 'See how',
    buttonLink: '/compare-new',
    comparisonHeadingLeft: 'Back Market',
    comparisonHeadingRight: 'New',
    comparisonRows: [
      { label: '92% less CO2 emissions', backMarketStatus: 'check', competitorStatus: 'cross' },
      { label: '89% less electronic waste', backMarketStatus: 'check', competitorStatus: 'cross' },
      { label: '86% less water used', backMarketStatus: 'check', competitorStatus: 'cross' },
      { label: 'Priced up to 50 % less', backMarketStatus: 'check', competitorStatus: 'cross' },
    ],
  },
  // Image 4: We've prevented over 1 million tons of CO2 emissions.
  {
    type: 'impact',
    id: 'slide4',
    heading: `We've prevented over <span class="highlight">1 million tons of CO2 emissions.</span>`,
    subheading: 'Thanks to people like you, who choose refurbished tech over new.',
    buttonText: 'Read our impact report',
    buttonLink: '/impact-report',
  },
  // Image 5: Save today and tomorrow.
  {
    type: 'benefits',
    id: 'slide5',
    heading: 'Save <span class="highlight">today and tomorrow.</span>',
    subheading: null, // No subheading for this slide
    buttonText: null, // No button for this slide
    benefitsList: [
      'Up to 50% less than new',
      'Up to £1,480 when you trade in old tech',
      'Pay-as-you-go options',
      'Protection plans for your device',
    ],
  },
];

// --- Helper component for Check/Cross icons ---
const CheckCrossIcon: React.FC<{ status: 'check' | 'cross' }> = ({ status }) => (
  <Image
    src={status === 'check' ? '/images/check-icon.svg' : '/images/cross-icon.svg'} // Placeholder paths
    alt={status === 'check' ? 'Checkmark' : 'Cross'}
    width={16}
    height={16}
    className={status === 'check' ? 'text-green-500' : 'text-red-500'}
  />
);

// --- Main Carousel Component ---
const VerifiedRefurbishedCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = carouselSlides.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Calculate the transform value for the slide track
  const translateValue = `calc(-${currentSlide * 100}%)`;

  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="relative overflow-hidden rounded-2xl shadow-lg bg-[#F8F5EF] min-h-[480px]">
          {/* Main Slide Track */}
          <div
            className="flex w-full transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(${translateValue})`,
              '--tw-translate-x': translateValue, // For Tailwind JIT if needed
            } as React.CSSProperties}
          >
            {carouselSlides.map((slide, index) => (
              <div key={slide.id} className="flex-shrink-0 w-full p-8 md:p-12 flex items-center justify-center">
                {/* Each Slide Content */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-12 w-full">
                  {/* Left Side: Heading, Subheading, Button */}
                  <div className="w-full md:w-1/2 text-center md:text-left">
                    <h2
                      className="font-serif text-5xl font-bold text-[#4A2D5C] mb-4 leading-tight [&>.highlight]:bg-yellow-200 [&>.highlight]:px-1 [&>.highlight]:-mx-1 [&>.highlight]:rounded"
                      dangerouslySetInnerHTML={{ __html: slide.heading }}
                    ></h2>
                    {slide.subheading && (
                      <p className="text-xl text-gray-700 mb-8 max-w-md mx-auto md:mx-0">
                        {slide.subheading}
                      </p>
                    )}
                    {slide.buttonText && (
                      <Link
                        href={slide.buttonLink || '#'}
                        className="inline-flex items-center justify-center font-semibold text-white bg-[#4A2D5C] hover:bg-[#5C3D70] active:bg-[#3A2247] px-8 py-3 rounded-full shadow-lg transition-all duration-200 text-lg"
                      >
                        {slide.buttonText}
                      </Link>
                    )}
                  </div>

                  {/* Right Side: Specific Content for each slide type */}
                  <div className="w-full md:w-1/2 flex justify-center md:justify-start">
                    {slide.type === 'verified' && slide.checkpoints && (
                      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
                        <ul className="space-y-4">
                          {slide.checkpoints.map((cp, cpIndex) => (
                            <li key={cpIndex} className="flex items-center text-gray-800 text-lg">
                              {cp.icon && (
                                <Image src={cp.icon} alt="" width={24} height={24} className="mr-3 flex-shrink-0" />
                              )}
                              <span>{cp.text}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {slide.type === 'comparison' && slide.comparisonRows && (
                      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
                        <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 gap-y-3 items-center text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                          <div></div> {/* Empty for alignment */}
                          <div className="text-center">{slide.comparisonHeadingLeft}</div>
                          <div className="text-center">{slide.comparisonHeadingRight}</div>
                        </div>
                        <ul className="space-y-4">
                          {slide.comparisonRows.map((row, rowIndex) => (
                            <li key={rowIndex} className="grid grid-cols-[1fr_auto_auto] gap-x-4 items-center text-gray-700">
                              <span>{row.label}</span>
                              <div className="flex justify-center"><CheckCrossIcon status={row.backMarketStatus} /></div>
                              <div className="flex justify-center"><CheckCrossIcon status={row.competitorStatus} /></div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {slide.type === 'impact' && (
                      // No specific right content for impact slide, text is left-aligned
                      <div className="hidden md:block w-full md:w-1/2"></div>
                    )}

                    {slide.type === 'benefits' && slide.benefitsList && (
                      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
                        <ul className="space-y-4">
                          {slide.benefitsList.map((benefit, bIndex) => (
                            <li key={bIndex} className="flex items-center text-gray-800 text-lg">
                              <span className="w-2 h-2 bg-gray-400 rounded-full mr-3 flex-shrink-0"></span>
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Controls */}
          <div className="absolute bottom-4 left-4 flex space-x-2">
            {carouselSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-[#4A2D5C] w-6' : 'bg-gray-400 hover:bg-gray-500'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <div className="absolute bottom-4 right-4 flex space-x-2">
            {/* Previous Button */}
            <button
              onClick={prevSlide}
              aria-label="Previous slide"
              className="w-10 h-10 rounded-full bg-gray-900 hover:bg-black flex items-center justify-center text-white transition-colors shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Next Button */}
            <button
              onClick={nextSlide}
              aria-label="Next slide"
              className="w-10 h-10 rounded-full bg-gray-900 hover:bg-black flex items-center justify-center text-white transition-colors shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerifiedRefurbishedCarousel;