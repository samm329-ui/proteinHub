
'use client';
import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { bestSellers } from '@/lib/products';
import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

type BestSellerCardProps = {
  product: (typeof bestSellers)[0];
};

const BestSellerCard = ({ product }: BestSellerCardProps) => {
  const [selectedWeight, setSelectedWeight] = useState(product.weights[0]);
  const [selectedFlavor, setSelectedFlavor] = useState(product.flavors[0]);
  const accentColor = selectedFlavor.color;

  return (
    <div className="font-sans bg-[#2E3140] rounded-xl shadow-2xl shadow-black/30 overflow-hidden w-full max-w-2xl mx-auto flex">
      {/* Left Side: Product Visual */}
      <div className="relative w-2/5 flex items-center justify-center p-4">
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 w-[150%] h-[110%] rounded-r-full"
          style={{ backgroundColor: accentColor }}
        />
        <div className="relative w-full aspect-[1/1] drop-shadow-[0_20px_15px_rgba(0,0,0,0.4)]">
          <Image
            src={product.image.src}
            alt={product.name}
            fill
            className="object-contain -rotate-[15deg] scale-[1.2]"
            unoptimized
          />
        </div>
      </div>

      {/* Right Side: Product Details */}
      <div className="w-3/5 flex flex-col p-6 text-white/90">
        <div className="flex-grow">
          <p className="text-xs font-medium uppercase tracking-wider text-white/50 mb-1">{product.category}</p>
          <h3 className="text-2xl font-bold uppercase tracking-wide">{product.name}</h3>
          
          <div className="flex items-baseline gap-3 mt-2">
            <p className="text-2xl font-bold">₹{product.price.toLocaleString()}</p>
            <p className="text-sm font-medium text-white/40 line-through">₹{product.oldPrice.toLocaleString()}</p>
          </div>

          <div className="mt-6 space-y-4 text-xs">
            <div>
              <p className="font-semibold uppercase tracking-wider text-white/50 mb-2">Size</p>
              <div className="flex items-center gap-4">
                {product.weights.map(weight => (
                  <button
                    key={weight}
                    onClick={() => setSelectedWeight(weight)}
                    className={cn(
                      "font-semibold transition-colors duration-200",
                      selectedWeight === weight
                        ? 'text-white'
                        : 'text-white/50 hover:text-white'
                    )}
                  >
                    {weight}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="font-semibold uppercase tracking-wider text-white/50 mb-2">Flavor</p>
              <div className="flex gap-2">
                {product.flavors.map(flavor => (
                  <button
                    key={flavor.name}
                    onClick={() => setSelectedFlavor(flavor)}
                    title={flavor.name}
                    className={cn(
                      "w-5 h-5 rounded-full border-2 transition-all duration-300",
                      selectedFlavor.name === flavor.name ? 'border-white' : 'border-transparent opacity-80 hover:opacity-100'
                    )}
                    style={{ backgroundColor: flavor.color }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-6 pt-4">
          <button className="flex items-center gap-2 text-xs font-semibold text-white/90 hover:text-white transition-colors uppercase tracking-wider">
            <ShoppingCart size={14} />
            Buy Now
          </button>
          <button className="flex items-center gap-2 text-xs font-semibold text-white/60 hover:text-white transition-colors uppercase tracking-wider">
            <Heart size={14} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default BestSellerCard;
