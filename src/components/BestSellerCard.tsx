'use client';
import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { bestSellers } from '@/lib/products';
import { Heart } from 'lucide-react';
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
    <div className="relative w-full max-w-4xl mx-auto font-sans">
      {/* Back Card */}
      <div
        className="absolute top-0 left-0 w-full h-full rounded-3xl transition-colors duration-500"
        style={{ backgroundColor: accentColor, transform: 'translateX(-12px) translateY(12px)' }}
      />
      
      {/* Front Card */}
      <div 
        className="relative bg-[#1a1c29] rounded-3xl flex flex-col sm:flex-row overflow-visible w-full shadow-2xl"
        style={{ boxShadow: '0 0 40px rgba(255,255,255,0.05)'}}
      >
        
        {/* Left Side: Product Image */}
        <div className="relative w-full sm:w-2/5 flex items-center justify-center p-4 sm:p-0 sm:py-8">
           <div className="relative w-60 h-72 sm:w-80 sm:h-96 -translate-y-4 sm:translate-y-0 sm:-translate-x-4">
            <Image
                src={product.image.src}
                alt={product.name}
                fill
                className="object-contain drop-shadow-2xl transition-transform duration-300 hover:scale-105 -rotate-3"
                style={{filter: 'drop-shadow(0px 20px 20px rgba(0,0,0,0.4))'}}
                data-ai-hint={product.image.hint}
                unoptimized
            />
          </div>
        </div>

        {/* Right Side: Product Details */}
        <div className="w-full sm:w-3/5 flex flex-col justify-between p-6 text-white -mt-12 sm:mt-0">
          
          {/* Top section: Name, Price, Stat */}
          <div>
            <h3 className="text-xl font-bold font-headline uppercase tracking-wider text-white/90">{product.name}</h3>
            <p className="text-2xl font-semibold mt-2" style={{ color: accentColor }}>₹{product.price.toLocaleString()}</p>
            <p className="text-sm text-white/60 mt-4 leading-relaxed">{product.description}</p>
          </div>
          
          <div className="mt-6 space-y-6">
            <div className="grid grid-cols-2 gap-4 items-start">
              <div>
                <p className="text-xs uppercase tracking-widest text-white/50 mb-2">SIZE</p>
                <div className="flex items-center gap-2">
                    {product.weights.map(weight => (
                    <button
                        key={weight}
                        onClick={() => setSelectedWeight(weight)}
                        className={cn(
                        "text-xs font-medium transition-colors duration-200 px-3 py-1 rounded-full",
                        selectedWeight === weight
                            ? 'bg-white/10 text-white'
                            : 'text-white/50 hover:bg-white/5'
                        )}
                    >
                        {weight}
                    </button>
                    ))}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right flex flex-col items-center space-y-1">
                    <CircularProgress value={progressValue} size={36} strokeWidth={2} color={accentColor} />
                    <p className="text-[10px] uppercase tracking-widest text-white/50">{product.stat.label}</p>
                </div>
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
                      boxShadow: selectedFlavor.name === flavor.name ? `0 0 10px ${flavor.color}` : 'none'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Bottom section: Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 pt-4 border-t border-white/10">
              <Button
                className="w-full h-11 text-sm font-bold text-black transition-all duration-300 rounded-lg"
                style={{ backgroundColor: accentColor }}
                onMouseOver={e => (e.currentTarget.style.filter = 'brightness(1.1)')}
                onMouseOut={e => (e.currentTarget.style.filter = 'brightness(1)')}
            >
              ADD TO CART
            </Button>
            <Button variant="ghost" size="sm" className="w-full sm:w-auto text-white/50 hover:text-white flex items-center justify-center gap-2 p-1">
                <Heart size={16}/>
                <span className="text-xs">ADD TO WISHLIST</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestSellerCard;
