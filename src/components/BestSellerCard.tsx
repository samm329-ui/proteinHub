'use client';
import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { bestSellers } from '@/lib/products';
import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CircularProgress } from '@/components/ui/circular-progress';

type BestSellerCardProps = {
  product: (typeof bestSellers)[0];
};

const BestSellerCard = ({ product }: BestSellerCardProps) => {
  const [selectedWeight, setSelectedWeight] = useState(product.weights[0]);
  const [selectedFlavor, setSelectedFlavor] = useState(product.flavors[0]);
  const accentColor = selectedFlavor.color;

  // Simple conversion for stat value if it's a number string
  const statValue = typeof product.stat.value === 'string' ? parseInt(product.stat.value, 10) : product.stat.value;
  const progressValue = isNaN(statValue) ? 0 : statValue > 100 ? (statValue / 1000) * 100 : statValue;


  return (
    <div className="relative w-full max-w-2xl mx-auto font-sans">
      {/* Background Accent Card */}
      <div 
        className="absolute top-0 left-0 w-[95%] h-full rounded-2xl transition-colors duration-300"
        style={{ backgroundColor: accentColor, opacity: 0.8 }}
      />
      
      {/* Main Content Card */}
      <div className="relative flex flex-col md:flex-row bg-[#1a1e29] rounded-2xl shadow-2xl shadow-black/50 text-white/90 overflow-hidden w-full">
        
        {/* Left Panel: Visual */}
        <div className="relative w-full md:w-5/12 flex items-center justify-center p-4 md:p-0">
          <div className="relative w-full aspect-[1/1] z-10 -ml-4 md:-ml-8 transform scale-[1.1] drop-shadow-[0_20px_25px_rgba(0,0,0,0.4)]">
            <Image
              src={product.image.src}
              alt={product.name}
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        </div>

        {/* Right Panel: Details */}
        <div className="w-full md:w-7/12 flex flex-col p-6 sm:p-8 justify-center">
          <div className="flex-grow flex flex-col">
            <p className="text-xs font-medium uppercase tracking-wider text-white/50 mb-2">{product.category}</p>
            <h3 className="text-3xl font-bold uppercase tracking-wide leading-tight">{product.name}</h3>
            
            <p className="text-3xl font-bold my-4">₹{product.price.toLocaleString()}</p>
            
            <div className="flex items-center gap-12 text-sm mt-4">
              <div>
                <p className="font-semibold uppercase tracking-wider text-white/50 mb-3 text-xs">Size</p>
                <div className="flex items-center gap-3">
                  {product.weights.map(weight => (
                    <button
                      key={weight}
                      onClick={() => setSelectedWeight(weight)}
                      className={cn(
                        "h-8 w-8 flex items-center justify-center rounded-full text-xs font-bold transition-all duration-200",
                        selectedWeight === weight
                          ? 'ring-2 ring-offset-2 ring-offset-[#1a1e29]'
                          : 'bg-transparent text-white/70 hover:text-white/90'
                      )}
                      style={{ ringColor: selectedWeight === weight ? accentColor : 'transparent' }}
                    >
                      {weight}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col items-center">
                 <p className="font-semibold uppercase tracking-wider text-white/50 mb-2 text-xs">{product.stat.label}</p>
                 <CircularProgress value={progressValue} size={40} strokeWidth={3} color={accentColor} />
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-8 pt-6 mt-6">
             <Button
              style={{ backgroundColor: accentColor, color: '#000' }}
              className="flex-1 font-bold uppercase tracking-wider h-11"
              size="lg"
            >
              Add to Cart
            </Button>
            <Button variant="ghost" className="text-white/70 hover:text-white flex items-center gap-2">
              <Heart size={16} />
              <span className="text-xs">Add to Wishlist</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestSellerCard;
