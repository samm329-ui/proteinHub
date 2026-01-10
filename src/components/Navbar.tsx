
'use client';

import { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';

type NavItem = {
  label: string;
  href: string;
};

interface NavbarProps {
  navItems: NavItem[];
  onNavItemClick: (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void;
  suppressHydrationWarning?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ navItems, onNavItemClick, suppressHydrationWarning }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.href.substring(1)));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          const newActiveSection = section.id;
          if (newActiveSection) {
            setActiveSection(newActiveSection);
          }
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [navItems]);
  
  const handleMobileNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    setIsMenuOpen(false);
    onNavItemClick(e, targetId);
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 h-16 md:h-16 flex items-center" suppressHydrationWarning={suppressHydrationWarning}>
        <div className="container mx-auto flex justify-between items-center px-5">
          <div className="text-xl font-bold font-headline uppercase tracking-widest text-white/75">
            ProteinZone
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <ul className="flex items-center space-x-8">
              {navItems.map(item => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => onNavItemClick(e, item.href.substring(1))}
                    className={`font-medium tracking-widest uppercase transition-colors duration-300 text-sm ${
                      activeSection === item.href.substring(1)
                        ? 'text-accent'
                        : 'text-white/75 hover:text-accent'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="hidden md:flex items-center">
            <button className="text-white/75 hover:text-accent transition-colors" suppressHydrationWarning={suppressHydrationWarning}>
              <ShoppingCart size={20} />
            </button>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white/85">
              <Menu size={28} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[100] bg-black transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
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
                            onClick={(e) => handleMobileNavClick(e, item.href.substring(1))}
                            className={`font-headline tracking-[0.2em] text-2xl uppercase transition-colors duration-300 ${
                            activeSection === item.href.substring(1)
                                ? 'text-accent'
                                : 'text-white/85 hover:text-accent'
                            }`}
                        >
                            {item.label}
                        </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
