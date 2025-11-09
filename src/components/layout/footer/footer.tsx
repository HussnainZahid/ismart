"use client";

import { useState } from "react";
import {
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// --- Type Definitions ---
interface FooterLink {
  name: string;
  href: string;
}

interface FooterGroup {
  title: string;
  links: FooterLink[];
}

interface PaymentMethod {
  name: string;
  url: string;
  alt: string;
}

interface AppBadge {
  appStore: string;
  googlePlay: string;
}

interface FooterProps {
  appName?: string;
  footerGroups?: FooterGroup[];
  paymentMethods?: PaymentMethod[];
  appBadges?: AppBadge;
  socialLinks?: {
    linkedin?: string;
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
}

// --- Default Data ---
const defaultFooterGroups: FooterGroup[] = [
  {
    title: 'About',
    links: [
      { name: 'About us', href: '/about' },
      { name: 'Press', href: '/press' },
      { name: 'Our impact', href: '/impact' },
      { name: "We're hiring!", href: '/careers' },
      { name: 'Trustpilot', href: '/trustpilot' },
    ],
  },
  {
    title: 'Help',
    links: [
      { name: 'Contact us', href: '/page-contact' },
      { name: 'Help Center', href: '/help' },
      { name: 'Delivery', href: '/delivery' },
      { name: 'Returns and refunds', href: '/returns' },
    ],
  },
  {
    title: 'Services',
    links: [
      { name: 'Commercial warranty', href: '/warranty' },
      { name: 'Insurances', href: '/insurance' },
      { name: 'Sell old tech', href: '/sell' },
      { name: 'Student and educator programme', href: '/student-program' },
      { name: 'Sellers: Register to sell', href: '/register-seller' },
      { name: 'Seller portal', href: '/seller-portal' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { name: 'Tech Journal', href: '/journal' },
      { name: 'Compare devices', href: '/compare' },
      { name: 'Gift ideas', href: '/gift-ideas' },
      { name: 'Black Friday', href: '/black-friday' },
    ],
  },
  {
    title: 'Law and order',
    links: [
      { name: 'Terms of Use', href: '/terms' },
      { name: 'Terms of Sale', href: '/sale-terms' },
      { name: 'Trade-in Terms and Conditions', href: '/tradein-terms' },
      { name: 'Cookies and privacy settings', href: '/cookies' },
      { name: 'Data protection', href: '/data-protection' },
      { name: 'Other legal information', href: '/legal-info' },
      { name: 'Legal notices', href: '/notices' },
      { name: 'Report illicit content', href: '/page-submit' },
    ],
  },
];

const defaultPaymentMethods: PaymentMethod[] = [
  { name: 'Visa', url: 'visa.png', alt: 'Visa' },
  { name: 'Mastercard', url: '/mastercard.png', alt: 'Mastercard' },

  { name: 'PayPal', url: '/paypal.png', alt: 'PayPal' },

  { name: 'Apple Pay', url: '/apple_pay.png', alt: 'Apple Pay' },
  { name: 'Google Pay', url: '/google_pay.png', alt: 'Google Pay' },
  { name: 'Klarna', url: '/klarna.svg', alt: 'Klarna' },
];

const defaultAppBadges: AppBadge = {
  appStore: '/apple-store.png',
  googlePlay: '/google-play.png'
};

// --- Helper Components ---
const SocialIcon = ({
  Icon,
  label,
  href
}: {
  Icon: React.ElementType;
  label: string;
  href: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-300 text-gray-700 hover:bg-gray-400 transition-colors duration-200"
    aria-label={label}
  >
    <Icon className="w-5 h-5" />
  </a>
);

export default function Footer({
  appName = "ISmart",
  footerGroups = defaultFooterGroups,
  paymentMethods = defaultPaymentMethods,
  appBadges = defaultAppBadges,
  socialLinks = {
    linkedin: '#',
    instagram: '#',
    facebook: '#',
    twitter: '#'
  }
}: FooterProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      // Replace with your actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSubmitted(true);
      setEmail("");

      setTimeout(() => setSubmitted(false), 4000);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-gray-900 border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* TOP SECTION: Newsletter */}
        <div className="py-12 border-b border-gray-200">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">

            {/* Left: Headline and Description */}
            <div className="lg:max-w-md">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Stay in the loop with hot drops
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                Be the first to know about new arrivals, exclusive deals, and tech news that matters.
              </p>
            </div>

            {/* Right: Form */}
            <div className="lg:flex-1 lg:max-w-xl">
              {submitted ? (
                <div className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 px-4 py-3 rounded-lg">
                  <span className="text-sm font-medium">Successfully subscribed!</span>
                </div>
              ) : (
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                      className={`w-full px-4 py-3 pr-12 border ${error ? 'border-red-400' : 'border-gray-300'
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm`}
                    />
                    <Mail className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                  </div>
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="px-6 py-3 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors duration-200 disabled:opacity-50 whitespace-nowrap"
                  >
                    {loading ? "Signing up..." : "Sign up"}
                  </button>
                </div>
              )}

              {error && <p className="text-red-600 text-xs mt-2">{error}</p>}

              {/* Learn More Collapsible */}
              <div className="mt-4">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex items-center gap-1 text-xs text-gray-700 hover:text-gray-900 font-medium"
                >
                  {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  Learn more
                </button>

                {isExpanded && (
                  <div className="mt-3 text-xs text-gray-600 space-y-2 leading-relaxed">
                    <p>
                      By subscribing, you agree to receive our promotional communications via email. You can unsubscribe at any time using the link in any of our marketing emails, or request to access, rectify, or delete your data.
                    </p>
                    <p>
                      For more details, please refer to our{' '}
                      <a href="/privacy" className="underline hover:text-gray-900">privacy policy</a>.
                    </p>
                    <p>
                      A non-cumulative promotional code will be sent by email following newsletter registration. It is valid for a minimum order of £250 and is usable for 1 month from the date of receipt.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* MIDDLE SECTION: Navigation Columns */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">

          {/* Footer Link Groups */}
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-base font-bold text-gray-900 mb-4">
                {group.title}
              </h3>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-700 hover:text-gray-900 transition-colors duration-150"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Payment Methods in Services Column */}
              {group.title === 'Services' && (
                <div className="mt-6">
                  <a href="/payments" className="text-sm font-semibold text-gray-900 mb-3 underline hover:text-gray-700 transition-colors">
                    Payments 100% secured
                  </a>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.name}
                        className="w-12 h-8 bg-white border border-gray-200 rounded flex items-center justify-center hover:border-gray-300 transition-colors"
                        title={method.name}
                      >
                        <img
                          src={method.url}
                          alt={method.alt}
                          className="max-w-full max-h-full object-contain p-1"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* B Corp Badge Column */}
          <div className="flex flex-col items-center lg:items-start">
            <a
              href="/b-corp-certification"
              className="w-20 h-20 border-2 border-gray-900 rounded-full flex items-center justify-center mb-2 hover:border-gray-700 transition-colors"
              title="Certified B Corporation"
            >
              <div className="text-center">
                <div className="text-3xl font-bold">B</div>
                <div className="text-[8px] font-semibold">Certified</div>
                <div className="text-[8px] font-semibold">Corporation</div>
              </div>
            </a>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="py-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">

            {/* Left: Copyright and Social Icons */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <p className="text-sm text-gray-700">
                © {currentYear} {appName}
              </p>
              <div className="flex gap-2">
                {socialLinks.linkedin && <SocialIcon Icon={Linkedin} label="LinkedIn" href={socialLinks.linkedin} />}
                {socialLinks.facebook && <SocialIcon Icon={Facebook} label="Facebook" href={socialLinks.facebook} />}
                {socialLinks.instagram && <SocialIcon Icon={Instagram} label="Instagram" href={socialLinks.instagram} />}
              </div>
            </div>

            {/* Right: App Store Badges */}
            <div className="flex gap-3">
              <a
                href="https://play.google.com/store"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:opacity-80 transition-opacity"
              >
                <img
                  src={appBadges.googlePlay}
                  alt="Get it on Google Play"
                  className="h-10 w-auto"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.outerHTML = '<div class="bg-black text-white px-4 py-2 rounded text-xs h-10 flex items-center">Google Play</div>';
                  }}
                />
              </a>
              <a
                href="https://apps.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:opacity-80 transition-opacity"
              >
                <img
                  src={appBadges.appStore}
                  alt="Download on the App Store"
                  className="h-10 w-auto"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.outerHTML = '<div class="bg-black text-white px-4 py-2 rounded text-xs h-10 flex items-center">App Store</div>';
                  }}
                />
              </a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}