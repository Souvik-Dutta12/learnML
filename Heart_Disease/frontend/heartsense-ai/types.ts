export interface PredictionData {
  age: number;
  sex: 'male' | 'female';
  chestPainType: 'typical-angina' | 'atypical-angina' | 'non-anginal' | 'asymptomatic';
  restingBP: number; // mm Hg
  cholesterol: number; // mg/dl
  fastingBS: boolean; // > 120 mg/dl
  restingECG: 'normal' | 'st-t-wave-abnormality' | 'left-ventricular-hypertrophy';
  maxHeartRate: number;
}

export interface PredictionResult {
  riskLevel: 'Low' | 'Moderate' | 'High';
  summary: string;
  recommendations: string[];
  disclaimer: string;
}

export enum SectionId {
  HERO = 'hero',
  PREDICT = 'predict',
  STATS = 'stats',
  HOW_IT_WORKS = 'how-it-works',
  FAQ = 'faq',
}