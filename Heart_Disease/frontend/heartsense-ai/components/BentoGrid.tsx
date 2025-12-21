import React from 'react';
import { motion } from 'framer-motion';
import { SectionId } from '../types';

const BentoGrid: React.FC = () => {
  return (
    <section id={SectionId.STATS} className="py-24 px-6 bg-gray-50 text-black">
      <div className="max-w-6xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">GLOBAL INSIGHTS</h2>
          <div className="h-1 w-20 bg-black"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-4 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
          {/* Card 1: Main Stat - Large Square */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="md:col-span-2 md:row-span-2 bg-black text-white p-8 flex flex-col justify-between group hover:bg-neutral-900 transition-colors cursor-default border border-black"
          >
            <div>
              <svg className="w-12 h-12 mb-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
              <h3 className="text-6xl font-bold tracking-tighter">17.9M</h3>
              <p className="text-neutral-400 mt-2 text-lg">Lives lost annually to CVDs</p>
            </div>
            <div className="text-sm font-mono opacity-60">
              Source: World Health Organization
            </div>
          </motion.div>

          {/* Card 2: Interactive Tip - Horizontal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="md:col-span-2 bg-white border border-black p-8 flex items-center justify-between hover:bg-gray-100 transition-colors"
          >
             <div>
                <h4 className="font-bold text-xl uppercase tracking-wide mb-2">Prevention First</h4>
                <p className="text-sm text-gray-600 max-w-sm">80% of premature heart attacks and strokes are preventable through diet, exercise, and stress management.</p>
             </div>
             <div className="w-16 h-16 rounded-full border border-black flex items-center justify-center">
                <span className="font-bold text-xl">80%</span>
             </div>
          </motion.div>

          {/* Card 3: Vertical Stat */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="md:col-span-1 bg-white border border-black p-6 flex flex-col justify-center items-center text-center hover:invert transition-all duration-300"
          >
             <h4 className="text-4xl font-bold mb-2">1 in 3</h4>
             <p className="text-xs uppercase tracking-widest font-bold">Deaths Globally</p>
          </motion.div>

          {/* Card 4: Icon/Visual */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="md:col-span-1 bg-neutral-200 border border-black p-6 flex items-center justify-center overflow-hidden relative"
          >
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-black/10 to-transparent"></div>
             <svg className="w-24 h-24 text-black animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;