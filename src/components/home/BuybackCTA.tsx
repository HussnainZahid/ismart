"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Newspaper } from "lucide-react";

const PressCarousel: React.FC = () => {
  const pressFeatures = [
    {
      publication: "LOCAL LONDON",
      quote: " ISmart hosts sustainability workshops for refurbished mobiles at Hockney City Farm",
      date: "03/02/2025",
      logo: "/local_london.png",
      href: "/press/local-london",
      category: "Sustainability",
    },
    {
      publication: "Job of Krones",
      quote: "ISmart partners with Life After Ad to breathe new life into its OOH Leverhulng",
      date: "24/01/2025",
      logo: "/ads of brands.png",
      href: "/press/job-of-krones",
      category: "Partnership",
    },
    {
      publication: "RTTF",
      quote: "ISmart forecasts record 2025 as it launches repair platform in France, Germany, and Spain",
      date: "06/09/2025",
      logo: "/tech.png",
      href: "/press/rttf",
      category: "Expansion",
    },
    {
      publication: "GreenPrices World",
      quote: "Green Retail World news - ISmart tackles Microsoft's planned obsolescence",
      date: "16/09/2025",
      logo: "/green-retail.png",
      href: "/press/greenprices-world",
      category: "Innovation",
    },
    {
      publication: "The Guardian",
      quote: "ISmart – now a certified B Corp, ensuring ethical standards.",
      date: "11/06/2024",
      logo: "/the-gurdian.png",
      href: "/press/the-guardian",
      category: "Certification",
    },
    {
      publication: "THE TIMES",
      quote: "ISmart positions itself as a reliable alternative for buying and selling secondhand mobiles.",
      date: "11/05/2023",
      logo: "/the_times.png",
      href: "/press/the-times",
      category: "Industry",
    },
    {
      publication: "BBC",
      quote: "ISmart's mobile category grew 123% year on year since 2016",
      date: "03/12/2024",
      logo: "/bbc.png",
      href: "/press/bbc",
      category: "Growth",
    },
    {
      publication: "DAILY EXPRESS",
      quote: "ISmart's study shows 4/10 Brits justify eco-unfriendly choices for convenience",
      date: "22/04/2025",
      logo: "/daily-express.png",
      href: "/press/daily-express",
      category: "Research",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % pressFeatures.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [autoPlay, pressFeatures.length]);

  const next = () => setCurrent((prev) => (prev + 1) % pressFeatures.length);
  const prev = () => setCurrent((prev) => (prev - 1 + pressFeatures.length) % pressFeatures.length);

  const feature = pressFeatures[current];

  return (
    <section className="py-20 bg-gray-50 relative">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
            <Newspaper className="w-4 h-4" />
            Press Coverage
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mt-4">As seen in</h2>
          <p className="text-gray-600 mt-2">
            Highlighting global recognition from trusted publications
          </p>
        </div>

        {/* Card */}
        <div
          className="relative max-w-4xl mx-auto bg-white border border-gray-200 shadow-md rounded-2xl p-10 transition-all duration-300"
          onMouseEnter={() => setAutoPlay(false)}
          onMouseLeave={() => setAutoPlay(true)}
        >
          <div className="flex flex-col items-center gap-6">
            <img
              src={feature.logo}
              alt={feature.publication}
              className="h-12 object-contain"
            />
            <blockquote className="text-xl text-gray-800 leading-relaxed font-medium max-w-2xl">
              “{feature.quote}”
            </blockquote>
            <div className="text-sm text-gray-500">
              {feature.publication} — {feature.date}
            </div>
            <a
              href={feature.href}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium py-3 px-6 rounded-xl shadow hover:opacity-90 transition"
            >
              Read Full Article <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Navigation */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 bg-white border border-gray-200 w-10 h-10 rounded-full shadow flex items-center justify-center hover:bg-gray-50 transition"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 bg-white border border-gray-200 w-10 h-10 rounded-full shadow flex items-center justify-center hover:bg-gray-50 transition"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center mt-6 gap-2">
          {pressFeatures.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-2 w-8 rounded-full transition-all ${index === current
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 w-10"
                  : "bg-gray-300 hover:bg-gray-400"
                }`}
            />
          ))}
        </div>

        {/* Footer Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-3xl font-bold text-purple-600">50+</p>
            <p className="text-sm text-gray-600">Press Features</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-purple-600">8</p>
            <p className="text-sm text-gray-600">Major Publications</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-purple-600">2025</p>
            <p className="text-sm text-gray-600">Latest Coverage</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-purple-600">100%</p>
            <p className="text-sm text-gray-600">Verified Stories</p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12">
          <a
            href="/press"
            className="inline-flex items-center gap-2 bg-white border border-gray-200 py-3 px-8 rounded-xl shadow hover:bg-gray-50 transition text-gray-800 font-semibold"
          >
            View All Press <ChevronRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default PressCarousel;
