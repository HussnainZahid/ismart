"use client";

import React, { useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  TrendingUp,
  Shield,
  Award,
  CheckCircle,
} from "lucide-react";

const Hero: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const features = [
    { title: "Certified Refurbished", desc: "Guaranteed like-new quality" },
    { title: "Trade-in Cashback", desc: "Get up to £800 instantly" },
    { title: "Flexible Payments", desc: "Spread the cost over time" },
    { title: "Free 12-Month Warranty", desc: "Buy confidently with coverage" },
  ];

  const products = [
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      price: "£399",
      oldPrice: "£699",
      image: "/images/iphone-15.png",
      badge: "🔥 Best Seller",
      rating: 4.7,
    },
    {
      id: 2,
      name: "Samsung Galaxy S24 Ultra",
      price: "£549",
      oldPrice: "£899",
      image: "/images/samsung-s24.png",
      badge: "⚡ Hot Deal",
      rating: 4.6,
    },
    {
      id: 3,
      name: "Google Pixel 8 Pro",
      price: "£479",
      oldPrice: "£799",
      image: "/images/pixel-8-pro.png",
      badge: "🤖 AI Camera",
      rating: 4.8,
    },
    {
      id: 4,
      name: "OnePlus 12 Pro",
      price: "£429",
      oldPrice: "£749",
      image: "/images/oneplus-12.png",
      badge: "💨 Fast & Smooth",
      rating: 4.5,
    },
    {
      id: 5,
      name: "Sony Xperia 1 V",
      price: "£499",
      oldPrice: "£849",
      image: "/images/sony-xperia1.png",
      badge: "🎬 Cinema Camera",
      rating: 4.6,
    },
    {
      id: 6,
      name: "Samsung Galaxy Z Fold 6",
      price: "£899",
      oldPrice: "£1299",
      image: "/images/galaxy-z-fold6.png",
      badge: "📱 Foldable",
      rating: 4.7,
    },
    {
      id: 7,
      name: "iPhone 14 Pro",
      price: "£349",
      oldPrice: "£599",
      image: "/images/iphone-14.png",
      badge: "🌟 Popular",
      rating: 4.6,
    },
    {
      id: 8,
      name: "Google Pixel 7a",
      price: "£279",
      oldPrice: "£499",
      image: "/images/pixel-7a.png",
      badge: "💡 Affordable AI",
      rating: 4.4,
    },
    {
      id: 9,
      name: "Xiaomi 14 Pro",
      price: "£399",
      oldPrice: "£699",
      image: "/images/xiaomi-14-pro.png",
      badge: "⚡ Flash Sale",
      rating: 4.5,
    },
    {
      id: 10,
      name: "Oppo Find X6 Pro",
      price: "£459",
      oldPrice: "£799",
      image: "/images/oppo-find-x6.png",
      badge: "📸 Pro Camera",
      rating: 4.6,
    },
  ];


  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="bg-gradient-to-b from-white via-gray-50 to-purple-50 py-20 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10 text-center">
        {/* Header */}
        <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full font-medium mb-6">
          <TrendingUp className="w-4 h-4" />
          2M+ Happy Customers
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
          Tech better{" "}
          <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            with us
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          Buy and sell certified refurbished smartphones up to{" "}
          <span className="font-semibold text-gray-900">70% cheaper</span> —
          better for your wallet and the planet.
        </p>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-6 mb-14">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Shield className="w-5 h-5 text-green-600" />
            12-Month Warranty
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Award className="w-5 h-5 text-purple-600" />
            Certified Quality
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <CheckCircle className="w-5 h-5 text-blue-600" />
            30-Day Returns
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {features.map((f, i) => (
            <div
              key={i}
              className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md hover:border-purple-200 transition-all"
            >
              <h3 className="font-semibold text-gray-900 mb-1">{f.title}</h3>
              <p className="text-sm text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Product Carousel */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Featured Deals
          </h2>
          <div className="hidden md:flex gap-3">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full bg-white border hover:bg-gray-50 shadow-md flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md flex items-center justify-center"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide scroll-smooth"
        >
          {products.map((p) => (
            <a
              key={p.id}
              href="#"
              className="flex-none w-72 bg-white rounded-2xl border border-gray-200 hover:shadow-lg transition-all overflow-hidden"
            >
              <div className="relative h-64 flex items-center justify-center bg-gray-50">
                <div className="absolute top-3 left-3 bg-purple-600 text-white text-xs px-3 py-1 rounded-full">
                  {p.badge}
                </div>
                <img
                  src={p.image}
                  alt={p.name}
                  className="max-h-44 object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-5 text-left">
                <h3 className="font-semibold text-gray-900">{p.name}</h3>
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.round(p.rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                        }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">
                    {p.rating.toFixed(1)}
                  </span>
                </div>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-2xl font-bold text-gray-900">
                    {p.price}
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    {p.oldPrice}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10">
          <a
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full shadow-lg hover:scale-105 transition-transform"
          >
            View All Products <ChevronRight className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Hide scrollbar */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
};

export default Hero;
