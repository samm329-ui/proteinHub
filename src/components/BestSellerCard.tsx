
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
    <div className="relative aspect-[4/3] w-full max-w-4xl mx-auto rounded-3xl p-4 md:p-6 lg:p-8 flex items-center justify-center bg-[#0c0c0c]">
      <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:linear-gradient(to_bottom,white_10%,transparent_90%)]"></div>

      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 rounded-full transition-colors duration-500"
        style={{
          backgroundColor: accentColor,
          filter: 'blur(100px)',
          opacity: 0.5,
        }}
      />

      <div className="w-full h-full rounded-2xl grid grid-cols-1 md:grid-cols-2 items-center">
        {/* Left Side: Product Image */}
        <div className="relative flex items-center justify-center h-full">
            <div
                className="absolute w-48 h-48 sm:w-72 sm:h-72 rounded-full transition-colors duration-500"
                style={{
                    backgroundColor: accentColor,
                    filter: 'blur(80px)',
                    opacity: 0.3
                }}
            />
             <div 
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[120%] h-[60%] bg-black/40 rounded-[100%]"
                style={{
                  filter: 'blur(20px)'
                }}
             />

            <div
                className="absolute w-[80%] h-full rounded-full transition-colors duration-500 opacity-20"
                style={{
                    backgroundColor: accentColor,
                    clipPath: 'ellipse(40% 100% at -10% 50%)'
                }}
            />
            <div className="relative w-48 h-80 sm:w-56 sm:h-96 md:w-64 md:h-[400px] transition-transform duration-300 hover:scale-105 z-10">
                <Image
                    src={product.image.src}
                    alt={product.name}
                    fill
                    className="object-contain drop-shadow-2xl"
                    data-ai-hint={product.image.hint}
                    unoptimized
                />
            </div>
        </div>
        
        {/* Right Side: Product Details */}
        <div className="flex flex-col p-4 sm:p-6 text-white justify-center h-full">
            <div>
                <p className="text-xs uppercase tracking-widest text-white/50 mb-1 sm:mb-2">{product.category}</p>
                <h3 className="text-2xl sm:text-3xl font-bold font-headline uppercase tracking-wider mb-2 sm:mb-3">{product.name}</h3>
                
                <div className="flex items-baseline gap-3 mb-4">
                    <p className="text-2xl sm:text-3xl font-bold" style={{ color: accentColor }}>₹{product.price}</p>
                    {product.oldPrice && <p className="text-base sm:text-lg text-white/40 line-through">₹{product.oldPrice}</p>}
                </div>
                
                <p className="text-sm text-white/60 mb-6 h-12 overflow-hidden">{product.description}</p>

                <div className="space-y-4">
                    <div>
                        <p className="text-xs uppercase tracking-widest text-white/50 mb-2">Weight</p>
                        <div className="flex flex-wrap gap-2">
                            {product.weights.map(weight => (
                                <button
                                    key={weight}
                                    onClick={() => setSelectedWeight(weight)}
                                    className={cn(
                                        "px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 border",
                                        selectedWeight === weight ? 'text-black border-transparent' : 'bg-transparent border-white/20 text-white/70 hover:bg-white/10'
                                    )}
                                    style={{ backgroundColor: selectedWeight === weight ? accentColor : undefined }}
                                >
                                    {weight}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <p className="text-xs uppercase tracking-widest text-white/50 mb-2">Flavor</p>
                        <div className="flex gap-3">
                            {product.flavors.map(flavor => (
                                <button
                                    key={flavor.name}
                                    onClick={() => setSelectedFlavor(flavor)}
                                    title={flavor.name}
                                    className={cn(
                                        "w-6 h-6 rounded-full border-2 transition-all duration-300",
                                        selectedFlavor.name === flavor.name ? 'scale-110 shadow-lg' : 'border-white/20 opacity-70 hover:opacity-100'
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
            
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <Button
                    className="w-full h-11 text-sm font-bold text-black transition-all duration-300"
                    style={{ backgroundColor: accentColor }}
                    onMouseOver={e => (e.currentTarget.style.filter = 'brightness(1.2)')}
                    onMouseOut={e => (e.currentTarget.style.filter = 'brightness(1)')}
                >
                    Buy Now
                </Button>
                <Button
                    variant="outline"
                    className="w-full h-11 text-white/70 hover:text-white bg-transparent border-white/20 hover:bg-white/10 text-sm"
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
