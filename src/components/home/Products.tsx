"use client";

import React from 'react';

// Define the structure for a product category item
interface ProductCategory {
  name: string;
  imageUrl: string;
  alt: string;
  link: string; // The URL for the category page
}

// Mock data for the product categories, focused on phones and related accessories
const productCategories: ProductCategory[] = [
  { name: "iPhone", imageUrl: "/refurbished-iphone.png", alt: "Refurbished iPhones", link: "/products?category=iphone" },
  { name: "Android Phones", imageUrl: "/refurbished-android.png", alt: "Refurbished Android smartphones", link: "/products?category=android" },
  { name: "Accessories", imageUrl: "/accessories.png", alt: "Mobile Phone Accessories (e.g., cases, chargers)", link: "/products?category=accessories" },
  { name: "Good deals", imageUrl: "/good-deals.png", alt: "Best deals on phones and bundles", link: "/products?filter=deals" },
];

const Products: React.FC = () => {
  // Use a bright lime/chartreuse color for the primary accent (matching the picture)
  const accentColor = "bg-lime-200"; 
  const accentHoverColor = "text-lime-700";
  const titleAccentBorder = "border-lime-500";

  return (
    // Updated to bg-white for a clean, full-width section background
    <section className="bg-white py-12 md:py-20 font-sans"> 
      {/* Container is now max-width only, not setting the full section background */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 
        {/* Section Title matching the template picture's style */}
        <h2 className={`text-2xl md:text-3xl font-extrabold text-gray-900 mb-10 border-l-4 ${titleAccentBorder} pl-4`}>
          Shop our most wanted
        </h2>

        {/* Grid layout for the product categories (always 4 items wide on desktop) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {productCategories.map((category) => (
            // Anchor tag for navigation
            <a
              key={category.name}
              href={category.link}
              aria-label={`View products in ${category.name} category`}
              // Apply borderless, soft shadow look matching the picture
              className="group block rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-lime-500/70 bg-white"
            >
              {/* Image Box: Prominent Lime Background */}
              <div className={`relative ${accentColor} aspect-square flex items-center justify-center p-4 rounded-t-xl transition-colors duration-300 group-hover:bg-lime-300`}>
                <img
                  src={category.imageUrl}
                  alt={category.alt}
                  // Using responsive sizing hints
                  width={150} 
                  height={150} 
                  // Image is centered and contained, occupying about 70-80% of the box
                  className="w-full h-full p-6 object-contain transition-transform duration-300 group-hover:scale-105"
                  // Fallback for missing images
                  onError={(e) => {
                    (e.target as HTMLImageElement).onerror = null; 
                    (e.target as HTMLImageElement).src = 'https://placehold.co/150x150/d9f99d/333333?text=PHONE';
                  }}
                />
              </div>

              {/* Text Box: White background (matches the picture's layout) */}
              <div className="p-4 text-center bg-white rounded-b-xl">
                <p className={`text-sm sm:text-base font-semibold text-gray-800 transition-colors duration-300 ${accentHoverColor}`}>
                  {category.name}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
