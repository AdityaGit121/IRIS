export type DetectionMode = "local" | "ai" | "auto";

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
  botanicalFamily?: string;
  nativeRegion?: string;
  description: string;
  funFact: string;
  careInstructions: string[];
  error?: string;
  source:
    | "Trained ML Model (On-Device Dataset)"
    | "Local ML Model (Learned Memory Cache)"
    | "Cloud AI Vision & Internet Knowledge (Gemini)";
  shiftReason?: string;
  pipelineStage?: "ml_trained" | "ml_learned" | "ai_cloud";
  isNewlyLearned?: boolean;
}

