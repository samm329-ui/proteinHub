
'use client';

import Navbar from '@/components/Navbar';
import ProteinScroll from '@/components/ProteinScroll';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Phone, Mail, MapPin } from 'lucide-react';
import { productsByCategory } from '@/lib/all-products';
import { bestSellerProducts } from '@/lib/bestseller-products';
import VerticalProductCard from '@/components/VerticalProductCard';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MobileProducts from '@/components/MobileProducts';
import MobileBestSellers from '@/components/MobileBestSellers';
import BottomNavbar from '@/components/BottomNavbar';
import CartSheet from '@/components/CartSheet';

const ProductsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<(typeof productsByCategory)[0] | null>(null);

  const handleCategoryClick = (category: (typeof productsByCategory)[0]) => {
    setSelectedCategory(category);
  };

  const handleClose = () => {
    setSelectedCategory(null);
  };

  return (
    <>
      <section className="hidden py-20 sm:py-32 md:block">
        <div className="container mx-auto px-5">
          <h2 className="text-3xl sm:text-5xl md:text-7xl text-center mb-16 text-white/90">Our Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {productsByCategory.map((category) => (
              <div
                key={category.category}
                className="relative aspect-video flex items-center justify-center bg-card border border-white/10 rounded-2xl cursor-pointer group overflow-hidden"
                onClick={() => handleCategoryClick(category)}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                <h3 className="relative z-20 text-2xl font-bold uppercase text-white/90 transition-transform duration-300 group-hover:scale-105">
                  {category.category}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedCategory && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-lg flex flex-col items-center justify-center p-4 sm:p-8"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/70 hover:text-white/90 transition-colors z-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="w-full h-full flex flex-col"
            >
              <h2 className="text-3xl sm:text-5xl md:text-6xl text-center mb-8 sm:mb-12 text-white/90 shrink-0">
                {selectedCategory.category}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 overflow-y-auto flex-grow w-full max-w-7xl mx-auto p-4">
                {selectedCategory.products.map((product) => (
                  <VerticalProductCard key={product.name} product={product} />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};


const BestSellersSection = () => {
  return (
    <section className="hidden py-20 sm:py-32 md:block">
      <div className="container mx-auto px-5">
        <h2 className="text-3xl sm:text-5xl md:text-7xl text-center mb-12 sm:mb-16 text-white/90">Best Sellers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {bestSellerProducts.map((product) => (
            <VerticalProductCard key={product.name} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};


const GallerySection = () => {
  return (
    <section id="gallery" className="py-12 sm:py-20">
       <div className="container mx-auto px-5 sm:px-0">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
            {PlaceHolderImages.map(image => (
                <div key={image.id} className="relative aspect-[3/4] w-full h-full">
                    <Image 
                        src={image.imageUrl} 
                        alt={image.description}
                        fill
                        className="object-cover grayscale"
                        data-ai-hint={image.imageHint}
                        unoptimized
                    />
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => (
    <section id="contact" className="py-20 sm:py-32">
      <div className="container mx-auto px-5 text-center">
        <h2 className="text-3xl sm:text-5xl md:text-7xl text-center mb-8 text-white/90">Contact Us</h2>
        <p className="text-base text-white/60 leading-relaxed max-w-2xl mx-auto mb-12">
            Whether you have questions about our premium supplements, need guidance on your training regimen, or have any other inquiries, our dedicated team is here and ready to assist you. Please feel free to reach out, and let's start a conversation about how we can help you achieve your fitness goals.
        </p>
        <div className="flex justify-center items-center gap-8 md:gap-12">
            <a href="tel:+15551234567" className="text-white/75 hover:text-white/90 transition-colors">
                <Phone className="w-6 h-6 sm:w-8 sm:h-8" />
            </a>
            <a href="mailto:contact@proteinzone.com" className="text-white/75 hover:text-white/90 transition-colors">
                <Mail className="w-6 h-6 sm:w-8 sm:h-8" />
            </a>
            <a href="#" className="text-white/75 hover:text-white/90 transition-colors">
                <MapPin className="w-6 h-6 sm:w-8 sm:h-8" />
            </a>
        </div>
      </div>
    </section>
);

const AboutUsSection = () => (
    <section id="about" className="py-20 sm:py-32 text-center text-white/90 container mx-auto px-5">
        <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-5xl md:text-7xl mb-8">About Us</h2>
            <p className="text-base text-white/60 leading-relaxed max-w-md mx-auto">
                We are a premium fitness brand dedicated to providing the highest quality supplements to help you achieve your strength and conditioning goals.
            </p>
        </div>
  </section>
);

const Footer = () => (
  <footer className="py-12 pb-24 md:pb-12" suppressHydrationWarning>
    <div className="container mx-auto px-5 text-center text-white/60 text-sm space-y-4">
        <div className="flex flex-col md:flex-row justify-center items-center md:space-x-6 space-y-4 md:space-y-0">
            <a href="#" className="hover:text-white/90 transition-colors">Instagram</a>
            <a href="#" className="hover:text-white/90 transition-colors">Facebook</a>
            <a href="#" className="hover:text-white/90 transition-colors">Privacy</a>
            <a href="#" className="hover:text-white/90 transition-colors">Terms of Service</a>
        </div>
      <p>© ProteinZone</p>
    </div>
  </footer>
);

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const navItems = [
    { label: 'HOME', href: '#home', id: 'home' },
    { label: 'PRODUCTS', href: '#products', id: 'products' },
    { label: 'BEST SELLERS', href: '#bestsellers', id: 'bestsellers' },
    { label: 'GALLERY', href: '#gallery', id: 'gallery' },
    { label: 'CONTACT', href: '#contact', id: 'contact' },
    { label: 'ABOUT', href: '#about', id: 'about' },
  ];

  const bottomNavItems = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'Products', href: '#products', id: 'products' },
    { label: 'Best Sellers', href: '#bestsellers', id: 'bestsellers' },
  ];

  return (
    <div className="bg-background" suppressHydrationWarning>
      <Navbar
        navItems={navItems}
        onNavItemClick={handleScroll}
        onCartClick={() => setIsCartOpen(true)}
        suppressHydrationWarning
      />
      <main suppressHydrationWarning>
        <div id="home">
            <ProteinScroll />
        </div>
        
        <div id="products">
          {/* Desktop View */}
          <div className="hidden md:block">
              <ProductsSection />
          </div>
          
          {/* Mobile View */}
          <div className="md:hidden">
            <MobileProducts />
          </div>
        </div>

        <div id="bestsellers">
          {/* Desktop View */}
          <div className="hidden md:block">
              <BestSellersSection />
          </div>

          {/* Mobile View */}
          <div className="md:hidden">
            <MobileBestSellers />
          </div>
        </div>

        <GallerySection />
        <ContactSection />
        <AboutUsSection />

      </main>
      <Footer />
      <div className="md:hidden">
        <BottomNavbar 
          navItems={bottomNavItems} 
          onNavItemClick={handleScroll} 
          onCartClick={() => setIsCartOpen(true)}
        />
      </div>
       <CartSheet isOpen={isCartOpen} onOpenChange={setIsCartOpen} />
    </div>
  );
}
