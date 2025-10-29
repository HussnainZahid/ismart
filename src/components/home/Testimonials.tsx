"use client";

import React, { useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Check, X, Megaphone, Leaf, Zap, DollarSign, RefreshCw, Layers } from 'lucide-react'; // Professional, modern icons

// --- Interfaces for TypeScript Type Checking ---
interface Checkpoint {
  icon: React.ElementType; // Use React.ElementType for Lucide icons
  text: string;
}

interface ComparisonRow {
  label: string;
  backMarketStatus: 'check' | 'cross';
  competitorStatus: 'check' | 'cross';
}

interface SlideBase {
  id: string;
  heading: string;
  subheading: string | null;
  buttonText: string | null;
  buttonLink: string | null;
}

interface VerifiedSlide extends SlideBase {
  type: 'verified';
  checkpoints: Checkpoint[];
}

interface ComparisonSlide extends SlideBase {
  type: 'comparison';
  comparisonHeadingLeft: string;
  comparisonHeadingRight: string;
  comparisonRows: ComparisonRow[];
}

interface ImpactSlide extends SlideBase {
  type: 'impact';
}

interface BenefitsSlide extends SlideBase {
  type: 'benefits';
  benefitsList: string[];
}

type CarouselSlide = VerifiedSlide | ComparisonSlide | ImpactSlide | BenefitsSlide;


// --- Data for each carousel slide (Updated with Lucide icons) ---
const carouselSlides: CarouselSlide[] = [
  // Image 1: What is Verified Refurbished?
  {
    type: 'verified',
    id: 'slide1',
    heading: 'What is <span class="highlight">Verified Refurbished</span>?',
    subheading: 'How ISmart ensures quality for your mobiles.',
    buttonText: 'Learn more',
    buttonLink: '/verified-refurbished',
    checkpoints: [
      { icon: Zap, text: '25-point professional inspection' },
      { icon: Layers, text: 'Strict Quality Charter that protects you' },
      { icon: RefreshCw, text: 'Vetted refurbishers' },
      { icon: Leaf, text: 'Innovation Lab' },
      { icon: DollarSign, text: 'Free warranty with every purchase' },
      { icon: RefreshCw, text: '30 days to change your mind' },
    ],
  },
  // Image 2: ISmart is better than used.
  {
    type: 'comparison',
    id: 'slide2',
    heading: 'ISmart is <span class="highlight">better than used.</span>',
    subheading: 'Verified Refurbished vs used mobiles.',
    buttonText: 'Learn more',
    buttonLink: '/compare-used',
    comparisonHeadingLeft: 'ISmart', // Changed to ISmart for consistency
    comparisonHeadingRight: 'Used tech',
    comparisonRows: [
      { label: 'Professionally refurbished', backMarketStatus: 'check', competitorStatus: 'cross' },
      { label: 'Free warranty and 30-day returns', backMarketStatus: 'check', competitorStatus: 'cross' },
      { label: 'Customer support', backMarketStatus: 'check', competitorStatus: 'cross' },
      { label: 'Pay-as-you-go', backMarketStatus: 'check', competitorStatus: 'cross' },
    ],
  },
  // Image 3: ISmart is better than new.
  {
    type: 'comparison',
    id: 'slide3',
    heading: 'ISmart is <span class="highlight">better than new.</span>',
    subheading: 'Verified Refurbished vs new mobiles.',
    buttonText: 'See how',
    buttonLink: '/compare-new',
    comparisonHeadingLeft: 'ISmart', // Changed to ISmart for consistency
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
  subheading: null, 
  buttonText: null,
  buttonLink: null, 
  benefitsList: [
    'Up to 50% less than new',
    'Up to £1,480 when you trade in old tech',
    'Pay-as-you-go options',
    'Protection plans for your device',
  ],
},
];

// --- Sub-Components (Clean Separation) ---

/**
 * Renders the Check or Cross icon based on status.
 * Uses Lucide icons for a professional look.
 */
const CheckCrossIcon: React.FC<{ status: 'check' | 'cross' }> = ({ status }) => {
    const Icon = status === 'check' ? Check : X;
    const colorClass = status === 'check' ? 'text-green-600' : 'text-red-500';
    return (
        <Icon className={`w-5 h-5 ${colorClass}`} aria-hidden="true" />
    );
};

/**
 * Renders the content for a single carousel slide based on its type.
 */
const SlideContent: React.FC<{ slide: CarouselSlide }> = ({ slide }) => {
  const commonClasses = "w-full md:w-1/2 flex justify-center md:justify-start";

  if (slide.type === 'verified' && 'checkpoints' in slide) {
    return (
      <div className={`${commonClasses} order-1 md:order-2`}>
        <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm border border-gray-100">
          <ul className="space-y-4">
            {slide.checkpoints.map((cp, cpIndex) => {
              const Icon = cp.icon;
              return (
                <li key={cpIndex} className="flex items-start text-gray-800 text-lg">
                  <Icon className="w-6 h-6 mr-3 flex-shrink-0 text-[#8B679B]" aria-hidden="true" />
                  <span>{cp.text}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }

  if (slide.type === 'comparison' && 'comparisonRows' in slide) {
    return (
      <div className={`${commonClasses} order-1 md:order-2`}>
        <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm border border-gray-100">
          <div className="grid grid-cols-[1fr_40px_40px] gap-x-6 gap-y-4 items-center text-lg font-bold text-[#4A2D5C] mb-4 pb-3 border-b-2 border-[#8B679B]">
            <div></div> {/* Empty for alignment */}
            <div className="text-center">{slide.comparisonHeadingLeft}</div>
            <div className="text-center">{slide.comparisonHeadingRight}</div>
          </div>
          <ul className="space-y-4">
            {slide.comparisonRows.map((row, rowIndex) => (
              <li key={rowIndex} className="grid grid-cols-[1fr_40px_40px] gap-x-6 items-center text-gray-700">
                <span>{row.label}</span>
                <div className="flex justify-center"><CheckCrossIcon status={row.backMarketStatus} /></div>
                <div className="flex justify-center"><CheckCrossIcon status={row.competitorStatus} /></div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  if (slide.type === 'benefits' && 'benefitsList' in slide) {
    return (
      <div className={`${commonClasses} order-1 md:order-2`}>
        <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm border border-gray-100">
          <ul className="space-y-4">
            {slide.benefitsList.map((benefit, bIndex) => (
              <li key={bIndex} className="flex items-start text-gray-800 text-lg">
                <DollarSign className="w-5 h-5 mr-3 mt-1 flex-shrink-0 text-green-600" aria-hidden="true" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
  
  // For 'impact' or slides with no specific right content
  return <div className={`${commonClasses} hidden md:block w-full md:w-1/2 order-1 md:order-2`}></div>;
};


// --- Main Carousel Component ---
const VerifiedRefurbishedCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = carouselSlides.length;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Use useMemo for the dynamic style to ensure stability
  const translateStyle = useMemo(() => ({
    transform: `translateX(calc(-${currentSlide * 100}%))`,
  } as React.CSSProperties), [currentSlide]);

  return (
    <section className="bg-gray-100 py-16" aria-label="Verified Refurbished Carousel">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-[#F8F5EF] min-h-[480px]">
          
          {/* Main Slide Track */}
          <div
            className="flex w-full transition-transform duration-700 ease-in-out"
            style={translateStyle}
          >
            {carouselSlides.map((slide, index) => (
              <div 
                key={slide.id} 
                className="flex-shrink-0 w-full p-8 md:p-12 flex items-center justify-center"
                role="tabpanel"
                id={slide.id}
                aria-hidden={index !== currentSlide}
              >
                {/* Slide Content */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-12 w-full">
                  
                  {/* Left Side: Heading, Subheading, Button (order-2 on small screens) */}
                  <div className="w-full md:w-1/2 text-center md:text-left order-2 md:order-1">
                    <h2
                      className="font-serif text-4xl sm:text-5xl font-extrabold text-[#4A2D5C] mb-4 leading-tight [&>.highlight]:bg-[#FFDD57] [&>.highlight]:px-2 [&>.highlight]:-mx-2 [&>.highlight]:rounded-lg"
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
                        className="inline-flex items-center justify-center font-bold text-white bg-[#4A2D5C] hover:bg-[#5C3D70] active:bg-[#3A2247] px-8 py-3 rounded-full shadow-lg transition-all duration-200 text-lg tracking-wider"
                      >
                        {slide.buttonText}
                      </Link>
                    )}
                  </div>

                  {/* Right Side: Specific Content for each slide type (order-1 on small screens) */}
                  <SlideContent slide={slide} />

                </div>
              </div>
            ))}
          </div>

          {/* Controls Container */}
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
            
            {/* Dot Indicators (Left) */}
            <div className="flex space-x-2" role="tablist">
              {carouselSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'bg-[#4A2D5C] w-6' : 'bg-gray-400 hover:bg-gray-500'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                  role="tab"
                  aria-controls={carouselSlides[index].id}
                  aria-selected={index === currentSlide}
                />
              ))}
            </div>

            {/* Previous/Next Buttons (Right) */}
            <div className="flex space-x-3">
              <button
                onClick={prevSlide}
                aria-label="Previous slide"
                className="w-10 h-10 rounded-full bg-white hover:bg-gray-200 flex items-center justify-center text-[#4A2D5C] transition-colors shadow-lg border border-gray-300"
              >
                <ChevronLeft className="w-5 h-5" aria-hidden="true" />
              </button>
              <button
                onClick={nextSlide}
                aria-label="Next slide"
                className="w-10 h-10 rounded-full bg-[#4A2D5C] hover:bg-[#5C3D70] flex items-center justify-center text-white transition-colors shadow-lg"
              >
                <ChevronRight className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default VerifiedRefurbishedCarousel;