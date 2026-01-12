
'use client';
import React, { useState, useRef } from 'react';
import { bestSellerProducts } from '@/lib/bestseller-products';
import CreatineCard from './CreatineCard';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const MobileBestSellers = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

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
    <section id="bestsellers" className="bg-background text-white font-sans overflow-hidden py-16">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-cyan-500/20 rounded-full filter blur-[150px] opacity-50" />
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-500/20 rounded-full filter blur-[150px] opacity-50" />
      </div>

      <div className="relative z-10 h-full flex flex-col">
        <div className="px-4">
            <h2 className="text-center text-3xl font-bold tracking-[0.2em] uppercase py-6 text-white/90">
                Best Sellers
            </h2>
        </div>

        <div className="relative flex-grow">
           <motion.div
            key="bestseller_carousel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="h-full flex flex-col justify-center pt-4"
           >
             <div 
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth px-4 gap-4"
                style={{ scrollbarWidth: 'none' }}
            >
              {bestSellerProducts.map((product, index) => (
                <div key={index} className="w-[280px] h-[480px] flex-shrink-0 snap-center first:ml-[calc(50%-140px)] last:mr-[calc(50%-140px)]">
                  <CreatineCard product={product as any} />
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-2 mt-6">
              {bestSellerProducts.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    'w-2 h-2 rounded-full transition-all duration-300',
                    activeIndex === index ? 'bg-white w-4' : 'bg-white/30'
                  )}
                />
              ))}
            </div>
           </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MobileBestSellers;
