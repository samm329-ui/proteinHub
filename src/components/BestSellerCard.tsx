
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

  return (
    <div className="relative w-full max-w-4xl mx-auto p-4 flex items-center justify-center font-sans" style={{ height: '400px' }}>
      <div 
        className="absolute inset-0 bg-[#12141D] rounded-3xl"
      >
        {/* Decorative background shapes */}
        <div className="absolute top-4 right-8 text-white/5 text-4xl font-mono select-none">△</div>
        <div className="absolute bottom-16 left-12 text-white/5 text-5xl font-mono select-none">♢</div>
        <div className="absolute bottom-8 right-1/4 text-white/5 text-3xl font-mono select-none">○</div>
      </div>
      
      {/* Main Content Card */}
      <div className="relative w-[95%] h-[90%] bg-[#1A1C29] rounded-2xl shadow-2xl shadow-black/40 flex overflow-hidden">
        
        {/* Geometric backdrop */}
        <div 
          className="absolute -left-20 -top-1/4 w-80 h-80 rounded-full transition-colors duration-500"
          style={{ backgroundColor: accentColor }}
        />

        {/* Left Side: Product Image */}
        <div className="w-1/2 flex items-center justify-center z-10">
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
        <div className="w-1/2 flex flex-col p-6 sm:p-8 text-white">
          <div className="flex-grow">
            <p className="text-xs uppercase tracking-widest text-white/40 mb-1">{product.category}</p>
            <h3 className="text-2xl font-bold font-headline uppercase tracking-wider mb-2">{product.name} - {selectedFlavor.name}</h3>

            <div className="flex items-baseline gap-3 mb-4">
              <p className="text-2xl font-bold" style={{ color: accentColor }}>₹{product.price.toLocaleString()}</p>
              {product.oldPrice && (
                <p className="text-base text-white/40 line-through">₹{product.oldPrice.toLocaleString()}</p>
              )}
            </div>
            
            <div className="space-y-4">
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/50 mb-2">Size</p>
                  <div className="flex gap-2">
                    {product.weights.map(weight => (
                      <button
                        key={weight}
                        onClick={() => setSelectedWeight(weight)}
                        className={cn(
                          "w-9 h-7 rounded-md text-xs font-medium transition-all duration-200 flex items-center justify-center border",
                          selectedWeight === weight
                            ? 'text-black border-transparent font-bold'
                            : 'bg-transparent border-white/20 text-white/70 hover:bg-white/10'
                        )}
                        style={{ 
                          backgroundColor: selectedWeight === weight ? accentColor : 'transparent',
                        }}
                      >
                        {weight.replace('kg','')}kg
                      </button>
                    ))}
                  </div>
                </div>
                 <div>
                  <p className="text-xs uppercase tracking-widest text-white/50 mb-2">Color</p>
                   <div className="flex gap-3">
                    {product.flavors.map(flavor => (
                      <button
                        key={flavor.name}
                        onClick={() => setSelectedFlavor(flavor)}
                        title={flavor.name}
                        className={cn(
                          "w-5 h-5 rounded-full border-2 transition-all duration-300",
                          selectedFlavor.name === flavor.name ? 'scale-110 shadow-lg' : 'border-transparent'
                        )}
                         style={{ 
                          backgroundColor: flavor.color, 
                          borderColor: selectedFlavor.name === flavor.name ? 'white' : 'transparent' 
                        }}
                      />
                    ))}
                  </div>
                </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 mt-6">
            <Button
              className="w-full h-11 text-sm font-bold text-black transition-all duration-300"
              style={{ backgroundColor: accentColor }}
              onMouseOver={e => (e.currentTarget.style.filter = 'brightness(1.1)')}
              onMouseOut={e => (e.currentTarget.style.filter = 'brightness(1)')}
            >
              Buy Now
            </Button>
            <Button
              variant="outline"
              className="w-full text-white/70 hover:text-white bg-transparent border-white/20 hover:bg-white/10"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestSellerCard;
