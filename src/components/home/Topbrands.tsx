"use client";

import React, { useRef, useState, useMemo, useEffect } from "react";


// --- 1. Define Types ---
interface MobileBrand {
  name: string;
  logoUrl: string; 
  alt: string;
}

interface Product {
  id: string;
  imageUrl: string;
  name: string;
  rating: number;
  reviews: number;
  currentPrice: number;
  oldPrice: number;
  brand: string;
}

// --- 2. Mock Data (Focused on Mobile Brands and Devices) ---
const mockMobileBrands: MobileBrand[] = [
  { name: "All Brands", logoUrl: "/All.png", alt: "All Brands" }, 
  { name: "Apple", logoUrl: "/Apple.png", alt: "Apple Logo" },
  { name: "Samsung", logoUrl: "/samsung.png", alt: "Samsung Logo" },
  { name: "Google", logoUrl: "/google.png", alt: "Google Logo" },
  { name: "Xiaomi", logoUrl: "/xiaomi.png", alt: "Xiaomi Logo" },
  { name: "OnePlus", logoUrl: "/oneplus.png", alt: "OnePlus Logo" },
];

const mockProducts: Product[] = [
  {
    id: "1",
    imageUrl: "/14-pro-max.jfif",
    name: "Apple iPhone 14 Pro Max 128GB - Deep Purple",
    rating: 4.8,
    reviews: 25,
    currentPrice: 999.99,
    oldPrice: 1299.00,
    brand: "Apple",
  },
  {
    id: "2",
    imageUrl: "/s23.jfif",
    name: "Samsung Galaxy S23 Ultra 256GB - Phantom Black",
    rating: 4.7,
    reviews: 18,
    currentPrice: 899.99,
    oldPrice: 1199.00,
    brand: "Samsung",
  },
  {
    id: "3",
    imageUrl: "google-pixel-7a.jfif",
    name: "Google Pixel 7 Pro 128GB - Obsidian",
    rating: 4.6,
    reviews: 12,
    currentPrice: 649.99,
    oldPrice: 899.00,
    brand: "Google",
  },
  {
    id: "4",
    imageUrl: "xiaomi-13.jfif",
    name: "Xiaomi 13 Ultra 512GB - Black",
    rating: 4.5,
    reviews: 8,
    currentPrice: 799.99,
    oldPrice: 1099.00,
    brand: "Xiaomi",
  },
  // Added more products for better filtering demo
  {
    id: "5",
    imageUrl: "/iphone se.jfif",
    name: "Apple iPhone SE (2022) 64GB - Midnight",
    rating: 4.4,
    reviews: 30,
    currentPrice: 399.00,
    oldPrice: 429.00,
    brand: "Apple",
  },
  {
    id: "6",
    imageUrl: "/galaxy-z-fold.jfif",
    name: "Samsung Galaxy Z Fold4 512GB - Beige",
    rating: 4.9,
    reviews: 15,
    currentPrice: 1499.99,
    oldPrice: 1799.00,
    brand: "Samsung",
  },
  {
  id: "7",
  imageUrl: "/one-plus-12-pro.jfif",
  name: "OnePlus 12 256GB - Flowy Emerald",
  rating: 4.8,
  reviews: 22,
  currentPrice: 899.99,
  oldPrice: 999.99,
  brand: "OnePlus",
},

];



const StarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const TopBrands: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeBrand, setActiveBrand] = useState<string>("All Brands");

  // Hydration Mismatch fix: ensures client-side logic only runs after mounting
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };
  
  // Filtering logic using useMemo
  const filteredProducts = useMemo(() => {
    if (activeBrand === "All Brands") {
      return mockProducts;
    }
    return mockProducts.filter(product => product.brand === activeBrand);
  }, [activeBrand]);

  return (
    <section className="bg-gray-50 py-16 md:py-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-10 border-l-4 border-purple-600 pl-4">
          Top Mobile Brands, Refurbished
        </h2>

        {/* Conditional rendering based on isMounted */}
        {!isMounted ? (
          // Placeholder content for the server render / initial client render
          <div className="h-[500px] w-full bg-white rounded-xl shadow-lg flex items-center justify-center text-gray-500 font-medium animate-pulse">
            Loading interactive content...
          </div>
        ) : (
          <>
            {/* New Brands Filter Section: Placed prominently on top */}
            <div className="mb-12">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Shop by Brand</h3>
              <div 
                className="flex space-x-6 overflow-x-auto py-2 px-1 -mx-1 no-scrollbar scroll-smooth"
                // Adding an overflow hidden class to avoid layout shift due to initial hidden scrollbar
              >
              {mockMobileBrands.map((brand: MobileBrand) => (
                  <button
                  key={brand.name}
                  onClick={() => setActiveBrand(brand.name)}
                  className={`
                      flex flex-col items-center justify-center p-3 w-20 h-20 rounded-xl transition-all duration-300 transform shrink-0 
                      focus:outline-none focus:ring-4 focus:ring-purple-300/50
                      ${activeBrand === brand.name 
                          ? 'bg-purple-600 text-white shadow-xl shadow-purple-200 ring-4 ring-purple-300' 
                          : 'bg-white text-gray-700 shadow-lg hover:shadow-xl hover:ring-2 ring-gray-200'
                      }
                  `}
                  aria-label={`Filter by ${brand.name}`}
                  >
                  <img
                      src={brand.logoUrl}
                      alt={brand.alt}
                      // Increased size and applied filter for contrast when active
                      className={`h-7 w-7 object-contain mb-1 transition-all duration-300 ${activeBrand === brand.name ? 'filter brightness-200' : ''}`}
                      width={28}
                      height={28}
                  />
                  <span className="font-medium text-xs truncate">
                      {brand.name}
                  </span>
                  </button>
              ))}
              </div>
            </div>
            
            {/* Main Content: Hero Image and Products Carousel */}
            <div className="flex flex-col lg:flex-row gap-10">
              {/* Left Column: Hero Device (NOW LINKED) */}
              <div className="flex-shrink-0 w-full lg:w-2/5 xl:w-1/3 space-y-8">
                {/* Link wrapper for the hero block */}
                <a href="/products/featured-deal" className="block focus:outline-none focus:ring-4 focus:ring-purple-400 rounded-3xl">
                    <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-gray-900 transition-all duration-300 hover:shadow-purple-400/50">
                        {/* Hero Image */}
                        <img
                            src="/phones.png"
                            alt="Refurbished Mobile Device Highlight"
                            className="absolute inset-0 w-full h-full object-cover opacity-80"
                        />
                        {/* Deal Overlay (RESTORED WITH LINK HINTS) */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-6 flex flex-col justify-end z-10">
                            <h3 className="text-xl font-bold text-white mb-2">Refurbished Mobile Deals</h3>
                            <p className="text-sm text-gray-300 mb-4">
                                Pristine condition, guaranteed. Click to view our top offers.
                            </p>
                            <div className="flex items-center space-x-3">
                                <span className="text-2xl font-extrabold text-green-300">
                                    Shop Now
                                </span>
                                <span className="text-xs text-white bg-purple-600 px-3 py-1 rounded-full">
                                    Up to 40% Off
                                </span>
                            </div>
                        </div>
                    </div>
                </a>
              </div>


              {/* Right Column: Filtered Product Carousel */}
              <div className="flex-1 min-w-0">
                <h4 className="text-xl font-semibold text-gray-700 mb-4">
                  {activeBrand === "All Brands" ? "Featured Products" : `${activeBrand} Devices`}
                </h4>

                {filteredProducts.length === 0 ? (
                    <div className="p-10 bg-white rounded-xl shadow-lg text-center text-gray-500">
                        <p className="text-lg font-medium">No products found for {activeBrand}.</p>
                        <button 
                            onClick={() => setActiveBrand("All Brands")} 
                            className="mt-4 text-purple-600 font-medium hover:underline"
                            aria-label="Show all mobile devices"
                        >
                            Show All Devices
                        </button>
                    </div>
                ) : (
                    <div className="relative">
                    <div
                        ref={scrollContainerRef}
                        className="flex space-x-6 overflow-x-scroll no-scrollbar py-2"
                    >
                        {filteredProducts.map((product: Product) => (
                        <a 
                            key={product.id}
                            href={`/product/${product.id}`} // ADDED DYNAMIC LINK
                            className="flex-shrink-0 w-72 bg-white rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 overflow-hidden border border-gray-100 group focus:outline-none focus:ring-4 focus:ring-purple-400"
                        >
                            <div className="relative w-full h-44 bg-gray-50 flex items-center justify-center overflow-hidden">
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    width={180} // Standard img attributes for sizing
                                    height={180} // Standard img attributes for sizing
                                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <div className="p-5 space-y-2">
                                <p className="text-base font-semibold text-gray-900 line-clamp-2">
                                    {product.name}
                                </p>
                                <div className="flex items-center text-xs text-gray-500">
                                    {/* Star Rating Display */}
                                    <div className="flex mr-2">
                                        {[...Array(5)].map((_, i) => (
                                            <StarIcon 
                                                key={i} 
                                                className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-yellow-500' : 'text-gray-300'}`} 
                                            />
                                        ))}
                                    </div>
                                    <span>{product.rating.toFixed(1)}</span>
                                    <span className="mx-2">•</span>
                                    <span>{product.reviews} reviews</span>
                                </div>
                                
                                {/* Price Block */}
                                <div className="flex flex-col pt-1">
                                    <span className="text-xl font-bold text-purple-600">
                                    £{product.currentPrice.toFixed(2)}
                                    </span>
                                    <span className="text-sm text-gray-400 line-through">
                                    £{product.oldPrice.toFixed(2)} new
                                    </span>
                                </div>
                            </div>
                        </a>
                        ))}
                    </div>

                    {/* Navigation Arrows */}
                    <div className="absolute top-1/2 right-0 transform -translate-y-1/2 flex space-x-2 pointer-events-none">
                        <button
                        onClick={() => scroll("left")}
                        className="p-3 rounded-full shadow-lg bg-white text-gray-700 hover:bg-gray-100 focus:outline-none transition-all duration-300 pointer-events-auto opacity-80 hover:opacity-100"
                        aria-label="Scroll Left"
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                        </button>
                        <button
                        onClick={() => scroll("right")}
                        className="p-3 rounded-full shadow-lg bg-white text-gray-700 hover:bg-gray-100 focus:outline-none transition-all duration-300 pointer-events-auto opacity-80 hover:opacity-100"
                        aria-label="Scroll Right"
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                        </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default TopBrands;
