export interface FlowerInfo {
  emoji: string;
  common_name: string;
  desc: string;
  color: string;
}

export interface DemoImage {
  id: string;
  path: string;
  class: string;
  name: string;
}

export interface PredictionResult {
  class_name: string;
  confidence: number;
  all_probabilities: Record<string, number>;
  isMock?: boolean;
  warning?: string;
}
