import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white border-t border-neutral-800 py-12 px-6">
       <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
         <div>
            <h3 className="text-2xl font-bold tracking-tighter mb-2">HEART<span className="font-light text-gray-500">SENSE</span></h3>
            <p className="text-xs text-neutral-500 uppercase tracking-widest">
              AI-Driven Cardiac Health Analysis
            </p>
         </div>
         
         <div className="flex gap-8 text-sm font-medium text-neutral-400">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
         </div>
       </div>
       <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-neutral-900 text-center text-xs text-neutral-600">
          © {new Date().getFullYear()} HeartSense AI. All rights reserved. Not a medical device.
       </div>
    </footer>
  );
};

export default Footer;