
'use client';

import Navbar from '@/components/Navbar';
import ProteinScroll from '@/components/ProteinScroll';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Phone, Mail, MapPin, Plus, Minus, ArrowRight, ArrowLeft, Heart, CheckCircle } from 'lucide-react';
import { products, bestSellers, type Flavor } from '@/lib/products';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

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
        <section id="bestsellers" className="py-20 sm:py-32">
            <div className="container mx-auto px-5">
                <h2 className="text-3xl sm:text-5xl md:text-7xl text-center mb-12 sm:mb-16 text-white/90">Best Sellers</h2>
                <div className="flex items-center justify-center">
                    {bestSellers.length > 0 && <BestSellerCard product={bestSellers[0]} />}
                </div>
            </div>
        </section>
    );
};

const BestSellerCard = ({ product }: { product: (typeof bestSellers)[0] }) => {
    const [selectedWeight, setSelectedWeight] = useState(product.weights[0]);
    const [selectedFlavor, setSelectedFlavor] = useState(product.flavors[0]);

    return (
        <div className="relative w-full max-w-lg md:max-w-4xl mx-auto flex items-center justify-center">
            {/* Navigation Arrows */}
            <Button variant="ghost" size="icon" className="absolute -left-4 md:-left-16 text-white/50 hover:text-white hover:bg-white/10 rounded-full">
                <ArrowLeft size={24} />
            </Button>
            <Button variant="ghost" size="icon" className="absolute -right-4 md:-right-16 text-white/50 hover:text-white hover:bg-white/10 rounded-full">
                <ArrowRight size={24} />
            </Button>

            {/* Card Structure */}
            <div className="relative w-full">
                {/* Back Card */}
                <motion.div 
                    className="absolute inset-0 bg-red-800/80 rounded-3xl -translate-x-2 -translate-y-2"
                    style={{ filter: 'blur(2px)'}}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                />

                {/* Front Card */}
                <div className="relative bg-gradient-to-br from-[#181a2e] to-[#0e101b] rounded-3xl shadow-2xl shadow-black/50 overflow-hidden backdrop-blur-sm border border-white/5 p-4 md:p-0">
                    <div className="flex flex-col md:flex-row items-center">
                        {/* Left side - Image */}
                        <div className="relative md:w-1/2 p-4 md:p-8 flex items-center justify-center min-h-[300px] md:min-h-[450px]">
                            <motion.div 
                                className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 z-10"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                            >
                                <Image
                                    src={product.image.src}
                                    alt={product.name}
                                    fill
                                    className="object-contain drop-shadow-[0_20px_20px_rgba(0,0,0,0.4)]"
                                    data-ai-hint={product.image.hint}
                                    unoptimized
                                />
                            </motion.div>
                        </div>
                        
                        {/* Right side - Content */}
                        <div className="w-full md:w-1/2 p-6 text-white/90 flex flex-col justify-center">
                            <h3 className="text-2xl lg:text-3xl font-bold uppercase tracking-wider mb-2">
                                Whey Protein Isolate
                            </h3>
                            <p className="text-2xl lg:text-3xl font-semibold text-white mb-6">₹2,499</p>

                            <div className="mb-6">
                                <p className="text-sm uppercase tracking-widest text-white/50 mb-3">Weight</p>
                                <div className="flex gap-2">
                                    {product.weights.map(weight => (
                                        <button 
                                            key={weight}
                                            onClick={() => setSelectedWeight(weight)}
                                            className={cn(
                                                "px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 border",
                                                selectedWeight === weight 
                                                    ? 'bg-red-700 text-white border-red-700' 
                                                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                                            )}
                                        >
                                            {weight}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center gap-6 mb-8">
                                <div>
                                    <p className="text-sm uppercase tracking-widest text-white/50 mb-3">Flavor</p>
                                    <div className="flex gap-3">
                                        {product.flavors.map(flavor => (
                                            <button
                                                key={flavor.name}
                                                onClick={() => setSelectedFlavor(flavor)}
                                                title={flavor.name}
                                                className={cn(
                                                    "w-8 h-8 rounded-full border-2 transition-all duration-200",
                                                    selectedFlavor.name === flavor.name ? 'border-red-600 scale-110' : 'border-white/20'
                                                )}
                                                style={{ backgroundColor: flavor.color }}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className="text-center">
                                     <div className="relative w-20 h-20 flex items-center justify-center">
                                        <svg className="w-full h-full" viewBox="0 0 100 100">
                                            <circle className="text-white/10" strokeWidth="7" stroke="currentColor" fill="transparent" r="45" cx="50" cy="50"/>
                                            <motion.circle 
                                                className="text-red-600"
                                                strokeWidth="7" 
                                                strokeLinecap="round" 
                                                stroke="currentColor" 
                                                fill="transparent" 
                                                r="45" 
                                                cx="50" 
                                                cy="50"
                                                strokeDasharray={2 * Math.PI * 45}
                                                strokeDashoffset={2 * Math.PI * 45 * (1 - 0.78)}
                                                initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
                                                animate={{ strokeDashoffset: 2 * Math.PI * 45 * (1 - 0.78) }}
                                                transition={{ duration: 1, ease: "circOut", delay: 0.5}}
                                            />
                                        </svg>
                                        <div className="absolute flex flex-col items-center justify-center">
                                            <span className="text-lg font-bold">78%</span>
                                            <span className="text-xs text-white/50">Protein</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-3">
                                <Button className="w-full bg-red-700 hover:bg-red-600 text-white font-bold text-base py-6 rounded-lg transition-colors duration-300">
                                    Add to Cart
                                </Button>
                                <Button variant="ghost" className="w-full text-white/60 hover:text-white hover:bg-transparent">
                                    <Heart size={16} className="mr-2"/>
                                    Add to Wishlist
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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

    