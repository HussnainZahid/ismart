
export interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  condition: string;
}

export interface Testimonial {
  id: number;
  name: string;
  quote: string;
  product: string;
  rating: number;
}