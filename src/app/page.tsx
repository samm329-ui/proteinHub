
'use client';

import Navbar from '@/components/Navbar';
import ProteinScroll from '@/components/ProteinScroll';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Phone, Mail, MapPin, Plus, Minus } from 'lucide-react';
import { products, bestSellers, type Flavor } from '@/lib/products';
import { useState } from 'react';
import { cn } from '@/lib/utils';

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
                <div className="grid grid-cols-1 lg:grid-cols-1 gap-12 max-w-4xl mx-auto">
                    {bestSellers.map((product) => (
                        <BestSellerCard key={product.name} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const BestSellerCard = ({ product }: { product: (typeof bestSellers)[0] }) => {
    const [selectedWeight, setSelectedWeight] = useState(product.weights[0]);
    const [selectedFlavor, setSelectedFlavor] = useState(product.flavors[0]);

    return (
        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] rounded-2xl overflow-hidden shadow-2xl shadow-black/30 relative flex flex-col md:flex-row items-stretch">
            <div className="relative md:w-1/2 p-8 flex items-center justify-center min-h-[300px] md:min-h-0">
                <div 
                    className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full opacity-30"
                    style={{ backgroundColor: selectedFlavor.color, filter: 'blur(80px)' }}
                />
                 <div 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full border-2 opacity-10"
                    style={{ borderColor: selectedFlavor.color }}
                />

                <div className="relative w-64 h-64 sm:w-80 sm:h-80 transform transition-transform duration-500 hover:scale-105">
                    <Image
                        src={product.image.src}
                        alt={product.name}
                        fill
                        className="object-contain"
                        data-ai-hint={product.image.hint}
                        unoptimized
                    />
                </div>
            </div>
            
            <div className="md:w-1/2 p-8 flex flex-col justify-center text-white/90">
                <p className="text-sm uppercase tracking-widest text-white/50 mb-2">{product.category}</p>
                <h3 className="text-3xl font-bold font-headline uppercase tracking-wider mb-4">{product.name} - {selectedFlavor.name}</h3>

                <div className="flex items-baseline gap-3 mb-6">
                    <p className="text-3xl font-bold text-accent">₹{product.price}</p>
                    <p className="text-xl text-white/40 line-through">₹{product.oldPrice}</p>
                </div>
                
                <div className="mb-6">
                    <p className="text-sm uppercase tracking-widest text-white/50 mb-3">Weight</p>
                    <div className="flex gap-2">
                        {product.weights.map(weight => (
                            <button 
                                key={weight}
                                onClick={() => setSelectedWeight(weight)}
                                className={cn(
                                    "px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 border",
                                    selectedWeight === weight 
                                        ? 'bg-accent text-accent-foreground border-accent' 
                                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                                )}
                            >
                                {weight}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mb-8">
                    <p className="text-sm uppercase tracking-widest text-white/50 mb-3">Flavor</p>
                     <div className="flex gap-3">
                        {product.flavors.map(flavor => (
                            <button
                                key={flavor.name}
                                onClick={() => setSelectedFlavor(flavor)}
                                title={flavor.name}
                                className={cn(
                                    "w-8 h-8 rounded-full border-2 transition-all duration-200",
                                    selectedFlavor.name === flavor.name ? 'border-accent scale-110' : 'border-white/20'
                                )}
                                style={{ backgroundColor: flavor.color }}
                            />
                        ))}
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                     <Button className="w-full sm:w-auto flex-1 bg-accent text-accent-foreground hover:bg-accent/90 transition-colors duration-300">
                        Buy Now
                    </Button>
                    <Button variant="outline" className="w-full sm:w-auto flex-1 border-white/25 bg-transparent text-white/75 hover:bg-white/10 hover:text-white transition-all duration-300">
                        Add to Cart
                    </Button>
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
