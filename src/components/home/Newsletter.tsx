"use client";

import React, { useState } from "react";
import { ChevronDown, Mail, Phone, MessageCircle, HelpCircle } from "lucide-react";

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Can you help me recycle my old phone or other electronics?",
      a: "Absolutely! You can trade in your old devices through our verified partners and receive cash in return. We'll even cover shipping costs. The trade-in process is simple, secure, and environmentally friendly.",
    },
    {
      q: "Can I pay for my device over time?",
      a: "Yes! We offer flexible payment plans with 0% interest on select devices. Enjoy refurbished tech for less while keeping your budget manageable.",
    },
    {
      q: "What condition are refurbished devices in?",
      a: "All our devices undergo a 70-point inspection and come with a 12-month warranty. They're fully functional and graded from 'Like New' to 'Good'.",
    },
    {
      q: "Do you offer warranty on refurbished devices?",
      a: "Yes! Every device includes a 12-month warranty covering hardware defects. You can extend it to 24 months for extra peace of mind.",
    },
    {
      q: "What's your return policy?",
      a: "We offer a 30-day money-back guarantee. If you're not satisfied, return it for a full refund — free return shipping included.",
    },
  ];

  const toggleFAQ = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-sm font-medium text-purple-600 bg-purple-100 px-3 py-1 rounded-full mb-4">
            <HelpCircle className="w-4 h-4" />
            FAQs
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-3">Got Questions?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about our refurbished devices, payments, and support.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div
              key={i}
              className={`rounded-xl border bg-white transition-all duration-300 ${
                openIndex === i ? "border-purple-300 shadow-md" : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <button
                onClick={() => toggleFAQ(i)}
                className="flex justify-between items-center w-full text-left px-6 py-5 focus:outline-none"
              >
                <span className="text-lg font-semibold text-gray-900">{f.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                    openIndex === i ? "rotate-180 text-purple-600" : ""
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === i ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="px-6 pb-5 text-gray-700">{f.a}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Options */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Still need help?</h3>
          <p className="text-gray-600 mb-8">Reach out to our friendly support team.</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <a
              href="#chat"
              className="flex flex-col items-center justify-center bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition"
            >
              <MessageCircle className="w-6 h-6 text-purple-600 mb-2" />
              <span className="font-semibold text-gray-900">Live Chat</span>
              <span className="text-sm text-gray-500">Chat with us instantly</span>
            </a>

            <a
              href="mailto:support@example.com"
              className="flex flex-col items-center justify-center bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition"
            >
              <Mail className="w-6 h-6 text-blue-600 mb-2" />
              <span className="font-semibold text-gray-900">Email</span>
              <span className="text-sm text-gray-500">support@example.com</span>
            </a>

            <a
              href="tel:+441234567890"
              className="flex flex-col items-center justify-center bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition"
            >
              <Phone className="w-6 h-6 text-green-600 mb-2" />
              <span className="font-semibold text-gray-900">Phone</span>
              <span className="text-sm text-gray-500">+44 1234 567890</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
