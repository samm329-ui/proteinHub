
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

      <div className="w-full h-full rounded-2xl bg-black/50 shadow-2xl shadow-black/50 grid grid-cols-1 md:grid-cols-2">
        {/* Left Side: Product Image */}
        <div className="relative flex items-center justify-center">
            <div
                className="absolute w-[60%] h-[60%] rounded-full opacity-40 transition-colors duration-500"
                style={{
                    backgroundColor: accentColor,
                    filter: 'blur(80px)',
                }}
            />
            <div className="absolute w-[50%] h-[70%] -translate-x-4">
                <div
                    className="w-full h-full rounded-full transition-colors duration-500 opacity-50"
                    style={{
                        backgroundColor: accentColor,
                        clipPath: 'ellipse(60% 100% at 0% 50%)'
                    }}
                />
            </div>
            <div className="relative w-48 h-80 sm:w-56 sm:h-96 transition-transform duration-300 hover:scale-105 z-10">
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
        <div className="flex flex-col p-4 sm:p-6 text-white justify-between">
            <div>
                <p className="text-xs uppercase tracking-widest text-white/50 mb-1 sm:mb-2">{product.category}</p>
                <h3 className="text-2xl sm:text-3xl font-bold font-headline uppercase tracking-wider mb-2 sm:mb-3">{product.name}</h3>
                <p className="text-sm text-white/60 mb-4 h-12 overflow-hidden">{product.description}</p>
                
                <div className="flex items-baseline gap-3 mb-4">
                    <p className="text-2xl sm:text-3xl font-bold" style={{ color: accentColor }}>₹{product.price}</p>
                    {product.oldPrice && <p className="text-base sm:text-lg text-white/40 line-through">₹{product.oldPrice}</p>}
                </div>

                <div className="flex items-center justify-between">
                    <div className="space-y-3">
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
                    <div className="flex flex-col items-center justify-center text-center">
                        <div
                            className="w-20 h-20 rounded-full border-2 flex items-center justify-center transition-colors duration-500"
                            style={{borderColor: accentColor}}
                        >
                            <div className="text-center">
                                <p className="text-2xl font-bold" style={{color: accentColor}}>{product.stat.value}</p>
                                <p className="text-xs text-white/50 -mt-1">{product.stat.label}</p>
                            </div>
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
