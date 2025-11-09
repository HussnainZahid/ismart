"use client";

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, RotateCcw, CreditCard, Smartphone, Zap, Camera, Key, Trash2, MapPin, TrendingUp, Cpu } from 'lucide-react';

// --- Interface Definitions for Data Structures and Props ---

interface ShopCategory {
  name: string;
  image: string;
}

interface BestsellerProduct {
  name: string;
  variant: string;
  rating: number;
  reviews: string;
  price: string;
  oldPrice: string;
  image: string;
}

interface RepairStep {
  title: string;
  iconPath: string; // SVG path data
  description: string;
  image: string; // File ID
}

interface AccordionItemProps {
  title: string;
  content: string;
}

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface SectionHeaderProps {
  pretitle?: string;
  title: string;
}

interface ProductCardProps {
  product: BestsellerProduct;
}

// --- Placeholder Data ---

const shopCategories: ShopCategory[] = [
  // Using placeholder images for categories but setting them to match the lime-100 background style
  { name: 'iPhone', image: 'https://placehold.co/180x250/d2ff7b/000000?text=iPhone+15' },
  { name: 'Samsung Galaxy', image: 'https://placehold.co/180x250/d2ff7b/000000?text=Galaxy+S24' },
  { name: 'Google Pixel', image: 'https://placehold.co/180x250/d2ff7b/000000?text=Pixel+8' },
  { name: 'Android smartphones', image: 'https://placehold.co/180x250/d2ff7b/000000?text=Other+Androids' },
];

const bestsellers: BestsellerProduct[] = [
  { name: 'iPhone 14', variant: 'Midnight - 128 GB - Physical SIM + eSIM', rating: 4.6, reviews: '26,528', price: '£271.00', oldPrice: '£599.00 new', image: 'https://placehold.co/180x250/d7eafb/000000?text=iPhone+14' },
  { name: 'iPhone 14', variant: 'Blue - 128 GB - Physical SIM + eSIM', rating: 4.6, reviews: '26,528', price: '£289.00', oldPrice: '£599.00 new', image: 'https://placehold.co/180x250/f0e6ff/000000?text=iPhone+14+Blue' },
  { name: 'Galaxy S22 5G', variant: 'Black - 128 GB - Physical SIM + eSIM', rating: 4.6, reviews: '10,256', price: '£182.00', oldPrice: '£699.00 new', image: 'https://placehold.co/180x250/d7eafb/000000?text=S22+5G' },
  { name: 'Galaxy S23', variant: 'Black - 128 GB - Physical SIM + eSIM', rating: 4.5, reviews: '5,061', price: '£219.00', oldPrice: '£869.00 new', image: 'https://placehold.co/180x250/f0e6ff/000000?text=S23' },
  { name: 'iPhone 12', variant: 'Black - 64 GB - Physical SIM + eSIM', rating: 4.6, reviews: '32,500', price: '£210.00', oldPrice: '£500.00 new', image: 'https://placehold.co/180x250/d7eafb/000000?text=iPhone+12' },
];

const repairSteps: RepairStep[] = [
  {
    title: 'Reuse',
    iconPath: 'M15 12V3C15 2.44772 14.5523 2 14 2H3C2.44772 2 2 2.44772 2 3V20C2 20.5523 2.44772 21 3 21H14C14.5523 21 15 20.5523 15 20V12ZM15 12H22V15H15V12ZM15 18H22V21H15V18ZM15 6H22V9H15V6Z',
    description: 'Make your tech last by using cases and other protective gear. Consider passing along tech to younger family members or those in need.',
    image: 'uploaded:e.png-cb5a2f0f-58e1-4e91-931f-5a72c7ba1e56'
  },
  {
    title: 'Repair',
    iconPath: 'M10 20L2 12L10 4V8H22V16H10V20Z',
    description: 'Replacing old parts and keeping your devices clean and healthy improves performance. Support the Right to Repair movement and take repair back to the people.',
    image: 'uploaded:f.png-c8de9d2f-47cd-4dc6-b4c6-146bec5d9c0d'
  },
  {
    title: 'Refurbish',
    iconPath: 'M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM12 9V6L8 10L12 14V11H16V9H12Z',
    description: 'Trade in old tech for cash when you\'re ready to move on. Choose refurbished tech with up to 92% less carbon emissions than new.',
    image: 'uploaded:g.png-7d70cfec-2192-4c9a-921a-627f76e41382'
  },
];

const featureDetails: { [key: number]: { label: string, detail: string, icon: React.ReactNode } } = {
  0: { label: "Scroll up", detail: "Start your inspection journey here.", icon: <TrendingUp size={20} /> },
  1: { label: "SIM and/or memory card reader", detail: "We ensure all card trays eject smoothly and the contacts read cards correctly.", icon: <Key size={20} /> },
  2: { label: "Data deletion", detail: "All devices undergo a professional data wipe, ensuring your privacy is 100% protected before any refurbishment begins.", icon: <Trash2 size={20} /> },
  3: { label: "Chargers and/or cables", detail: "All charging ports are meticulously cleaned and tested. We verify both wired and wireless charging capabilities.", icon: <Zap size={20} /> },
  4: { label: "GPS and/or positioning system", detail: "Satellite connection and location accuracy are verified to ensure flawless navigation.", icon: <MapPin size={20} /> },
  5: { label: "Cameras", detail: "Front and rear cameras, flash, and all video functions are tested for clarity, focus, and stabilization.", icon: <Camera size={20} /> }
};


// --- Individual Components ---

const AccordionItem: React.FC<AccordionItemProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200">
      <button
        className="flex justify-between items-center w-full py-5 text-left font-semibold text-lg text-gray-900 hover:text-indigo-600 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        {title}
        <svg className={`w-5 h-5 text-gray-500 transform transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="pb-5 pr-6 text-gray-600 text-base animate-fadeIn">
          <p>{content}</p>
        </div>
      )}
    </div>
  );
};

// CSS animation for smooth reveal
const style = document.createElement('style');
style.innerHTML = `
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn {
    animation: fadeIn 0.3s ease-out;
}
`;
document.head.appendChild(style);


const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => (
  <div className="p-5 bg-white rounded-2xl shadow-xl flex items-start space-x-4 border border-gray-100">
    <div className="p-3 mt-1 rounded-xl bg-lime-200 text-lime-800 flex-shrink-0">
      {icon}
    </div>
    <div>
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </div>
);

const SectionHeader: React.FC<SectionHeaderProps> = ({ pretitle, title }) => (
  <div className="text-center mb-14">
    {pretitle && <p className="text-indigo-600 font-semibold uppercase tracking-widest text-sm">{pretitle}</p>}
    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight max-w-4xl mx-auto">
      {title}
    </h2>
  </div>
);

const ProductCard: React.FC<ProductCardProps> = ({ product }) => (
  <a href={`/product/${product.name.toLowerCase().replace(/\s/g, '-')}`} className="block bg-white p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group border border-gray-100">
    <div className="h-56 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden mb-3">
      <img
        src={product.image}
        alt={product.name}
        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
          (e.target as HTMLImageElement).src = `https://placehold.co/180x250/f0f0f0/666666?text=${product.name}`;
        }}
      />
    </div>
    <div className="text-sm">
      <h4 className="font-bold text-gray-900 group-hover:text-indigo-600">{product.name}</h4>
      <p className="text-xs text-gray-500 truncate mt-1">{product.variant}</p>
      <div className="flex items-center my-2">
        <span className="text-yellow-500 text-base">{'★'.repeat(Math.floor(product.rating))}</span>
        <span className="text-gray-300 text-base">{'★'.repeat(5 - Math.floor(product.rating))}</span>
        <span className="ml-2 text-xs text-gray-600">({product.reviews})</span>
      </div>
      <div className="flex justify-between items-baseline">
        <p className="text-xl font-extrabold text-gray-900">{product.price}</p>
        <p className="text-xs text-red-500 line-through">{product.oldPrice}</p>
      </div>
    </div>
  </a>
);


// --- Main Component ---

const featureLabels = Object.values(featureDetails).map(d => d.label);

export default function App() {
  const [activeStep, setActiveStep] = useState(3); // Start at Chargers (index 3)

  const handleScroll = (direction: 'up' | 'down') => {
    setActiveStep((prevStep) => {
      if (direction === 'up') {
        return Math.max(1, prevStep - 1); // Stop at 1 (first actual feature)
      } else {
        return Math.min(5, prevStep + 1); // Stop at 5 (last feature)
      }
    });
  };

  const currentFeature = featureDetails[activeStep] || featureDetails[3];

  return (

    <div className="min-h-screen bg-white font-['Inter']">


      {/* Header and Breadcrumbs */}
      <header className="bg-gray-50 pt-8 pb-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500 mb-2">
            <a href="/" className="hover:text-indigo-600 transition-colors">Home</a> <span className="mx-1">&gt;</span> <span className="font-semibold text-gray-700">Smartphones</span>
          </p>
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tighter">
            Refurbished Smartphones
          </h1>
        </div>
      </header>

      {/* Section 1: Top Categories & Accessories (1.png) */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Shop our most wanted</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {shopCategories.map((cat) => (
            <a key={cat.name} href={`/shop/${cat.name.toLowerCase().replace(/\s/g, '-')}`} className="block group">
              <div className="bg-lime-100 rounded-2xl h-64 flex items-center justify-center p-4 overflow-hidden transition-shadow duration-300 group-hover:shadow-2xl">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                  onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                    (e.target as HTMLImageElement).src = `https://placehold.co/180x250/d2ff7b/000000?text=${cat.name}`;
                  }}
                />
              </div>
              <p className="mt-3 text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{cat.name}</p>
            </a>
          ))}
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-6">Shop accessories</h2>
        <div className="flex flex-wrap gap-3">
          {['Smartphones cases', 'Chargers', 'Airpods', 'Bluetooth headphones & earphones'].map(item => (
            <a key={item} href={`/accessories/${item.toLowerCase().replace(/[\s&]/g, '-')}`} className="px-5 py-2 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-indigo-600 transition-colors shadow-md hover:shadow-lg">
              {item}
            </a>
          ))}
        </div>
      </section>

      {/* Section 2: Bestsellers (2.png) */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Shop bestsellers</h2>
              <p className="text-gray-600">Tech as its tech</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => console.log('Scroll left')}
                className="p-3 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors shadow-sm"
                aria-label="Previous products"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => console.log('Scroll right')}
                className="p-3 rounded-full bg-gray-900 text-white hover:bg-indigo-600 transition-colors shadow-md"
                aria-label="Next products"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {bestsellers.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Feature Banner (2.png bottom) */}
      <section className="py-12 bg-lime-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard title="Professionally refurbished" description="Guaranteed quality" icon={<CheckCircle size={24} />} />
            <FeatureCard title="Cashback with Trade-in" description="Sell your old device" icon={<RotateCcw size={24} />} />
            <FeatureCard title="Free 30-day returns" description="No questions asked" icon={<CreditCard size={24} />} />
            <FeatureCard title="App exclusive features" description="Better deals inside" icon={<Smartphone size={24} />} />
          </div>
        </div>
      </section>

      {/* Section 4: Tested. Perfected. Refurbished. (3.png) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Tested. Perfected. Refurbished." />

          <div className="flex flex-col lg:flex-row items-center justify-center lg:space-x-12">
            {/* Scrollable Feature List */}
            <div className="w-full lg:w-1/3 space-y-3 mb-10 lg:mb-0">
              {Object.values(featureDetails).map(({ label, icon }, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 cursor-pointer ${index === activeStep ? 'bg-indigo-600 shadow-lg text-white font-semibold' : 'text-gray-900 hover:bg-gray-100'
                    }`}
                  onClick={() => {
                    if (index > 0) setActiveStep(index);
                  }}
                >
                  <div className={`p-2 rounded-full ${index === activeStep ? 'bg-white text-indigo-600' : 'bg-gray-200 text-gray-700'}`}>
                    {icon}
                  </div>
                  <span className="text-lg">{label}</span>
                </div>
              ))}
              <div className="flex justify-between pt-4">
                <button
                  onClick={() => handleScroll('up')}
                  disabled={activeStep <= 1}
                  className={`p-3 rounded-full border border-gray-300 transition-colors ${activeStep > 1 ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-400 bg-gray-50 cursor-not-allowed'}`}
                  aria-label="Scroll up"
                >
                  <ChevronLeft size={20} className="rotate-90" />
                </button>
                <button
                  onClick={() => handleScroll('down')}
                  disabled={activeStep >= 5}
                  className={`p-3 rounded-full border border-gray-300 transition-colors ${activeStep < 5 ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-400 bg-gray-50 cursor-not-allowed'}`}
                  aria-label="Scroll down"
                >
                  <ChevronRight size={20} className="rotate-90" />
                </button>
              </div>
            </div>

            {/* Smartphone Mockup */}
            <div className="w-full lg:w-1/3 relative flex justify-center">
              <div className="h-[550px] w-full max-w-xs bg-gray-900 rounded-[40px] shadow-[0_20px_40px_rgba(0,0,0,0.5)] border-[10px] border-gray-800 flex items-center justify-center relative">
                <div className="absolute inset-2 bg-white rounded-[30px] overflow-hidden">
                  {/* Screen Content - Dynamically changing based on activeStep */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center transition-all duration-300">
                    <span className="text-6xl text-indigo-600">{currentFeature.icon}</span>
                    <p className="text-2xl font-bold text-gray-900 mt-2">{currentFeature.label}</p>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-[-50px] bg-white p-5 rounded-xl shadow-2xl max-w-sm text-base text-gray-700 border border-gray-100 z-10">
                <p className="font-semibold text-gray-900 mb-2">{currentFeature.label}:</p>
                <p>{currentFeature.detail}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Stop Fast Tech - Stats (4.png) */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-extrabold text-gray-900 mb-4">Let's end fast tech.</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Fast tech is the system of overproduction and overconsumption that relies on devices built to be disposed of — either when they break down or become irrelevant, thanks to the latest, "upgrade."
          </p>
          <div className="flex justify-center my-12">
            <div className="w-full max-w-4xl h-[400px] bg-gray-900 rounded-3xl flex items-center justify-center relative overflow-hidden">
              <img
                src="uploaded:4.png-70a06579-e981-45a0-9481-94a2ae764335"
                alt="Pile of old tech and batteries"
                className="object-cover w-full h-full opacity-70"
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  (e.target as HTMLImageElement).src = `https://placehold.co/800x400/222/FFF?text=How+many+upgrades+do+we+have+left%3F`;
                }}
              />
              <div className="absolute text-white text-center p-6">
                <div className="text-5xl md:text-6xl font-extrabold italic mb-4 drop-shadow-lg leading-tight">How many upgrades do we have left?</div>
                <button className="text-white hover:text-red-400 mt-4 transition-colors">
                  {/* Using a simple icon for effect */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {/* Stat Cards */}
            {['We\'re overproducing tech', 'We\'re creating more e-waste', 'We\'re growing our carbon footprint'].map((title, index) => (
              <div key={title} className="p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
                <p className="text-xl font-bold text-gray-900 mb-4">{title}</p>
                <div className="text-7xl font-extrabold text-indigo-600 mb-4 leading-none">
                  {index === 0 && '16B'}
                  {index === 1 && '82%'}
                  {index === 2 && '40%'}
                </div>
                {index === 0 && <p className="text-gray-600 text-sm">**billion** Smartphones in circulation right now. That's 2 per person, for the entire global population (yes, including babies).</p>}
                {index === 1 && <p className="text-gray-600 text-sm">The amount **e-waste** has increased since 2010. Dumps now spread across the globe, from rural Hong Kong to Mexico.</p>}
                {index === 2 && <p className="text-gray-600 text-sm">The percentage that manufacturing makes up the overall **carbon footprint** of digital technology.</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: Action & Latest News (4.png) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Ready to end fast tech?" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-gray-900 p-8 rounded-2xl text-white shadow-xl">
              <h3 className="text-2xl font-bold mb-3">Take a stand against fast tech</h3>
              <p className="text-base text-gray-400 mb-6">Learn more about the impact of fast tech and how the repair movement can fight back.</p>
              <a href="/learn" className="inline-block w-full text-center py-3 px-6 border border-white text-white font-semibold rounded-full hover:bg-white hover:text-gray-900 transition-colors">
                Let's go
              </a>
            </div>
            <div className="bg-indigo-600 p-8 rounded-2xl text-white shadow-xl">
              <h3 className="text-2xl font-bold mb-3">Visit a repair café</h3>
              <p className="text-base text-indigo-200 mb-6">Get help from the repair community.</p>
              <a href="/map" className="inline-block w-full text-center py-3 px-6 bg-white text-indigo-600 font-semibold rounded-full hover:bg-gray-200 transition-colors">
                Find on map
              </a>
            </div>
            <div className="bg-lime-600 p-8 rounded-2xl text-white shadow-xl">
              <h3 className="text-2xl font-bold mb-3">Get political</h3>
              <p className="text-base text-lime-200 mb-6">Advocate for your right to repair.</p>
              <a href="/advocate" className="inline-block w-full text-center py-3 px-6 bg-white text-lime-600 font-semibold rounded-full hover:bg-gray-200 transition-colors">
                Take action
              </a>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest news</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Why breaking up with fast tech is crucial for the...', 'Get political! Support your right to repair', 'Why we need a right to repair movement', 'Why you can\'t always update your phone'].map((title, index) => {
              const imageMap = ['uploaded:a.png-01f17066-3909-4dbd-a297-4a48474d2660', 'uploaded:b.png-22e75bce-43c4-4269-a0bc-432fc773c88a', 'uploaded:c.png-f395aac4-46ba-4082-9e2e-43cd975883d0', 'uploaded:d.png-51d28af4-48f6-49fb-af2e-9ad76e167bc6'];
              return (
                <a key={index} href={`/news/${index}`} className="block group">
                  <div className="bg-gray-100 rounded-xl h-40 overflow-hidden mb-3 shadow-md">
                    <img
                      src={imageMap[index]}
                      alt={`Article Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                        (e.target as HTMLImageElement).src = `https://placehold.co/300x160/d2ff7b/000000?text=Article+${index + 1}`;
                      }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">Tech Education Articles</p>
                  <p className="font-bold text-gray-900 hover:text-indigo-600 transition-colors mt-1">{title}</p>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 7: Repair, Reuse, Refurbish (3.png) */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="The three pillars of sustainable tech" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {repairSteps.map((step, index) => (
              <div key={index} className="p-6 bg-white rounded-2xl shadow-xl border border-gray-100 group">
                <div className="h-48 w-full bg-indigo-50 rounded-xl mb-4 overflow-hidden">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                      (e.target as HTMLImageElement).src = `https://placehold.co/350x200/eee/333?text=${step.title}`;
                    }}
                  />
                </div>
                <h3 className="text-3xl font-extrabold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-base text-gray-600">{step.description}</p>
                <a href={`/${step.title.toLowerCase()}`} className="flex items-center space-x-2 mt-4 text-sm text-indigo-600 font-bold hover:text-indigo-800 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d={step.iconPath} /></svg>
                  <span>Explore {step.title} actions</span>
                </a>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <a href="/trade-in" className="inline-block py-3 px-10 bg-gray-900 text-white font-semibold rounded-full text-lg hover:bg-indigo-600 transition-colors shadow-lg">
              Start Trading In Today
            </a>
          </div>
        </div>
      </section>

      {/* Section 8: FAQ Accordion (3.png) */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Self-repair doesn't have to be intimidating" />

          {/* Card */}
          <div className="bg-gray-50 rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
            <div className="p-4 md:p-8 space-y-0">
              <AccordionItem
                title="What is the ISMart x iFixit partnership?"
                content="We've partnered with iFixit, a leader in the Right to Repair movement, to offer tools, guides, and more so you have tech repair and care ready at hand."
              />
              <AccordionItem
                title="Does self-repair void my warranty or protection plan?"
                content="Our 1-year warranty and 30-day returns remain valid, even if you perform self-repair on your device, provided the repair follows our guidelines."
              />
              <AccordionItem
                title="How do I know if my device needs maintenance or repair?"
                content="Keep an eye out for slow performance, quickly draining batteries, or unusual heating. Our app can help diagnose common issues."
              />
              <AccordionItem
                title="What is the Right to Repair?"
                content="The Right to Repair is a legislative movement advocating for consumers' ability to repair their own electronic and mechanical devices. We strongly support this movement."
              />
              <AccordionItem
                title="How is repair related to ISMart's sustainability goals?"
                content="Repair extends the life of devices, dramatically reducing e-waste and the carbon emissions associated with manufacturing new products."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 9: Popular Searches (6.png) */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Searches so popular - you can't sit with them</h2>
          <div className="flex flex-wrap gap-3">
            {['Sell you smartphone', 'Sell your iPhone', 'Sell your Samsung phone', 'iPhone with new batteries', 'Samsung Galaxy S24', 'Samsung Galaxy S24 Ultra', 'Samsung Galaxy S24+', 'Samsung Galaxy Z Fold5', 'Samsung Galaxy Z Fold4', 'Google Pixel 7', 'Google Pixel 7 Pro'].map(item => (
              <a key={item} href={`/search?q=${encodeURIComponent(item)}`} className="px-5 py-2 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-indigo-600 transition-colors whitespace-nowrap shadow-md">
                {item}
              </a>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
