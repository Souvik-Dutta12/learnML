import React from 'react';
import { motion } from 'framer-motion';
import { SectionId } from '../types';

const Hero: React.FC = () => {
  return (
    <section id={SectionId.HERO} className="relative h-screen w-full bg-black overflow-hidden flex flex-col items-center justify-center text-white">
      {/* Background Dots */}
      <div className="absolute inset-0 bg-dot-pattern opacity-20 pointer-events-none"></div>

      {/* Animated Wave Background */}
      <div className="absolute bottom-0 left-0 w-full h-64 overflow-hidden pointer-events-none opacity-50">
        <svg viewBox="0 0 1440 320" className="absolute bottom-0 w-full h-full" preserveAspectRatio="none">
           <motion.path
             fill="#ffffff"
             fillOpacity="1"
             d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
             initial={{ d: "M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" }}
             animate={{
               d: [
                 "M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                 "M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,133.3C672,117,768,139,864,165.3C960,192,1056,224,1152,218.7C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                 "M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
               ]
             }}
             transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
           />
        </svg>
      </div>

      <div className="z-10 text-center px-4 max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-6xl md:text-9xl font-bold tracking-tighter leading-none mb-6"
        >
          HEART<br /><span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600">SENSE</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg md:text-2xl font-light text-gray-400 max-w-2xl mx-auto mb-10"
        >
          Precision AI Prediction. Zero Compromise. <br/> Understand your heart health with data-driven clarity.
        </motion.p>

        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.6, duration: 0.5 }}
        >
          <a
            href={`#${SectionId.PREDICT}`}
            className="inline-block px-10 py-4 text-sm md:text-base font-bold uppercase tracking-[0.2em] border border-white text-white hover:bg-white hover:text-black transition-all duration-300 rounded-none"
          >
            Start Prediction
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;