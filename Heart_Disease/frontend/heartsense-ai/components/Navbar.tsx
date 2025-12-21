import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { SectionId } from '../types';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-colors duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md border-b border-black' : 'bg-transparent text-white'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`text-2xl font-bold tracking-tighter ${isScrolled ? 'text-black' : 'text-white'}`}>
        HEART<span className="font-light opacity-70">SENSE</span>
      </div>

      <div className="hidden md:flex gap-8 items-center">
        {[
          { label: 'Predict', id: SectionId.PREDICT },
          { label: 'Insights', id: SectionId.STATS },
          { label: 'Process', id: SectionId.HOW_IT_WORKS },
          { label: 'FAQ', id: SectionId.FAQ },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className={`text-sm font-medium tracking-wide uppercase hover:opacity-60 transition-opacity ${
              isScrolled ? 'text-black' : 'text-white'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <button
        onClick={() => scrollTo(SectionId.PREDICT)}
        className={`px-5 py-2 text-sm font-bold uppercase tracking-wider border transition-all active:scale-95 rounded-none ${
          isScrolled
            ? 'border-black text-black hover:bg-black hover:text-white'
            : 'border-white text-white hover:bg-white hover:text-black'
        }`}
      >
        Start Analysis
      </button>
    </motion.nav>
  );
};

export default Navbar;