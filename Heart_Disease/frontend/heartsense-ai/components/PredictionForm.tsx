import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PredictionData, PredictionResult, SectionId } from '../types';
import { generatePrediction } from '../services/gemini';

const INITIAL_DATA: PredictionData = {
  age: 45,
  sex: 'male',
  chestPainType: 'typical-angina',
  restingBP: 120,
  cholesterol: 200,
  fastingBS: false,
  restingECG: 'normal',
  maxHeartRate: 150,
};

const PredictionForm: React.FC = () => {
  const [formData, setFormData] = useState<PredictionData>(INITIAL_DATA);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked :
               type === 'number' || type === 'range' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const prediction = await generatePrediction(formData);
      setResult(prediction);
    } catch (err) {
      setError("Failed to generate prediction. Please ensure you have a valid internet connection.");
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id={SectionId.PREDICT} className="min-h-screen w-full bg-white text-black py-24 px-6 relative">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 no-print">
        {/* Left Side: Header */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-none">
            DATA <br/> INPUT
          </h2>
          <p className="text-xl text-gray-500 font-light max-w-md">
            Enter your biometrics below. Our AI model analyzes these parameters to estimate heart disease risk with high precision.
          </p>
          <div className="mt-12 p-6 border border-black bg-gray-50">
            <h3 className="font-bold text-lg mb-2 uppercase tracking-wide">Privacy First</h3>
            <p className="text-sm text-gray-600">Your data is processed anonymously and is not stored on our servers.</p>
          </div>
        </motion.div>

        {/* Right Side: Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          {/* Age Slider */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm font-bold uppercase tracking-wide">Age</label>
              <span className="text-sm font-mono">{formData.age} years</span>
            </div>
            <input
              type="range"
              name="age"
              min="20"
              max="90"
              value={formData.age}
              onChange={handleChange}
              className="w-full h-1 bg-gray-200 rounded-none appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:rounded-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sex */}
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wide">Sex</label>
              <div className="flex gap-4">
                {['male', 'female'].map(option => (
                  <label key={option} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="sex"
                      value={option}
                      checked={formData.sex === option}
                      onChange={handleChange}
                      className="hidden"
                    />
                    <div className={`w-4 h-4 border border-black transition-colors ${formData.sex === option ? 'bg-black' : 'bg-transparent'}`}></div>
                    <span className="uppercase text-sm group-hover:underline">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Fasting BS */}
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wide">Fasting BS {'>'} 120 mg/dl</label>
              <label className="flex items-center gap-3 cursor-pointer group mt-2">
                 <input
                  type="checkbox"
                  name="fastingBS"
                  checked={formData.fastingBS}
                  onChange={handleChange}
                  className="hidden"
                 />
                 <div className={`w-5 h-5 border border-black flex items-center justify-center transition-colors ${formData.fastingBS ? 'bg-black text-white' : 'bg-white'}`}>
                    {formData.fastingBS && <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>}
                 </div>
                 <span className="text-sm">{formData.fastingBS ? 'Yes' : 'No'}</span>
              </label>
            </div>
          </div>

          {/* Select Inputs */}
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wide">Chest Pain Type</label>
              <select
                name="chestPainType"
                value={formData.chestPainType}
                onChange={handleChange}
                className="w-full p-3 border border-black bg-white rounded-none focus:ring-1 focus:ring-black focus:outline-none transition-shadow text-sm uppercase"
              >
                <option value="typical-angina">Typical Angina</option>
                <option value="atypical-angina">Atypical Angina</option>
                <option value="non-anginal">Non-Anginal Pain</option>
                <option value="asymptomatic">Asymptomatic</option>
              </select>
            </div>

            <div className="space-y-2">
               <label className="text-sm font-bold uppercase tracking-wide">Resting ECG</label>
               <select
                 name="restingECG"
                 value={formData.restingECG}
                 onChange={handleChange}
                 className="w-full p-3 border border-black bg-white rounded-none focus:ring-1 focus:ring-black focus:outline-none transition-shadow text-sm uppercase"
               >
                 <option value="normal">Normal</option>
                 <option value="st-t-wave-abnormality">ST-T Wave Abnormality</option>
                 <option value="left-ventricular-hypertrophy">Left Ventricular Hypertrophy</option>
               </select>
            </div>
          </div>

          {/* Numeric Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Resting BP (mm Hg)', name: 'restingBP', min: 80, max: 200 },
              { label: 'Cholesterol (mg/dl)', name: 'cholesterol', min: 100, max: 600 },
              { label: 'Max HR', name: 'maxHeartRate', min: 60, max: 220 },
            ].map(field => (
              <div key={field.name} className="space-y-2 group">
                <label className="text-xs font-bold uppercase tracking-wide text-gray-500 group-focus-within:text-black transition-colors">{field.label}</label>
                <input
                  type="number"
                  name={field.name}
                  // @ts-ignore
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full p-2 border-b-2 border-gray-200 focus:border-black outline-none transition-colors bg-transparent font-mono text-xl"
                  placeholder="0"
                />
              </div>
            ))}
          </div>

          <div className="pt-8">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-black text-white font-bold uppercase tracking-[0.2em] hover:bg-gray-800 disabled:bg-gray-400 transition-colors rounded-none flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : 'Generate Analysis'}
            </button>
            {error && <p className="mt-4 text-red-600 text-sm text-center font-medium">{error}</p>}
          </div>
        </motion.form>
      </div>

      {/* Result Modal / Overlay */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-white/90 backdrop-blur-sm overflow-y-auto flex items-center justify-center p-4"
          >
            <div className="w-full max-w-3xl bg-white border border-black shadow-2xl relative">
              <button
                onClick={() => setResult(null)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 no-print"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>

              <div className="p-10 md:p-16 print:p-0" id="print-area">
                <div className="border-b border-black pb-8 mb-8 flex justify-between items-end">
                   <div>
                      <h1 className="text-4xl font-bold tracking-tighter mb-2">HEART<span className="font-light">SENSE</span></h1>
                      <p className="text-xs font-mono uppercase text-gray-500">AI-Powered Cardiology Report</p>
                   </div>
                   <div className="text-right">
                      <p className="text-sm font-bold uppercase">{new Date().toLocaleDateString()}</p>
                      <p className="text-xs text-gray-500">ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                  <div className="md:col-span-1">
                    <p className="text-xs font-bold uppercase text-gray-400 mb-1">Risk Assessment</p>
                    <div className={`text-3xl font-bold ${
                      result.riskLevel === 'High' ? 'text-red-600' :
                      result.riskLevel === 'Moderate' ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {result.riskLevel.toUpperCase()}
                    </div>
                  </div>
                  <div className="md:col-span-2">
                     <p className="text-xs font-bold uppercase text-gray-400 mb-1">Summary</p>
                     <p className="text-sm leading-relaxed">{result.summary}</p>
                  </div>
                </div>

                <div className="mb-10">
                  <h4 className="font-bold text-lg uppercase tracking-wide border-b border-gray-200 pb-2 mb-4">Actionable Suggestions</h4>
                  <ul className="grid grid-cols-1 gap-4">
                    {result.recommendations.map((rec, i) => (
                      <li key={i} className="flex gap-4 items-start">
                        <span className="flex-shrink-0 w-6 h-6 bg-black text-white text-xs font-bold flex items-center justify-center rounded-none">{i + 1}</span>
                        <p className="text-sm">{rec}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 border-l-4 border-black text-xs text-gray-600 italic">
                  <strong>Disclaimer:</strong> {result.disclaimer}
                </div>

                <div className="mt-10 flex gap-4 no-print">
                   <button
                     onClick={handlePrint}
                     className="flex-1 py-3 border border-black hover:bg-black hover:text-white transition-colors uppercase font-bold text-sm tracking-widest rounded-none"
                   >
                     Download PDF / Print
                   </button>
                   <button
                     onClick={() => setResult(null)}
                     className="px-6 py-3 text-gray-500 hover:text-black uppercase font-bold text-sm tracking-widest rounded-none"
                   >
                     Close
                   </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PredictionForm;