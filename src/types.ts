export interface SampleImage {
  id: string;
  class: string;
  name: string;
  path: string;
  isLocal: boolean;
}

export interface ConfidenceScore {
  class: string;
  confidence: number;
}

export interface DetectionResult {
  isFlower: boolean;
  class: string;
  confidence: number;
  confidenceScores: ConfidenceScore[];
  scientificName: string;
  description: string;
  funFact: string;
  careInstructions: string[];
  error?: string;
  source?: "Local TensorFlow.js Model" | "Gemini AI (Cloud Fallback)";
}
