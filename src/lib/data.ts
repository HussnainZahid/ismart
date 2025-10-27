import { Product, Testimonial } from '../types';

export const featuredProducts: Product[] = [
  {
    id: 1,
    name: 'iPhone 15 Pro Max 256GB - Black Titanium - Unlocked',
    price: '£799',
    image: '/images/iphone-15.jpg', // Add to public/images
    condition: 'Excellent',
  },
  // Add 4 more for carousel/grid
  {
    id: 2,
    name: 'Galaxy S22 5G 128GB - Green - Unlocked',
    price: '£399',
    image: '/images/galaxy-s22.jpg',
    condition: 'Very Good',
  },
  {
    id: 3,
    name: 'Apple AirPods Pro 2nd gen - MagSafe Charging case',
    price: '£149',
    image: '/images/airpods-pro.jpg',
    condition: 'Like New',
  },
  {
    id: 4,
    name: 'iPad Pro 11" (2020) 512GB - Wi-Fi - Space Gray',
    price: '£699',
    image: '/images/ipad-pro.jpg',
    condition: 'Excellent',
  },
  {
    id: 5,
    name: 'iPhone 11 Pro 64GB - Midnight Green - Unlocked',
    price: '£299',
    image: '/images/iphone-11.jpg',
    condition: 'Good',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Vlad H.',
    quote: 'Great value, phone came quickly, and it was indeed as described: excellent condition. The one thing I was worried about was the battery health. The phone came with 100% battery health, and only 66 cycle counts. Overall mint, brand new, out of the box condition. Would recommend and would definitely come back to ISmart in the future!',
    product: 'iPhone 15 Pro Max 256GB - Black Titanium - Unlocked',
    rating: 5,
  },
  // Add 9 more based on document; truncate quotes for brevity in code
  {
    id: 2,
    name: 'Ravi G.',
    quote: 'Bought a Samsung s22 green colour - chose condition excellent - which it was - am very happy... Delivery on selected time slot - delivery driver also friendly 10/10',
    product: 'Galaxy S22 5G 128GB - Green - Unlocked',
    rating: 5,
  },
  {
    id: 3,
    name: 'Macy W.',
    quote: 'Such a good deal. I’m not much of a tech guru so I really can’t tell any difference from a new product. The sound quality is amazing... Yet to see how good the battery life is',
    product: 'Apple AirPods Pro 2nd gen (2022) - MagSafe (Lightning) Charging case',
    rating: 5,
  },
  // ... (Continue with remaining from document)
];