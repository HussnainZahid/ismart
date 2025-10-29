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
    { name: "iPhone 17 Pro Max", image: "/iphone-17-pro.jfif", href: "#", tag: "Flagship King" },
    { name: "Samsung Galaxy S25 Ultra", image: "/samsung-s25-ultra.jfif", href: "#", tag: "Top Android" },
    { name: "Google Pixel 10 Pro", image: "/google-pixel-10.jfif", href: "#", tag: "Next-Gen AI" },
    { name: "OnePlus 13", image: "/iphone-13.jfif", href: "#", tag: "Ultimate Speed" },
];

  const deals = [
    {
      name: "iPhone 17 Pro Max",
      price: "£1099",
      original: "£1499",
      rating: 4.9,
      image: "/iphone-17-pro.jfif", // Latest Apple Flagship
    },
    {
      name: "Samsung Galaxy S25 Ultra",
      price: "£949",
      original: "£1299",
      rating: 4.8,
      image: "/samsung-s25-ultra.jfif", // Latest Samsung Flagship
    },
    {
      name: "Google Pixel 10 Pro",
      price: "£799",
      original: "£1099",
      rating: 4.7,
      image: "/google-pixel-10.jfif", // Latest Google Flagship
    },
    {
      name: "Samsung Galaxy Z Fold 7",
      price: "£1399",
      original: "£2099",
      rating: 4.6,
      image: "/fold-7.jfif", // Latest Premium Foldable
    },
    {
      name: "Xiaomi 15 Ultra",
      price: "£699",
      original: "£1199",
      rating: 4.8,
      image: "/xiaomi-15-ultra.jfif", // Latest High-End Competitor
    },
    {
      name: "Google Pixel 9a",
      price: "£349",
      original: "£549",
      rating: 4.5,
      image: "/pixel-9.jfif", // Latest Top Budget Phone
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
