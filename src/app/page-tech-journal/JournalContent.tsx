"use client";
import Header from '@/components/layout/header/header';
import Footer from '@/components/layout/footer/footer';
import React, { useState } from 'react';
import {
    Smartphone, Laptop, Gamepad2, Tablet, Watch, Headphones, Home, Camera, Book,
    CalendarDays, Newspaper, Lightbulb, RefreshCcw, ChevronRight, ChevronUp, Mail
} from 'lucide-react';

// --- TYPE DEFINITION FOR ARTICLES ---
interface Article {
    id: number; 
    title: string;
    category: string;
    link: string;
    img?: string;
    bg?: string; 
    subtitle?: string;
    isVideo?: boolean;
    isAudio?: boolean;
}



const communityArticles: Article[] = [
    { id: 1, bg: '#d4ff00', title: 'SERPENT: The hated', subtitle: 'Introducing Serpent, ISmart\'s new free game', category: 'Technology Articles', link: '/journal/serpent-game' },
    { id: 2, img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop', title: 'Why 2025 has seen a retro gaming boom', category: 'Technology Articles', link: '/journal/retro-gaming' },
    { id: 3, img: 'https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?w=400&h=300&fit=crop', title: '"This is just the beginning" - inside ISmart\'s first NY event', category: 'Technology Articles', link: '/journal/ny-event' },
    { id: 4, bg: '#d4ff00', title: 'The revival of VHS', category: 'Technology Articles', link: '/journal/vhs-revival', isVideo: true },
    { id: 5, img: 'https://images.unsplash.com/photo-1533745848-0c3631401340?q=80&w=400&h=300&fit=crop', title: 'How a Slow Tech Uprising is changing the world', category: 'Technology Articles', link: '/journal/slow-tech' },
    { id: 6, bg: '#d4ff00', title: 'New Podcast: The Sound of Silence', subtitle: 'How wired headphones are making a comeback', category: 'Audio', link: '/journal/podcast-wired-phones', isAudio: true },
    { id: 7, img: 'https://images.unsplash.com/photo-1594904265780-6ee9797305d2?q=80&w=400&h=300&fit=crop', title: 'Charlie Gill takes a trip around London Tech Week', category: 'Events', link: '/journal/london-tech-week' },
    { id: 8, img: 'https://images.unsplash.com/photo-1530911258102-bc108871408f?q=80&w=400&h=300&fit=crop', title: 'ISmart at SXSW: "We want to create a joyful...', category: 'Events', link: '/journal/sxsw-event' },
];

const yourTechArticles: Article[] = [
    
    { id: 9, bg: '#d4ff00', title: '"You can feel assured" - ISmart\'s reaction to iPhone insurance claims', category: 'Tech Education Articles', link: '/journal/iphone-insurance' },
    { id: 10, img: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400&h=300&fit=crop', title: 'Inside ISmart\'s gallery combatting climate change', category: 'Tech Education Articles', link: '/journal/climate-gallery' },
    { id: 11, img: 'https://images.unsplash.com/photo-1592286927505-d4d6b2e95280?w=400&h=300&fit=crop', title: 'Why the Apple Watch is the perfect study buddy', category: 'Technology Articles', link: '/journal/apple-watch-study' },
    { id: 12, img: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=400&h=300&fit=crop', title: 'iPhone 17 Review – innovative or a let down?', category: 'iPhone', link: '/journal/iphone-17-review' },
    { id: 13, img: 'https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=400&h=300&fit=crop', title: 'Back to School facts: 88% of children are pressuring their parents', category: 'Tech Insights & Industry Truths', link: '/journal/back-to-school' },
    { id: 14, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop', title: 'Best refurbished laptops for 2025', category: 'Laptops', link: '/journal/best-laptops-2025' },
    { id: 15, img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop', title: 'Best MacBook for students in 2025', category: 'MacBook', link: '/journal/best-macbook-students' },
    { id: 16, img: 'https://images.unsplash.com/photo-1594904265780-6ee9797305d2?q=80&w=400&h=300&fit=crop', title: 'Who sells on Back Market?', category: 'News', link: '/journal/who-sells' },
    { id: 17, img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop', title: 'Best refurbished tablets for 2025', category: 'Tablets', link: '/journal/best-tablets' },
    { id: 18, img: 'https://images.unsplash.com/photo-1533745848-0c3631401340?q=80&w=400&h=300&fit=crop', title: 'Everything you need for Back to School', category: 'Technology Articles', link: '/journal/back-to-school-guide' },
    { id: 19, img: 'https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?w=400&h=300&fit=crop', title: 'How to check if an iPhone is fake or genuine: a...', category: 'iPhone', link: '/journal/fake-iphone-guide' },
    { id: 20, img: 'https://images.unsplash.com/photo-1594904265780-6ee9797305d2?q=80&w=400&h=300&fit=crop', title: 'Why is my phone screen black? Fixing guide', category: 'General smartphone article knowledge hub', link: '/journal/black-screen-fix' },
];

const endFastTechArticles: Article[] = [
    { id: 17, img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop', title: 'What next for 400m soon-to-be obsolete PCs?', category: 'Technology Articles', link: '/journal/obsolete-pcs' },
    { id: 18, img: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=300&fit=crop', title: 'Four things we learned from Fixfest 2025', category: 'News', link: '/journal/fixfest-2025' },
    { id: 19, bg: '#fff', title: 'Compatible Parts 101', category: 'Tech Education Articles', link: '/journal/compatible-parts' },
    { id: 20, bg: '#d4ff00', title: 'Why it\'s important to recycle your tech', category: 'Tech Education Articles', link: '/journal/recycle-tech' },
    { id: 21, bg: '#d4ff00', title: 'ISmart heads to Parliament with The Restart Project', category: 'Tech Education Articles', link: '/journal/parliament-restart' },
    { id: 22, img: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=300&fit=crop', title: 'Why breaking up with fast tech is crucial for the planet', category: 'Tech Education Articles', link: '/journal/break-fast-tech' },
    { id: 23, img: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=300&fit=crop', title: 'Inside Agbogbloshie electronic waste dump in Ghana', category: 'Tech Education Articles', link: '/journal/agbogbloshie' },
    { id: 24, img: 'https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?w=400&h=300&fit=crop', title: 'Get political: Support your right to repair', category: 'Technology Articles', link: '/journal/right-to-repair' },
    { id: 25, bg: '#d4ff00', title: 'Why you can\'t always update your phone', category: 'Tech Education Articles', link: '/journal/phone-updates' },
    { id: 26, img: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=400&h=300&fit=crop', title: 'Why we need a right to repair movement', category: 'Tech Education Articles', link: '/journal/repair-movement' },
    { id: 27, img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=300&fit=crop', title: 'She comes first: Help Mother Earth by recycling your old tech', category: 'News', link: '/journal/mother-earth' },
    { id: 28, img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop', title: 'This illustrative book educates kids on the circular economy', category: 'Tech Education Articles', link: '/journal/kids-circular-economy' },
];


export default function JournalContent() {
    const [email, setEmail] = useState('');
    const [learnMore, setLearnMore] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Subscribed:', email);
        setSubmitted(true);
        setEmail('');
        setTimeout(() => setSubmitted(false), 3000);
    };

    
    const categories = [
        { title: 'Smartphones', icon: <Smartphone size={24} />, link: '/smartphones', items: ['General', 'iPhones', 'Samsung'] },
        { title: 'Computers', icon: <Laptop size={24} />, link: '/computers', items: ['MacBooks', 'Laptops', 'Windows', 'Chromebooks'] },
        { title: 'Game consoles', icon: <Gamepad2 size={24} />, link: '/game-consoles', items: ['PlayStation', 'Xbox', 'Nintendo'] },
        { title: 'Tablets', icon: <Tablet size={24} />, link: '/tablets', items: ['Samsung Tab', 'General', 'iPads'] },
        { title: 'Smartwatches', icon: <Watch size={24} />, link: '/smartwatches', items: ['General', 'Apple Watches', 'Garmin watches'] },
        { title: 'Audio', icon: <Headphones size={24} />, link: '/audio', items: ['iPod', 'Speakers', 'Headsets & earphones'] },
        { title: 'Home Appliances', icon: <Home size={24} />, link: '/home-appliances', items: ['Small appliances'] },
        { title: 'Photo & videos', icon: <Camera size={24} />, link: '/photo-videos', items: [] },
        { title: 'Tech education', icon: <Book size={24} />, link: '/tech-education', items: ['Technology', 'Tech Experts'] },
        { title: 'Events', icon: <CalendarDays size={24} />, link: '/events', items: ['Black Friday', 'Christmas', 'News'] },
        { title: 'Press', icon: <Newspaper size={24} />, link: '/press', items: ['Press releases'] },
        { title: 'Tech Insights & Industry Truths', icon: <Lightbulb size={24} />, link: '/tech-insights', items: [] },
        { title: 'Trade-in', icon: <RefreshCcw size={24} />, link: '/trade-in', items: ['Phone Trade-in'] },
    ];

    // --- RENDER FUNCTION ---
    const renderArticleCard = (article: Article) => (
        <a key={article.id} href={article.link} className="group block">
            <div className={`rounded-2xl overflow-hidden shadow-md group-hover:shadow-2xl transition-all duration-300 h-64 ${article.img ? '' : 'flex items-center justify-center p-6'}`}
                style={article.img ? {} : { backgroundColor: article.bg, color: article.bg === '#d4ff00' ? '#000' : '#000' }}>
                {article.img ? (
                    <img src={article.img} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                    <div className="text-center">
                        {/* Audio and Video icons only show for background-colored cards */}
                        {article.isVideo && (
                            <svg className="w-12 h-12 mx-auto mb-2 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                            </svg>
                        )}
                        {article.isAudio && (
                            <svg className="w-12 h-12 mx-auto mb-2 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6zm-2 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
                            </svg>
                        )}
                        <p className="text-xl md:text-2xl font-bold leading-tight px-2">{article.title}</p>
                        {article.subtitle && <p className="text-sm mt-2 font-medium">{article.subtitle}</p>}
                    </div>
                )}
            </div>
            <p className="text-xs text-gray-500 mt-4 mb-2 uppercase tracking-wider">{article.category}</p>
            <h3 className="font-bold text-gray-900 group-hover:underline leading-tight">{article.title}</h3>
        </a>
    );

    // --- RENDERED COMPONENT JSX ---

    return (
        
        <div className="min-h-screen bg-white">
            <Header/>
            {/* Hero Section with Background Image */}
            <section
                className="relative h-[600px] bg-cover bg-center flex items-center"
                style={{

                    backgroundImage: "url('Hero-tech-journal.avif')",
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"></div>
                <div className="relative z-10 max-w-7xl mx-auto px-8 text-left text-white"> {/* Adjusted max-w and text-align */}
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">ISmart Tech Journal</h1> {/* Updated title */}
                    <p className="text-xl md:text-2xl mb-10 text-white">Device guides, sustainability news, tech culture, advocacy and more.</p> {/* Adjusted text color */}
                    <div className="flex flex-wrap justify-start gap-4"> {/* Adjusted justify-start */}
                        <a href="#your-tech" className="inline-flex items-center px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl">
                            Your tech
                            <ChevronRight className="ml-2 w-5 h-5" />
                        </a>
                        <a href="#end-fast-tech" className="inline-flex items-center px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl">
                            End fast tech
                            <ChevronRight className="ml-2 w-5 h-5" />
                        </a>
                        <a href="#tech-community" className="inline-flex items-center px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl">
                            Tech community
                            <ChevronRight className="ml-2 w-5 h-5" />
                        </a>
                    </div>
                </div>
            </section>
            {/* Your Tech Section */}
            <section id="your-tech" className="max-w-7xl mx-auto px-4 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Your tech</h2>
                    <p className="text-xl text-gray-600">Tips, tricks, and insights to find the best device for you (and your wallet)</p>
                </div>

                {/* Category Pills - This uses the exact style from the image */}
                <div className="flex flex-wrap justify-center gap-4 mb-16">
                    {['Smartphones', 'Computers', 'Consoles & gaming', 'Tablets', 'Smartwatches', 'Audio', 'Home appliances'].map((cat) => (
                        <a 
                            key={cat} 
                            href={`#${cat.toLowerCase().replace(/\s+/g, '-')}`} 
                            className="inline-flex items-center px-6 py-2 text-gray-700 hover:text-black font-medium transition-colors border-b-2 border-transparent hover:border-black"
                        >
                            {cat}
                            <ChevronRight className="ml-2 w-4 h-4" />
                        </a>
                    ))}
                </div>

                {/* Articles Grid - 4 columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {yourTechArticles.map((article) => renderArticleCard(article))}
                </div>
            </section>

            {/* End Fast Tech Section */}
            <section id="end-fast-tech" className="bg-gray-50 py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">End fast tech</h2>
                        <p className="text-xl text-gray-600">Empowering people and the planet through the circular tech economy.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {endFastTechArticles.map((article) => renderArticleCard(article))}
                    </div>
                </div>
            </section>

            {/* Tech Community Section */}
            <section id="tech-community" className="py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">Tech community</h2>
                        <p className="text-xl text-gray-600">The latest updates from the brands and individuals shaping tech.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {communityArticles.map(renderArticleCard)}
                    </div>
                </div>
            </section>

            {/* All Categories Section */}
            <section className="bg-gray-50 py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-12">All categories</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
                        {categories.map((category, i) => (
                            <div key={i}>
                                <a href={category.link} className="flex items-center gap-3 mb-4 group">
                                    <span className="text-gray-700 group-hover:text-black transition-colors">
                                        {category.icon}
                                    </span>
                                    <h3 className="font-bold text-gray-900 group-hover:underline">{category.title}</h3>
                                </a>
                                {category.items.length > 0 && (
                                    <ul className="space-y-2 ml-8">
                                        {category.items.map((item, j) => (
                                            <li key={j}>
                                                <a href={`${category.link}/${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-gray-600 hover:text-black text-sm transition-colors hover:underline">
                                                    {item}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="bg-[#f5f3ed] py-20">
                <div className="max-w-3xl mx-auto px-4">
                    <div className="text-center mb-8">
                        <h2 className="text-5xl font-bold mb-4 text-gray-900">Knock the socks off your inbox.</h2>
                        <p className="text-lg text-gray-800">Exclusive offers and content delivered right to your (digital) front door.</p>
                    </div>

                    {submitted ? (
                        <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6 text-center text-green-700 font-semibold mb-6">
                            ✓ Successfully subscribed! Check your inbox.
                        </div>
                    ) : (
                        <div className="flex flex-col sm:flex-row gap-3 mb-6">
                            <div className="flex-1 relative">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-5 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white"
                                    required
                                />
                                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            </div>
                            <button
                                onClick={handleSubmit}
                                className="px-8 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors whitespace-nowrap"
                            >
                                Hit me
                            </button>
                        </div>
                    )}

                    <button
                        onClick={() => setLearnMore(!learnMore)}
                        className="flex items-center gap-2 text-sm font-medium mx-auto hover:text-gray-600 mb-4 transition-colors"
                    >
                        <ChevronUp className={`w-4 h-4 transition-transform duration-300 ${learnMore ? '' : 'rotate-180'}`} />
                        Learn more
                    </button>

                    <div className={`overflow-hidden transition-all duration-300 ${learnMore ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="text-sm text-gray-700 leading-relaxed space-y-3">
                            <p>By subscribing, you agree to receive our promotional communications via email. You can unsubscribe at any time using the link in any of our marketing emails, or request to access, rectify or delete your data.</p>
                            <p className="font-semibold">
                                <a href="/privacy" className="underline hover:no-underline">For more details, please refer to our privacy policy.</a>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </div>
        
    );
}