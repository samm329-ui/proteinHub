
'use client';

import { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';

type NavItem = {
  label: string;
  href: string;
  id: string;
};

interface NavbarProps {
  navItems: NavItem[];
  onNavItemClick: (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void;
  onCartClick: () => void;
  suppressHydrationWarning?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ navItems, onNavItemClick, onCartClick, suppressHydrationWarning }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useCart();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const allSections = [...navItems.map(item => item.id), 'gallery', 'contact', 'about'];
      const sections = allSections.map(id => document.getElementById(id)).filter(Boolean);
      const scrollPosition = window.scrollY + 100;

      let currentSection = 'home';
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          currentSection = section.id;
          break;
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Set initial active section
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [navItems]);
  
  const handleMobileNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    setIsMenuOpen(false);
    onNavItemClick(e, targetId);
  }

  const cartItemCount = isMounted ? cart.reduce((total, item) => total + item.quantity, 0) : 0;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 h-16 md:h-16 flex items-center" suppressHydrationWarning={suppressHydrationWarning}>
        <div className="container mx-auto flex justify-between items-center px-5">
          <div className="flex-1 flex justify-start">
            <a href="#home" onClick={(e) => onNavItemClick(e, 'home')} className="text-xl font-bold font-headline uppercase tracking-widest text-white/75">
              ProteinZone
            </a>
          </div>
          <nav className="hidden md:flex flex-auto justify-center">
            <ul className="flex items-center space-x-8">
              {navItems.map(item => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => onNavItemClick(e, item.id)}
                    className={cn(
                      'font-medium tracking-widest uppercase transition-colors duration-300 text-sm',
                      activeSection === item.id
                        ? 'text-accent'
                        : 'text-white/75 hover:text-accent'
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="hidden md:flex flex-1 items-center justify-end">
            <button onClick={onCartClick} className="relative text-white/75 hover:text-accent transition-colors" suppressHydrationWarning={suppressHydrationWarning}>
              <ShoppingCart size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-xs font-bold text-black">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
          <div className="md:hidden flex-1 flex justify-end">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white/85">
              <Menu size={28} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={cn(
        "fixed inset-0 z-[100] bg-black transition-transform duration-300 ease-in-out md:hidden",
        isMenuOpen ? 'translate-y-0' : '-translate-y-full'
      )}>
        <div className="container mx-auto flex flex-col h-full px-5 py-4">
            <div className="flex justify-between items-center mb-16">
                 <div className="text-xl font-bold font-headline uppercase tracking-widest text-white/75">
                    ProteinZone
                 </div>
                <button onClick={() => setIsMenuOpen(false)} className="text-white/85">
                    <X size={28} />
                </button>
            </div>
            <nav>
                <ul className="flex flex-col items-center space-y-8">
                    {navItems.map(item => (
                        <li key={item.label}>
                        <a
                            href={item.href}
                            onClick={(e) => handleMobileNavClick(e, item.id)}
                            className={cn(
                              'font-headline tracking-[0.2em] text-2xl uppercase transition-colors duration-300',
                              activeSection === item.id
                                ? 'text-accent'
                                : 'text-white/85 hover:text-accent'
                            )}
                        >
                            {item.label}
                        </a>
                        </li>
                    ))}
                     <li className="mt-8">
                      <button onClick={() => { setIsMenuOpen(false); onCartClick(); }} className="relative text-white/85 hover:text-accent transition-colors">
                        <ShoppingCart size={28} />
                        {cartItemCount > 0 && (
                          <span className="absolute -top-2 -right-3 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-black">
                            {cartItemCount}
                          </span>
                        )}
                      </button>
                    </li>
                </ul>
            </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
