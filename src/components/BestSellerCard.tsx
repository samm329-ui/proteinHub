'use client';
import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { bestSellers } from '@/lib/products';
import { ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

type BestSellerCardProps = {
  product: (typeof bestSellers)[0];
};

const BestSellerCard = ({ product }: BestSellerCardProps) => {
  const [selectedWeight, setSelectedWeight] = useState(product.weights[0]);
  const [selectedFlavor, setSelectedFlavor] = useState(product.flavors[0]);
  const accentColor = selectedFlavor.color;

  return (
    <div className="font-sans bg-[#1a1e29] rounded-xl shadow-2xl shadow-black/40 w-full max-w-4xl mx-auto flex flex-col md:flex-row text-white/90 overflow-hidden my-10">
      
      {/* Left Panel: Visual */}
      <div className="relative w-full md:w-1/2 flex items-center justify-center p-6 bg-transparent overflow-hidden min-h-[350px] md:min-h-0">
        <div 
          className="absolute -right-1/4 -translate-y-1/2 top-1/2 w-[110%] h-[110%] rounded-full opacity-80"
          style={{ 
            backgroundColor: accentColor,
            filter: 'blur(40px)',
          }}
        />
        <div 
          className="absolute w-full h-full rounded-full"
          style={{ 
            background: `radial-gradient(circle at center, ${accentColor}00 0%, ${accentColor}33 100%)`,
            transform: 'scale(1.5)',
            opacity: 0.2,
          }}
        />
        <div className="relative w-4/5 aspect-[1/1] drop-shadow-[0_25px_20px_rgba(0,0,0,0.4)] z-10">
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
      <div className="w-full md:w-1/2 flex flex-col p-6 sm:p-8 justify-center">
        <div className="flex-grow flex flex-col">
          <p className="text-xs font-medium uppercase tracking-wider text-white/50 mb-2">{product.category}</p>
          <h3 className="text-3xl lg:text-4xl font-bold uppercase tracking-wide leading-tight">{product.name}</h3>
          <p className="text-white/60 mt-3 text-sm max-w-md leading-relaxed">{product.description}</p>
          
          <div className="flex items-baseline gap-4 my-6">
            <p className="text-4xl font-bold">₹{product.price.toLocaleString()}</p>
            <p className="text-lg font-medium text-white/40 line-through">₹{product.oldPrice.toLocaleString()}</p>
          </div>

          <div className="space-y-6 text-sm">
            <div>
              <p className="font-semibold uppercase tracking-wider text-white/50 mb-3 text-xs">Size</p>
              <div className="flex items-center gap-3">
                {product.weights.map(weight => (
                  <button
                    key={weight}
                    onClick={() => setSelectedWeight(weight)}
                    className={cn(
                      "px-3 py-1 rounded-md text-sm font-semibold transition-colors duration-200",
                      selectedWeight === weight
                        ? 'bg-white/90 text-black'
                        : 'bg-transparent text-white/70 hover:bg-white/10 ring-1 ring-inset ring-white/20'
                    )}
                  >
                    {weight}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="font-semibold uppercase tracking-wider text-white/50 mb-3 text-xs">Flavor</p>
              <div className="flex items-center gap-3">
                {product.flavors.map(flavor => (
                  <button
                    key={flavor.name}
                    onClick={() => setSelectedFlavor(flavor)}
                    title={flavor.name}
                    className={cn(
                      "w-6 h-6 rounded-full border-2 transition-all duration-300 transform hover:scale-110",
                      selectedFlavor.name === flavor.name ? 'border-white' : 'border-white/20'
                    )}
                    style={{ backgroundColor: flavor.color }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-8 pt-8 mt-8 border-t border-white/10">
           <Button
            style={{ backgroundColor: accentColor, color: '#000' }}
            className="flex-1 font-bold uppercase tracking-wider"
            size="lg"
          >
            <ShoppingCart size={16} className="mr-2"/>
            Add to Cart
          </Button>
          <Button variant="ghost" size="icon" className="text-white/70 hover:text-white">
            <Heart size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BestSellerCard;
