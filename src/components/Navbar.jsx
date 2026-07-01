import React, { useState, useEffect } from 'react';
import { Code } from 'lucide-react';

// Pokéball-inspired Custom CSS Icon
const PokeBallIcon = ({ isActive, isHovered }) => {
  return (
    <div
      className={`w-5 h-5 rounded-full border relative flex items-center justify-center overflow-hidden transition-all duration-500 ${isHovered ? 'rotate-[360deg] scale-115' : 'rotate-0 scale-100'
        } ${isActive
          ? 'border-white bg-white shadow-[0_0_8px_rgba(255,255,255,0.4)]'
          : 'border-neutral-500 bg-neutral-950 group-hover:border-orangeAccent'
        }`}
    >
      {/* Top Half */}
      <div
        className={`absolute top-0 left-0 w-full h-[50%] transition-colors duration-300 ${isActive ? 'bg-[#111111]' : 'bg-orangeAccent'
          }`}
      />
      {/* Bottom Half */}
      <div
        className={`absolute bottom-0 left-0 w-full h-[50%] transition-colors duration-300 ${isActive ? 'bg-[#111111]' : 'bg-[#333333]'
          }`}
      />
      {/* Center Dividing Line */}
      <div
        className={`absolute top-[calc(50%-1px)] left-0 w-full h-[2px] transition-colors duration-300 ${isActive ? 'bg-white' : 'bg-neutral-950'
          }`}
      />
      {/* Center Button */}
      <div
        className={`absolute w-2 h-2 rounded-full border flex items-center justify-center z-10 transition-colors duration-300 ${isActive
          ? 'border-white bg-[#111111]'
          : 'border-neutral-950 bg-white shadow-[0_0_4px_rgba(232,84,26,0.5)]'
          }`}
      >
        <div
          className={`w-1 h-1 rounded-full transition-colors duration-300 ${isActive ? 'bg-white' : 'bg-orangeAccent'
            }`}
        />
      </div>
    </div>
  );
};

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  const navItems = [
    { id: 'home', label: 'HOME' },
    { id: 'about', label: 'ABOUT' },
    { id: 'skills', label: 'SKILLS' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'experience', label: 'EXPERIENCE' },
    { id: 'contact', label: 'CONTACT' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Background shading on scroll
      setIsScrolled(window.scrollY > 50);

      // Section tracking
      const scrollPosition = window.scrollY + 120;
      for (let i = navItems.length - 1; i >= 0; i--) {
        const section = document.getElementById(navItems[i].id);
        if (section && scrollPosition >= section.offsetTop) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800/50 py-3 shadow-lg'
        : 'bg-transparent py-5'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Left: Logo Badge */}
        <div
          onClick={() => scrollToSection('home')}
          className="flex items-center gap-2 cursor-pointer group"
          id="nav-logo"
        >
          <div className="w-10 h-10 rounded-xl bg-orangeAccent/10 border border-orangeAccent/30 flex items-center justify-center text-orangeAccent group-hover:bg-orangeAccent group-hover:text-white transition-all duration-300">
            <Code size={20} />
          </div>
          <span className="font-serif text-lg font-bold tracking-tight text-white group-hover:text-orangeAccent transition-colors duration-300">
            Shresh<span className="text-orangeAccent font-sans text-sm font-semibold ml-1">.dev</span>
          </span>
        </div>

        {/* Center: Pokéball navigation buttons that expand on hover/active */}
        <div className="flex items-center gap-2 bg-neutral-900/60 p-1.5 px-3 rounded-full border border-neutral-800/80 backdrop-blur-sm overflow-x-auto max-w-full">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            const isHovered = hoveredItem === item.id;
            const showLabel = isActive || isHovered;

            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className="flex items-center p-1 rounded-full hover:bg-neutral-800/40 transition-all duration-300 group focus:outline-none shrink-0"
                aria-label={`Navigate to ${item.label}`}
                id={`nav-link-${item.id}`}
              >
                {/* Pokéball Icon Container */}
                <div className="relative w-8 h-8 flex items-center justify-center shrink-0">

                  {/* Outer dashed border */}
                  <div
                    className={`absolute inset-0 rounded-full border border-dashed transition-all duration-500 ${isActive
                      ? 'border-orangeAccent rotate-45 scale-110 glow-orange'
                      : 'border-neutral-700 group-hover:border-orangeAccent group-hover:rotate-[135deg]'
                      }`}
                  ></div>

                  {/* Custom CSS Pokéball Icon */}
                  <div className="relative z-20">
                    <PokeBallIcon isActive={isActive} isHovered={isHovered} />
                  </div>
                </div>

                {/* Section Name - dynamically expands when hovered or active */}
                <span
                  className={`font-mono text-[10px] sm:text-xs tracking-wider uppercase font-semibold overflow-hidden whitespace-nowrap transition-all duration-500 ease-in-out ${showLabel
                    ? 'max-w-24 opacity-100 ml-2 pr-2'
                    : 'max-w-0 opacity-0 ml-0 pr-0 pointer-events-none'
                    } ${isActive
                      ? 'text-orangeAccent font-bold'
                      : 'text-neutral-400 group-hover:text-white'
                    }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right: Hire Me CTA */}
        <div>
          <button
            onClick={() => scrollToSection('contact')}
            className="hidden lg:inline-flex items-center justify-center px-5 py-2.5 rounded-full border border-orangeAccent text-orangeAccent hover:bg-orangeAccent hover:text-white font-medium text-sm tracking-wide transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
            id="nav-hire-me-btn"
          >
            Hire Me
          </button>
        </div>

      </div>
    </nav>
  );
}
