
'use client';

import Navbar from '@/components/Navbar';
import ProteinScroll from '@/components/ProteinScroll';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { Phone, Mail, MapPin } from 'lucide-react';

const ProductsSection = () => {
  const products = ['Whey Protein', 'Mass Gainer', 'Pre Workout', 'Creatine'];
  return (
    <section id="products" className="py-20 sm:py-32">
      <div className="container mx-auto px-5">
        <h2 className="text-3xl sm:text-5xl md:text-7xl text-center mb-12 sm:mb-16 text-white/90">Our Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-2xl mx-auto">
          {products.map((product) => (
            <div key={product} className="bg-[#111111] p-4 rounded-md text-center h-[56px] flex items-center justify-center">
              <h3 className="text-sm sm:text-base uppercase tracking-wider text-white/90">{product}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const GallerySection = () => {
    const placeholderImages = [
        { id: 1, src: 'https://picsum.photos/seed/g1/800/1200', alt: 'Bodybuilder posing', hint: 'bodybuilder muscle' },
        { id: 2, src: 'https://picsum.photos/seed/g2/800/1200', alt: 'Weightlifter lifting barbell', hint: 'weightlifter gym' },
        { id: 3, src: 'https://picsum.photos/seed/g3/800/1200', alt: 'Athlete showing muscles', hint: 'athlete fitness' },
        { id: 4, src: 'https://picsum.photos/seed/g4/800/1200', alt: 'Man doing pull-ups', hint: 'fitness workout' },
    ];


  return (
    <section id="gallery" className="py-12 sm:py-20">
       <div className="container mx-auto px-5 sm:px-0">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
            {placeholderImages.map(image => (
                <div key={image.id} className="relative aspect-[3/4] w-full h-full">
                    <Image 
                        src={image.src} 
                        alt={image.alt}
                        fill
                        className="object-cover grayscale"
                        data-ai-hint={image.hint}
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
        <p className="text-base text-white/60 leading-relaxed max-w-md mx-auto mb-12">
            Have questions about our products, training, or anything else? We're here to help. Reach out and let's talk.
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
    { label: 'GALLERY', href: '#gallery' },
    { label: 'CONTACT', href: '#contact' },
    { label: 'ABOUT', href: '#about' },
  ];

  return (
    <div className="bg-[#050505]" suppressHydrationWarning>
      <Navbar
        navItems={navItems}
        onNavItemClick={handleScroll}
      />
      <main suppressHydrationWarning>
        <div id="home">
          <ProteinScroll />
        </div>
        <div className="h-20 md:h-32 bg-transparent"></div>
        <ProductsSection />
        <GallerySection />
        <ContactSection />
        <AboutUsSection />
      </main>
      <Footer />
    </div>
  );
}
