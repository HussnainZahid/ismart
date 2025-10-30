'use client';
import CountUp from 'react-countup';
import Link from "next/link";

import { ShieldCheck, RefreshCcw, Wrench, Handshake, DollarSign, Leaf } from "lucide-react";
// Define the component props interface to resolve TypeScript errors (7031, 2741)
interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string; // Make className optional
}

export default function PageTech() {
  // Utility function to simulate Next.js Link behavior with <a> and proper typing
  const LinkComponent: React.FC<LinkProps> = ({ href, children, className }) => (
    <a href={href} className={className}>
      {children}
    </a>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* Header - assuming a common header for navigation would be here */}

      <main>
        {/* Section 1: Hero Video */}
        <section className="relative py-20 px-4 md:py-28 lg:py-32 text-center overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50">
          <div className="max-w-7xl mx-auto">
            {/* Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight bg-gradient-to-r from-gray-900 via-primary-800 to-primary-600 bg-clip-text text-transparent drop-shadow-2xl">
              Let's end <span className="block md:inline">fast phone tech.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-700 max-w-4xl mx-auto mb-16 leading-relaxed font-medium">
              Phones have never been more powerful. So why do we throw them away every year for the "next big thing"?
            </p>

            {/* Video Player */}
            <div className="relative w-full max-w-6xl mx-auto aspect-video bg-black rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-3xl"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&loop=1&playlist=dQw4w9WgXcQ&controls=1&modestbranding=1&rel=0"
                title="End Fast Phone Tech – ISmart"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              ></iframe>

              {/* Video Overlay Text */}
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 bg-gradient-to-t from-black/95 via-black/70 to-transparent text-white rounded-b-3xl">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 leading-tight">
                  How many <i className="italic text-primary-400">upgrades</i> do we have left?
                </h2>
                <p className="text-lg md:text-xl text-gray-300 mt-3 max-w-3xl mx-auto">
                  Every new device comes at a cost to the planet. It's time to break the cycle.
                </p>
              </div>

              {/* Play Icon Overlay (Optional Visual Cue) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center animate-pulse">
                  <svg className="w-10 h-10 md:w-12 md:h-12 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7L8 5z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Trust Badges (Optional) */}
            <div className="flex flex-wrap justify-center gap-6 mt-12 text-sm text-gray-600">
              <span className="flex items-center">
                <svg className="w-5 h-5 text-emerald-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Certified Refurbished
              </span>
              <span className="flex items-center">
                <svg className="w-5 h-5 text-emerald-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                1-Year Warranty
              </span>
              <span className="flex items-center">
                <svg className="w-5 h-5 text-emerald-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                92% Less CO₂
              </span>
            </div>
          </div>
        </section>

        {/* Section 2: Fast Tech Impact */}
        <section className="bg-white py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-sm text-gray-600 mb-8">
              Fast tech’s race to release the “most innovative device ever” every year is fueling the climate crisis.
            </p>

            <p className="text-lg text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
              Fast tech is the system of overproduction and overconsumption that thrives on devices designed to be
              disposed of — either when they break down or become obsolete thanks to the latest “upgrade.”
            </p>

            <p className="text-lg text-gray-700 mb-16 max-w-3xl mx-auto leading-relaxed">
              It’s everywhere you look — in our pockets, our economy, and especially our waste. It’s time we face
              the impact of fast tech on our planet.
            </p>

            {/* Statistics Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-20">
              <div className="bg-gray-100 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="text-6xl font-extrabold text-black mb-4">
                  <CountUp start={0} end={16} duration={2.5} />{" "}
                  <span className="text-2xl align-top">billion</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">We’re overproducing tech</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Smartphones currently in circulation — that’s about two per person across the entire global population
                  (yes, including babies).
                </p>
              </div>

              <div className="bg-gray-100 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="text-6xl font-extrabold text-black mb-4">
                  <CountUp start={0} end={82} duration={2.5} />{" "}
                  <span className="text-2xl align-top">%</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">We’re creating more e-waste</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Global e-waste has increased by 82% since 2010 — sprawling dumps now stretch from Hong Kong to Mexico.
                </p>
              </div>

              <div className="bg-gray-100 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="text-6xl font-extrabold text-black mb-4">
                  <CountUp start={0} end={40} duration={2.5} />{" "}
                  <span className="text-2xl align-top">%</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">We’re expanding our carbon footprint</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Manufacturing alone accounts for 40% of the total carbon footprint of digital technology.
                </p>
              </div>
            </div>

            <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-6 leading-relaxed">
              We can still enjoy the benefits of modern tech while reducing our environmental impact. Instead of buying
              into the upgrade cycle or letting old devices collect dust — or worse, end up in landfills — we can extend
              their lives and give the planet a breather.
            </p>

            <p className="text-xl font-semibold text-gray-900">
              The best part? It’s not hard.
            </p>
          </div>
        </section>

        {/* Section 3: Solutions - Reuse, Repair, Refurbish */}
        
        <section className="bg-gray-50 py-20 px-4">
          <div className="max-w-6xl mx-auto">
            {/* Reuse / Repair / Refurbish Section */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {/* Reuse */}
              <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                <div className="relative w-full h-48 mb-4">
                  <img
                    src="/Reuse-1.png"
                    alt="Reuse Technology"
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">Reuse</h3>
                <ul className="text-gray-700 text-left space-y-3 w-full">
                  <li className="flex items-start">
                    <ShieldCheck className="w-5 h-5 mr-3 text-gray-800 flex-shrink-0" />
                    <span>Make your tech last by using protective cases and accessories.</span>
                  </li>
                  <li className="flex items-start">
                    <RefreshCcw className="w-5 h-5 mr-3 text-gray-800 flex-shrink-0" />
                    <span>Pass along your tech to family, friends, or those in need.</span>
                  </li>
                </ul>
              </div>

              {/* Repair */}
              <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                <div className="relative w-full h-48 mb-4">
                  <img
                    src="/Repair-1.png"
                    alt="Repair Tools"
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">Repair</h3>
                <ul className="text-gray-700 text-left space-y-3 w-full">
                  <li className="flex items-start">
                    <Wrench className="w-5 h-5 mr-3 text-gray-800 flex-shrink-0" />
                    <span>Replacing parts and keeping devices clean improves performance.</span>
                  </li>
                  <li className="flex items-start">
                    <Handshake className="w-5 h-5 mr-3 text-gray-800 flex-shrink-0" />
                    <span>Support the Right to Repair movement and empower repair culture.</span>
                  </li>
                </ul>
                <Link
                  href="/let-s-go"
                  className="mt-6 inline-block px-8 py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-colors"
                >
                  Let's Go
                </Link>
              </div>

              {/* Refurbish */}
              <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                <div className="relative w-full h-48 mb-4">
                  <img
                    src="/Refurbish-1.png"
                    alt="Refurbished Phone"
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">Refurbish</h3>
                <ul className="text-gray-700 text-left space-y-3 w-full">
                  <li className="flex items-start">
                    <DollarSign className="w-5 h-5 mr-3 text-gray-800 flex-shrink-0" />
                    <span>Trade in old tech for cash or credit when upgrading.</span>
                  </li>
                  <li className="flex items-start">
                    <Leaf className="w-5 h-5 mr-3 text-gray-800 flex-shrink-0" />
                    <span>Choose refurbished tech — up to 92% less carbon emissions than new.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Meet the Computer Section */}
            <div className="flex flex-col md:flex-row items-center bg-lime-200 p-8 md:p-12 rounded-2xl shadow-lg">
              <div className="md:w-1/2 md:pr-8 text-center md:text-left mb-8 md:mb-0">
                <h2 className="text-3xl font-bold mb-4 text-gray-900">
                  Meet the computer we're not supposed to sell you{" "}
                  <span className="italic">(anymore).</span>
                </h2>
                <p className="text-gray-800 mb-6 leading-relaxed">
                  Big Tech tried to make these computers obsolete — we can’t let that happen.
                  We’ve given them a secure, up-to-date operating system and are offering them
                  at a fraction of the cost. Available for a limited time only.
                </p>
                <Link
                  href="/shop-now"
                  className="px-8 py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-colors"
                >
                  Shop Now
                </Link>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div className="relative w-full max-w-sm h-64">
                  <img
                    src="/computer.png"
                    alt="Refurbished Computer"
                    className="w-full h-full object-contain rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Ready to end fast tech? */}
        <section className="bg-white py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-extrabold mb-12 text-gray-900">
              Ready to end fast tech?
            </h2>

            {/* Action Cards */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="bg-gray-900 p-8 rounded-2xl shadow-lg text-white transition-transform hover:-translate-y-1 hover:shadow-xl">
                <h3 className="text-2xl font-bold mb-4">Educate Yourself</h3>
                <p className="text-gray-300 mb-6">Learn more about fast tech and its impact.</p>
                <LinkComponent
                  href="/educate"
                  className="inline-block px-8 py-3 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-200 transition-colors"
                >
                  Start Now
                </LinkComponent>
              </div>

              <div className="bg-gray-900 p-8 rounded-2xl shadow-lg text-white transition-transform hover:-translate-y-1 hover:shadow-xl">
                <h3 className="text-2xl font-bold mb-4">Get Political</h3>
                <p className="text-gray-300 mb-6">Advocate for your right to repair.</p>
                <LinkComponent
                  href="/advocate"
                  className="inline-block px-8 py-3 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-200 transition-colors"
                >
                  Take Action
                </LinkComponent>
              </div>
            </div>

            {/* Latest News */}
            <h2 className="text-3xl font-bold mb-8 text-left text-gray-900">
              Latest News
            </h2>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  src: "/Article-1.png",
                  alt: "Article 1",
                  category: "Tech Education Articles",
                  title: "Why breaking up with fast tech is crucial for the...",
                  href: "/article/breaking-up-with-fast-tech",
                },
                {
                  src: "/Article-2.png",
                  alt: "Right to Repair",
                  category: "Technology Articles",
                  title: "Get political! Support your right to repair",
                  href: "/article/get-political-support-right-to-repair",
                },
                {
                  src: "/Article-3.png",
                  alt: "Repair Movement",
                  category: "Tech Education Articles",
                  title: "Why we need a right to repair movement",
                  href: "/article/why-we-need-right-to-repair-movement",
                },
                {
                  src: "/Article-4.png",
                  alt: "Update Phone",
                  category: "Tech Education Articles",
                  title: "Why you can't always update your phone",
                  href: "/article/why-you-cant-always-update-your-phone",
                },
              ].map((article, index) => (
                <article
                  key={index}
                  className="bg-gray-100 rounded-2xl shadow hover:shadow-lg transition-shadow overflow-hidden text-left"
                >
                  <div className="relative w-full h-48">
                    <img
                      src={article.src}
                      alt={article.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-gray-600 mb-1">{article.category}</p>
                    <h3 className="font-semibold text-lg hover:text-blue-600 transition-colors">
                      <LinkComponent href={article.href}>{article.title}</LinkComponent>
                    </h3>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>


        {/* Section 5: Sources */}
        <section className="bg-gray-50 py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <details className="group border border-gray-200 rounded-2xl bg-white shadow-sm transition-all duration-300 hover:shadow-md">
              <summary className="flex justify-between items-center cursor-pointer text-2xl font-semibold px-6 py-4 select-none">
                <span className="text-gray-900">Sources</span>
                <span className="transition-transform duration-300 group-open:rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>

              <div className="prose prose-sm max-w-none text-gray-700 border-t border-gray-100 px-6 py-4 bg-gray-50 rounded-b-2xl">
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    The total digital industry accounts for{" "}
                    <a
                      href="https://theshiftproject.org/en/article/lean-ict-our-new-report/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      4% of global greenhouse gas emissions
                    </a>{" "}
                    and could represent{" "}
                    <a
                      href="https://theshiftproject.org/en/article/lean-ict-our-new-report/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      14% of total global emissions by 2040
                    </a>
                    , all else being equal.
                  </li>
                  <li>
                    In 2022, there were{" "}
                    <a
                      href="https://www.itu.int/hub/2022/10/ewaste-2022-phones/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      16 billion phones in circulation worldwide, and 5.3 billion of them became waste
                    </a>
                    .
                  </li>
                  <li>
                    <a
                      href="https://www.weforum.org/agenda/2023/02/global-e-waste-recycling-sustainability/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      E-waste volume is growing five times faster
                    </a>{" "}
                    than documented e-waste recycling.
                  </li>
                  <li>
                    On average,{" "}
                    <a
                      href="https://theshiftproject.org/en/article/lean-ict-our-new-report/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      40% of digital technology’s greenhouse gas emissions come from manufacturing
                    </a>
                    .
                  </li>
                  <li>
                    Up to{" "}
                    <a
                      href="https://aemie.org/en/environmental-assessment-refurbished-products/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      92% less carbon emissions than new
                    </a>
                    . (AEMIE, 2022)
                  </li>
                </ul>
              </div>
            </details>
          </div>
        </section>

      </main>


    </div>
  );
}
