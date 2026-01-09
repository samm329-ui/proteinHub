
'use client';

import { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';

type NavItem = {
  label: string;
  href: string;
};

interface NavbarProps {
  navItems: NavItem[];
  onNavItemClick: (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ navItems, onNavItemClick }) => {
  const [activeSection, setActiveSection] = useState('home');

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

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [navItems]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 h-16 flex items-center">
      <div className="container mx-auto flex justify-between items-center px-6">
        <div className="text-xl font-bold font-headline uppercase tracking-widest text-white/75">
          ProteinZone
        </div>
        <nav className="flex items-center space-x-8">
          <ul className="flex items-center space-x-8">
            {navItems.map(item => (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={(e) => onNavItemClick(e, item.href.substring(1))}
                  className={`font-medium tracking-widest uppercase transition-colors duration-300 ${
                    activeSection === item.href.substring(1)
                      ? 'text-[#C9A44C]'
                      : 'text-white/75 hover:text-[#C9A44C]'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <button className="text-white/75 hover:text-[#C9A44C] transition-colors">
            <ShoppingCart size={20} />
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
