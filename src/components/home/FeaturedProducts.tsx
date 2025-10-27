"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Pause, Play, Sparkles } from "lucide-react";

const FeaturedProducts: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const slides = [
    {
      title: "iPhone 15 Pro Max",
      subtitle: "Save up to £300 today",
      description: "The most advanced iPhone ever — now up to 70% off refurbished.",
      button: { text: "Shop Flash Sale", link: "/flash-sale" },
      bg: "from-slate-900 to-gray-800",
      image: "/images/iphone-15-pro.png",
      badge: "🔥 Hot Deal",
    },
    {
      title: "Samsung Galaxy S24 Ultra",
      subtitle: "Flagship Android Performance",
      description: "Experience ultimate speed and camera power with refurbished S24 Ultra.",
      button: { text: "Shop Samsung", link: "/samsung" },
      bg: "from-indigo-600 to-purple-600",
      image: "/images/samsung-s24.png",
      badge: "⚡ Performance",
    },
    {
      title: "Google Pixel 8 Pro",
      subtitle: "AI-Powered Brilliance",
      description: "Pure Android. Smarter photos. Better battery. Refurbished perfection.",
      button: { text: "Shop Pixel", link: "/google-pixel" },
      bg: "from-orange-500 to-red-500",
      image: "/images/pixel-8-pro.png",
      badge: "🤖 AI Powered",
    },
    {
      title: "Budget Phones from £99",
      subtitle: "Smartphones that fit your budget",
      description: "Affordable refurbished phones that deliver more for less.",
      button: { text: "Shop Deals", link: "/budget-phones" },
      bg: "from-emerald-600 to-teal-500",
      image: "/images/budget-phones.png",
      badge: "💰 Great Value",
    },
  ];

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => setCurrent((prev) => (prev + 1) % slides.length), 6000);
    return () => clearInterval(timer);
  }, [autoPlay, slides.length]);

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  const { title, subtitle, description, button, bg, image, badge } = slides[current];

  return (
    <section className="relative w-full overflow-hidden">
      {/* Slide */}
      <div
        className={`transition-all duration-700 ease-in-out h-[480px] sm:h-[560px] flex items-center justify-center bg-gradient-to-br ${bg}`}
        onMouseEnter={() => setAutoPlay(false)}
        onMouseLeave={() => setAutoPlay(true)}
      >
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Text */}
          <div className="text-center lg:text-left space-y-4 text-white animate-fadeIn">
            <span className="inline-flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full text-sm font-semibold backdrop-blur">
              <Sparkles className="w-4 h-4" /> {badge}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold">{title}</h2>
            <p className="text-lg font-semibold opacity-90">{subtitle}</p>
            <p className="text-base md:text-lg opacity-80 max-w-lg mx-auto lg:mx-0">{description}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-6">
              <a
                href={button.link}
                className="bg-white text-gray-900 font-semibold px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform"
              >
                {button.text}
              </a>
              <button
                onClick={() => alert("Learn more clicked")}
                className="border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white/10 transition"
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Image */}
          <div className="flex justify-center lg:justify-end animate-slideIn">
            <img
              src={image}
              alt={title}
              className="max-h-[320px] md:max-h-[400px] object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
        {/* Arrows */}
        <button
          onClick={prev}
          className="hidden sm:flex w-10 h-10 rounded-full bg-white/90 text-gray-900 items-center justify-center hover:scale-110 shadow-md transition"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={next}
          className="hidden sm:flex w-10 h-10 rounded-full bg-white/90 text-gray-900 items-center justify-center hover:scale-110 shadow-md transition"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2 bg-white/90 rounded-full px-4 py-2 shadow-md">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all ${
                current === i ? "bg-gradient-to-r from-purple-600 to-pink-600 w-6 h-3" : "bg-gray-300 w-3 h-3"
              }`}
            />
          ))}
        </div>

        {/* Play / Pause */}
        <button
          onClick={() => setAutoPlay(!autoPlay)}
          className="hidden sm:flex w-10 h-10 rounded-full bg-white/90 text-gray-900 items-center justify-center hover:scale-110 shadow-md transition"
        >
          {autoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
        </button>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
        .animate-slideIn { animation: slideIn 0.6s ease-out; }
      `}</style>
    </section>
  );
};

export default FeaturedProducts;
