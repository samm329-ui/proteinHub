
'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { bestSellers } from '@/lib/products';
import { CircularProgress } from '@/components/ui/circular-progress';

type BestSellerCardProps = {
  product: (typeof bestSellers)[0];
};

const BestSellerCard = ({ product }: BestSellerCardProps) => {
  const [selectedWeight, setSelectedWeight] = useState(product.weights[0]);
  const accentColor = product.flavors[0].color; // Use a fixed accent color for the design

  return (
    <div className="relative w-full max-w-4xl mx-auto p-4 flex items-center justify-center font-sans" style={{ height: '400px' }}>
      {/* Back Card */}
      <div 
        className="absolute w-[90%] h-[95%] sm:w-[45%] sm:h-[105%] rounded-3xl -rotate-6 left-0 sm:left-4 top-0"
        style={{ backgroundColor: accentColor }}
      >
        <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem] font-bold text-black/10 uppercase font-headline -rotate-12 opacity-50 select-none" style={{letterSpacing: '0.2em'}}>
          {product.name.split(' ')[0]}
        </h2>
      </div>

      {/* Front Card */}
      <div className="relative w-full h-full bg-[#1A202C] rounded-3xl shadow-2xl shadow-black/60 grid grid-cols-1 md:grid-cols-2 overflow-visible">
        
        {/* Left Side: Product Image */}
        <div className="absolute -left-4 sm:-left-12 -top-16 sm:-top-20 w-64 h-80 sm:w-80 sm:h-96 md:w-[400px] md:h-[480px] z-10 flex items-center justify-center">
          <div className="relative w-full h-full">
            <Image
                src={product.image.src}
                alt={product.name}
                fill
                className="object-contain drop-shadow-2xl transition-transform duration-300 hover:scale-105"
                data-ai-hint={product.image.hint}
                unoptimized
            />
          </div>
        </div>

        {/* Right Side: Product Details */}
        <div className="col-start-1 md:col-start-2 flex flex-col p-6 sm:p-8 text-white justify-center h-full ml-auto md:ml-0 w-full md:w-auto mt-24 md:mt-0">
          <div className="flex flex-col h-full">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline uppercase tracking-wider">{product.name}</h3>
            <p className="text-xl sm:text-2xl font-light mt-2" style={{ color: accentColor }}>₹{product.price.toLocaleString()}</p>
            
            <div className="flex items-center gap-12 mt-6 sm:mt-8">
              <div>
                <p className="text-xs uppercase tracking-widest text-white/50 mb-2">Weight</p>
                <div className="flex gap-3">
                  {product.weights.map(weight => (
                    <button
                      key={weight}
                      onClick={() => setSelectedWeight(weight)}
                      className={cn(
                        "w-8 h-8 rounded-full text-xs font-medium transition-all duration-200 flex items-center justify-center",
                        selectedWeight === weight
                          ? 'text-black'
                          : 'bg-transparent text-white/70 hover:bg-white/10'
                      )}
                      style={{ 
                        backgroundColor: selectedWeight === weight ? accentColor : '#2D3748',
                      }}
                    >
                      {weight.replace('kg','')}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-center">
                <p className="text-xs uppercase tracking-widest text-white/50 mb-2">PROTEIN</p>
                <CircularProgress value={parseInt(product.stat.value)} color={accentColor} size={40} strokeWidth={3} />
              </div>
            </div>
            
            <div className="flex-grow" />

            <div className="flex items-center gap-4 mt-6 sm:mt-8">
              <Button
                className="w-full h-11 sm:h-12 text-sm font-bold text-black transition-all duration-300"
                style={{ backgroundColor: accentColor }}
                onMouseOver={e => (e.currentTarget.style.filter = 'brightness(1.1)')}
                onMouseOut={e => (e.currentTarget.style.filter = 'brightness(1)')}
              >
                ADD TO CART
              </Button>
              <Button
                variant="ghost"
                className="flex items-center gap-2 text-white/60 hover:text-white"
              >
                <Heart size={16} />
                <span className="text-sm">Add to Wishlist</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestSellerCard;
