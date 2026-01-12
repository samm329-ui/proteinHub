
'use client';

import React from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { BestSellerProduct } from '@/lib/bestseller-products';
import { useCart } from '@/context/CartContext';

interface VerticalProductCardProps {
  product: BestSellerProduct;
}

const StarRating = ({ rating, totalStars = 5 }: { rating: number, totalStars?: number }) => {
  return (
    <div className="flex items-center">
      {[...Array(totalStars)].map((_, index) => {
        const starIsFilled = index < Math.floor(rating);
        const starIsHalf = index === Math.floor(rating) && rating % 1 !== 0;
        return (
          <div key={index} className="relative">
            <Star
              className={cn(
                'w-4 h-4',
                starIsFilled || starIsHalf ? 'text-yellow-400' : 'text-gray-600'
              )}
              fill={starIsFilled ? 'currentColor' : 'none'}
            />
            {starIsHalf && (
              <Star
                className="absolute top-0 left-0 w-4 h-4"
                fill="currentColor"
                style={{ clipPath: 'inset(0 50% 0 0)' }}
              />
            )}
          </div>
        );
      })}
      <span className="ml-2 text-xs text-white/50 font-medium">({rating})</span>
    </div>
  );
};

const VerticalProductCard: React.FC<VerticalProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const glowStyle = {
    background: `radial-gradient(ellipse 50% 40% at 50% 40%, ${product.accentGlowColor}30, transparent 70%)`,
  };

  const buttonGlowStyle = {
    boxShadow: `0 0 15px 2px ${product.accentGlowColor}50`,
  };
  
  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="font-sans relative flex flex-col w-full bg-[#1A1A1A] rounded-2xl overflow-hidden group border border-white/10 aspect-[3/4.5]">
      {/* Background Glow */}
      <div className="absolute inset-0 z-0" style={glowStyle} />

      {/* All content is now in a z-10 container to ensure it's on top of the glow */}
      <div className="relative z-10 flex flex-col flex-grow">
        {/* Price Badge */}
        <div className="absolute top-4 right-4 z-20">
          <div
            className="px-3 py-1 rounded-full text-xs font-bold text-black"
            style={{ backgroundColor: product.accentGlowColor, boxShadow: `0 0 10px ${product.accentGlowColor}` }}
          >
            ₹{product.price}
          </div>
        </div>

        {/* Product Image */}
        <div className="relative flex-shrink-0 h-2/5 w-full flex items-center justify-center mt-4">
          <div className="relative w-4/5 h-full drop-shadow-[0_20px_20px_rgba(0,0,0,0.5)] transform transition-transform duration-500 group-hover:scale-105">
            <Image
              src={product.image.src}
              alt={product.name}
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow px-5 py-2 text-center items-center justify-between">
          {/* Top Text */}
          <div className="w-full">
            <h3 className="text-sm font-bold uppercase text-white/90 leading-tight">
              {product.name}
            </h3>
            <ul className="mt-2 space-y-0.5 text-[10px] text-white/50 list-inside">
              {product.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </div>
          
          {/* Bottom Actions */}
          <div className="w-full flex flex-col items-center space-y-2">
            <StarRating rating={product.rating} />
            <Button
              onClick={handleAddToCart}
              className="w-full rounded-full font-bold uppercase tracking-wider transition-all duration-300 text-black text-xs h-9"
              style={{
                backgroundColor: product.accentGlowColor,
                ...buttonGlowStyle,
              }}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerticalProductCard;
