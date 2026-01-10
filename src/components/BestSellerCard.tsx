'use client';
import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { bestSellers } from '@/lib/products';
import { CircularProgress } from '@/components/ui/circular-progress';

type BestSellerCardProps = {
  product: (typeof bestSellers)[0];
};

const BestSellerCard = ({ product }: BestSellerCardProps) => {
  const [selectedWeight, setSelectedWeight] = useState(product.weights[0]);
  const [selectedFlavor, setSelectedFlavor] = useState(product.flavors[0]);
  const accentColor = selectedFlavor.color;

  const statValue = product.stat.value;
  const progressValue = typeof statValue === 'string' ? parseFloat(statValue) : statValue;

  return (
    <div className="relative w-full max-w-lg mx-auto font-sans">
      {/* Back Card */}
      <div 
        className="absolute top-0 left-0 w-full h-[95%] sm:w-[45%] sm:h-full rounded-3xl transition-colors duration-500 flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: accentColor }}
      >
        <span className="text-[7rem] sm:text-[8rem] font-extrabold text-white/10 select-none -rotate-12 scale-150">
          ZONE
        </span>
      </div>
      
      {/* Front Card */}
      <div 
        className="relative bg-[#1A1C29]/80 backdrop-blur-sm rounded-3xl flex flex-col sm:flex-row overflow-hidden w-full sm:ml-auto"
        style={{
            boxShadow: '0 0 120px -30px rgba(255, 255, 255, 0.15)'
        }}
      >
        
        {/* Left Side: Product Image */}
        <div className="relative w-full sm:w-1/2 flex items-center justify-center p-4 sm:p-0 min-h-[300px] sm:min-h-0">
           <div className="relative w-52 h-64 sm:w-64 sm:h-80">
            <Image
                src={product.image.src}
                alt={product.name}
                fill
                className="object-contain drop-shadow-2xl transition-transform duration-300 hover:scale-105 contrast-125 -rotate-6"
                data-ai-hint={product.image.hint}
                unoptimized
            />
          </div>
        </div>

        {/* Right Side: Product Details */}
        <div className="w-full sm:w-1/2 flex flex-col p-4 sm:p-6 text-white">
          {/* Top section: Name, Price, Stat */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="text-xs font-bold font-headline uppercase tracking-wider">{product.name}</h3>
              <p className="text-base font-semibold mt-1" style={{ color: accentColor }}>₹{product.price.toLocaleString()}</p>
            </div>
            <div className="text-right flex flex-col items-center space-y-1 flex-shrink-0 ml-2">
                <CircularProgress value={progressValue} size={28} strokeWidth={2} color={accentColor} />
                <p className="text-[8px] uppercase tracking-widest text-white/50">{product.stat.label}</p>
            </div>
          </div>
          
          {/* Middle section: Size & Flavor */}
          <div className="flex-grow grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-white/50 mb-2">SIZE</p>
              <div className="flex flex-col items-start gap-1">
                {product.weights.map(weight => (
                  <button
                    key={weight}
                    onClick={() => setSelectedWeight(weight)}
                    className={cn(
                      "text-xs font-medium transition-colors duration-200",
                      selectedWeight === weight
                        ? 'text-white'
                        : 'text-white/40 hover:text-white'
                    )}
                  >
                    {weight}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-white/50 mb-2">FLAVOR</p>
                <div className="flex gap-3">
                {product.flavors.map(flavor => (
                  <button
                    key={flavor.name}
                    onClick={() => setSelectedFlavor(flavor)}
                    title={flavor.name}
                    className={cn(
                      "w-5 h-5 rounded-full border-2 transition-all duration-300",
                      selectedFlavor.name === flavor.name ? 'scale-110 shadow-lg' : 'border-transparent opacity-70'
                    )}
                      style={{ 
                      backgroundColor: flavor.color, 
                      borderColor: selectedFlavor.name === flavor.name ? 'white' : 'transparent',
                      boxShadow: selectedFlavor.name === flavor.name ? `0 0 8px ${flavor.color}` : 'none'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Bottom section: Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-2 mt-auto pt-4">
              <Button
                className="w-full h-9 text-xs sm:text-sm font-bold text-black transition-all duration-300 rounded-lg"
                style={{ backgroundColor: accentColor }}
                onMouseOver={e => (e.currentTarget.style.filter = 'brightness(1.1)')}
                onMouseOut={e => (e.currentTarget.style.filter = 'brightness(1)')}
            >
              BUY NOW
            </Button>
            <Button
              className="w-full h-9 text-xs sm:text-sm font-bold text-black transition-all duration-300 rounded-lg"
              style={{ backgroundColor: 'white' }}
                onMouseOver={e => (e.currentTarget.style.filter = 'brightness(0.9)')}
                onMouseOut={e => (e.currentTarget.style.filter = 'brightness(1)')}
            >
              ADD TO CART
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestSellerCard;
