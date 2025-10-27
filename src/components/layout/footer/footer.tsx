"use client";

import { useState } from "react";
import {
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  CheckCircle,
  Info,
  HelpCircle,
  Package,
  Shield,
  FileText,
  Smartphone,
  MapPin,
  Phone,
  Clock,
  Award,
  Users,
  Leaf,
  Heart,
  ArrowUp,
} from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email) return setError("Email is required");
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!valid.test(email)) return setError("Enter a valid email");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
    setEmail("");
    setLoading(false);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const sections = [
    {
      title: "Company",
      icon: Info,
      links: [
        { label: "About us", href: "/about" },
        { label: "Press & Media", href: "/press" },
        { label: "Sustainability", href: "/impact" },
        { label: "Careers", href: "/careers" },
      ],
    },
    {
      title: "Support",
      icon: HelpCircle,
      links: [
        { label: "Contact Support", href: "/contact" },
        { label: "Help Center", href: "/help" },
        { label: "Shipping Info", href: "/delivery" },
        { label: "Returns & Refunds", href: "/returns" },
      ],
    },
    {
      title: "Services",
      icon: Package,
      links: [
        { label: "Extended Warranty", href: "/warranty" },
        { label: "Trade-In Program", href: "/sell" },
        { label: "Student Discount", href: "/students" },
      ],
    },
    {
      title: "Legal",
      icon: Shield,
      links: [
        { label: "Terms of Service", href: "/terms" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Cookies", href: "/cookies" },
      ],
    },
  ];

  const stats = [
    { icon: Users, value: "2M+", label: "Happy Customers" },
    { icon: Smartphone, value: "500K+", label: "Devices Sold" },
    { icon: Leaf, value: "15K+", label: "Tons CO₂ Saved" },
    { icon: Award, value: "4.8/5", label: "Customer Rating" },
  ];

  return (
    <footer className="bg-gray-950 text-gray-300">
      {/* Back to top */}
      <button
        onClick={scrollToTop}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white py-4 flex items-center justify-center gap-2 text-sm font-semibold transition"
      >
        <ArrowUp className="w-4 h-4" />
        Back to top
      </button>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="text-center bg-gray-900/50 rounded-2xl p-6 border border-gray-800 hover:border-purple-500/40 transition"
            >
              <Icon className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{value}</p>
              <p className="text-sm text-gray-400">{label}</p>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold text-white mb-3">
            Get Exclusive Tech Deals
          </h3>
          <p className="text-gray-400 mb-6">
            Join 100,000+ subscribers and get access to early offers.
          </p>

          {submitted ? (
            <div className="flex items-center justify-center gap-2 text-green-400 bg-green-500/10 border border-green-500/30 px-4 py-3 rounded-lg">
              <CheckCircle className="w-5 h-5" />
              Successfully subscribed!
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto"
            >
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  disabled={loading}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg bg-gray-900 border ${
                    error ? "border-red-500" : "border-gray-700"
                  } text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-500`}
                />
                {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
              >
                {loading ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
          )}
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-purple-500" /> ISmart
            </h4>
            <p className="text-gray-400 mb-4 text-sm leading-relaxed">
              Your trusted source for premium refurbished tech. Save money and
              reduce e-waste without compromise.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-purple-500" /> London, UK
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-purple-500" />
                <a href="tel:+442012345678" className="hover:text-white">
                  +44 20 1234 5678
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-purple-500" />
                <a href="mailto:hello@ismart.com" className="hover:text-white">
                  hello@ismart.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-500" /> Mon–Fri: 9AM–6PM
              </li>
            </ul>
          </div>

          {sections.map(({ title, icon: Icon, links }) => (
            <div key={title}>
              <h5 className="text-white font-semibold mb-3 flex items-center gap-2">
                <Icon className="w-4 h-4 text-purple-400" /> {title}
              </h5>
              <ul className="space-y-2 text-sm">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social & Footer Bottom */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
          <p className="text-gray-400 text-center md:text-left">
            © 2025 <span className="font-semibold text-white">ISmart</span>. All
            rights reserved.
          </p>

          <div className="flex gap-3">
            {[Twitter, Facebook, Instagram, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 flex items-center justify-center bg-gray-900 border border-gray-800 rounded-full hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 transition"
              >
                <Icon className="w-5 h-5 text-gray-400 hover:text-white" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
