
'use client';
import React, { useState, useRef } from 'react';
import { Menu, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { productsByCategory } from '@/lib/all-products';
import CreatineCard from './CreatineCard';
import { cn } from '@/lib/utils';

const CreatineSection = () => {
  const { cart } = useCart();
  const creatineCategory = productsByCategory.find(cat => cat.category === 'Creatine');
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!creatineCategory) {
    return null;
  }

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const cardWidth = scrollRef.current.offsetWidth;
      const newIndex = Math.round(scrollLeft / cardWidth);
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
      }
    }
  };

  return (
    <div className="bg-black min-h-screen text-white font-sans">
      {/* Fake status bar */}
      <div className="fixed top-0 left-0 right-0 h-10 bg-black z-50 flex items-center justify-between px-4 text-sm">
        <span>9:41</span>
        <div className="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h.01"/><path d="M2 8.82a15 15 0 0 1 20 0"/><path d="M5 12.85a10 10 0 0 1 14 0"/><path d="M8.5 16.42a5 5 0 0 1 7 0"/></svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4C2.9 4 2 4.9 2 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM4 18V6h1v12H4zm2 0V6h1v12H6zm2 0V6h1v12H8zm2 0V6h1v12h-1zm2 0V6h1v12h-1zm2 0V6h1v12h-1zm2 0V6h1v12h-1zm2 0V6h1v12h-1z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
          <span>100%</span>
        </div>
      </div>
      
      {/* Background Gradients */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-cyan-500/20 rounded-full filter blur-[150px] opacity-50" />
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-500/20 rounded-full filter blur-[150px] opacity-50" />
      </div>

      <div className="relative z-10 pt-10">
        {/* Header */}
        <header className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Menu size={24} />
            <span className="font-bold text-xl tracking-wider">PROTEINZONE</span>
          </div>
          <div className="relative">
            <ShoppingCart size={24} />
            {cart.length > 0 && (
              <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-cyan-400 rounded-full flex items-center justify-center text-xs text-black font-bold">
                {cart.length}
              </div>
            )}
          </div>
        </header>

        {/* Section Title */}
        <h1 className="text-center text-3xl font-bold tracking-[0.2em] uppercase my-6">
          CREATINE
        </h1>

        {/* Horizontal Carousel */}
        <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth px-4 gap-4"
            style={{ scrollbarWidth: 'none', paddingLeft: 'calc(50% - 140px)', paddingRight: 'calc(50% - 140px)' }}
        >
          {creatineCategory.products.map((product, index) => (
            <div key={index} className="w-[280px] h-[480px] flex-shrink-0 snap-center">
              <CreatineCard product={product} />
            </div>
          ))}
        </div>

        {/* Scroll Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {creatineCategory.products.map((_, index) => (
            <div
              key={index}
              className={cn(
                'w-2 h-2 rounded-full transition-all duration-300',
                activeIndex === index ? 'bg-white w-4' : 'bg-white/30'
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreatineSection;
