"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Briefcase } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { ChevronRight, ChevronLeft, ArrowRight, X } from 'lucide-react';

// --- TYPE INTERFACES ---

interface ButtonProps {
    href: string;
    children: React.ReactNode;
    dark?: boolean;
}

interface NavLinkProps {
    to: string;
    children: React.ReactNode;
}

interface CommitmentItemProps {
    imageSrc: string;
    title: string;
    description: string;
    ctaText: string;
    ctaLink: string;
    reverse?: boolean;
}

interface NewsCardProps {
    category: string;
    title: string;
    link: string;
    image?: string;
}

interface LeaderCardProps {
    name: string;
    title: string;
    subtitle: string;
    image: string;
}

interface SocialPillProps {
    href: string;
    children: React.ReactNode;
}

// --- MOCK DATA ---
const MOCK_IMAGES = {
    heroBackground: "/heroBackground.png",
    commitment1: "/commitment1.png",
    commitment2: "/commitment2.png",
    commitment3: "/commitment3.png",
    commitment4: "/commitment4.png",
    commitment5: "/commitment5.png",
    newsroomPost1: "https://placehold.co/500x300/c7f000/000000?text=Back+Market+1",
    newsroomPost2: "https://placehold.co/500x300/c7f000/000000?text=Back+Market+2",
    newsroomPost3: "https://placehold.co/500x300/000000/0f0?text=Gameboy",
    newsroomInsight1: "https://placehold.co/500x300/c7f000/000000?text=iPhones+Stacked",
    newsroomInsight2: "https://placehold.co/500x300/0f0/000000?text=MacBook",
    newsroomInsight3: "https://placehold.co/500x300/c7f000/000000?text=Back+Market+Study",
    newsroomAsSeenIn1: "https://placehold.co/180x80/ffffff/000000?text=The+Local+London",
    newsroomAsSeenIn2: "https://placehold.co/180x80/ffffff/000000?text=ads+of+brands",
    newsroomAsSeenIn3: "https://placehold.co/180x80/ffffff/000000?text=The+Guardian",
    pressKit: "/pressKit.avif",
    leader1: "https://placehold.co/200x250/cccccc/333333?text=Thibaud",
    leader2: "https://placehold.co/200x250/cccccc/333333?text=Quentin",
    leader3: "https://placehold.co/200x250/cccccc/333333?text=Vianney",
    leader4: "https://placehold.co/200x250/cccccc/333333?text=Amandine",
    leader5: "https://placehold.co/200x250/cccccc/333333?text=Next+Leader",
    investor1: "/investor1.avif",
    investor2: "/investor2.avif",
    investor3: "/investor3.avif",
    investor4: "/investor4.avif",
    investor5: "/investor5.avif",
    investor6: "/investor6.avif",
    investor7: "/investor7.avif",
    careersBackground: "/careersBackground.avif",
};

const LEADERSHIP_DATA: LeaderCardProps[] = [
    { name: "Thibaud Hug de Larauze", title: "Co-founder", subtitle: "CEO", image: MOCK_IMAGES.leader1 },
    { name: "Quentin Le Brouster", title: "Co-founder", subtitle: "Former Chief Technology Officer", image: MOCK_IMAGES.leader2 },
    { name: "Vianney Vaute", title: "Co-founder", subtitle: "Former Chief Creative Officer", image: MOCK_IMAGES.leader3 },
    { name: "Amandine Durr", title: "Chief Product Officer", subtitle: "", image: MOCK_IMAGES.leader4 },
    { name: "Jane Doe", title: "CFO", subtitle: "", image: MOCK_IMAGES.leader5 },
];

const NEWS_DATA = {
    latest: [
        { category: "Press Release", title: "Brits confess eco-tine as convenience wins", link: "#" },
        { category: "Press Release", title: "Back Market Turns 10 and Hits Profitability", link: "#" },
        { category: "Press Release", title: "Brits rewind to retro tech as nostalgia takes over in 2025", link: "#", image: MOCK_IMAGES.newsroomPost3 },
    ],
    insights: [
        { category: "Tech Education Articles", title: "Why you can't always update your phone", link: "#", image: MOCK_IMAGES.newsroomInsight1 },
        { category: "MacBook", title: "Why February is the best time to buy a MacBook on...", link: "#", image: MOCK_IMAGES.newsroomInsight2 },
        { category: "Tech Insights & Industry Trends", title: "Back Market Study: 72% of London Kids See More...", link: "#", image: MOCK_IMAGES.newsroomInsight3 },
    ]
};

// --- Reusable Button Component ---
const CTAButton: React.FC<ButtonProps> = ({ href, children, dark = true }) => (
    <a
        href={href}
        className={`inline-flex items-center justify-center font-semibold text-sm transition-all duration-200 rounded-lg h-10 px-8 whitespace-nowrap border-2 
        ${dark
                ? 'bg-gray-900 text-white border-gray-900 hover:bg-gray-700 hover:border-gray-700'
                : 'bg-white text-gray-900 border-gray-900 hover:bg-gray-50'
            }`}
    >
        {children}
    </a>
);

// --- Component Blocks ---

const HeroSection: React.FC = () => {

    const NavLink: React.FC<NavLinkProps> = ({ to, children }) => (
        <a href={`#${to.toLowerCase()}`} className="inline-flex items-center text-sm font-semibold h-10 px-5 rounded-full border border-white bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-colors duration-200">
            {children}
            <ChevronRight className="w-3 h-3 ml-1" />
        </a>
    );

    return (
        <section
            id="hero"
            className="relative h-[80vh] min-h-[500px] flex items-end justify-center pb-20 overflow-hidden"
        >
            <div className="absolute inset-0">
                <img
                    src={MOCK_IMAGES.heroBackground}
                    alt="Phone on grass with flowers"
                    className="w-full h-full object-cover"
                />
                {/* Gradient overlay to ensure text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent" />
            </div>

            <div className="relative z-10 text-center text-white max-w-7xl px-4 mx-auto">
                <h1 className="text-8xl font-serif font-medium mb-12 translate-y-4">
                    About us
                </h1>
                <div className="flex flex-wrap justify-center gap-3">
                    <NavLink to="commitments">Commitments</NavLink>
                    <NavLink to="newsroom">Newsroom</NavLink>
                    <NavLink to="leadership">Leadership</NavLink>
                    <NavLink to="contact">Contact</NavLink>
                </div>
            </div>
        </section>
    );
};

const MissionSection: React.FC = () => {
    return (
        <section id="mission" className="py-20 md:py-28 px-4 md:px-8 max-w-7xl mx-auto">
            <div className="max-w-4xl mx-auto text-lg text-gray-700">
                <p className="text-sm font-semibold text-gray-500 mb-2">Home &gt; About us</p>
                <p className="mb-6 leading-relaxed">
                    Back Market is the leading global marketplace dedicated to <span className="font-semibold text-gray-900">professionally refurbished technology.</span> Our mission is to create a world that does more with what we already have by prolonging the lifespan of electronic devices through circularity and repair.
                </p>
                <p className="leading-relaxed">
                    Founded in Paris in 2014, the company has grown by double digits year over year and to date over 30 million refurbished devices have been sold on Back Market across 17 markets, avoiding approximately 1.6 million tons of carbon emissions.
                </p>
            </div>

            {/* Stats Boxes (Chartreuse/Lime Green) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-5xl mx-auto">
                <div className="p-8 rounded-xl bg-[#c7f000] shadow-lg">
                    <h3 className="text-7xl font-bold text-gray-900 mb-2">92%</h3>
                    <p className="text-lg font-medium text-gray-800">Less impact on the planet</p>
                </div>
                <div className="p-8 rounded-xl bg-[#c7f000] shadow-lg">
                    <h3 className="text-7xl font-bold text-gray-900 mb-2">1.6m</h3>
                    <p className="text-lg font-medium text-gray-800">Metric tons of CO2e prevented</p>
                </div>
                <div className="p-8 rounded-xl bg-[#c7f000] shadow-lg">
                    <h3 className="text-7xl font-bold text-gray-900 mb-2">93.2</h3>
                    <p className="text-lg font-medium text-gray-800">Our B corp score</p>
                </div>
            </div>
        </section>
    );
};

const CommitmentsSection: React.FC = () => {

    const CommitmentItem: React.FC<CommitmentItemProps> = ({ imageSrc, title, description, ctaText, ctaLink, reverse = false }) => (
        <div className={`flex flex-col lg:flex-row items-start py-10 md:py-16 ${reverse ? 'lg:flex-row-reverse' : ''} border-b border-gray-100 last:border-b-0`}>
            {/* Image Block */}
            <div className={`lg:w-1/2 w-full mb-8 lg:mb-0 ${reverse ? 'lg:pl-16' : 'lg:pr-16'}`}>
                <div className="aspect-[3/2] rounded-xl overflow-hidden shadow-xl">
                    <img src={imageSrc} alt={title} className="w-full h-full object-cover" />
                </div>
            </div>

            {/* Text Block */}
            <div className="lg:w-1/2 w-full self-center">
                <h4 className="text-2xl font-bold text-gray-900 mb-3">{title}</h4>
                <p className="text-gray-700 mb-6 leading-relaxed">{description}</p>
                <CTAButton href={ctaLink} dark={true}>{ctaText}</CTAButton>
            </div>
        </div>
    );

    return (
        <section id="commitments" className="py-20 md:py-32 bg-gray-50">
            <div className="text-center px-4 md:px-8 max-w-7xl mx-auto">
                <h2 className="text-6xl font-serif font-medium text-gray-900 mb-4">Commitments</h2>
                <p className="text-lg text-gray-600 mb-16">We establish sustainable partnerships in electronic waste management and measure our environmental impact.</p>
            </div>

            <div className="max-w-5xl mx-auto px-4 md:px-8 bg-white rounded-3xl shadow-2xl border border-gray-100 divide-y divide-gray-100">
                <CommitmentItem
                    imageSrc={MOCK_IMAGES.commitment1}
                    title="Let’s end fast tech."
                    description="At Back Market, we're fighting against fast tech—a system dominated by the overproduction and overconsumption of devices. Join us."
                    ctaText="Take action"
                    ctaLink="/action"
                />
                <CommitmentItem
                    imageSrc={MOCK_IMAGES.commitment2}
                    title="Our Impact Report"
                    description="Our 2024 Impact Report examines the environmental impact of our favorite pocket devices—the good, the bad, and the Back Market."
                    ctaText="Read more"
                    ctaLink="/impact-report"
                    reverse={true}
                />
                <CommitmentItem
                    imageSrc={MOCK_IMAGES.commitment3}
                    title="The Back Market Promise"
                    description="The Back Market Promise means refurbished devices that have been inspected by industry professionals."
                    ctaText="Read more"
                    ctaLink="/promise"
                />
                <CommitmentItem
                    imageSrc={MOCK_IMAGES.commitment4}
                    title="Right to repair"
                    description="It's no secret that your tech works better and lasts longer if you take care of it. Let's talk about fighting fast tech and the Right to repair."
                    ctaText="Read more"
                    ctaLink="/right-to-repair"
                    reverse={true}
                />
                <CommitmentItem
                    imageSrc={MOCK_IMAGES.commitment5}
                    title="We're a certified B-Corp"
                    description="This company meets high standards of social and environmental impact."
                    ctaText="Read more"
                    ctaLink="/b-corp"
                />
            </div>
        </section>
    );
};

const NewsroomSection: React.FC = () => {

    const NewsCard: React.FC<NewsCardProps> = ({ category, title, link, image }) => (
        <a href={link} className="block group rounded-xl bg-white shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl">
            <div className={`w-full aspect-[4/3] ${image ? 'p-0' : 'p-6 bg-[#c7f000]'}`}>
                {image ? (
                    <img src={image} alt={title} className="w-full h-full object-cover" />
                ) : (
                    <div className="flex items-center justify-center w-full h-full text-gray-900 font-bold text-xl">
                        Back Market
                    </div>
                )}
            </div>
            <div className="p-4">
                <p className="text-xs font-semibold text-gray-500 mb-1 uppercase">{category}</p>
                <h5 className="text-base font-medium text-gray-900 group-hover:text-gray-700 transition-colors">{title}</h5>
            </div>
        </a>
    );

    return (
        <section id="newsroom" className="py-20 md:py-32 bg-white">
            <div className="text-center px-4 md:px-8 max-w-7xl mx-auto">
                <h2 className="text-6xl font-serif font-medium text-gray-900 mb-4">Newsroom</h2>
                <p className="text-lg text-gray-600 mb-16">Stay updated with our latest news/stories.</p>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8">
                {/* Latest News */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">Latest News</h3>
                <p className="text-gray-600 mb-6">Press releases, sustainability, partnerships, and more.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    {NEWS_DATA.latest.map((item, index) => (
                        <NewsCard key={index} {...item} image={item.image || (index % 2 === 0 ? MOCK_IMAGES.newsroomPost1 : MOCK_IMAGES.newsroomPost2)} />
                    ))}
                </div>

                {/* Industry Insights */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">Industry Insights</h3>
                <p className="text-gray-600 mb-6">The best in device tips, sustainability resources, buying guides, and beyond.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                    {NEWS_DATA.insights.map((item, index) => (
                        <NewsCard key={index} {...item} />
                    ))}
                </div>

                {/* As Seen In & Press Kit (Combined Block) */}
                <div className="mb-20">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">As seen in</h3>
                    <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-6 mb-16">
                        <img src={MOCK_IMAGES.newsroomAsSeenIn1} alt="The Local London" className="h-8 max-w-[150px] object-contain" />
                        <img src={MOCK_IMAGES.newsroomAsSeenIn2} alt="ads of brands" className="h-8 max-w-[150px] object-contain" />
                        <img src={MOCK_IMAGES.newsroomAsSeenIn3} alt="The Guardian" className="h-8 max-w-[150px] object-contain" />
                    </div>

                    {/* Press Kit */}
                    <div className="flex flex-col lg:flex-row items-center justify-between bg-gray-50 p-6 md:p-12 rounded-3xl shadow-inner">
                        <div className="lg:w-1/2 mb-8 lg:mb-0 text-center lg:text-left">
                            <h4 className="text-3xl font-bold text-gray-900 mb-3">Press Kit</h4>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-md lg:max-w-none mx-auto lg:mx-0">
                                Here you'll find all the visuals and communication materials you need to talk about Back Market in the right way.
                            </p>
                            <CTAButton href="/press-kit.zip" dark={true}>Download press kit</CTAButton>
                        </div>
                        <div className="lg:w-1/2 lg:pl-16 w-full max-w-sm lg:max-w-none">
                            <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-2xl">
                                <img src={MOCK_IMAGES.pressKit} alt="Press resources" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const LeadershipSection: React.FC = () => {
    // Correctly typed useRef for a scrolling div element
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);
    const [scrollPosition, setScrollPosition] = useState(0);

    const scroll = (direction: 'left' | 'right') => { // Explicit type for direction
        const container = scrollContainerRef.current;
        if (container) { // Type-safe check
            const cardWidth = 300; // Estimated card width + margin
            const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
            // scrollBy exists on HTMLDivElement
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    const handleScroll = () => {
        if (scrollContainerRef.current) { // Type-safe check
            setScrollPosition(scrollContainerRef.current.scrollLeft);
        }
    };

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) { // Type-safe check
            container.addEventListener('scroll', handleScroll); // addEventListener exists on HTMLDivElement
            handleScroll(); // Initial position check
            return () => container.removeEventListener('scroll', handleScroll);
        }
    }, []);

    const LeaderCard: React.FC<LeaderCardProps> = ({ name, title, subtitle, image }) => (
        <div className="min-w-[280px] w-[280px] p-4 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden shrink-0">
            <div className="aspect-[4/5] overflow-hidden rounded-lg mb-4">
                <img src={image} alt={name} className="w-full h-full object-cover" />
            </div>
            <h4 className="text-lg font-bold text-gray-900">{name}</h4>
            <p className="text-sm font-medium text-gray-700">{title}</p>
            {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
    );

    return (
        <section id="leadership" className="py-20 md:py-32 bg-[#f8f5f0]">
            <div className="text-center px-4 md:px-8 max-w-7xl mx-auto">
                <h2 className="text-6xl font-serif font-medium text-gray-900 mb-2">Leadership</h2>
                <p className="text-lg text-gray-600 mb-16">Senior Leadership & Board.</p>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8">
                {/* Leadership Team Carousel */}
                <div className="mb-16">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-gray-900">Leadership Team</h3>
                        <div className="flex gap-2">
                            <button
                                onClick={() => scroll('left')}
                                className="p-3 rounded-full bg-gray-900 text-white hover:bg-gray-700 transition-colors disabled:opacity-50"
                                disabled={scrollPosition === 0}
                                aria-label="Scroll left"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => scroll('right')}
                                className="p-3 rounded-full bg-gray-900 text-white hover:bg-gray-700 transition-colors"
                                aria-label="Scroll right"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                    <div
                        ref={scrollContainerRef}
                        className="flex gap-6 overflow-x-scroll pb-4 hide-scrollbar"
                    >
                        {LEADERSHIP_DATA.map((leader, index) => (
                            <LeaderCard key={index} {...leader} />
                        ))}
                    </div>
                </div>

                {/* Investors */}
                <section id="investors" className="py-24 md:py-32 px-4 md:px-8 max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                            Backed by World-Class Investors
                        </h3>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Since 2014, ISMart has raised <span className="font-semibold text-primary-600">$1B+</span> from leading global funds to scale the future of sustainable tech.
                        </p>
                    </div>

                    <div className="relative">
                        {/* Carousel Container */}
                        <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-white to-gray-50/50 shadow-inner">
                            <div className="flex overflow-x-auto snap-x snap-mandatory gap-8 py-8 px-6 md:px-12 scrollbar-hide scroll-smooth">
                                {[
                                    { name: "Aglaé Ventures", logo: MOCK_IMAGES.investor1 },
                                    { name: "Eurazeo", logo: MOCK_IMAGES.investor2 },
                                    { name: "General Atlantic", logo: MOCK_IMAGES.investor3 },
                                    { name: "Goldman Sachs", logo: MOCK_IMAGES.investor4 },
                                    { name: "Generation Investment", logo: MOCK_IMAGES.investor5 },
                                    { name: "Daphni", logo: MOCK_IMAGES.investor6 },
                                    { name: "BPI France", logo: MOCK_IMAGES.investor7 },
                                ].map((investor, index) => (
                                    <div
                                        key={index}
                                        className="flex-shrink-0 w-40 md:w-56 h-36 bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 flex items-center justify-center p-6 transition-all duration-300 hover:scale-105 hover:border-primary-200 snap-center group"
                                    >
                                        <Image
                                            src={investor.logo}
                                            alt={`${investor.name} logo`}
                                            width={140}
                                            height={80}
                                            className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                                            priority={index < 3}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Gradient Fades */}
                        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white via-white to-transparent pointer-events-none" />
                        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white via-white to-transparent pointer-events-none" />

                        {/* Scroll Hint */}
                        <div className="flex justify-center mt-6">
                            <p className="inline-flex items-center text-sm font-medium text-gray-500 animate-pulse">
                                <span className="mr-2">← Swipe to explore →</span>
                            </p>
                        </div>
                    </div>
                </section>
            </div>

            {/* Custom CSS for scrollbar hiding (for aesthetics) */}
            <style jsx global>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;  /* IE and Edge */
                    scrollbar-width: none;  /* Firefox */
                }
            `}</style>
        </section>
    );
};

const ContactCareersSection: React.FC = () => {

    // Explicit type for the image event handler
    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const target = e.currentTarget;
        target.src = 'https://placehold.co/1200x800/e2e8f0/475569?text=Work+at+Back+Market';
        target.onerror = null; // Prevent infinite loop if fallback fails
    };

    const SocialPill: React.FC<SocialPillProps> = ({ href, children }) => (
        <a href={href} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center text-sm font-semibold h-10 px-5 rounded-full border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 transition-colors duration-200"
        >
            {children}
            <X className="w-3 h-3 ml-2 text-gray-500" />
        </a>
    );

    return (
        <div className="font-sans">
            {/* Contact Section (Top Background Part) */}
            <section id="contact" className="py-20 md:py-32 bg-[#f8f5f0]">
                <div className="text-center px-4 md:px-8 max-w-7xl mx-auto">
                    <h2 className="text-6xl font-serif font-medium text-gray-900 mb-2">Contact</h2>
                    <p className="text-lg text-gray-600 mb-12">More questions? We’re here to help.</p>

                    <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                        {/* Press Inquiries – Primary CTA */}
                        <CTAButton href="mailto:press@ismart.com" dark={true}>
                            Press Inquiries
                        </CTAButton>

                        {/* Social Pills */}
                        <SocialPill href="https://instagram.com/ismart">Instagram</SocialPill>
                        <SocialPill href="https://twitter.com/ismart">X</SocialPill>
                        <SocialPill href="https://linkedin.com/company/ismart">LinkedIn</SocialPill>
                        <SocialPill href="https://youtube.com/ismart">YouTube</SocialPill>
                    </div>
                </div>
            </section>

            {/* Careers Section (Bottom Card Part) */}
            <section id="careers-promo" className="pt-8 pb-32 px-4 md:px-8 max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row items-center justify-between bg-gradient-to-br from-white via-gray-50 to-white p-6 md:p-12 rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                    {/* Text + CTA */}
                    <div className="lg:w-1/2 lg:pr-16 mb-10 lg:mb-0 text-center lg:text-left space-y-6">
                        <div className="inline-flex items-center gap-2 text-primary-600 font-semibold text-sm uppercase tracking-wider">
                            <Briefcase className="w-4 h-4" />
                            <span>Careers at ISMart</span>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                            Build the future of <span className="text-primary-600">sustainable tech</span>
                        </h3>
                        <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                            Join a mission-driven team ending fast tech. Work with purpose, grow without limits, and help millions save money — <em>and the planet</em>.
                        </p>

                        <Link
                            href="/careers"
                            className="group inline-flex items-center px-7 py-3.5 bg-green-600 text-white font-semibold text-lg rounded-full hover:bg-green-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-green-400/30 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            See open roles
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>

                    </div>

                    {/* Image – Premium, responsive, with subtle animation */}
                    <div className="lg:w-1/2 w-full">
                        <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl group">
                            <Image
                                src={MOCK_IMAGES.careersBackground}
                                alt="ISMart team collaborating in a modern, eco-friendly office"
                                fill
                                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                            <div className="absolute bottom-4 left-4 right-4 text-white">
                                <p className="text-sm font-medium opacity-90">Remote-friendly • Global impact</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};


// --- Main Page Component ---
const App: React.FC = () => {
    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans">
            <HeroSection />
            <MissionSection />
            <CommitmentsSection />
            <NewsroomSection />
            <LeadershipSection />
            <ContactCareersSection />
        </div>
    );
}

export default App;