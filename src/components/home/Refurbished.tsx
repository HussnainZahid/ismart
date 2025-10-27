"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// --- INTERFACES for TypeScript Type Checking ---
interface Review {
  name: string;
  review: string;
  stars: number;
  product: string;
  productImage: string;
  avatarImage: string;
}

interface StarRatingProps {
  count: number;
}

interface ReviewCardProps {
  reviewData: Review;
}

// --- Static Data with MORE PHONE PRODUCTS ---
const customerReviews: Review[] = [
  {
    name: "Vlad H.",
    review: "Great value, phone came quickly, and it was indeed as described: excellent condition. The one thing I was worried about was the battery, but it's at 98%! Super impressed.",
    stars: 5,
    product: "iPhone 15 Pro Max 256GB - Black Titanium - Unlocked",
    productImage: "/images/product-iphone-15.jpg", // Placeholder
    avatarImage: "/images/avatar-vlad.jpg", // Placeholder
  },
  {
    name: "Ravi G.",
    review: "Bought a Samsung S22 green color - chose condition excellent - which it was - am very happy - looks and works like new and provides amazing battery life all day.",
    stars: 5,
    product: "Galaxy S22 5G 128GB - Green - Unlocked",
    productImage: "/images/product-s22.jpg", // Placeholder
    avatarImage: "/images/avatar-ravi.jpg",
  },
  {
    name: "Macy W.",
    review: "Such a good deal! The Pixel 8 Pro is flawless. I'm not much of a tech guru so I really can't tell any difference from a new product. Camera is amazing.",
    stars: 5,
    product: "Google Pixel 8 Pro 128GB - Obsidian - Unlocked",
    productImage: "/images/product-pixel-8.jpg", // Placeholder
    avatarImage: "/images/avatar-macy.jpg",
  },
  {
    name: "Aleksandra B.",
    review: "I bought this iPhone SE for my daughter's first phone. She loves it. Definitely will recommend this site to my friends. Excellent value.",
    stars: 5,
    product: "iPhone SE (3rd Gen) 64GB - Midnight - Unlocked",
    productImage: "/images/product-iphone-se.jpg", // Placeholder
    avatarImage: "/images/avatar-aleksandra.jpg",
  },
  {
    name: "David L.",
    review: "The Samsung Galaxy Z Fold 4 arrived in perfect condition. It's truly a statement piece and works flawlessly. Fast shipping and great price.",
    stars: 5,
    product: "Galaxy Z Fold 4 5G 256GB - Phantom Black - Unlocked",
    productImage: "/images/product-zfold.jpg", // Placeholder
    avatarImage: "/images/avatar-david.jpg",
  },
  {
    name: "Sarah K.",
    review: "Amazing phone for the price. The OnePlus 11 is snappy, battery lasts forever, and the screen is beautiful. Will buy refurbished again!",
    stars: 5,
    product: "OnePlus 11 5G 128GB - Titan Black - Unlocked",
    productImage: "/images/product-oneplus.jpg", // Placeholder
    avatarImage: "/images/avatar-sarah.jpg",
  },
  {
    name: "Chris P.",
    review: "The cheapest price I could find for a refurbished iPhone 14! Looks and feels brand new. Great experience overall.",
    stars: 5,
    product: "iPhone 14 128GB - Blue - Unlocked",
    productImage: "/images/product-iphone-14.jpg", // Placeholder
    avatarImage: "/images/avatar-chris.jpg",
  },
];

const slidesToShow = 4; // Number of items visible in the viewport

// --- Star Rating Component ---
const StarRating: React.FC<StarRatingProps> = ({ count }) => (
  <div className="flex text-yellow-400 mb-1">
    {Array(count).fill(0).map((_, i) => (
      <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.691h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.691l1.07-3.292z" />
      </svg>
    ))}
    <span className="text-white text-xs ml-1 font-medium">5/5</span>
  </div>
);

// --- Review Card Component ---
const ReviewCard: React.FC<ReviewCardProps> = ({ reviewData }) => {
  return (
    // Card width: 24.25% (allows 4 to fit) + 1% gap (0.5% margin on each side) = 25.25% total space per card
    <div className="flex-shrink-0 w-[24.25%] mx-[0.5%]">
      <div className="relative h-full text-white bg-cover bg-center rounded-xl shadow-xl overflow-hidden min-h-[350px] transition-transform duration-300 hover:shadow-2xl hover:scale-[1.01]"
           style={{ backgroundImage: `url(${reviewData.avatarImage})` }}>

        {/* Gradient Overlay for a modern, professional look */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-black/40 to-transparent"></div>

        {/* Review Content */}
        <div className="relative p-6 flex flex-col justify-end h-full">
          <div>
            {/* Name Tag - positioned at the bottom of the content */}
            <div className="text-white text-base font-bold mb-1">
              {reviewData.name}
            </div>
            
            <p className="text-sm line-clamp-3 mb-3 text-gray-200">
              {reviewData.review}
            </p>

            <StarRating count={reviewData.stars} />
          </div>

          {/* Product Info at the bottom */}
          <div className="bg-white p-3 rounded-lg mt-4 flex items-center shadow-md">
            {/* Product Thumbnail */}
            <div className="w-10 h-10 flex-shrink-0 mr-3 border border-gray-100 rounded">
              <Image
                src={reviewData.productImage}
                alt={reviewData.product}
                width={40}
                height={40}
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-sm font-semibold text-gray-800 line-clamp-2">
              {reviewData.product}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Component ---
const Refurbished: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const totalReviews = customerReviews.length;
  // Calculate the maximum index we can slide to before the last card is visible
  const maxSlideIndex = Math.max(0, totalReviews - slidesToShow);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev < maxSlideIndex ? prev + 1 : 0)); // Loop back to start
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : maxSlideIndex)); // Loop back to end
  };

  // Define a CSS variable for Tailwind's JIT mode to handle the dynamic translate value
  const translateValue = `calc(-25.25% * ${currentSlide})`;

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">

        {/* Sustainability Section (Header) */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Refurbished tech helps the planet. 
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            We believe in a world that does more with what we already have. Join the movement toward sustainable tech.
          </p>

          <Link
            href="/sustainability"
            className="inline-flex items-center justify-center font-semibold text-white bg-green-600 hover:bg-green-700 active:bg-green-800 px-8 py-3 rounded-full shadow-lg transition-all duration-200 text-lg"
          >
            See why we&apos;re different
          </Link>
        </div>
        {/* ------------------------------------------------------------------ */}

        {/* Customer Reviews Section */}
        <div className="py-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center md:text-left">
            Over 15M happy customers globally
          </h2>

          {/* Customer Carousel Container */}
          <div className="relative">
            <div className="overflow-hidden rounded-xl">
              {/* Review Cards Track */}
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  // Set CSS variable for Tailwind's JIT to correctly apply the dynamic calc
                  transform: `translateX(${translateValue})`,
                  '--tw-translate-x': translateValue,
                  width: `${(totalReviews / slidesToShow) * 100}%`,
                } as React.CSSProperties} // Use React.CSSProperties for custom styles
              >
                {customerReviews.map((review, index) => (
                  <ReviewCard key={index} reviewData={review} />
                ))}
              </div>
            </div>

            {/* Navigation Buttons Container */}
            <div className="absolute inset-y-0 flex justify-between w-full pointer-events-none px-2">
                {/* Previous Button (Left) */}
                <button
                    onClick={prevSlide}
                    aria-label="Previous review"
                    className="w-12 h-12 self-center rounded-full border border-gray-200 bg-white hover:bg-gray-100 flex items-center justify-center text-gray-800 transition-colors shadow-xl pointer-events-auto -translate-x-1/2 opacity-90 hover:opacity-100"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                {/* Next Button (Right) */}
                <button
                    onClick={nextSlide}
                    aria-label="Next review"
                    className="w-12 h-12 self-center rounded-full bg-gray-900 hover:bg-black flex items-center justify-center text-white transition-colors shadow-xl pointer-events-auto translate-x-1/2 opacity-90 hover:opacity-100"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
          </div>
        </div>
        {/* ------------------------------------------------------------------ */}

      </div>
    </section>
  );
};

export default Refurbished;