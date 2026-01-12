
'use client';

import React, { useState, useEffect } from 'react';
import { Home, Package, Star, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';

type NavItem = {
  label: string;
  href: string;
  id: string;
};

interface BottomNavbarProps {
  navItems: NavItem[];
  onNavItemClick: (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void;
  onCartClick: () => void;
}

const iconMap: { [key: string]: React.ElementType } = {
  home: Home,
  products: Package,
  bestsellers: Star,
  cart: ShoppingCart,
};

const BottomNavbar: React.FC<BottomNavbarProps> = ({ navItems, onNavItemClick, onCartClick }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMounted, setIsMounted] = useState(false);
  const { cart } = useCart();

  useEffect(() => {
    setIsMounted(true);
    
    const handleScroll = () => {
      const allSections = [...navItems.map(item => item.id)];
      const sections = allSections.map(id => document.getElementById(id)).filter(Boolean);
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      let currentSection = 'home';
      for (const section of sections) {
        if (section && section.offsetTop <= scrollPosition && section.offsetTop + section.offsetHeight > scrollPosition) {
          currentSection = section.id;
          break;
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  const cartItemCount = isMounted ? cart.reduce((total, item) => total + item.quantity, 0) : 0;
  
  const allNavItems = [...navItems, { label: 'Cart', href: '#', id: 'cart' }];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-black/90 backdrop-blur-lg border-t border-white/10 z-50 md:hidden">
      <nav className="h-full">
        <ul className="flex justify-around items-center h-full px-2">
          {allNavItems.map((item) => {
            const Icon = iconMap[item.id];
            const isCart = item.id === 'cart';
            const isActive = activeSection === item.id && !isCart;

            const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
              if (isCart) {
                e.preventDefault();
                onCartClick();
              } else {
                onNavItemClick(e, item.id);
              }
            };
            
            return (
              <li key={item.id} className="flex-1">
                <a
                  href={item.href}
                  onClick={handleClick}
                  className={cn(
                    'flex flex-col items-center justify-center gap-1 transition-colors duration-300 relative',
                    isActive ? 'text-accent' : 'text-white/60 hover:text-white/90'
                  )}
                >
                  {Icon && <Icon size={24} />}
                  <span className="text-[10px] font-medium tracking-wide uppercase">{item.label}</span>
                   {isCart && cartItemCount > 0 && (
                    <span className="absolute -top-1 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-black">
                      {cartItemCount}
                    </span>
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default BottomNavbar;
