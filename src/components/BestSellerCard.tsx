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
  const [selectedFlavor, setSelectedFlavor] = useState(product.flavors[0]);
  const accentColor = selectedFlavor.color;

  // Find the stat value and convert to a number for the progress component
  const statValue = product.stat.value;
  const progressValue = typeof statValue === 'string' ? parseFloat(statValue) : statValue;

  return (
    <div className="relative w-full max-w-4xl mx-auto p-4 flex items-center justify-center font-sans" style={{ height: '400px' }}>
      {/* Back Card */}
      <div 
        className="absolute top-0 left-0 w-full h-[95%] sm:w-1/2 sm:h-full rounded-3xl transition-colors duration-500 flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: accentColor }}
      >
        <span className="text-[10rem] font-extrabold text-white/10 select-none -rotate-12 scale-150">
          ZONE
        </span>
      </div>
      
      {/* Front Card */}
      <div className="absolute top-0 right-0 w-full sm:w-[85%] md:w-[80%] h-full bg-[#1A1C29] rounded-3xl shadow-2xl shadow-black/40 flex flex-col sm:flex-row overflow-hidden">
        
        {/* Left Side: Product Image */}
        <div className="relative w-full sm:w-1/2 flex items-center justify-center p-4 sm:p-0">
           <div className="relative w-48 h-64 sm:w-64 sm:h-96 transform sm:translate-x-4">
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
        <div className="w-full sm:w-1/2 flex flex-col justify-between p-6 text-white -mt-10 sm:mt-0">
          <div className="flex-grow">
            <h3 className="text-2xl lg:text-3xl font-bold font-headline uppercase tracking-wider mb-2">{product.name}</h3>
            <p className="text-xl lg:text-2xl font-semibold mb-6" style={{ color: accentColor }}>₹{product.price.toLocaleString()}</p>
            
            <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/50 mb-2">SIZE</p>
                  <div className="flex gap-4">
                    {product.weights.map(weight => (
                      <button
                        key={weight}
                        onClick={() => setSelectedWeight(weight)}
                        className={cn(
                          "text-sm font-medium transition-colors duration-200",
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
                 <div className="text-right">
                    <CircularProgress value={progressValue} size={60} strokeWidth={4} color={accentColor} />
                    <p className="text-xs uppercase tracking-widest text-white/50 mt-2">{product.stat.label}</p>
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
                      "w-6 h-6 rounded-full border-2 transition-all duration-300",
                      selectedFlavor.name === flavor.name ? 'scale-110 shadow-lg' : 'border-transparent opacity-70'
                    )}
                     style={{ 
                      backgroundColor: flavor.color, 
                      borderColor: selectedFlavor.name === flavor.name ? 'white' : 'transparent',
                      boxShadow: selectedFlavor.name === flavor.name ? `0 0 12px ${flavor.color}` : 'none'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 mt-6">
            <Button
              className="w-full h-11 text-sm font-bold text-black transition-all duration-300 rounded-lg"
              style={{ backgroundColor: accentColor }}
              onMouseOver={e => (e.currentTarget.style.filter = 'brightness(1.1)')}
              onMouseOut={e => (e.currentTarget.style.filter = 'brightness(1)')}
            >
              ADD TO CART
            </Button>
            <Button
              variant="ghost"
              className="text-white/50 hover:text-white flex items-center gap-2"
            >
              <Heart size={16} />
              <span className="text-xs">ADD TO WISHLIST</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestSellerCard;
