"use client";

import React, { useState } from "react";

// --- Icon Components (Matching the visual theme of the image) ---

// Icon for the newsletter input field (Mail Icon)
const MailIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

// Icon for the trade-in benefits (Badge icon - Highest Offer)
const BadgeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.78 4 4 0 0 1 5.92-.08l.58.58a4 4 0 0 1 4.07 1.25L21 8l-2.43 2.5a4 4 0 0 1-1.25 4.07l-.58.58a4 4 0 0 1-.08 5.92 4 4 0 0 1-4.78-4.78 4 4 0 0 1-5.92-.08l-.58-.58a4 4 0 0 1-4.07-1.25L3 16l2.43-2.5a4 4 0 0 1 1.25-4.07z" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

// Icon for the trade-in benefits (Banknote/Payment icon - Fast Cash)
const BanknoteIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="12" x="2" y="6" rx="2" />
    <circle cx="12" cy="12" r="2" />
    <path d="M6 12h.01M18 12h.01" />
  </svg>
);

// Icon for the trade-in benefits (Shipping icon - Free & Insured Shipping)
const TruckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10 17H5V3h5l4 4V3h5v14h-5" />
    <rect x="10" y="7" width="4" height="4" rx="1" />
    <path d="M1 17h22" />
    <circle cx="7" cy="20" r="2" />
    <circle cx="17" cy="20" r="2" />
  </svg>
);

// Icon for the 'Learn more' section toggle (Up/Down arrow)
const ChevronIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="18 15 12 9 6 15"></polyline>
    </svg>
);


const TradeInSection: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showLearnMore, setShowLearnMore] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);

    // Simulate API call delay
    setTimeout(() => {
      console.log("Email submitted:", email);
      setSubmitted(true);
      setEmail("");
      setIsSubmitting(false);

      // Hide success message after 3 seconds
      setTimeout(() => setSubmitted(false), 3000);
    }, 1000);
  };

  return (
    // The image background appears solid white
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 space-y-24">
        {/* --- Trade-In CTA (Image a.png - Top Part) --- */}
        {/* Matched to a light, non-gradient purple, rounded-2xl border-radius */}
        <div className="bg-purple-100 rounded-2xl p-8 lg:p-12 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="space-y-4 max-w-lg text-gray-900">
            {/* Matched font weight and color for the title and '£800' */}
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Get up to <span className="text-purple-700">£800</span> for your trade-in.
            </h1>
            {/* Matched paragraph color and text */}
            <p className="text-lg text-gray-700">
              Trade the tech you don’t want for the cash you do.
            </p>
            <a
              href="#tradein"
              // Matched button style: Black background, py-3 px-6, rounded-xl
              className="inline-block bg-black text-white font-semibold py-3 px-6 mt-4 rounded-xl shadow-md hover:bg-gray-800 transition"
            >
              Learn more about Trade-in
            </a>
          </div>

          {/* Benefits Card - Matched to the image's layout and content */}
          <div className="bg-white text-gray-800 rounded-2xl p-6 w-full max-w-sm shadow-2xl space-y-4">
            <ul className="space-y-4">
              {/* Note: The items are centered vertically and use bold text for emphasis */}
              <li className="flex items-start gap-3">
                <BadgeIcon className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <p className="text-base text-gray-800">
                    <strong className="font-semibold">Highest offer out of 250+ refurbishers</strong>
                </p>
              </li>
              <li className="flex items-start gap-3">
                <BanknoteIcon className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <p className="text-base text-gray-800">
                    <strong className="font-semibold">Fast cash payment directly deposited</strong>
                </p>
              </li>
              <li className="flex items-start gap-3">
                <TruckIcon className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <p className="text-base text-gray-800">
                    <strong className="font-semibold">Free & insured shipping</strong>
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* --- Newsletter Signup (Image a.png - Bottom Part) --- */}
        <div className="max-w-xl mx-auto text-center">
          {/* Matched title text and removed gradient for an exact match */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Stay in the loop with <span className="text-purple-600">hot drops</span>
          </h2>
          {/* Matched paragraph text */}
          <p className="text-gray-600 mb-8">
            Be the first to know about new arrivals, exclusive deals, and tech news that matters.
          </p>

          {submitted && (
            <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg py-3 px-4 mb-6">
              ✅ You’re subscribed! Check your inbox for your discount code.
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center">
            {/* Input Field with Email Icon (Matching the visual in a.png) */}
            <div className="relative flex-1 max-w-sm sm:max-w-none">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email" // Matched placeholder text
                // Matched border, padding, and focus ring
                className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:border-black focus:ring-0 outline-none transition"
                disabled={isSubmitting}
                required
              />
              <MailIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              // Matched button style: Black background, rounded-lg
              className="bg-black hover:bg-gray-800 text-white font-semibold px-8 py-3 rounded-lg transition disabled:opacity-50"
            >
              {isSubmitting ? "Signing up..." : "Sign up"}
            </button>
          </form>

          {/* Learn More Toggle & Content (Image b.png) */}
          <div className="mt-6 text-center max-w-sm mx-auto">
            <button
              onClick={() => setShowLearnMore(!showLearnMore)}
              className="text-sm font-semibold text-gray-700 flex items-center justify-center mx-auto hover:text-black transition"
            >
              {/* Adjusted icon to match the up/down arrow style in the image */}
              <ChevronIcon className={`w-4 h-4 mr-1 transition-transform ${showLearnMore ? 'rotate-0' : 'rotate-180'}`} />
              Learn more
            </button>
            {showLearnMore && (
              <div className="mt-4 space-y-4 text-xs text-gray-500 border-t pt-4 text-left">
                <p>
                  By subscribing, you agree to receive our promotional communications via email. You can
                  unsubscribe at any time using the link in any of our marketing emails, or request to access,
                  rectify or delete your data.
                </p>
                <p>
                  <a href="page-privacy" className="font-bold text-gray-800 underline hover:text-purple-600 transition">
                    For more details, please refer to our privacy policy.
                  </a>
                </p>
                <p>
                  A non-cumulative promotional code will be sent by email following newsletter registration. It is
                  valid for a minimum order of <strong className="font-bold">£250</strong> and is usable for <strong className="font-bold">1 month</strong> from the date of receipt.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TradeInSection;