
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { BestSellerProduct } from '@/lib/bestseller-products';
import { useToast } from '@/hooks/use-toast';

export type CartItem = BestSellerProduct & { quantity: number };

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: BestSellerProduct) => void;
  removeFromCart: (productName: string) => void;
  updateQuantity: (productName: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { toast } = useToast();

  const addToCart = (product: BestSellerProduct) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.name === product.name);
      if (existingItem) {
        return prevCart.map((item) =>
          item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
    })
  };

  const removeFromCart = (productName: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.name !== productName));
  };

  const updateQuantity = (productName: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productName);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.name === productName ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
