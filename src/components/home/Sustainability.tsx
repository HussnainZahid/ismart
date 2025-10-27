"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, ShoppingCart, Star, Zap, TrendingUp } from "lucide-react";

const TechProducts: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 45, seconds: 30 });

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const trending = [
    { name: "iPhone 15 Pro", image: "/images/iphone-15.png", href: "#", tag: "Most Popular" },
    { name: "Samsung S24 Ultra", image: "/images/samsung-s24.png", href: "#", tag: "Top Android" },
    { name: "Google Pixel 8", image: "/images/pixel-8.png", href: "#", tag: "AI Camera" },
    { name: "OnePlus 12", image: "/images/oneplus-12.png", href: "#", tag: "Performance" },
  ];

  const deals = [
    {
      name: "iPhone 14 Pro Max",
      price: "£649",
      original: "£1099",
      rating: 4.8,
      image: "/images/iphone-14-pro-max.png",
    },
    {
      name: "Samsung Galaxy S23 Ultra",
      price: "£699",
      original: "£1249",
      rating: 4.7,
      image: "/images/s23-ultra.png",
    },
    {
      name: "Google Pixel 7 Pro",
      price: "£449",
      original: "£849",
      rating: 4.6,
      image: "/images/pixel-7-pro.png",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-6 space-y-24">
        {/* === Trending Section === */}
        <div>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <TrendingUp className="w-4 h-4" />
              <span>Trending Now</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-3">Most Wanted Phones</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Top picks everyone’s searching for — refurbished and up to 70% off.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trending.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl p-6 transition-all duration-300 flex flex-col items-center text-center"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-32 object-contain mb-4 transition-transform duration-300 group-hover:scale-110"
                />
                <span className="font-semibold text-gray-900 group-hover:text-purple-600 transition">
                  {item.name}
                </span>
                <span className="text-xs text-white bg-purple-600 px-3 py-1 rounded-full mt-3 font-medium">
                  {item.tag}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* === Flash Sale Section === */}
        <div className="bg-white border border-gray-200 rounded-3xl shadow-xl p-10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-6">
              <Zap className="w-4 h-4" />
              Flash Sale Live
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-3">Limited-Time Deals</h2>
            <p className="text-gray-600 mb-6">
              Premium refurbished smartphones — only for a few more hours!
            </p>

            {/* Countdown */}
            <div className="flex justify-center gap-4">
              {[
                { label: "Hrs", value: timeLeft.hours },
                { label: "Min", value: timeLeft.minutes },
                { label: "Sec", value: timeLeft.seconds },
              ].map((t) => (
                <div key={t.label} className="bg-gray-100 rounded-lg px-5 py-3">
                  <span className="block text-2xl font-bold text-gray-900">
                    {String(t.value).padStart(2, "0")}
                  </span>
                  <span className="text-xs font-semibold text-gray-600">{t.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Products */}
          <div className="grid md:grid-cols-3 gap-6">
            {deals.map((item) => (
              <div
                key={item.name}
                className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                <div className="flex-1 flex items-center justify-center mb-6">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-40 object-contain transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.name}</h3>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.round(item.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-700 ml-1">{item.rating}</span>
                </div>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-2xl font-bold text-gray-900">{item.price}</span>
                  <span className="text-sm text-gray-400 line-through">{item.original}</span>
                </div>
                <button className="mt-auto bg-gradient-to-r from-red-500 to-orange-500 hover:opacity-90 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition">
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="/all-deals"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white font-semibold py-4 px-8 rounded-xl transition"
            >
              View All Flash Deals
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechProducts;
