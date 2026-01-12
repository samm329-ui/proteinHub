
'use client';
import React, { useState, useRef } from 'react';
import { ChevronLeft } from 'lucide-react';
import { productsByCategory, ProductCategory } from '@/lib/all-products';
import CreatineCard from './CreatineCard';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

const MobileProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(null);
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

  const handleCategoryClick = (category: ProductCategory) => {
    setSelectedCategory(category);
    setActiveIndex(0);
  };

  const handleBack = () => {
    setSelectedCategory(null);
  };
  
  return (
    <section id="products" className="bg-background text-white font-sans overflow-hidden py-16">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-cyan-500/20 rounded-full filter blur-[150px] opacity-50" />
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-500/20 rounded-full filter blur-[150px] opacity-50" />
      </div>

      <div className="relative z-10 h-full flex flex-col">
        <div className="px-4">
            {!selectedCategory ? (
                <h2 className="text-center text-3xl font-bold tracking-[0.2em] uppercase py-6 text-white/90">
                    Our Products
                </h2>
            ) : (
                <div className="h-20 flex flex-col justify-center">
                    <header className="flex items-center justify-between">
                        <button onClick={handleBack} className="flex items-center gap-1 p-2 -ml-2 text-white/80 hover:text-white">
                            <ChevronLeft size={24} />
                            Back
                        </button>
                    </header>
                    <h2 className="text-center text-2xl font-bold tracking-[0.2em] uppercase text-white/90">
                        {selectedCategory.category}
                    </h2>
                </div>
            )}
        </div>

        <div className="relative flex-grow">
          <AnimatePresence mode="wait">
            {selectedCategory ? (
               <motion.div
                key="product_carousel"
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
                  {selectedCategory.products.map((product, index) => (
                    <div key={index} className="w-[280px] h-[480px] flex-shrink-0 snap-center first:ml-[calc(50%-140px)] last:mr-[calc(50%-140px)]">
                      <CreatineCard product={product as any} />
                    </div>
                  ))}
                </div>

                <div className="flex justify-center gap-2 mt-6">
                  {selectedCategory.products.map((_, index) => (
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
            ) : (
              <motion.div 
                key="category_list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="px-4 space-y-4 pt-4"
              >
                {productsByCategory.map((category) => (
                  <button
                    key={category.category}
                    onClick={() => handleCategoryClick(category)}
                    className="w-full text-left p-5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
                  >
                    <span className="text-lg font-bold uppercase tracking-wider text-white/90">{category.category}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default MobileProducts;
