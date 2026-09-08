export type DetectionMode = "local" | "ai" | "auto";

export interface SampleImage {
  id: string;
  class: string;
  name: string;
  path: string;
  isLocal: boolean;
  expectedEngine?: "ml_trained" | "ai_cloud" | string;
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
  source: string;
  shiftReason?: string;
  pipelineStage?: "ml_trained" | "ml_learned" | "ai_cloud";
  isNewlyLearned?: boolean;
}

