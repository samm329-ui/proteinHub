'use client';

import ProteinScroll from '@/components/ProteinScroll';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';

const Navbar = () => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white text-black h-16 flex items-center">
      <div className="container mx-auto flex justify-between items-center px-6">
        <div className="text-xl font-bold font-headline uppercase tracking-widest">
          Brand
        </div>
        <nav>
          <ul className="flex items-center space-x-8">
            <li><a href="#home" onClick={(e) => handleScroll(e, 'home')} className="font-medium tracking-wider text-black/90 hover:text-black/70 transition-opacity">Home</a></li>
            <li><a href="#products" onClick={(e) => handleScroll(e, 'products')} className="font-medium tracking-wider text-black/90 hover:text-black/70 transition-opacity">Products</a></li>
            <li><a href="#gallery" onClick={(e) => handleScroll(e, 'gallery')} className="font-medium tracking-wider text-black/90 hover:text-black/70 transition-opacity">Gallery</a></li>
            <li><a href="#contact" onClick={(e) => handleScroll(e, 'contact')} className="font-medium tracking-wider text-black/90 hover:text-black/70 transition-opacity">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

const ProductsSection = () => {
  const products = ['Whey Protein', 'Mass Gainer', 'Pre Workout', 'Creatine'];
  return (
    <section id="products" className="py-24 sm:py-32">
      <div className="container mx-auto px-6">
        <h2 className="text-5xl md:text-7xl text-center mb-16 text-white/90">Our Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product} className="bg-[#111111] p-8 text-center">
              <h3 className="text-3xl text-white/90">{product}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const GallerySection = () => {
    const images = [
      { id: 1, src: '/gallery/gallery-1.jpg', alt: 'Bodybuilder posing', hint: 'bodybuilder muscle' },
      { id: 2, src: '/gallery/gallery-2.jpg', alt: 'Weightlifter lifting barbell', hint: 'weightlifter gym' },
      { id: 3, src: '/gallery/gallery-3.jpg', alt: 'Athlete showing muscles', hint: 'athlete fitness' },
      { id: 4, src: '/gallery/gallery-4.jpg', alt: 'Man doing pull-ups', hint: 'fitness workout' },
    ];
    
    // Using picsum for placeholder images since local ones aren't available
    const placeholderImages = [
        { id: 1, src: 'https://picsum.photos/seed/g1/800/1200', alt: 'Bodybuilder posing', hint: 'bodybuilder muscle' },
        { id: 2, src: 'https://picsum.photos/seed/g2/800/1200', alt: 'Weightlifter lifting barbell', hint: 'weightlifter gym' },
        { id: 3, src: 'https://picsum.photos/seed/g3/800/1200', alt: 'Athlete showing muscles', hint: 'athlete fitness' },
        { id: 4, src: 'https://picsum.photos/seed/g4/800/1200', alt: 'Man doing pull-ups', hint: 'fitness workout' },
    ];


  return (
    <section id="gallery" className="py-12">
      <div className="grid grid-cols-2 md:grid-cols-4">
        {placeholderImages.map(image => (
            <div key={image.id} className="relative aspect-[2/3] w-full h-full">
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
    </section>
  );
};

const ContactSection = () => (
  <section id="contact" className="py-24 sm:py-32">
    <div className="container mx-auto px-6 max-w-3xl">
      <h2 className="text-5xl md:text-7xl text-center mb-16 text-white/90">Contact Us</h2>
      <form className="space-y-6" suppressHydrationWarning>
        <Input type="text" placeholder="Name" className="bg-[#111111] border-[#1A1A1A] text-white/90 placeholder:text-white/60 h-12" />
        <Input type="email" placeholder="Email" className="bg-[#111111] border-[#1A1A1A] text-white/90 placeholder:text-white/60 h-12" />
        <Textarea placeholder="Message" className="bg-[#111111] border-[#1A1A1A] text-white/90 placeholder:text-white/60" rows={5} />
        <Button suppressHydrationWarning type="submit" className="w-full bg-white text-black font-medium uppercase tracking-wider py-3 h-auto hover:bg-white/90">Submit</Button>
      </form>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-12">
    <div className="container mx-auto px-6 text-center text-white/60">
      <div className="flex justify-center space-x-6 mb-4">
        <a href="#" className="hover:text-white/90 transition-colors">Instagram</a>
        <a href="#" className="hover:text-white/90 transition-colors">Facebook</a>
        <a href="#" className="hover:text-white/90 transition-colors">Privacy</a>
      </div>
      <p>© ProteinZone</p>
    </div>
  </footer>
);


export default function Home() {
  return (
    <div className="bg-[#050505]">
      <Navbar />
      <main>
        <div id="home">
          <ProteinScroll />
        </div>
        <ProductsSection />
        <GallerySection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
