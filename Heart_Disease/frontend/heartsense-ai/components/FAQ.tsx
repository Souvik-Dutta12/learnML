import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionId } from '../types';

const faqs = [
  {
    q: "Is the prediction 100% accurate?",
    a: "No medical prediction model is 100% accurate. HeartSense serves as a preliminary screening tool to highlight potential risks. Always consult a certified cardiologist for a definitive diagnosis."
  },
  {
    q: "How does the AI model work?",
    a: "We utilize Google's Gemini Pro model, trained on extensive anonymized cardiac datasets, to recognize patterns and correlations in your biometric data that might indicate heart disease."
  },
  {
    q: "Is my data saved?",
    a: "No. Your privacy is paramount. All processing happens in real-time, and no personal health information (PHI) is stored on our servers after the session ends."
  },
  {
    q: "What do I do if I get a High Risk result?",
    a: "Download the generated PDF report and schedule an appointment with your primary care physician or a cardiologist immediately. Do not panic, but take proactive steps."
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id={SectionId.FAQ} className="py-24 px-6 bg-white text-black min-h-[50vh]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold tracking-tighter mb-12 text-center uppercase">Common Questions</h2>
        
        <div className="space-y-4">
          {faqs.map((item, i) => (
            <div key={i} className="border border-black">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex justify-between items-center p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-bold uppercase tracking-wide text-lg pr-4">{item.q}</span>
                <span className="text-2xl font-light">{openIndex === i ? '−' : '+'}</span>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-black/10">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;