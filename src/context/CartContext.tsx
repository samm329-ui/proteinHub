
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { BestSellerProduct } from '@/lib/bestseller-products';

type CartItem = BestSellerProduct & { quantity: number };

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: BestSellerProduct) => void;
  // We can add more functions here later like removeFromCart, updateQuantity etc.
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: BestSellerProduct) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.name === product.name);
      if (existingItem) {
        // If item exists, increase quantity
        return prevCart.map((item) =>
          item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      // If item doesn't exist, add it to cart with quantity 1
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
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
