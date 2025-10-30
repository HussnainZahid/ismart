"use client";

import React, { useRef } from "react";
// Replaced "next/link" with standard HTML 'a' tag to fix compilation issue
import {
  ChevronLeft,
  ChevronRight,
  Shield,
  CreditCard,
  Smartphone,
  CheckCircle,
  Star,
  Zap,
} from "lucide-react";

// --- Data Structures ---

// Feature icons from the 'tech.png' template image
const features = [
  { title: "Professionally refurbished", icon: CheckCircle, link: "#refurbished-process" },
  { title: "Cashback with Trade-in", icon: Smartphone, link: "#trade-in" },
  { title: "Pay-as-you-go", icon: CreditCard, link: "#payment-options" },
  { title: "App exclusive features", icon: Zap, link: "#app-features" },
];

// Data matching the product card style in 'tech.png'
const products = [
  {
    id: 1,
    name: "iPhone 15",
    specs: "Black · 128 GB · Physical SIM + eSIM",
    price: "£377.00",
    oldPrice: "£699.00 new",
    image: "/iphone-15.jfif", 
    rating: 4.6,
    reviews: 1,
  },
  {
    id: 2,
    name: "Samsung Galaxy S23",
    specs: "Phantom Black · 256 GB · Dual SIM",
    price: "£289.00",
    oldPrice: "£559.00 new",
    image: "/s23.jfif",
    rating: 4.5,
    reviews: 1203,
  },
  {
    id: 3,
    name: "iPhone 14 Pro Max",
    specs: "Deep Purple · 128 GB · Physical SIM",
    price: "£499.00",
    oldPrice: "£849.00 new",
    image: "/14-pro-max.jfif",
    rating: 4.8,
    reviews: 790,
  },
  {
    id: 4,
    name: "Google Pixel 8",
    specs: "Obsidian · 128 GB · eSIM ready",
    price: "£349.00",
    oldPrice: "£699.00 new",
    image: "/google-pixel-8-pro.jfif",
    rating: 4.4,
    reviews: 350,
  },
  {
    id: 5,
    name: "Xiaomi 13T",
    specs: "Alpine Blue · 256 GB · Dual SIM",
    price: "£229.00",
    oldPrice: "£449.00 new",
    image: "/xiaomi-13.jfif",
    rating: 4.3,
    reviews: 50,
  },
];

// --- Sub Components ---

// Component for the Product Card (Matches the minimalist style of 'tech.png')
const ProductCard: React.FC<{ product: typeof products[0] }> = ({ product }) => {
  const ratingStars = Math.floor(product.rating);

  return (
    <a // Changed Link to 'a'
      href={`/product/${product.id}`}
      className="group flex-none w-[270px] sm:w-[300px] bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow duration-300 overflow-hidden"
    >
      <div className="relative h-60 flex items-center justify-center bg-gray-50/50 p-6">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full object-contain transition-transform duration-500 group-hover:scale-[1.05]"
          onError={(e) => {
            (e.target as HTMLImageElement).onerror = null; 
            (e.target as HTMLImageElement).src = 'https://placehold.co/150x240/f1f1f1/999999?text=Phone';
          }}
        />
      </div>

      <div className="p-4 text-left">
        {/* Name and Specs */}
        <h3 className="font-bold text-lg text-gray-900 mb-1">{product.name}</h3>
        <p className="text-xs text-gray-500 min-h-[30px]">{product.specs}</p>

        {/* Rating and Review Count */}
        <div className="flex items-center gap-1 mt-2 text-sm">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < ratingStars ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
            />
          ))}
          <span className="font-medium text-gray-700 ml-1">
            {product.rating.toFixed(1)}/5
          </span>
          <span className="text-gray-400">({product.reviews})</span>
        </div>

        {/* Pricing Block */}
        <div className="mt-3">
          <span className="text-xl font-extrabold text-gray-900 block leading-tight">
            {product.price}
          </span>
          <span className="text-sm text-gray-400 line-through">
            {product.oldPrice}
          </span>
        </div>
      </div>
    </a> // Changed Link to 'a'
  );
};


// --- Main Component ---

const HeroSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll function for the carousel
  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      // Calculate scroll amount based on card width (300px) + gap (24px)
      const scrollAmount = 324;
      scrollRef.current.scrollBy({
        left: dir === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="bg-white font-sans">
      {/* 1. Header and Feature Bar Section */}
      <div className="pt-24 pb-16 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Tech better with us
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-16">
          Buy and sell tech that's better for the planet.
        </p>

        {/* Feature Pill Bar (Matching the template layout) */}
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center items-center gap-4 px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between w-full p-2 bg-white border border-gray-200 rounded-full shadow-lg">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <a // Changed Link to 'a'
                  key={i}
                  href={f.link}
                  className="flex items-center gap-2 p-3 text-sm font-medium text-gray-700 rounded-full hover:bg-gray-50 transition-colors w-full sm:w-auto justify-center"
                >
                  <Icon className="w-5 h-5 text-gray-700" />
                  {f.title}
                </a> // Changed Link to 'a'
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Recommended Products Carousel Section */}
      <div className="bg-gray-50 pt-16 pb-24">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Carousel Header and Controls */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Recommended for you
            </h2>
            <div className="flex gap-3">
              <button
                onClick={() => scroll("left")}
                aria-label="Previous Products"
                className="w-10 h-10 rounded-full bg-white text-gray-700 hover:bg-gray-200 transition-colors flex items-center justify-center border border-gray-300 shadow-sm"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll("right")}
                aria-label="Next Products"
                className="w-10 h-10 rounded-full bg-gray-900 text-white hover:bg-gray-700 transition-colors flex items-center justify-center shadow-md"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Product Carousel */}
          <div
            ref={scrollRef}
            // Tailwind class to hide scrollbar (for a clean look)
            className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide scroll-smooth" 
          >
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
            
            {/* Additional invisible div to ensure correct right scroll boundary */}
            <div className="flex-none w-[10px] h-full"></div>
          </div>
        </div>
      </div>

      {/* Hide scrollbar styles */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
