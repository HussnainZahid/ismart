"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import {
  Search,
  HelpCircle,
  User,
  ShoppingBag,
  Menu,
  X,
  CheckCircle,
  Leaf,
  Newspaper,
  Wrench,
  ChevronDown,
  Phone,
  Grid,
  Star,
  Monitor,
  Camera,
  Clock,
  HeartPulse,
  Tv,
  Apple,
  Smartphone,
  Headphones,
  TrendingUp,
  Zap,
  Award,
  type LucideIcon,
} from "lucide-react";

// ============================================
// TYPE DEFINITIONS
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
  megaMenu?: MegaMenuType;
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

type MegaMenuType = "smartphones" | "more";

// ============================================
// CONSTANTS & DATA
// ============================================

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
  { href: "#good-deals", label: "Flash Deals", icon: Zap, color: "text-orange-600", badge: "Hot" },
  { href: "/smartphones", label: "Smartphones", icon: Phone, hasMegaMenu: true, megaMenu: "smartphones" },
  { href: "/more", label: "More", icon: Grid, hasMegaMenu: true, megaMenu: "more" },
] as const;

const TOP_BAR_ITEMS: Readonly<TopBarItem[]> = [
  { label: "Verified Refurbished", icon: CheckCircle, color: "text-green-600", href: "/verified-refurbished" },
  { label: "Repair & Care", icon: Wrench, href: "/repair-care" },
  { label: "End Fast Tech", icon: Leaf, color: "text-emerald-600", href: "/end-fast-tech" },
  { label: "Tech Journal", icon: Newspaper, href: "/tech-journal" },
] as const;

const SMARTPHONES_CATEGORIES: Readonly<CategoryItem[]> = [
  { label: "iPhone", icon: Apple, badge: "Popular", hot: true },
  { label: "Samsung Galaxy", icon: Smartphone, hot: true },
  { label: "Google Pixel", icon: Smartphone, badge: "AI Camera" },
  { label: "Android Smartphones", icon: Smartphone },
  { label: "Smartphone accessories", icon: Headphones },
] as const;

const MORE_CATEGORIES: Readonly<CategoryItem[]> = [
  { label: "Desktop computers", icon: Monitor },
  { label: "Cameras", icon: Camera, badge: "New" },
  { label: "Retro tech", icon: Clock },
  { label: "Mobility", icon: HeartPulse },
  { label: "TVs and home cinema", icon: Tv },
] as const;

const TRADE_IN_TEXT = "Get up to £700 for your old device" as const;

// ============================================
// UTILITY FUNCTIONS
// ============================================

const getCategorySlug = (label: string): string => {
  return label.toLowerCase().replace(/\s+/g, "-");
};

// ============================================
// SUBCOMPONENTS
// ============================================

interface FlagImageProps {
  country: Country;
  size?: number;
}

const FlagImage = ({ country, size = 20 }: FlagImageProps) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className="flex items-center justify-center rounded-md overflow-hidden border border-gray-200 bg-white shadow-sm"
      style={{ width: size, height: size }}
      role="img"
      aria-label={`${country.name} flag`}
    >
      {hasError ? (
        <span className="text-xs flex items-center justify-center w-full h-full" aria-hidden="true">
          {country.flag}
        </span>
      ) : (
        <Image
          src={country.flagImage}
          alt=""
          width={size}
          height={size}
          className="object-cover"
          onError={() => setHasError(true)}
        />
      )}
    </div>
  );
};

// ============================================
// LOCATION MODAL COMPONENT
// ============================================

interface LocationModalProps {
  isOpen: boolean;
  currentCountry: Country;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onCountrySelect: (country: Country) => void;
  filteredCountries: Country[];
}

const LocationModal = ({
  isOpen,
  currentCountry,
  searchQuery,
  onSearchChange,
  onCountrySelect,
  filteredCountries,
}: LocationModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-full mt-3 bg-white border-2 border-gray-200 shadow-2xl rounded-2xl w-96 max-h-[32rem] overflow-hidden z-50">
      <div className="p-6">
        {/* Header with Gradient */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Choose your location</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Changing your location affects delivery options, pricing, and product availability.
          </p>
        </div>

        {/* Search with Icon */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search countries..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-xl bg-gray-50 border-2 border-gray-200 px-4 py-3 pl-12 text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all"
          />
        </div>

        {/* Current Location */}
        <div className="mb-6 p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
          <p className="text-xs font-bold text-purple-700 mb-3 uppercase tracking-wide">Current Location</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FlagImage country={currentCountry} size={28} />
              <div>
                <p className="text-sm font-bold text-gray-900">{currentCountry.name}</p>
                <p className="text-xs text-gray-600">{currentCountry.language}</p>
              </div>
            </div>
            <CheckCircle className="h-5 w-5 text-purple-600" />
          </div>
        </div>

        {/* Countries List */}
        <div className="max-h-64 overflow-y-auto">
          <p className="text-xs font-bold text-gray-700 mb-3 uppercase tracking-wide">All Countries</p>
          {filteredCountries.length > 0 ? (
            <div className="space-y-2">
              {filteredCountries.map((country) => {
                const isSelected = currentCountry.code === country.code;
                return (
                  <button
                    key={country.code}
                    onClick={() => onCountrySelect(country)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 ${
                      isSelected ? "bg-purple-50 border-2 border-purple-200 shadow-sm" : "border-2 border-transparent"
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
          ) : (
            <p className="text-sm text-gray-500 text-center py-8">No countries found</p>
          )}
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
  const categories = type === "smartphones" ? SMARTPHONES_CATEGORIES : MORE_CATEGORIES;

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
              href={`/${type}`}
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
// MAIN HEADER COMPONENT
// ============================================

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<MegaMenuType | null>(null);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentCountry, setCurrentCountry] = useState<Country>(COUNTRIES[0]);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const megaMenuRef = useRef<HTMLDivElement>(null);
  const locationModalRef = useRef<HTMLDivElement>(null);

  const filteredCountries = useMemo(
    () =>
      COUNTRIES.filter(
        (country) =>
          country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          country.language.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [searchQuery]
  );

  const handleCountrySelect = useCallback((country: Country) => {
    setCurrentCountry(country);
    setLocationModalOpen(false);
    setSearchQuery("");
  }, []);

  const scrollToSection = useCallback((href: string) => {
    if (!href.startsWith("#")) return;
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setMobileMenuOpen(false);
    }
  }, []);

  const isActive = useCallback(
    (href: string) => {
      if (href.startsWith("#")) return false;
      return pathname === href || pathname.startsWith(`${href}/`);
    },
    [pathname]
  );

  // Scroll detection for hide/show header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide header
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show header
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (megaMenuRef.current && !megaMenuRef.current.contains(target)) {
        setActiveMegaMenu(null);
      }
      if (locationModalRef.current && !locationModalRef.current.contains(target)) {
        setLocationModalOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveMegaMenu(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header 
        className={`sticky top-0 inset-x-0 z-50 bg-white transition-transform duration-300 shadow-lg ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        {/* Top Bar */}
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
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  onCountrySelect={handleCountrySelect}
                  filteredCountries={filteredCountries}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main Bar */}
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center transition-opacity hover:opacity-80">
              <div className="relative h-12 w-40">
                <Image src="/logo.png" alt="Ismart" width={160} height={48} className="object-contain" priority />
              </div>
            </Link>

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

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden rounded-xl p-2.5 transition-colors hover:bg-gray-100 border-2 border-gray-200"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

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

        {/* Bottom Nav */}
        <nav className="border-t border-gray-100 bg-white relative" ref={megaMenuRef}>
          <div className="mx-auto max-w-7xl px-4 py-3">
            <ul className="hidden gap-8 text-sm font-bold text-gray-800 lg:flex overflow-x-auto scrollbar-hide">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isItemActive = isActive(item.href);
                const isMegaMenuActive = activeMegaMenu === item.megaMenu;

                return (
                  <li
                    key={item.href}
                    className="relative shrink-0"
                    onMouseEnter={() => item.megaMenu && setActiveMegaMenu(item.megaMenu)}
                    onMouseLeave={() => {}}
                  >
                    <Link
                      href={item.href}
                      onClick={(e) => {
                        if (item.href.startsWith("#")) {
                          e.preventDefault();
                          scrollToSection(item.href);
                        }
                        setActiveMegaMenu(null);
                      }}
                      className={`relative flex items-center gap-2 transition-all duration-200 hover:text-purple-600 py-2 px-1 whitespace-nowrap ${
                        isItemActive ? "text-purple-600" : ""
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
                      <div onMouseEnter={() => setActiveMegaMenu(item.megaMenu!)} onMouseLeave={() => setActiveMegaMenu(null)}>
                        <MegaMenu type={item.megaMenu!} onClose={() => setActiveMegaMenu(null)} />
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

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
      </header>

      <div className="h-36 md:h-32" aria-hidden="true" />
    </>
  );
}