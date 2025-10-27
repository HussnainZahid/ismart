"use client";

import { useState } from "react";
import { Search, ChevronDown, ChevronUp, ArrowLeft, Clock, Headphones } from "lucide-react";

const HelpContent: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const topics = [
    { title: "Returns & Refunds", icon: "🔄", href: "/help/returns" },
    { title: "Contact Support", icon: "💬", href: "/help/contact" },
    { title: "Trade-in", icon: "📱", href: "/help/trade-in" },
    { title: "Warranty", icon: "🛡️", href: "/help/warranty" },
    { title: "Troubleshooting", icon: "🔧", href: "/help/troubleshooting" },
    { title: "Payments", icon: "💳", href: "/help/payments" },
    { title: "Shipping", icon: "📦", href: "/help/shipping" },
    { title: "Order Issues", icon: "⚠️", href: "/help/order-issues" },
    { title: "Buying Refurbished", icon: "🏷️", href: "/help/refurbished" },
    { title: "Account Support", icon: "👤", href: "/help/account" },
  ];

  const faqs = [
    {
      question: "How do I contact ISmart for mobile issues?",
      answer:
        "Log into your ISmart account and select “Get Help” next to your mobile order to start a chat with our team.",
    },
    {
      question: "How do I cancel a mobile order?",
      answer:
        "You can cancel within 14 days of delivery if your order isn’t confirmed. Go to your account → Orders → Get Help → Cancel.",
    },
    {
      question: "How can I request a repair?",
      answer:
        "All ISmart mobiles come with a 1-year warranty. Log into your account and choose “Get Help” next to your order to request a repair.",
    },
    {
      question: "How do I request a refund?",
      answer:
        "Return your undamaged mobile within 14 days of delivery for a refund through your account’s order page.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      

      {/* Main */}
      <main className="container mx-auto px-4 py-16">
        {/* Hero */}
        <section className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How can we help you today?
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-8">
            Find answers, contact support, or browse our help topics.
          </p>

          {/* Search */}
          <div className="max-w-xl mx-auto relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Search e.g. "refund" or "warranty"'
              className="w-full p-4 pr-12 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-16 max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Frequently Asked Questions
          </h3>
          <div className="divide-y divide-gray-200">
            {faqs.map((faq, index) => (
              <div key={index}>
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center py-4 text-left text-gray-800 hover:text-black transition font-medium"
                >
                  <span>{faq.question}</span>
                  {expandedFaq === index ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
                {expandedFaq === index && (
                  <p className="pb-4 text-gray-600 leading-relaxed">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Topics */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Browse by Topic
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {topics.map((topic, index) => (
              <a
                key={index}
                href={topic.href}
                className="bg-white border border-gray-100 shadow-sm rounded-xl p-6 hover:shadow-md transition flex items-center gap-4"
              >
                <div className="text-2xl bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center">
                  {topic.icon}
                </div>
                <span className="font-medium text-gray-900">{topic.title}</span>
              </a>
            ))}
          </div>
        </section>

        {/* Support Info */}
        <section className="bg-gray-100 rounded-xl p-8 mb-12 text-gray-700 grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="flex items-start gap-3">
            <div className="bg-white p-3 rounded-full shadow-sm">
              <Clock className="w-5 h-5" />
            </div>
            <p>We usually reply within 24 hours (Mon–Sat).</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-white p-3 rounded-full shadow-sm">
              <Headphones className="w-5 h-5" />
            </div>
            <p>Our support team is 100% human and ready to help.</p>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Still need help?</h3>
          <p className="text-gray-600 mb-6">
            Go to “Orders” and select “Get help” next to the one in question.
            We’ll get back to you within 1 business day.
          </p>
          <div className="space-y-3">
            <a
              href="/orders"
              className="block bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition"
            >
              Get help with an order
            </a>
            <p className="text-gray-600">
              For other queries,{" "}
              <a href="/contact" className="text-black underline hover:no-underline">
                message us here
              </a>.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HelpContent;
