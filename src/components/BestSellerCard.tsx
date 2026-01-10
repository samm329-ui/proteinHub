
'use client';
import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { bestSellers } from '@/lib/products';
import { Heart, ShoppingCart } from 'lucide-react';
import { CircularProgress } from '@/components/ui/circular-progress';

type BestSellerCardProps = {
  product: (typeof bestSellers)[0];
};

const BestSellerCard = ({ product }: BestSellerCardProps) => {
  const [selectedWeight, setSelectedWeight] = useState(product.weights[0]);
  const [selectedFlavor, setSelectedFlavor] = useState(product.flavors[0]);
  const accentColor = selectedFlavor.color;

  const statValue = product.stat.label === 'Protein' ? Math.round((parseInt(product.stat.value) / 40) * 100) : Math.round((parseInt(product.stat.value) / 1000) * 100);

  return (
    <div className="font-sans bg-[#0A0A0A] rounded-3xl shadow-2xl shadow-black/30 overflow-hidden w-full max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row min-h-[380px]">
        
        {/* Left Side: Product Image */}
        <div className="relative w-full md:w-1/2 flex items-center justify-center p-6 bg-[#111111] overflow-hidden">
          <div 
            className="absolute -translate-x-1/4 -translate-y-1/4 w-[28rem] h-[28rem] rounded-full opacity-20 blur-xl"
            style={{ 
              backgroundColor: accentColor,
            }}
          />
           <div className="relative w-56 h-80 drop-shadow-[0_25px_25px_rgba(0,0,0,0.8)]">
            <Image
                src={product.image.src}
                alt={product.name}
                fill
                className="object-contain transition-transform duration-300 group-hover:scale-105"
                unoptimized
            />
          </div>
        </div>

        {/* Right Side: Product Details */}
        <div className="w-full md:w-1/2 flex flex-col justify-between p-8 text-white/90">
          
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-2">{product.category}</p>
              <h3 className="text-3xl lg:text-4xl font-bold font-headline uppercase tracking-wide">{product.name}</h3>
              
              <div className="flex items-baseline gap-3 mt-4">
                  <p className="text-3xl font-bold" style={{color: accentColor}}>₹{product.price.toLocaleString()}</p>
                  <p className="text-lg font-medium text-white/40 line-through">₹{product.oldPrice.toLocaleString()}</p>
              </div>
            </div>
            <div className="text-center flex-shrink-0">
              <CircularProgress value={statValue} color={accentColor} size={60} strokeWidth={5} />
              <p className="text-xs text-white/60 mt-1">{product.stat.value}g</p>
              <p className="text-xs text-white/60">{product.stat.label}</p>
            </div>
          </div>
          
          <div className="mt-6 space-y-6">
             <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-white/50 mb-2">Size</p>
                <div className="flex items-center gap-2">
                    {product.weights.map(weight => (
                    <button
                        key={weight}
                        onClick={() => setSelectedWeight(weight)}
                        className={cn(
                        "text-sm font-semibold transition-colors duration-200 px-4 py-1.5 rounded-full",
                        selectedWeight === weight
                            ? 'bg-white text-black'
                            : 'bg-white/10 text-white/70 hover:bg-white/20'
                        )}
                    >
                        {weight}
                    </button>
                    ))}
                </div>
              </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-white/50 mb-2">Flavor</p>
                <div className="flex gap-3">
                {product.flavors.map(flavor => (
                  <button
                    key={flavor.name}
                    onClick={() => setSelectedFlavor(flavor)}
                    title={flavor.name}
                    className={cn(
                      "w-7 h-7 rounded-full border-2 transition-all duration-300",
                      selectedFlavor.name === flavor.name ? 'scale-110 shadow-md border-white/50' : 'border-transparent opacity-80'
                    )}
                      style={{ backgroundColor: flavor.color }}
                  />
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 sm:gap-8 mt-8 pt-6 border-t border-white/10">
            <button className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-white/70 hover:text-white transition-colors uppercase tracking-wider">
                <ShoppingCart size={16} />
                Add to Cart
            </button>
            <button className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-white/70 hover:text-white transition-colors uppercase tracking-wider">
                <Heart size={16} />
                Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestSellerCard;
