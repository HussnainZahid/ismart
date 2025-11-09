'use client';
import Footer from '@/components/layout/footer/footer';
import React, { useState } from 'react';
import {
  Search, ChevronUp, ChevronDown, RotateCcw, MessageSquare, Repeat2,
  ShieldCheck, Wrench, CreditCard, Truck, AlertCircle, ShoppingBag,
  User, Clock, Headphones, ChevronRight, ArrowLeft
} from 'lucide-react';

export default function HelpContent() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [headerSearchQuery, setHeaderSearchQuery] = useState('');

  const faqs = [
    {
      question: "How do I contact ISmart?",
      answer: `ISmart is a marketplace where expert refurbishers sell their inventory. That means items you buy on ISmart come to you straight from them, not from us. Still, ISmart should be your main point of contact if any issues come up. To start a conversation with us, go to your ISmart account and select "Get help" next to the relevant order. This takes you to our online messaging platform where we're happy to chat with you!`
    },
    {
      question: "How do I cancel an order?",
      answer: `You have 30 days to change your mind about an item from the time you receive it. If your order hasn't been confirmed yet — indicated by the "Ordered" status — go to your ISmart account > "Get help" > "Cancel my order". If your order is confirmed and has a "Preparing your order" or "Shipped" status, you'll need to wait until you receive the parcel. Then, log in to your account > "Orders" > "Get help" > select the reason for your return. Learn more about returns`
    },
    {
      question: "How can I ask for a repair?",
      answer: `Most repairs are covered by the warranty you automatically receive with each item purchased. Note the length of the warranty depends on your country, but they start at a minimum of 1 year. Also, there are a few rare exceptions that render the warranty invalid. To ask for a repair, go to your ISmart account and select "Get help" next to the relevant order and follow the steps. Learn more about returns`
    },
    {
      question: "How can I get a refund?",
      answer: `You can get a refund by returning your undamaged item within 30 days of delivery. To start a return, go to your ISmart account, select "Get help", and follow the steps. You'll be able to choose a repair, replacement, or refund. Learn more about requesting a refund`
    }
  ];

  const topics = [
    { title: 'Returns & refunds', icon: RotateCcw, link: '/help/returns' },
    { title: 'Contact & support', icon: MessageSquare, link: '/help/contact' },
    { title: 'Trade-in', icon: Repeat2, link: '/help/trade-in' },
    { title: 'Warranty & insurance', icon: ShieldCheck, link: '/help/warranty' },
    { title: 'Troubleshooting & setup', icon: Wrench, link: '/help/troubleshooting' },
    { title: 'Payments', icon: CreditCard, link: '/help/payments' },
    { title: 'Shipping', icon: Truck, link: '/help/shipping' },
    { title: 'Problem with my order', icon: AlertCircle, link: '/help/order-issues' },
    { title: 'About buying refurbished', icon: ShoppingBag, link: '/help/refurbished' },
    { title: 'About my account', icon: User, link: '/help/account' },
  ];

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modern Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Bar - Breadcrumbs */}
          <div className="py-3 border-b border-gray-100">
            <nav className="flex items-center text-sm text-gray-600">
              <a href="/" className="hover:text-gray-900 transition-colors">
                Home
              </a>
              <ChevronRight className="w-4 h-4 mx-2" />
              <span className="text-gray-900 font-medium">Help Centre</span>
            </nav>
          </div>

          {/* Main Header Content */}
          <div className="py-4">
            <div className="flex items-center justify-between">
              {/* Left: Logo and Title */}
              <div className="flex items-center gap-6">
                <a href="/" className="flex items-center gap-3 group">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
                      <span className="text-white font-bold text-lg">◄◄</span>
                    </div>
                    <span className="text-2xl font-bold text-gray-900 ml-2">ISmart</span>
                  </div>
                </a>
                <div className="hidden lg:block h-6 w-px bg-gray-300"></div>
                <h2 className="hidden lg:block text-xl font-semibold text-gray-900">
                  Help Centre
                </h2>
              </div>

              {/* Center: Search Bar (Desktop) */}
              <div className="hidden md:block flex-1 max-w-2xl mx-8">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search for an article..."
                    value={headerSearchQuery}
                    onChange={(e) => setHeaderSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Right: Back to Shop Link */}
              <a
                href="/"
                className="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors group"
              >
                <span>Go back to the shop</span>
                <ArrowLeft className="w-4 h-4 transform rotate-180 group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Mobile Menu Button */}
              <button className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Search className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden pb-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for an article..."
                value={headerSearchQuery}
                onChange={(e) => setHeaderSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent focus:bg-white transition-all"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
            Need help? <span className="font-normal">We've got you covered.</span>
          </h1>

          {/* FAQ Section */}
          <div className="text-left mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Most frequently asked questions
            </h2>
            <div className="space-y-0 border border-gray-200 rounded-lg bg-white overflow-hidden">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`border-b border-gray-200 last:border-b-0 transition-colors ${expandedFaq === index ? 'bg-gray-50' : 'bg-white'
                    }`}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors group"
                  >
                    <span className="font-medium text-gray-900 pr-8 group-hover:text-black">
                      {faq.question}
                    </span>
                    {expandedFaq === index ? (
                      <ChevronUp className="w-5 h-5 flex-shrink-0 text-gray-600 transition-transform" />
                    ) : (
                      <ChevronDown className="w-5 h-5 flex-shrink-0 text-gray-600 transition-transform" />
                    )}
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                  >
                    <div className="px-6 pb-6">
                      <p className="text-gray-700 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Search our FAQ articles
            </h2>
            <div className="relative">
              <input
                type="text"
                placeholder='Try something like "get a refund"'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 hover:opacity-70 transition-opacity">
                <Search className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Browse Topics Section */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">
          Browse articles by topic
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topics.map((topic, index) => {
            const Icon = topic.icon;
            return (
              <a
                key={index}
                href={topic.link}
                className="flex items-center gap-4 p-6 bg-white rounded-lg border border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all duration-200 group"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 group-hover:bg-gray-200 transition-colors">
                  <Icon className="w-6 h-6 text-gray-700" />
                </div>
                <span className="font-medium text-gray-900 group-hover:text-black">
                  {topic.title}
                </span>
              </a>
            );
          })}
        </div>
      </section>

      {/* Support Info Section */}
      <section className="max-w-6xl mx-auto px-4 py-8 mb-12">
        <div className="bg-gray-100 rounded-2xl p-8">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-sm">
                <Clock className="w-6 h-6 text-gray-700" />
              </div>
              <p className="text-gray-700 font-medium">
                Get a reply within 24 hours from Monday to Saturday
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-sm">
                <Headphones className="w-6 h-6 text-gray-700" />
              </div>
              <p className="text-gray-700 font-medium">
                Enjoy friendly help from actual humans
              </p>
            </div>
          </div>

          {/* Still Need Help */}
          <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Still need help?
            </h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              To get in touch about an order go to "Orders" and select "Get help" next to the one in question. We'll get back to you within 1 business day.
            </p>
            <a
              href="/orders"
              className="inline-block bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors mb-4"
            >
              Get help with an order
            </a>
            <p className="text-gray-700 text-sm">
              For anything else,{' '}
              <a href="/contact" className="underline hover:no-underline font-medium">
                message us here
              </a>
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}