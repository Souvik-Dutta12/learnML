import React from 'react';
import { motion } from 'framer-motion';
import { SectionId } from '../types';

const steps = [
  {
    num: "01",
    title: "Input Biometrics",
    desc: "Enter key physiological markers including BP, Cholesterol, and ECG results into our secure form."
  },
  {
    num: "02",
    title: "AI Analysis",
    desc: "Our Gemini-powered engine compares your profile against thousands of clinical datasets instantly."
  },
  {
    num: "03",
    title: "Get Action Plan",
    desc: "Receive a comprehensive PDF report with personalized lifestyle and medical recommendations."
  }
];

const HowItWorks: React.FC = () => {
  return (
    <section id={SectionId.HOW_IT_WORKS} className="py-32 px-6 bg-black text-white border-t border-white/20">
       <div className="max-w-6xl mx-auto">
         <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           className="flex flex-col md:flex-row justify-between items-end mb-20"
         >
           <h2 className="text-5xl font-bold tracking-tighter">THE PROCESS</h2>
           <p className="text-gray-400 max-w-sm text-right mt-4 md:mt-0 font-light">
             Advanced medical algorithms simplified into three distinct steps.
           </p>
         </motion.div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/20 pt-12">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="group cursor-default"
              >
                 <div className="text-7xl font-light text-neutral-800 group-hover:text-white transition-colors duration-500 font-mono mb-6">
                   {step.num}
                 </div>
                 <h3 className="text-2xl font-bold uppercase tracking-wide mb-4">{step.title}</h3>
                 <p className="text-gray-400 group-hover:text-gray-200 transition-colors leading-relaxed">
                   {step.desc}
                 </p>
              </motion.div>
            ))}
         </div>
       </div>
    </section>
  );
};

export default HowItWorks;