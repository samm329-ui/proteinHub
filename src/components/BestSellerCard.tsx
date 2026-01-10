
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
    <div className="relative w-full max-w-5xl mx-auto font-sans p-3">
      {/* Back Card */}
      <div
        className="absolute top-0 left-0 w-full h-full rounded-3xl transition-colors duration-500"
        style={{ backgroundColor: accentColor, transform: 'translateX(-12px) translateY(12px)' }}
      />
      
      {/* Front Card */}
      <div 
        className="relative bg-[#1a1c29] rounded-3xl flex flex-col sm:flex-row overflow-visible w-full"
        style={{ boxShadow: '0 0 80px -10px rgba(0,0,0,0.5)'}}
      >
        
        {/* Left Side: Product Image */}
        <div className="relative w-full sm:w-2/5 flex items-center justify-center p-4 sm:p-0 sm:py-8">
           <div className="relative w-56 h-72 sm:w-[20rem] sm:h-[24rem] -translate-y-4 sm:translate-y-0 sm:-translate-x-4">
            <Image
                src={product.image.src}
                alt={product.name}
                fill
                className="object-contain drop-shadow-2xl transition-transform duration-300 hover:scale-105"
                style={{
                  transform: 'rotate(-3deg)',
                  filter: `drop-shadow(0 0 35px ${accentColor}) contrast(1.15)`
                }}
                data-ai-hint={product.image.hint}
                unoptimized
            />
          </div>
        </div>

        {/* Right Side: Product Details */}
        <div className="w-full sm:w-3/5 flex flex-col justify-between p-6 text-white -mt-12 sm:mt-0">
          
          {/* Top section: Name, Price, Stat */}
          <div>
            <p className="text-[10px] uppercase tracking-widest text-white/50 mb-1">{product.category}</p>
            <h3 className="text-xl font-bold font-headline uppercase tracking-wider text-white/90">{product.name}</h3>
            <div className="flex items-baseline gap-2 mt-1">
                <p className="text-2xl font-semibold" style={{ color: accentColor }}>₹{product.price.toLocaleString()}</p>
                <p className="text-sm font-medium text-white/40 line-through">₹{product.oldPrice.toLocaleString()}</p>
            </div>
            <p className="text-xs text-white/60 mt-2 leading-relaxed">{product.description}</p>
          </div>
          
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-2 gap-4 items-start">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/50 mb-1.5">SIZE</p>
                <div className="flex items-center gap-1.5">
                    {product.weights.map(weight => (
                    <button
                        key={weight}
                        onClick={() => setSelectedWeight(weight)}
                        className={cn(
                        "text-xs font-medium transition-colors duration-200 px-2.5 py-1 rounded-full",
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
              <div className="flex items-center justify-end gap-4">
                <div className="text-right flex flex-col items-center space-y-1">
                    <CircularProgress value={progressValue} size={40} strokeWidth={3} color={accentColor} />
                    <p className="text-[9px] uppercase tracking-widest text-white/50">{product.stat.label}</p>
                </div>
              </div>
            </div>
            
          
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/50 mb-1.5">FLAVOR</p>
                <div className="flex gap-2">
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
                      boxShadow: selectedFlavor.name === flavor.name ? `0 0 10px ${flavor.color}` : 'none'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Bottom section: Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-2 mt-6 pt-4 border-t border-white/10">
              <Button
                className="w-full h-9 text-xs font-bold text-black transition-all duration-300 rounded-md"
                style={{ backgroundColor: accentColor }}
                onMouseOver={e => (e.currentTarget.style.filter = 'brightness(1.1)')}
                onMouseOut={e => (e.currentTarget.style.filter = 'brightness(1)')}
            >
              ADD TO CART
            </Button>
            <Button
              className="w-full h-9 text-xs font-bold text-black transition-all duration-300 rounded-md"
              style={{ backgroundColor: 'white' }}
              onMouseOver={e => (e.currentTarget.style.filter = 'brightness(0.9)')}
              onMouseOut={e => (e.currentTarget.style.filter = 'brightness(1)')}
            >
              BUY NOW
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestSellerCard;
