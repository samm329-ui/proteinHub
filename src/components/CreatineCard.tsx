
'use client';
import React from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { BestSellerProduct } from '@/lib/bestseller-products';

interface CreatineCardProps {
  product: BestSellerProduct;
}

const StarRating = ({ rating, totalStars = 5 }: { rating: number; totalStars?: number }) => {
  return (
    <div className="flex items-center gap-1">
      {[...Array(totalStars)].map((_, index) => {
        const starIsFilled = index < Math.floor(rating);
        return (
          <Star
            key={index}
            className={cn('w-4 h-4', starIsFilled ? 'text-yellow-400' : 'text-gray-600')}
            fill={starIsFilled ? 'currentColor' : 'none'}
            strokeWidth={starIsFilled ? 0 : 1}
          />
        );
      })}
      <span className="ml-1 text-sm text-white/60 font-medium">({rating})</span>
    </div>
  );
};

const CreatineCard: React.FC<CreatineCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const cardStyle = {
    '--accent-color': product.accentGlowColor,
    '--accent-color-rgb': product.accentGlowColor.replace('#', ''),
  } as React.CSSProperties;

  return (
    <div
      style={cardStyle}
      className="relative flex-shrink-0 w-full h-full snap-center bg-black/50 rounded-[24px] border border-white/10 overflow-hidden flex flex-col p-5 shadow-2xl shadow-black/50 backdrop-blur-xl"
    >
      {/* Accent Glow Strip */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-[var(--accent-color)]" style={{
          boxShadow: `0 0 15px 3px var(--accent-color)`
      }}/>
      
      {/* Inner Glow */}
      <div className="absolute top-0 left-0 right-0 h-1/2 w-full bg-gradient-to-b from-[var(--accent-color)]/20 to-transparent opacity-50"/>

      <div className="relative flex flex-col h-full z-10 pt-4">
        {/* Product Image */}
        <div className="relative h-[200px] w-full mb-4">
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src={product.image.src}
                alt={product.name}
                width={200}
                height={200}
                className="object-contain drop-shadow-[0_15px_15px_rgba(0,0,0,0.7)]"
                unoptimized
              />
            </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow items-center text-center">
          <h3 className="text-xl font-bold uppercase text-white/95 leading-tight tracking-wide">
            {product.name}
          </h3>
          <ul className="mt-4 space-y-1 text-sm text-white/60 list-inside">
            {product.features.map((feature, i) => (
              <li key={i}>{feature}</li>
            ))}
          </ul>
          
          <div className="mt-auto pt-6 flex flex-col items-center gap-6 w-full">
            <StarRating rating={product.rating} />
            <Button
              onClick={() => addToCart(product)}
              className="w-full h-14 rounded-full font-bold uppercase text-base tracking-wider transition-all duration-300 text-black bg-[var(--accent-color)] hover:brightness-110"
              style={{
                boxShadow: `0 0 20px 0px var(--accent-color)`,
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

export default CreatineCard;
