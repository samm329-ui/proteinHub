
'use client';

import React from 'react';
import Image from 'next/image';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface CartSheetProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
}

const CartSheet: React.FC<CartSheetProps> = ({ isOpen, onOpenChange }) => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="bg-background/95 backdrop-blur-lg border-l border-white/10 text-white w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="p-6 pb-4">
          <SheetTitle className="text-2xl text-white/90">Your Cart</SheetTitle>
        </SheetHeader>
        <Separator className="bg-white/10" />

        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
            <p className="text-white/60">Your cart is empty.</p>
            <p className="text-sm text-white/40 mt-2">Add some products to get started!</p>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1">
              <div className="p-6 space-y-6">
                {cart.map((item) => (
                  <div key={item.name} className="flex items-center gap-4">
                    <div className="relative w-20 h-20 rounded-md overflow-hidden bg-white/5 flex items-center justify-center">
                      <Image
                        src={item.image.src}
                        alt={item.name}
                        width={60}
                        height={60}
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-white/90">{item.name}</h4>
                      <p className="text-xs text-white/50">₹{item.price.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={() => updateQuantity(item.name, item.quantity - 1)} className="w-6 h-6 rounded-full bg-white/10 text-white/80">-</button>
                        <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.name, item.quantity + 1)} className="w-6 h-6 rounded-full bg-white/10 text-white/80">+</button>
                    </div>
                     <button onClick={() => removeFromCart(item.name)} className="text-white/40 hover:text-red-500 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                    </button>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <SheetFooter className="p-6 bg-black/50 border-t border-white/10">
              <div className="w-full space-y-4">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span className="text-white/60">Total</span>
                  <span className="text-white/90">₹{total.toLocaleString()}</span>
                </div>
                <Button size="lg" className="w-full h-12 bg-accent text-black font-bold uppercase tracking-wider text-base hover:bg-accent/90">
                  Checkout
                </Button>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
