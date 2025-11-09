'use client';

import React, { useState, useCallback } from 'react';
import {
  Search,
  ChevronRight,
  ArrowLeft,
  ThumbsUp,
  ThumbsDown,
  Globe,
  ChevronDown,
  Clock,
  ArrowUpRight,
  Shield,
} from 'lucide-react';

// --- Language Options (Sorted & Typed) ---
const languages = [
  'English (GB)',
  'English (US)',
  'English (AU)',
  'English (IE)',
  'Deutsch',
  'Deutsch (Österreich)',
  'Español',
  'Français (France)',
  'Français (Belgique)',
  'Italiano',
  'Nederlands',
  'Nederlands (België)',
  'Português',
  'Suomi',
  'Svenska',
  'Ελληνικά',
  '日本語',
  'Slovenčina',
] as const;

type Language = typeof languages[number];

// --- Related Articles ---
const relatedArticles = [
  {
    title: 'How do I contact ISMart about selling or partnership opportunities?',
    href: '/help/selling-partnership',
  },
  {
    title: 'How do I return an item I bought on ISMart?',
    href: '/help/return-item',
  },
  {
    title: 'How does the ISMart guarantee work?',
    href: '/help/guarantee',
  },
  {
    title: 'How do I ask for help on my ISMart order?',
    href: '/help/ask-help-order',
  },
  {
    title: 'Can I change my delivery address after placing an order?',
    href: '/help/change-delivery-address',
  },
] as const;

// --- Main Component ---
export default function ContactContent() {
  const [headerSearchQuery, setHeaderSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('English (GB)');
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [feedback, setFeedback] = useState<'helpful' | 'not-helpful' | null>(null);

  const handleFeedback = useCallback((type: 'helpful' | 'not-helpful') => {
    setFeedback(type);
  }, []);

  const toggleLanguage = useCallback(() => {
    setIsLanguageOpen((prev) => !prev);
  }, []);

  const selectLanguage = useCallback((lang: Language) => {
    setSelectedLanguage(lang);
    setIsLanguageOpen(false);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white font-sans antialiased">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="py-4 border-b border-gray-100" aria-label="Breadcrumb">
            <ol className="flex items-center text-sm text-gray-600 space-x-2">
              <li>
                <a href="/help" className="hover:text-gray-900 transition-colors">
                  Help Center
                </a>
              </li>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <li>
                <a href="/help/contact-support" className="hover:text-gray-900 transition-colors">
                  Contact & support
                </a>
              </li>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <li className="text-gray-900 font-medium">Get help from humans</li>
            </ol>
          </nav>

          {/* Main Header */}
          <div className="py-4">
            <div className="flex items-center justify-between">
              {/* Logo & Title */}
              <div className="flex items-center gap-6">
                <a href="/" className="flex items-center gap-3 group">
                  <div className="w-9 h-9 bg-black rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                    <span className="text-white font-black text-lg tracking-tighter">IS</span>
                  </div>
                  <span className="text-2xl font-black text-gray-900">ISmart</span>
                </a>
                <div className="hidden lg:block h-6 w-px bg-gray-300"></div>
                <h2 className="hidden lg:block text-xl font-bold text-gray-900">Help Center</h2>
              </div>

              {/* Back to Shop */}
              <a
                href="/"
                className="hidden sm:flex items-center gap-2 text-sm font-semibold text-gray-900 hover:text-teal-600 transition-colors group"
              >
                <span>Back to Shop</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Search Bar */}
          <div className="pb-6">
            <div className="max-w-2xl mx-auto">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-gray-600 transition-colors" />
                <input
                  type="text"
                  placeholder="Search help articles..."
                  value={headerSearchQuery}
                  onChange={(e) => setHeaderSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 text-base placeholder:text-gray-400"
                  aria-label="Search help center"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
        {/* Article Card */}
        <article className="bg-white rounded-2xl shadow-xl p-8 sm:p-10 mb-10 border border-gray-100">
          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3 leading-tight">
              How do I contact ISMart Customer Care?
            </h1>
            <p className="text-sm text-gray-500 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              3 months ago · Updated
            </p>
          </header>

          {/* Article Body */}
          <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
            <p className="leading-relaxed">
              Need help? We've got you covered. The best way to contact ISmart depends on whether you need help with an order or with something else.
            </p>

            {/* Jump Links */}
            <nav className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Jump to</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#order-help" className="text-teal-600 hover:text-teal-700 font-semibold underline-offset-4 hover:underline transition">
                    I need help with an order
                  </a>
                </li>
                <li>
                  <a href="#something-else" className="text-teal-600 hover:text-teal-700 font-semibold underline-offset-4 hover:underline transition">
                    I need help with something else
                  </a>
                </li>
              </ul>
            </nav>

            {/* Section: Order Help */}
            <section id="order-help" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">I need help with an order</h2>
              <p className="mb-4 leading-relaxed">
                To contact us about an order or start a return/repair request, go to your <strong>"Orders"</strong> page and select <strong>"Get help"</strong>. We'll reply within <strong>1 business day</strong>.
              </p>
              <a
                href="/orders"
                className="inline-flex items-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-500/30 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Get help with an order
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </section>

            {/* Section: Other Help */}
            <section id="something-else" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">I need help with something else</h2>
              <p className="mb-4 leading-relaxed">
                For help with anything else (like a Trade-in or general question), reach out using our contact form. We'll reply within <strong>1 business day</strong>.
              </p>
              <a
                href="/contact-form"
                className="inline-flex items-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-500/30 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Contact us with this form
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </section>
          </div>

          {/* Feedback */}
          <footer className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <span className="text-gray-700 font-semibold">Was this article helpful?</span>
              <div className="flex gap-3">
                <button
                  onClick={() => handleFeedback('helpful')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-medium transition-all ${
                    feedback === 'helpful'
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-sm'
                      : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                  }`}
                  aria-label="This article was helpful"
                >
                  <ThumbsUp className="w-5 h-5" />
                  Yes
                </button>
                <button
                  onClick={() => handleFeedback('not-helpful')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-medium transition-all ${
                    feedback === 'not-helpful'
                      ? 'bg-red-50 border-red-500 text-red-700 shadow-sm'
                      : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                  }`}
                  aria-label="This article was not helpful"
                >
                  <ThumbsDown className="w-5 h-5" />
                  No
                </button>
              </div>
            </div>
          </footer>
        </article>

        {/* Related Articles */}
        <section className="bg-white rounded-2xl shadow-xl p-8 mb-10 border border-gray-100">
          <h3 className="text-xl font-black text-gray-900 mb-6">Related articles</h3>
          <ul className="space-y-4">
            {relatedArticles.map((article, i) => (
              <li key={i}>
                <a
                  href={article.href}
                  className="group flex items-center justify-between text-gray-900 hover:text-teal-600 transition-colors font-medium"
                >
                  <span className="underline-offset-4 group-hover:underline">{article.title}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all" />
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* Still Need Help */}
        <section className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl p-8 shadow-inner border border-teal-100">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
            <div className="flex-1">
              <h3 className="text-2xl font-black text-gray-900 mb-4">Still need help?</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                To get in touch about an order, go to <strong>"Orders"</strong> and select <strong>"Get help"</strong> next to the one in question. We'll get back to you within <strong>1 business day</strong>.
              </p>
              <a
                href="/orders"
                className="inline-flex items-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-500/30 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg mb-4"
              >
                Get help with an order
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <p className="text-gray-700 text-sm">
                For anything else,{' '}
                <a href="/contact-form" className="font-semibold text-teal-600 hover:underline">
                  contact us with this form
                </a>
                .
              </p>
            </div>

            {/* Language Selector */}
            <div className="w-full lg:w-64">
              <div className="relative">
                <button
                  onClick={toggleLanguage}
                  className="w-full px-4 py-3.5 bg-white border border-gray-300 rounded-xl flex items-center justify-between hover:bg-gray-50 transition-all shadow-sm"
                  aria-label="Select language"
                  aria-expanded={isLanguageOpen}
                >
                  <div className="flex items-center gap-2.5">
                    <Globe className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-900 font-semibold">{selectedLanguage}</span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${
                      isLanguageOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isLanguageOpen && (
                  <div className="absolute bottom-full mb-2 w-full bg-white border border-gray-300 rounded-xl shadow-2xl max-h-80 overflow-y-auto z-50">
                    {languages.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => selectLanguage(lang)}
                        className={`w-full text-left px-4 py-3 hover:bg-teal-50 transition-colors border-b border-gray-100 last:border-b-0 font-medium ${
                          selectedLanguage === lang ? 'bg-teal-50 text-teal-700' : 'text-gray-700'
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Trust Footer */}
      <footer className="mt-20 py-8 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
          <p className="flex items-center justify-center gap-2">
            <Shield className="w-4 h-4 text-emerald-600" />
            Your privacy is protected · Responses within 24 hours
          </p>
        </div>
      </footer>
    </div>
  );
}