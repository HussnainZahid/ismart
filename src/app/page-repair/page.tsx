"use client"
import React, { useState } from 'react';
import {
  Download,
  MapPin,
  Megaphone,
  BookOpen,
  ChevronDown,
  Wrench
} from 'lucide-react';

// =====================================================================
// === MOCK DATA AND CONFIGURATION =====================================
// =====================================================================

// IMPORTANT: Using placeholders for images uploaded by the user (1.jpg, 2.jpg, etc.)
const IMAGE_PATHS = {
  HERO_IMAGE_REPAIR: "https://placehold.co/500x350/f0f0f0/333333?text=PERSON+REPAIRING+PHONE", // From 1.jpg
  STARTER_KIT_BANNER: "https://placehold.co/1200x200/333333/ffffff?text=GET+A+STARTER+KIT+BANNER", // From 2.jpg
  NEWS_ARTICLE_1: "https://placehold.co/100x100/f5f5f5/000?text=LOGO",
  NEWS_ARTICLE_2: "https://placehold.co/100x100/f5f5f5/000?text=LOGO",
  NEWS_ARTICLE_3: "https://placehold.co/100x100/f5f5f5/000?text=LOGO",
};

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "What is the ISmart x iFixit partnership?",
    answer: "We've partnered with iFixit to give you free repair guides, tools, and starter kits so you can fix your refurbished phone at home — safely and affordably.",
  },
  {
    question: "Does self-repair void my warranty or protection plan?",
    answer: "It depends on the repair and the device's warranty terms. Generally, unauthorized third-party repairs can void a manufacturer's warranty. However, using our provided resources helps you understand what's covered.",
  },
  {
    question: "How do I know if my device needs maintenance or repair?",
    answer: "Common signs include drastically reduced battery life, unresponsive buttons, screen flickering, or overheating. Our app diagnostics can help pinpoint specific issues.",
  },
  {
    question: "What is the Right to Repair?",
    answer: "The Right to Repair is a movement advocating for laws that require manufacturers to provide the parts, tools, and information necessary to repair devices, rather than forcing consumers to rely on costly, official service centers.",
  },
  {
    question: "How is repair related to ISmartz sustainability goals?",
    answer: "Repairing and maintaining devices extends their lifespan, drastically reducing e-waste and the need for new manufacturing, which is central to our mission for a circular economy.",
  },
];

interface NewsItem {
  logoUrl: string;
  quote: string;
  source: string;
  date: string;
  link: string;
}

const LATEST_NEWS: NewsItem[] = [
    {
        logoUrl: IMAGE_PATHS.NEWS_ARTICLE_1,
        quote: "“You don't own your device. Manufacturers do.”",
        source: "Back Market",
        date: "18 December 2024",
        link: "/news/back-market-article"
    },
    {
        logoUrl: IMAGE_PATHS.NEWS_ARTICLE_2,
        quote: "“What’s the latest on Right to Repair in the UK?”",
        source: "Restart Project",
        date: "February 16, 2025",
        link: "/news/restart-project-uk-r2r"
    },
    {
        logoUrl: IMAGE_PATHS.NEWS_ARTICLE_3,
        quote: "“Positive, hopeful signs for Britain's repair landscape...”",
        source: "Guardian",
        date: "May 2, 2025",
        link: "/news/guardian-article"
    },
];

// =====================================================================
// === Main Page Component (The content of src/app/page-repair/page.tsx)
// =====================================================================

// Changed to a traditional function declaration for better Next.js compatibility
export default function RepairAndCarePage() {

    // Nested component for the expandable FAQ items (from 3.png)
    const RepairContent: React.FC<{ items: FAQItem[] }> = ({ items }) => {
        const [openIndex, setOpenIndex] = useState<number | null>(null);

        const toggleFAQ = (index: number) => {
            setOpenIndex(openIndex === index ? null : index);
        };

        return (
            <div className="space-y-4">
                {items.map((item, index) => (
                    <div key={index} className="border-b border-gray-200">
                        <button
                            onClick={() => toggleFAQ(index)}
                            className="w-full text-left py-4 flex justify-between items-center text-lg font-medium text-gray-800 hover:text-indigo-600 transition-colors"
                        >
                            {item.question}
                            <ChevronDown className={`w-5 h-5 ml-4 transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-indigo-600' : ''}`} />
                        </button>
                        {openIndex === index && (
                            <p className="pb-4 text-gray-600 transition-all duration-300 ease-in-out">
                                {item.answer}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        );
    };

    // Nested component for the Call to Action cards (from 4.png)
    const CallToActionCard: React.FC<{ title: string, subtitle: string, icon: React.ElementType, link: string, buttonText: string }> = ({ title, subtitle, icon: Icon, link, buttonText }) => (
        <div className="p-8 bg-gray-900 text-white rounded-xl shadow-lg flex flex-col justify-between h-full">
            <div className="mb-6">
                <Icon className="w-8 h-8 text-lime-400 mb-3" />
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p className="text-gray-400 text-sm">{subtitle}</p>
            </div>
            <a href={link} className="inline-flex items-center justify-center bg-white text-gray-900 font-semibold px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                {buttonText}
            </a>
        </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 font-serif">

      {/* Header and Nav Placeholder */}
      
      <main>
        {/* Section 1: Hero & Do-It-Yourself with iFixit (Matching 1.jpg) */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            {/* Title */}
            <div className="text-center mb-16">
              <h1 className="text-6xl font-extrabold text-gray-900 mb-4">Tech repair and care</h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                It's no secret that your tech works better and lasts longer if you take care of it. Let's talk about fighting fast tech and the **Right to Repair**.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Left Column: Text & CTA */}
              <div className="order-2 md:order-1">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Do it yourself, with help</h2>
                <p className="text-gray-700 mb-6">
                  When your car battery dies you replace the battery, not the car. Same goes for your tech. That's why we partnered with **iFixit**, a leader in the Right to Repair movement, to offer tools, guides, and more so you have tech repair and care ready at hand.
                </p>
                <p className="text-gray-700 mb-8">
                  Download our app for customised tips from experts on how to keep your device in great shape.
                </p>
                <a href="/app-download" className="inline-flex items-center bg-gray-900 text-white font-semibold px-8 py-3 rounded-xl hover:bg-gray-800 transition-colors shadow-lg">
                  Get the app <Download className="w-5 h-5 ml-3" />
                </a>
              </div>
              {/* Right Column: Image */}
              <div className="order-1 md:order-2">
                <img 
                  src={IMAGE_PATHS.HERO_IMAGE_REPAIR} 
                  alt="A close-up of a person repairing a smartphone on a wooden table." 
                  className="w-full h-auto object-cover rounded-xl shadow-xl"
                  onError={(e) => (e.currentTarget.src = IMAGE_PATHS.HERO_IMAGE_REPAIR)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Get a Starter Kit Banner (Matching 2.jpg) */}
        <section className="py-20"
            style={{ 
                backgroundImage: `url(${IMAGE_PATHS.STARTER_KIT_BANNER})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center',
                backgroundColor: '#333333' // Fallback color
            }}
        >
            <div className="max-w-7xl mx-auto px-4 text-center text-white bg-black/40 p-12 rounded-xl">
                <h2 className="text-5xl font-extrabold mb-3">Get a starter kit</h2>
                <p className="text-lg mb-8">
                    Explore expert-approved cleaning, tool, and repair kits.
                </p>
                <a href="/starter-kits" className="inline-flex items-center bg-white text-gray-900 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors shadow-md">
                    Shop kits <Wrench className="w-5 h-5 ml-2" />
                </a>
            </div>
        </section>

        {/* Section 3: FAQ / Self-Repair doesn't have to be intimidating (Matching 3.png) */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-extrabold text-gray-900 mb-4">Self-repair doesn't have to be intimidating</h2>
              <p className="text-lg text-gray-600">
                That's why we've answered your most asked questions about kits, warranties, resources, and the **Right to Repair** movement.
              </p>
            </div>
            
            {/* Embed the RepairContent FAQ component */}
            <RepairContent items={FAQS} />
            
            <div className="text-center mt-12">
                <a href="/repair-resources" className="inline-block text-indigo-600 font-semibold border-b-2 border-indigo-600 pb-1 hover:text-indigo-800 transition-colors">
                    Find more resources
                </a>
            </div>
          </div>
        </section>

        {/* Section 4: Ready to end fast tech? (Matching 4.png) */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-extrabold text-gray-900 mb-4">Ready to end fast tech?</h2>
            </div>
            
            {/* Call to Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <CallToActionCard 
                    title="Take a stand against fast tech" 
                    subtitle="Learn more about the impact of fast tech and how the repair movement can fight back." 
                    icon={BookOpen} 
                    link="/fast-tech-manifesto" 
                    buttonText="Let's go" 
                />
                <CallToActionCard 
                    title="Visit a repair café" 
                    subtitle="Get help from the repair community. Find local experts and events near you." 
                    icon={MapPin} 
                    link="/repair-cafe-map" 
                    buttonText="Find on map" 
                />
                <CallToActionCard 
                    title="Get political" 
                    subtitle="Advocate for your right to repair. Support the push for legislative changes." 
                    icon={Megaphone} 
                    link="/right-to-repair-action" 
                    buttonText="Take action" 
                />
            </div>
            
            {/* Latest News */}
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Latest news</h3>
            <div className="flex space-x-4 overflow-x-auto pb-4">
                {LATEST_NEWS.map((item, index) => (
                    <a href={item.link} key={index} className="flex-shrink-0 w-80 bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                        <div className="mb-4">
                            <img src={item.logoUrl} alt={item.source} className="w-16 h-auto" onError={(e) => (e.currentTarget.src = item.logoUrl)}/>
                        </div>
                        <p className="text-lg font-medium text-gray-800 italic mb-3">
                            {item.quote}
                        </p>
                        <p className="text-xs font-semibold text-gray-500 uppercase">{item.source}</p>
                        <p className="text-xs text-gray-400">{item.date}</p>
                    </a>
                ))}
                {/* Scroll Indicators (Mocked from 4.png) */}
                <div className="flex-shrink-0 flex items-center justify-center space-x-2 self-end pb-8">
                    <button className="w-8 h-8 rounded-full bg-gray-200 text-gray-600">{'<'}</button>
                    <button className="w-8 h-8 rounded-full bg-black text-white">{'>'}</button>
                </div>
            </div>
            
          </div>
        </section>

      </main>

      {/* Footer Placeholder */}
      <footer className="bg-gray-800 text-white p-8 text-center font-sans">
          <p className="text-sm">&copy; 2024 Tech Repair and Care | Fight Fast Tech</p>
      </footer>
    </div>
  );
}
