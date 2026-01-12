
'use client';
import React, { useState, useRef } from 'react';
import { Menu, ShoppingCart, ChevronLeft } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { productsByCategory, ProductCategory } from '@/lib/all-products';
import CreatineCard from './CreatineCard';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

const MobileProducts = () => {
  const { cart } = useCart();
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
    setActiveIndex(0); // Reset scroll index when category changes
  };

  const handleBack = () => {
    setSelectedCategory(null);
  };
  
  const FAKE_HEADER_HEIGHT = 120; // Approx height for header + title

  return (
    <div id="products" className="bg-black min-h-screen text-white font-sans overflow-hidden">
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
        <AnimatePresence initial={false}>
          <motion.div
            key={selectedCategory ? 'products' : 'categories'}
            initial={{ opacity: 0, x: selectedCategory ? 300 : -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: selectedCategory ? -300 : 300 }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
            className="absolute top-10 left-0 right-0"
          >
            {selectedCategory ? (
              // Product view
              <div className="px-4">
                <header className="flex items-center justify-between py-3">
                  <button onClick={handleBack} className="flex items-center gap-1">
                    <ChevronLeft size={24} />
                  </button>
                  <span className="font-bold text-xl tracking-wider">PROTEINZONE</span>
                  <div className="relative">
                    <ShoppingCart size={24} />
                    {cart.length > 0 && (
                      <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-cyan-400 rounded-full flex items-center justify-center text-xs text-black font-bold">
                        {cart.length}
                      </div>
                    )}
                  </div>
                </header>
                <h1 className="text-center text-3xl font-bold tracking-[0.2em] uppercase my-6">
                  {selectedCategory.category}
                </h1>
              </div>
            ) : (
              // Category list view
              <div className="px-4">
                <header className="flex items-center justify-between py-3">
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
                <h1 className="text-center text-3xl font-bold tracking-[0.2em] uppercase my-6">
                  Our Products
                </h1>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div style={{ paddingTop: FAKE_HEADER_HEIGHT }} className="relative">
          <AnimatePresence>
            {selectedCategory ? (
               <motion.div
                key="product_carousel"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.1 }}
               >
                 <div 
                    ref={scrollRef}
                    onScroll={handleScroll}
                    className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth px-4 gap-4"
                    style={{ scrollbarWidth: 'none', paddingLeft: 'calc(50% - 140px)', paddingRight: 'calc(50% - 140px)' }}
                >
                  {selectedCategory.products.map((product, index) => (
                    <div key={index} className="w-[280px] h-[480px] flex-shrink-0 snap-center">
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
                    <span className="text-lg font-bold uppercase tracking-wider">{category.category}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="fixed bottom-6 right-6">
        <button className="w-14 h-14 rounded-full bg-cyan-400/80 backdrop-blur-lg flex items-center justify-center shadow-[0_0_20px_theme(colors.cyan.400)]">
           <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h.01"/><path d="M2 8.82a15 15 0 0 1 20 0"/><path d="M5 12.85a10 10 0 0 1 14 0"/><path d="M8.5 16.42a5 5 0 0 1 7 0"/></svg>
        </button>
      </div>
    </div>
  );
};

export default MobileProducts;
