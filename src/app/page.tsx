import Hero from '../components/home/Hero';
import FeaturedProducts from '../components/home/FeaturedProducts';
import Sustainability from '../components/home/Sustainability';
import Testimonials from '../components/home/Testimonials';
import BuybackCTA from '../components/home/BuybackCTA';
import Tradein from '../components/home/Tradein';
import Newsletter from '../components/home/Newsletter';
import Refurbished from '../components/home/Refurbished';

import { testimonials } from '../lib/data'; // Removed featuredProducts import

export default function Home() {
  return (
    <>
      <FeaturedProducts />
      <Hero />
      <Sustainability />
      <Testimonials testimonials={testimonials} />
      <Refurbished/>
      <Tradein/>
      <Newsletter />

      <BuybackCTA />
      
    </>
  );
}