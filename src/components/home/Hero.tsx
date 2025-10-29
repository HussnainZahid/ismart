"use client";

import React, { useRef } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Zap,
  Shield,
  Clock,
  CreditCard,
  DollarSign,
} from "lucide-react";

// --- Data ---
const features = [
  { title: "Certified Quality", desc: "Guaranteed like-new condition", icon: Shield },
  { title: "Instant Trade-in", desc: "Get up to £800 cashback", icon: DollarSign },
  { title: "Flexible Payments", desc: "Pay over time with 0% finance", icon: CreditCard },
  { title: "24-Month Warranty", desc: "Extended coverage for confidence", icon: Clock },
];

const products = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    price: "£399",
    oldPrice: "£699",
    image: "/iphone-15-pro.jfif",
    badge: "BEST SELLER",
    rating: 4.7,
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    price: "£549",
    oldPrice: "£899",
    image: "/samsung-s24-ultra.png",
    badge: "HOT DEAL",
    rating: 4.6,
  },
  {
    id: 3,
    name: "Google Pixel 8 Pro",
    price: "£479",
    oldPrice: "£799",
    image: "/google-pixel-8-pro.jfif",
    badge: "AI CAMERA",
    rating: 4.8,
  },
  {
    id: 4,
    name: "OnePlus 12 Pro",
    price: "£429",
    oldPrice: "£749",
    image: "/one-plus-12-pro.jfif",
    badge: "FAST & SMOOTH",
    rating: 4.5,
  },
  {
    id: 5,
    name: "Sony Xperia 1 V",
    price: "£499",
    oldPrice: "£849",
    image: "/xperia-1v.jfif",
    badge: "CINEMA CAMERA",
    rating: 4.6,
  },
  {
    id: 6,
    name: "Samsung Galaxy Z Fold 6",
    price: "£899",
    oldPrice: "£1299",
    image: "/galaxy-z-fold-6.jfif",
    badge: "FOLDABLE",
    rating: 4.7,
  },
  {
    id: 7,
    name: "iPhone 13",
    price: "£289",
    oldPrice: "£559",
    image: "iphone-13.jfif",
    badge: "GREAT VALUE",
    rating: 4.5,
  },
  {
    id: 8,
    name: "Samsung Galaxy S22",
    price: "£229",
    oldPrice: "£449",
    image: "/samsung-s22.jfif",
    badge: "BUDGET FLAGSHIP",
    rating: 4.4,
  },
  {
    id: 9,
    name: "Google Pixel 7a",
    price: "£199",
    oldPrice: "£399",
    image: "/google-pixel-7a.jfif",
    badge: "BEST BUDGET",
    rating: 4.3,
  },
  {
    id: 10,
    name: "Galaxy Z Flip 5",
    price: "£499",
    oldPrice: "£799",
    image: "/galaxy-z-flip-5.jfif",
    badge: "FLIP DEAL",
    rating: 4.6,
  },
];

const Hero: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Simplified scroll function to only use native smooth scrolling
  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      // Scroll by the width of one card + gap (300px + 24px gap = 324px)
      const scrollAmount = 324;
      scrollRef.current.scrollBy({
        left: dir === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="bg-white py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10 text-center">
        
        {/* Header */}
        <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-full font-medium text-sm mb-4">
          <Zap className="w-4 h-4" />
          The Future of Refurbished Tech
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 tracking-tighter">
          Tech better. Pay{" "}
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            less.
          </span>
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-16">
          Buy certified pre-owned smartphones up to{" "}
          <span className="font-bold text-indigo-700">70% cheaper</span> —
          guaranteed quality, better for your wallet and the planet.
        </p>

        {/* Features */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-20">
          {features.map((f, i) => {
            const Icon = f.icon; 
            return (
              <div
                key={i}
                className="p-4 flex flex-col items-center bg-white rounded-xl border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-lg"
              >
                <div className="p-2 mb-2 rounded-full bg-indigo-50 text-indigo-600">
                    <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-gray-900 text-base mb-1">{f.title}</h3>
                <p className="text-xs text-gray-500 max-w-[200px]">{f.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Product Carousel Header and Controls */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-left">
            ⚡ Flash Deals Today
          </h2>
          <div className="flex gap-3">
            <button
              onClick={() => scroll("left")}
              aria-label="Previous Products"
              className="w-10 h-10 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors hidden md:flex items-center justify-center border border-gray-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Next Products"
              className="w-10 h-10 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors hidden md:flex items-center justify-center shadow-md"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Product Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide scroll-smooth"
        >
          {products.map((p) => (
            <Link
              key={p.id}
              href="#"
              className="group flex-none w-[300px] bg-white rounded-xl border border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Product Details (Moved Price/CTA UP for immediate focus) */}
              <div className="p-5 pb-3 text-left">
                {/* Pricing Block - The Deal */}
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-indigo-600">
                    {p.price}
                  </span>
                  <span className="text-base text-gray-400 line-through">
                    {p.oldPrice}
                  </span>
                </div>
                {/* Name */}
                <h3 className="font-bold text-xl text-gray-900 mt-1">{p.name}</h3>
                {/* Rating */}
                <div className="flex items-center gap-1 mt-1 text-sm">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(p.rating)
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-gray-300"
                        }`}
                    />
                  ))}
                  <span className="font-medium text-gray-700 ml-1">
                    {p.rating.toFixed(1)}
                  </span>
                </div>
              </div>

              {/* Image Area */}
              <div className="relative h-48 flex items-center justify-center bg-gray-50/50 p-4 border-t border-gray-100">
                {/* Badge */}
                <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">
                  {p.badge}
                </div>
                <img
                  src={p.image}
                  alt={p.name}
                  // Adjusted image classes for simpler focus
                  className="max-h-full object-contain transition-transform duration-500 group-hover:scale-[1.05] drop-shadow-xl"
                />
              </div>

              {/* Quick CTA */}
              <div className="p-5 pt-3">
                <button className="w-full py-2.5 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors shadow-md">
                    Add to Cart
                </button>
              </div>
            </Link>
          ))}
        </div>

        {/* Final CTA */}
        <div className="mt-12">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300"
          >
            View All Products <ChevronRight className="w-5 h-5 ml-1" />
          </Link>
        </div>
      </div>

      {/* Hide scrollbar (for clean look) */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { 
          display: none; 
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default Hero;