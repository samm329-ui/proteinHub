
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

  return (
    <div className="w-full max-w-xl mx-auto font-sans bg-[#0A0A0A] rounded-3xl shadow-2xl shadow-black/20 overflow-hidden">
      <div className="flex flex-col md:flex-row">
        
        {/* Left Side: Product Image */}
        <div 
          className="relative w-full md:w-2/5 flex items-center justify-center p-6 transition-colors duration-300 min-h-[300px] md:min-h-0"
          style={{ backgroundColor: accentColor }}
        >
           <div className="relative w-48 h-64 md:w-full md:h-full md:min-h-[20rem]">
            <Image
                src={product.image.src}
                alt={product.name}
                fill
                className="object-contain drop-shadow-[0_25px_25px_rgba(0,0,0,0.3)] transition-transform duration-300 hover:scale-105"
                style={{ 
                  transform: 'rotate(-5deg)',
                  filter: 'contrast(1.1) drop-shadow(0 35px 35px rgba(0,0,0,0.5))',
                }}
                data-ai-hint={product.image.hint}
                unoptimized
            />
          </div>
        </div>

        {/* Right Side: Product Details */}
        <div className="w-full md:w-3/5 flex flex-col justify-between p-6 text-white/90">
          
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-1">{product.category}</p>
            <h3 className="text-2xl lg:text-3xl font-bold font-headline uppercase tracking-wide">{product.name}</h3>
            <p className="text-sm text-white/70 mt-3 leading-relaxed max-w-md">{product.description}</p>
            
            <div className="flex items-baseline gap-3 mt-4">
                <p className="text-3xl font-bold">₹{product.price.toLocaleString()}</p>
                <p className="text-lg font-medium text-white/40 line-through">₹{product.oldPrice.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="mt-6 space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-2">Flavor</p>
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

             <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-2">Size</p>
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
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-3 mt-8 pt-6 border-t border-white/10">
            <Button
                className="w-full h-12 text-sm font-bold text-white hover:opacity-90 transition-all duration-300 rounded-lg"
                style={{ backgroundColor: accentColor }}
            >
              ADD TO CART
            </Button>
            <Button
              variant="outline"
              className="w-full h-12 text-sm font-bold border-white/20 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-all duration-300 rounded-lg"
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
