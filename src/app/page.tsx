

'use client';

import Navbar from '@/components/Navbar';
import ProteinScroll from '@/components/ProteinScroll';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Phone, Mail, MapPin } from 'lucide-react';
import { products, bestSellers } from '@/lib/products';
import BestSellerCard from '@/components/BestSellerCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const ProductsSection = () => {
  return (
    <section id="products" className="py-20 sm:py-32">
      <div className="container mx-auto px-5">
        <h2 className="text-3xl sm:text-5xl md:text-7xl text-center mb-12 sm:mb-16 text-white/90">Our Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-2xl mx-auto">
          {products.map((product) => (
            <div key={product.name} className="bg-[#111111] p-4 rounded-md text-center h-[56px] flex items-center justify-center">
              <h3 className="text-sm sm:text-base uppercase tracking-wider text-white/90">{product.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const BestSellersSection = () => {
  return (
    <section id="bestsellers" className="py-20 sm:py-32 bg-[#0A0A0A] overflow-hidden">
      <div className="container mx-auto px-5">
        <h2 className="text-3xl sm:text-5xl md:text-7xl text-center mb-16 sm:mb-24 text-white/90">Best Sellers</h2>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full relative"
        >
          <CarouselContent className="-ml-2">
            {bestSellers.map((product, index) => (
              <CarouselItem key={index} className="pl-2 md:basis-1/1 lg:basis-1/1">
                  <BestSellerCard product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-[-2rem] top-1/2 -translate-y-1/2 text-white bg-white/10 border-white/20 hover:bg-white/20" />
          <CarouselNext className="absolute right-[-2rem] top-1/2 -translate-y-1/2 text-white bg-white/10 border-white/20 hover:bg-white/20" />
        </Carousel>
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
  <footer className="py-12" suppressHydrationWarning>
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

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const targetPosition = targetElement.offsetTop;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 1000;
      let startTime: number | null = null;

      const animation = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
      };

      const ease = (t: number, b: number, c: number, d: number) => {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
      };

      requestAnimationFrame(animation);
    }
  };
  
  const navItems = [
    { label: 'HOME', href: '#home' },
    { label: 'PRODUCTS', href: '#products' },
    { label: 'BEST SELLERS', href: '#bestsellers' },
    { label: 'GALLERY', href: '#gallery' },
    { label: 'CONTACT', href: '#contact' },
    { label: 'ABOUT', href: '#about' },
  ];

  return (
    <div className="bg-[#050505]" suppressHydrationWarning>
      <Navbar
        navItems={navItems}
        onNavItemClick={handleScroll}
        suppressHydrationWarning
      />
      <main suppressHydrationWarning>
        <div id="home">
          <ProteinScroll />
        </div>
        <div className="h-20 md:h-32 bg-transparent"></div>
        <ProductsSection />
        <BestSellersSection />
        <GallerySection />
        <ContactSection />
        <AboutUsSection />
      </main>
      <Footer />
    </div>
  );
}
