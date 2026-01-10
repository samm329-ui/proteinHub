
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
    <div className="font-sans bg-[#1a1e29] rounded-xl shadow-2xl shadow-black/40 overflow-hidden w-full max-w-4xl mx-auto flex flex-col md:flex-row text-white/90">
      
      {/* Left Panel: Visual */}
      <div className="relative w-full md:w-1/2 flex items-center justify-center p-6 bg-[#1a1e29] overflow-hidden min-h-[350px] md:min-h-0 rounded-t-xl md:rounded-l-xl md:rounded-r-none">
        <div 
          className="absolute -left-1/2 top-1/2 -translate-y-1/2 w-[200%] h-[110%] rounded-r-full"
          style={{ backgroundColor: accentColor }}
        />
        <div className="relative w-4/5 aspect-[1/1] drop-shadow-[0_20px_15px_rgba(0,0,0,0.4)] z-10">
          <Image
            src={product.image.src}
            alt={product.name}
            fill
            className="object-contain scale-[1.2] -rotate-[15deg]"
            unoptimized
          />
        </div>
      </div>

      {/* Right Panel: Details */}
      <div className="w-full md:w-1/2 flex flex-col p-6 sm:p-8 justify-center bg-[#1a1e29]">
        <div className="flex-grow flex flex-col">
          <p className="text-xs font-medium uppercase tracking-wider text-white/50 mb-2">{product.category}</p>
          <h3 className="text-2xl lg:text-3xl font-bold uppercase tracking-wide leading-tight">{product.name}</h3>
          
          <p className="text-sm text-white/60 mt-3 max-w-sm">{product.description}</p>

          <div className="flex items-baseline gap-3 my-5">
            <p className="text-3xl font-bold">₹{product.price.toLocaleString()}</p>
            <p className="text-base font-medium text-white/40 line-through">₹{product.oldPrice.toLocaleString()}</p>
          </div>

          <div className="space-y-5 text-sm">
            <div>
              <p className="font-semibold uppercase tracking-wider text-white/50 mb-2">Size</p>
              <div className="flex items-center gap-2">
                {product.weights.map(weight => (
                  <button
                    key={weight}
                    onClick={() => setSelectedWeight(weight)}
                    className={cn(
                      "px-4 py-1.5 rounded-full text-xs font-semibold transition-colors duration-200",
                      selectedWeight === weight
                        ? 'bg-white/90 text-black'
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                    )}
                  >
                    {weight}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="font-semibold uppercase tracking-wider text-white/50 mb-2">Flavor</p>
              <div className="flex gap-2.5">
                {product.flavors.map(flavor => (
                  <button
                    key={flavor.name}
                    onClick={() => setSelectedFlavor(flavor)}
                    title={flavor.name}
                    className={cn(
                      "w-7 h-7 rounded-full border-2 transition-all duration-300 transform hover:scale-110",
                      selectedFlavor.name === flavor.name ? 'border-white' : 'border-transparent opacity-80 hover:opacity-100'
                    )}
                    style={{ backgroundColor: flavor.color }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-6 pt-8 mt-auto border-t border-white/10">
          <Button 
            className="flex-1 text-sm font-semibold uppercase tracking-wider transition-transform duration-200 hover:scale-105"
            style={{ backgroundColor: accentColor, color: '#000' }}
          >
            <ShoppingCart size={16} className="mr-2" />
            Add to Cart
          </Button>
          <button className="flex items-center gap-2 text-sm font-semibold text-white/60 hover:text-white transition-colors uppercase tracking-wider">
            <Heart size={16} />
            Wishlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default BestSellerCard;
