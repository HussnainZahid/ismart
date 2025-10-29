"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

// --- Custom Interfaces (Simplified: Badge Removed) ---
interface SlideData {
  title: string;
  subtitle: string;
  description: string;
  button: { text: string; link: string };
  // The 'bg' property remains, but is unused
  bg: string;
  image: string;
  // 'badge' property removed
}

const FeaturedProducts: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  // Define slides with high-performance data (No 'badge' key now)
  const slides: SlideData[] = [
    // 1. **ULTIMATE FLAGSHIP**
    {
      title: "iPhone 16 Pro Max",
      subtitle: "The Most Powerful Refurbished Phone Ever",
      description: "Experience next-level performance, professional photography, and epic savings with the latest iPhone.",
      button: { text: "Shop 16 Pro Deals", link: "/iphone-16-pro" },
      bg: "from-slate-900 to-gray-800",
      image: "/iphone-16-pro.png",
    },
    // 2. **ULTIMATE ANDROID**
    {
      title: "Samsung Galaxy S25 Ultra",
      subtitle: "Flagship AI Power & Speed",
      description: "Unrivaled speed, revolutionary camera, and AI features—all fully certified and refurbished.",
      button: { text: "Shop S25 Ultra", link: "/s25-ultra" },
      bg: "from-indigo-700 to-purple-800",
      image: "/samsung-s25-ultra.png",
    },
    // 3. **LEADING AI PHONE**
    {
      title: "Google Pixel 8 Pro",
      subtitle: "AI-Powered Brilliance",
      description: "Pure Android. Smarter photos. Better battery. Refurbished perfection.",
      button: { text: "Shop Pixel", link: "/google-pixel" },
      bg: "from-orange-600 to-red-700",
      image: "/Google-Pixel-8.png",
    },
    // 4. **PREMIUM FOLDABLE**
    {
      title: "Galaxy Z Fold 5",
      subtitle: "The Ultimate Multitasking Device",
      description: "Experience the ultimate multitasking machine with a refurbished Z Fold 5—perfect for power users.",
      button: { text: "Explore Foldables", link: "/galaxy-fold" },
      bg: "from-blue-700 to-cyan-800",
      image: "/galaxy-z-fold.png",
    },
    // 5. **HIGH REFRESH RATE GAMING**
    {
      title: "OnePlus 12",
      subtitle: "Incredible Speed & Display",
      description: "Enjoy lightning-fast charging and a flawless, high-refresh-rate display for gaming and media.",
      button: { text: "Shop OnePlus", link: "/oneplus" },
      bg: "from-red-700 to-red-900",
      image: "/one-plus-12.jpg",
    },
    // 6. **BEST VALUE FLAGSHIP**
    {
      title: "iPhone 14 Pro",
      subtitle: "Best Value on a Recent Flagship",
      description: "A near-new experience with the A16 Bionic chip—unbeatable value.",
      button: { text: "Shop iPhone Deals", link: "/iphone-14" },
      bg: "from-pink-700 to-purple-700",
      image: "/iphone-14-pro.jpg",
    },
    // 7. Budget Phones
    {
      title: "Budget Phones from £99",
      subtitle: "Smartphones that fit your budget",
      description: "Affordable refurbished phones that deliver more for less.",
      button: { text: "Shop Deals", link: "/budget-phones" },
      bg: "from-emerald-700 to-teal-800",
      image: "/budget-phones.png",
    },
  ];

  // AutoPlay Effect
  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => setCurrent((prev) => (prev + 1) % slides.length), 6000);
    return () => clearInterval(timer);
  }, [autoPlay, slides.length]);

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  const { title, subtitle, description, button, image } = slides[current];

  return (
    <section className="relative w-full overflow-hidden bg-white">

      {/* Slide Container (Full Background Image) */}
      <div
        key={current}
        className="relative h-[560px] md:h-[640px] flex items-center justify-start bg-cover bg-center transition-all duration-700 ease-in-out animate-imageFadeIn"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
        }}
        onMouseEnter={() => setAutoPlay(false)}
        onMouseLeave={() => setAutoPlay(true)}
      >
        {/* Contrast Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/50 to-transparent"></div>

        {/* Content */}
        <div className="container mx-auto px-6 relative z-10 h-full flex items-center">

          {/* Text and Buttons (Badge removed from here) */}
          <div className="text-left space-y-5 text-white animate-fadeIn max-w-xl">
            {/* The badge span element is removed */}
            <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
              {title}
            </h2>
            <p className="text-xl font-medium opacity-90">{subtitle}</p>
            <p className="text-base md:text-lg opacity-80 max-w-lg">{description}</p>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Link
                href={button.link}
                className="bg-white text-gray-900 font-bold px-8 py-4 rounded-full shadow-2xl hover:bg-gray-100 transition-all duration-200 hover:scale-[1.02]"
              >
                {button.text}
              </Link>
              <button
                onClick={() => alert("Learn more clicked for: " + title)}
                className="border-2 border-white text-white font-semibold px-8 py-4 rounded-full hover:bg-white/10 transition-colors duration-200"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">

        {/* Arrows and Play/Pause combined into a sleek control panel */}
        <div className="flex items-center gap-3 bg-white/95 rounded-full px-4 py-2 shadow-2xl backdrop-blur-sm border border-gray-100">

          {/* Play / Pause */}
          <button
            onClick={() => setAutoPlay(!autoPlay)}
            aria-label={autoPlay ? "Pause Autoplay" : "Start Autoplay"}
            className="w-8 h-8 rounded-full text-gray-700 flex items-center justify-center hover:bg-gray-100 transition"
          >
            {autoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${current === i ? "bg-gray-900 w-5 h-2.5" : "bg-gray-400 w-2.5 h-2.5"
                  }`}
              />
            ))}
          </div>

          {/* Arrows */}
          <div className="flex items-center gap-1">
            <button
              onClick={prev}
              aria-label="Previous Slide"
              className="w-8 h-8 rounded-full text-gray-700 flex items-center justify-center hover:bg-gray-100 transition"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              aria-label="Next Slide"
              className="w-8 h-8 rounded-full text-gray-700 flex items-center justify-center hover:bg-gray-100 transition"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes imageFadeIn {
          from { opacity: 0.8; }
          to { opacity: 1; }
        }

        .animate-fadeIn { animation: fadeIn 0.6s ease-out both; }
        
        .animate-imageFadeIn {
           animation: imageFadeIn 0.7s ease-out both;
        }
      `}</style>
    </section>
  );
};

export default FeaturedProducts;