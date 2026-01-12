
'use client';

import React, { useState, useEffect } from 'react';
import { Home, Package, Star, Phone, ShoppingCart } from 'lucide-react';
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
  contact: Phone,
};

const BottomNavbar: React.FC<BottomNavbarProps> = ({ navItems, onNavItemClick, onCartClick }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMounted, setIsMounted] = useState(false);
  const { cart } = useCart();

  useEffect(() => {
    setIsMounted(true);
    
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id)).filter(Boolean);
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      let currentSection = activeSection;
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
  }, [navItems, activeSection]);

  const cartItemCount = isMounted ? cart.reduce((total, item) => total + item.quantity, 0) : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 h-24 bg-transparent z-50 md:hidden">
      <div className="relative h-full flex items-end">
        {/* Cart Button */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2">
          <button
            onClick={onCartClick}
            className="relative w-16 h-16 bg-accent rounded-full flex items-center justify-center text-black shadow-lg shadow-accent/50"
          >
            <ShoppingCart size={28} />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold border-2 border-background">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>

        {/* Navbar background */}
        <div className="absolute bottom-0 left-0 right-0 h-[70px] bg-black/90 backdrop-blur-lg border-t border-white/10" style={{
            maskImage: 'linear-gradient(to top, black 50%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to top, black 50%, transparent 100%)',
        }}/>
        
        {/* Nav Items */}
        <nav className="relative w-full h-[70px]">
          <ul className="flex justify-around items-center h-full px-2">
            {navItems.map((item, index) => {
              const Icon = iconMap[item.id];
              // Split items for cart button placement
              if (index === 2) {
                return <li key="placeholder" className="w-16"></li>;
              }
              return (
                <li key={item.id} className="flex-1">
                  <a
                    href={item.href}
                    onClick={(e) => onNavItemClick(e, item.id)}
                    className={cn(
                      'flex flex-col items-center justify-center gap-1 transition-colors duration-300',
                      activeSection === item.id ? 'text-accent' : 'text-white/60 hover:text-white/90'
                    )}
                  >
                    {Icon && <Icon size={22} />}
                    <span className="text-[10px] font-medium tracking-wide uppercase">{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default BottomNavbar;
