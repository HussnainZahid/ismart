"use client";

import React, { useState } from "react";

const TradeInSection: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);

    setTimeout(() => {
      console.log("Email submitted:", email);
      setSubmitted(true);
      setEmail("");
      setIsSubmitting(false);

      setTimeout(() => setSubmitted(false), 3000);
    }, 1000);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 space-y-24">

        {/* --- Trade-In CTA --- */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-3xl p-10 shadow-lg flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="space-y-5 max-w-lg">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Get up to <span className="text-yellow-200">£800</span> for your trade-in
            </h1>
            <p className="text-lg text-purple-100">
              Trade the tech you don’t want for the cash you do. Fast, fair, and secure.
            </p>
            <a
              href="#tradein"
              className="inline-block bg-white text-purple-700 font-semibold py-3 px-6 rounded-xl shadow-md hover:bg-gray-100 transition"
            >
              Start Trade-In
            </a>
          </div>

          <div className="bg-white text-gray-800 rounded-2xl p-6 w-full max-w-sm shadow-xl space-y-4">
            <h3 className="text-lg font-semibold">Why trade with us?</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.121-4.121a1 1 0 011.414-1.414L8.414 12.172l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Best market value offers
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.121-4.121a1 1 0 011.414-1.414L8.414 12.172l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Fast 48-hour payments
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.121-4.121a1 1 0 011.414-1.414L8.414 12.172l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Free, insured shipping
              </li>
            </ul>
          </div>
        </div>

        {/* --- Newsletter Signup --- */}
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Stay updated with <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">new drops</span>
          </h2>
          <p className="text-gray-600 mb-8">
            Get exclusive offers, product updates, and a welcome discount when you join our newsletter.
          </p>

          {submitted && (
            <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg py-3 px-4 mb-6">
              ✅ You’re subscribed! Check your inbox for your discount code.
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 px-5 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition"
              disabled={isSubmitting}
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white font-semibold px-8 py-3 rounded-xl transition disabled:opacity-50"
            >
              {isSubmitting ? "Signing up..." : "Sign up"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default TradeInSection;
