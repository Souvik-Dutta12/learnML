import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PredictionForm from './components/PredictionForm';
import BentoGrid from './components/BentoGrid';
import HowItWorks from './components/HowItWorks';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

function App() {
  return (
    <div className="antialiased selection:bg-black selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <BentoGrid />
        <PredictionForm />
        <HowItWorks />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

export default App;