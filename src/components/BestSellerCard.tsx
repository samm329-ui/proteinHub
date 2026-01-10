
'use client';
import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { bestSellers } from '@/lib/products';

type BestSellerCardProps = {
  product: (typeof bestSellers)[0];
};

const BestSellerCard = ({ product }: BestSellerCardProps) => {
  const [selectedWeight, setSelectedWeight] = useState(product.weights[0]);
  const [selectedFlavor, setSelectedFlavor] = useState(product.flavors[0]);
  const accentColor = selectedFlavor.color;

  return (
    <div className="relative p-1 h-[480px] sm:h-[450px] flex items-center justify-center">
      {/* Back Card */}
      <div
        className="absolute top-0 left-0 w-[90%] h-full rounded-3xl transition-colors duration-500"
        style={{ backgroundColor: accentColor }}
      />
      {/* Front Card */}
      <div className="absolute top-0 right-0 w-[95%] h-full bg-gradient-to-br from-[#18181B] to-[#101012] rounded-3xl shadow-2xl shadow-black/50 grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* Left Side - Image */}
        <div className="relative flex items-center justify-center -translate-y-4 md:translate-y-0">
          <div
            className="absolute w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] rounded-full opacity-30 transition-colors duration-500"
            style={{
              backgroundColor: accentColor,
              filter: 'blur(50px)',
            }}
          />
          <div className="relative w-40 h-72 sm:w-48 sm:h-80 md:w-56 md:h-[350px] transition-transform duration-300 hover:scale-105">
            <Image
              src={product.image.src}
              alt={product.name}
              fill
              className="object-contain drop-shadow-2xl -rotate-6"
              data-ai-hint={product.image.hint}
              unoptimized
            />
          </div>
        </div>

        {/* Right Side - Details */}
        <div className="flex flex-col justify-between p-4 sm:p-6 text-white -translate-y-8 md:translate-y-0">
          <div className="flex flex-col flex-grow justify-center">
            <p className="text-xs uppercase tracking-widest text-white/50 mb-1 sm:mb-2">{product.category}</p>
            <h3 className="text-lg sm:text-xl font-bold font-headline uppercase tracking-wider mb-2 sm:mb-3">{product.name}</h3>
            <div className="flex items-baseline gap-3 mb-3 sm:mb-4">
              <p className="text-xl sm:text-2xl font-bold" style={{ color: accentColor }}>₹{product.price}</p>
              {product.oldPrice && <p className="text-sm sm:text-base text-white/40 line-through">₹{product.oldPrice}</p>}
            </div>

            <div className="space-y-4 flex-grow">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-widest text-white/50">Weight</p>
                <div className="flex flex-wrap gap-2">
                  {product.weights.map(weight => (
                    <button
                      key={weight}
                      onClick={() => setSelectedWeight(weight)}
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 border",
                        selectedWeight === weight
                          ? 'text-black border-transparent'
                          : 'bg-transparent border-white/20 text-white/70 hover:bg-white/10'
                      )}
                      style={{
                        backgroundColor: selectedWeight === weight ? accentColor : undefined
                      }}
                    >
                      {weight}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs uppercase tracking-widest text-white/50">Flavor</p>
                <div className="flex gap-3">
                  {product.flavors.map(flavor => (
                    <button
                      key={flavor.name}
                      onClick={() => setSelectedFlavor(flavor)}
                      title={flavor.name}
                      className={cn(
                        "w-5 h-5 rounded-full border-2 transition-all duration-300",
                        selectedFlavor.name === flavor.name
                          ? 'scale-110 shadow-lg'
                          : 'border-white/20'
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
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <Button
              className="w-full h-10 sm:h-11 text-sm font-bold text-black transition-all duration-300"
              style={{ backgroundColor: accentColor }}
              onMouseOver={e => (e.currentTarget.style.filter = 'brightness(1.2)')}
              onMouseOut={e => (e.currentTarget.style.filter = 'brightness(1)')}
            >
              Add to Cart
            </Button>
            <Button
              variant="outline"
              className="w-full text-white/70 hover:text-white bg-transparent border-white/20 hover:bg-white/10 text-sm"
            >
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestSellerCard;
