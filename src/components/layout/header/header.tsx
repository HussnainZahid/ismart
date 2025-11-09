"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import {
  Apple,
  Award,
  Camera,
  CheckCircle,
  ChevronDown,
  Clock,
  Grid,
  Headphones,
  HeartPulse,
  HelpCircle,
  Leaf,
  Menu,
  Monitor,
  Newspaper,
  Phone,
  Search,
  ShoppingBag,
  Smartphone,
  Star,
  Tv,
  TrendingUp,
  User,
  Wrench,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";

// ============================================
// TYPE DEFINITIONS & CONSTANTS
// ============================================

interface Country {
  code: string;
  name: string;
  language: string;
  flag: string;
  flagImage: string;
}

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  color?: string;
  hasMegaMenu?: boolean;
  megaMenuType?: MegaMenuType;
  badge?: string;
}

interface CategoryItem {
  label: string;
  icon: LucideIcon;
  badge?: string;
  hot?: boolean;
}

interface TopBarItem {
  label: string;
  icon: LucideIcon;
  href: string;
  color?: string;
}

type MegaMenuType = "smartphones" | "laptops" | "tablets" | "more";

const COUNTRIES: Readonly<Country[]> = [
  { code: "UK", name: "United Kingdom", language: "English (UK)", flag: "🇬🇧", flagImage: "/uk-flag.png" },
  { code: "US", name: "United States", language: "English (US)", flag: "🇺🇸", flagImage: "/usa.png" },
  { code: "IE", name: "Ireland", language: "English (IE)", flag: "🇮🇪", flagImage: "/ireland.png" },
  { code: "AU", name: "Australia", language: "English (AU)", flag: "🇦🇺", flagImage: "/australia.png" },
  { code: "ES", name: "Spain", language: "Español (ES)", flag: "🇪🇸", flagImage: "/spain.png" },
  { code: "FI", name: "Finland", language: "Suomi (FI)", flag: "🇫🇮", flagImage: "/finland.png" },
  { code: "FR", name: "France", language: "Français (FR)", flag: "🇫🇷", flagImage: "/france.png" },
  { code: "GR", name: "Greece", language: "Ελληνικά (GR)", flag: "🇬🇷", flagImage: "/greece.png" },
  { code: "IT", name: "Italy", language: "Italiano (IT)", flag: "🇮🇹", flagImage: "/italy.png" },
  { code: "JP", name: "Japan", language: "日本語 (JP)", flag: "🇯🇵", flagImage: "/japan.png" },
  { code: "NL", name: "Netherlands", language: "Nederlands (NL)", flag: "🇳🇱", flagImage: "/netherlands.png" },
  { code: "PT", name: "Portugal", language: "Português (PT)", flag: "🇵🇹", flagImage: "/portugal.png" },
  { code: "SE", name: "Sweden", language: "Svenska (SE)", flag: "🇸🇪", flagImage: "/sweden.png" },
  { code: "SK", name: "Slovakia", language: "Slovenčina (SK)", flag: "🇸🇰", flagImage: "/slovakia.png" },
  { code: "AT", name: "Austria", language: "Deutsch (AT)", flag: "🇦🇹", flagImage: "/austria.png" },
  { code: "BE", name: "Belgium", language: "Français (BE)", flag: "🇧🇪", flagImage: "/belgium.png" },
  { code: "DE", name: "Germany", language: "Deutsch (DE)", flag: "🇩🇪", flagImage: "/germany.png" },
] as const;

const NAV_ITEMS: Readonly<NavItem[]> = [
  { href: "#flash-deals", label: "Flash Deals", icon: Zap, color: "text-orange-600", badge: "Hot" },
  { href: "/page-smartphone", label: "Smartphones", icon: Phone, hasMegaMenu: true, megaMenuType: "smartphones" },
  { href: "/laptops", label: "Laptops", icon: Monitor, hasMegaMenu: true, megaMenuType: "laptops" },
  { href: "/tablets", label: "Tablets", icon: Tv, hasMegaMenu: true, megaMenuType: "tablets" },
  { href: "/more", label: "More", icon: Grid, hasMegaMenu: true, megaMenuType: "more" },
] as const;

const TOP_BAR_ITEMS: Readonly<TopBarItem[]> = [
  { label: "Verified Refurbished", icon: CheckCircle, color: "text-green-600", href: "/verified-refurbished" },
  { label: "Repair & Care", icon: Wrench, href: "/page-repair" },
  { label: "End Fast Tech", icon: Leaf, color: "text-emerald-600", href: "/page-tech" },
  { label: "Tech Journal", icon: Newspaper, href: "/tech-journal" },
] as const;

const SMARTPHONES_CATEGORIES: Readonly<CategoryItem[]> = [
  { label: "iPhone", icon: Apple, badge: "Popular", hot: true },
  { label: "Samsung Galaxy", icon: Smartphone, hot: true },
  { label: "Google Pixel", icon: Smartphone, badge: "AI Camera" },
  { label: "Android Smartphones", icon: Smartphone },
  { label: "Smartphone accessories", icon: Headphones },
] as const;

const LAPTOPS_CATEGORIES: Readonly<CategoryItem[]> = [
  { label: "MacBook", icon: Apple, badge: "Best Seller" },
  { label: "Windows Laptops", icon: Monitor },
  { label: "Gaming Laptops", icon: Award, hot: true },
  { label: "Laptop accessories", icon: Headphones },
] as const;

const TABLETS_CATEGORIES: Readonly<CategoryItem[]> = [
  { label: "iPad", icon: Apple, badge: "Popular" },
  { label: "Samsung Galaxy Tab", icon: Smartphone },
  { label: "Android Tablets", icon: Smartphone },
  { label: "Tablet accessories", icon: Headphones },
] as const;

const MORE_CATEGORIES: Readonly<CategoryItem[]> = [
  { label: "Desktop computers", icon: Monitor },
  { label: "Cameras", icon: Camera, badge: "New" },
  { label: "Retro tech", icon: Clock },
  { label: "Mobility", icon: HeartPulse },
  { label: "TVs and home cinema", icon: Tv },
] as const;

const TRADE_IN_TEXT = "Get up to £700 for your old device" as const;

const getCategorySlug = (label: string): string => {
  return label.toLowerCase().replace(/\s+/g, "-");
};

// ============================================
// FLAG & MODAL COMPONENTS (Simplified and encapsulated)
// ============================================

interface FlagImageProps {
  country: Country;
  size?: number;
}

const FlagImage = ({ country, size = 20 }: FlagImageProps) => (
  <div
    className="flex items-center justify-center rounded-md overflow-hidden border border-gray-200 bg-white shadow-sm flex-shrink-0"
    style={{ width: size, height: size }}
    role="img"
    aria-label={`${country.name} flag`}
  >
    <Image
      src={country.flagImage}
      alt=""
      width={size}
      height={size}
      className="object-cover"
    />
  </div>
);

interface LocationModalProps {
  isOpen: boolean;
  currentCountry: Country;
  onCountrySelect: (country: Country) => void;
}

const LocationModal = ({ isOpen, currentCountry, onCountrySelect }: LocationModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  if (!isOpen) return null;

  const filteredCountries = COUNTRIES.filter(
    (country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.language.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="absolute right-0 top-full mt-3 bg-white border-2 border-gray-200 shadow-2xl rounded-2xl w-96 max-h-[32rem] overflow-hidden z-50">
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Choose your location</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          Changing your location affects delivery options, pricing, and product availability.
        </p>
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search countries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl bg-gray-50 border-2 border-gray-200 px-4 py-3 pl-12 text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all"
          />
        </div>

        <div className="max-h-64 overflow-y-auto">
          <p className="text-xs font-bold text-gray-700 mb-3 uppercase tracking-wide">All Countries</p>
          <div className="space-y-2">
            {filteredCountries.map((country) => {
              const isSelected = currentCountry.code === country.code;
              return (
                <button
                  key={country.code}
                  onClick={() => onCountrySelect(country)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 ${isSelected ? "bg-purple-50 border-2 border-purple-200 shadow-sm" : "border-2 border-transparent"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <FlagImage country={country} size={24} />
                    <div className="text-left">
                      <p className="text-sm font-semibold text-gray-900">{country.name}</p>
                      <p className="text-xs text-gray-600">{country.language}</p>
                    </div>
                  </div>
                  {isSelected && <CheckCircle className="h-5 w-5 text-purple-600" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// MEGA MENU COMPONENT
// ============================================

interface MegaMenuProps {
  type: MegaMenuType;
  onClose: () => void;
}

const MegaMenu = ({ type, onClose }: MegaMenuProps) => {
  let categories: Readonly<CategoryItem[]>;
  let allLinkHref: string = `/${type}`;

  switch (type) {
    case "smartphones":
      categories = SMARTPHONES_CATEGORIES;
      break;
    case "laptops":
      categories = LAPTOPS_CATEGORIES;
      break;
    case "tablets":
      categories = TABLETS_CATEGORIES;
      break;
    case "more":
    default:
      categories = MORE_CATEGORIES;
      allLinkHref = "/more";
  }

  return (
    <div className="absolute left-0 top-full w-full bg-white border-t-2 border-gray-100 shadow-2xl z-50">
      <div className="mx-auto max-w-7xl px-8 py-10 grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10">
        {/* Left: Trade-in Promo */}
        <div className="border-b lg:border-b-0 lg:border-r border-gray-100 pb-8 lg:pb-0 lg:pr-10">
          <h3 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            Good to Know
          </h3>
          <Link
            href="/trade-in"
            onClick={onClose}
            className="block bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 rounded-2xl p-6 border-2 border-purple-200 shadow-md hover:shadow-xl transition-all duration-300 group"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-xl p-3 group-hover:scale-110 transition-transform shadow-lg">
                <CheckCircle className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                  Trade-in Program
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">{TRADE_IN_TEXT}</p>
                <span className="text-sm font-semibold text-purple-600 inline-flex items-center gap-1">
                  Learn more
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Right: Categories Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Grid className="w-5 h-5 text-purple-600" />
              Browse Categories
            </h3>
            <Link
              href={allLinkHref}
              className="text-sm font-bold text-purple-600 hover:text-purple-700 transition-colors inline-flex items-center gap-1 group"
              onClick={onClose}
            >
              See all
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {categories.map((category) => {
              const Icon = category.icon;
              const categorySlug = getCategorySlug(category.label);

              return (
                <Link
                  key={category.label}
                  href={`/${type}/${categorySlug}`}
                  className="group relative block bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden border-2 border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-purple-300 transition-all duration-300"
                  onClick={onClose}
                >
                  {/* Badge */}
                  {category.badge && (
                    <div className="absolute top-2 right-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg z-10">
                      {category.badge}
                    </div>
                  )}

                  {/* Hot Indicator */}
                  {category.hot && (
                    <div className="absolute top-2 left-2 z-10">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 animate-pulse" />
                    </div>
                  )}

                  {/* Icon Container */}
                  <div className="aspect-square flex items-center justify-center p-6">
                    <Icon className="h-20 w-20 text-gray-400 group-hover:text-purple-600 group-hover:scale-110 transition-all duration-300" />
                  </div>

                  {/* Label */}
                  <div className="p-4 bg-white border-t border-gray-200">
                    <h4 className="text-sm font-bold text-gray-900 text-center group-hover:text-purple-600 transition-colors">
                      {category.label}
                    </h4>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// MAIN HEADER COMPONENT (The Orchestrator)
// ============================================

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<MegaMenuType | null>(null);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [currentCountry, setCurrentCountry] = useState<Country>(COUNTRIES[0]);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const megaMenuRef = useRef<HTMLDivElement>(null);
  const locationModalRef = useRef<HTMLDivElement>(null);

  const handleCountrySelect = useCallback((country: Country) => {
    setCurrentCountry(country);
    setLocationModalOpen(false);
  }, []);

  const isActive = useCallback(
    (href: string) => {
      if (href.startsWith("#")) return false;
      return pathname === href || pathname.startsWith(`${href}/`);
    },
    [pathname]
  );

  // Effect for Hide-on-Scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setActiveMegaMenu(null); // Close mega menu on scroll down
        setLocationModalOpen(false); // Close modal on scroll down
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Effect for Closing Menus on Outside Click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (megaMenuRef.current && !megaMenuRef.current.contains(target)) {
        setActiveMegaMenu(null);
      }
      const locationButton = locationModalRef.current?.querySelector('button');
      if (locationModalRef.current && !locationModalRef.current.contains(target) && target !== locationButton) {
        setLocationModalOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Effect for closing mobile menu/setting overflow
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Sub-component for Top Bar
  const TopBar = () => (
    <div className="border-b border-gray-100 bg-gradient-to-r from-purple-50 via-pink-50 to-purple-50">
      <div className="mx-auto max-w-7xl px-4 py-2.5">
        <div className="flex items-center justify-between text-xs">
          <nav className="flex items-center gap-4 md:gap-6 overflow-x-auto scrollbar-hide">
            {TOP_BAR_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-2 font-semibold text-gray-700 whitespace-nowrap transition-colors hover:text-purple-600 group"
                >
                  <Icon className={`h-4 w-4 ${item.color || "text-gray-600"} group-hover:scale-110 transition-transform`} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 relative" ref={locationModalRef}>
            <span className="hidden sm:inline text-gray-600 font-medium">Ship to:</span>
            <button
              onClick={() => setLocationModalOpen(!locationModalOpen)}
              className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border-2 border-gray-200 hover:border-purple-400 hover:shadow-md transition-all"
            >
              <FlagImage country={currentCountry} size={18} />
              <span className="text-xs font-bold text-gray-900">{currentCountry.code}</span>
              <ChevronDown className={`h-3.5 w-3.5 text-gray-500 transition-transform ${locationModalOpen ? "rotate-180" : ""}`} />
            </button>

            <LocationModal
              isOpen={locationModalOpen}
              currentCountry={currentCountry}
              onCountrySelect={handleCountrySelect}
            />
          </div>
        </div>
      </div>
    </div>
  );

  // Sub-component for Main Bar (Logo, Search, Icons)
  const MainBar = () => (
    <div className="mx-auto max-w-7xl px-4 py-4">
      <div className="flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center transition-opacity hover:opacity-80">
          <div className="relative h-12 w-40">
            <Image src="/logo.png" alt="Back Market Logo" width={160} height={48} className="object-contain" priority />
          </div>
        </Link>

        {/* Desktop Search Bar */}
        <div className="hidden flex-1 md:flex md:max-w-2xl mx-8">
          <div className="relative w-full group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-purple-600 transition-colors pointer-events-none z-10" />
            <input
              type="search"
              placeholder="Search for refurbished phones..."
              className="w-full rounded-full bg-gray-50 border-2 border-gray-200 px-5 py-4 pl-12 text-sm placeholder-gray-500 focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-500/20 transition-all duration-200 group-hover:bg-white group-hover:border-gray-300"
            />
          </div>
        </div>

        {/* Desktop Utility Icons */}
        <nav className="hidden items-center gap-2 text-sm lg:flex">
          <Link href="page-help-center" className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-all group">
            <HelpCircle className="h-6 w-6 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold">Help</span>
          </Link>

          <Link href="page-login" className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-all group">
            <User className="h-6 w-6 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold">Account</span>
          </Link>

          <Link href="/page-cart" className="relative flex flex-col items-center gap-1 px-3 py-2 rounded-xl font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-all group">
            <ShoppingBag className="h-6 w-6 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold">Cart</span>
            <span className="absolute top-1 right-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
              0
            </span>
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden rounded-xl p-2.5 transition-colors hover:bg-gray-100 border-2 border-gray-200"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden mt-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
          <input
            type="search"
            placeholder="Search phones..."
            className="w-full rounded-full bg-gray-50 border-2 border-gray-200 px-4 py-3 pl-12 text-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
          />
        </div>
      </div>
    </div>
  );

  // Sub-component for Bottom Nav (Categories)
  const BottomNav = () => (
    <nav className="border-t border-gray-100 bg-white relative" ref={megaMenuRef}>
      <div className="mx-auto max-w-7xl px-4 py-3">
        {/* Desktop Navigation */}
        <ul className="hidden gap-8 text-sm font-bold text-gray-800 lg:flex overflow-x-auto scrollbar-hide">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isItemActive = isActive(item.href);
            const isMegaMenuActive = activeMegaMenu === item.megaMenuType;

            return (
              <li
                key={item.href}
                className="relative shrink-0"
                onMouseEnter={() => item.megaMenuType && setActiveMegaMenu(item.megaMenuType)}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <Link
                  href={item.href}
                  onClick={(e) => {
                    if (item.href.startsWith("#")) {
                      e.preventDefault();
                      // Simple section scroll logic (assumes targets exist)
                      document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                    setActiveMegaMenu(null);
                  }}
                  className={`relative flex items-center gap-2 transition-all duration-200 hover:text-purple-600 py-2 px-1 whitespace-nowrap ${isItemActive ? "text-purple-600" : ""
                    } ${isMegaMenuActive ? "text-purple-600" : ""}`}
                >
                  <Icon className={`w-5 h-5 ${item.color || ""}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full animate-pulse">
                      {item.badge}
                    </span>
                  )}
                  {item.hasMegaMenu && (
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMegaMenuActive ? "rotate-180" : ""}`} />
                  )}
                  {(isItemActive || isMegaMenuActive) && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600"></div>
                  )}
                </Link>

                {item.hasMegaMenu && isMegaMenuActive && (
                  <div className="absolute top-0 left-0 right-0" onMouseEnter={() => setActiveMegaMenu(item.megaMenuType!)} onMouseLeave={() => setActiveMegaMenu(null)}>
                    <MegaMenu type={item.megaMenuType!} onClose={() => setActiveMegaMenu(null)} />
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="border-t border-gray-100 py-4 lg:hidden">
            <ul className="space-y-2 text-sm font-medium">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 rounded-xl py-3 px-4 text-gray-800 hover:bg-purple-50 hover:text-purple-600 transition-all"
                    >
                      <Icon className={`w-5 h-5 ${item.color || ""}`} />
                      <span className="font-bold">{item.label}</span>
                      {item.badge && (
                        <span className="ml-auto bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 bg-white transition-transform duration-300 shadow-xl ${isVisible ? 'translate-y-0' : '-translate-y-full'
          }`}
      >
        <TopBar />
        <MainBar />
        <BottomNav />
      </header>

      {/* Spacer component is now adjusted for fixed positioning */}
      <div className="h-36" aria-hidden="true" />
    </>
  );
}