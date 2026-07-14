import React from "react";
import { AlertTriangle, Info, Check } from "lucide-react";
import { FlowerInfo, PredictionResult as ResultType } from "../types";

interface PredictionResultProps {
  result: ResultType | null;
  facts: Record<string, FlowerInfo>;
  defaultFact: FlowerInfo;
  isAnalyzing: boolean;
}

export const PredictionResult: React.FC<PredictionResultProps> = ({
  result,
  facts,
  defaultFact,
  isAnalyzing,
}) => {
  if (isAnalyzing) {
    return (
      <div className="border border-botanical-ink p-8 text-center bg-white/50 flex flex-col items-center justify-center gap-4 min-h-[250px]">
        <div className="w-8 h-8 border-2 border-botanical-green/20 border-t-botanical-green rounded-full animate-spin" />
        <div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-botanical-muted block mb-1">
            Inference Engine
          </span>
          <h3 className="font-display font-medium text-lg text-botanical-ink italic">
            Scanning botanical features...
          </h3>
        </div>
        <p className="font-sans text-[11px] text-botanical-muted max-w-xs leading-relaxed">
          Analyzing morphology, pixel histograms, and color distributions against the species taxonomies.
        </p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="border border-botanical-ink p-8 text-center bg-white/50 flex flex-col items-center justify-center gap-3 min-h-[250px]">
        <span className="font-mono text-[10px] uppercase tracking-widest text-botanical-muted">
          Status / Result Node
        </span>
        <h3 className="font-display font-medium text-2xl text-botanical-ink mt-1">
          Ready for Detection
        </h3>
        <p className="font-sans text-xs text-botanical-muted max-w-xs leading-relaxed">
          Pick one of the preloaded example data sets or upload your own, then trigger the detection model.
        </p>
      </div>
    );
  }

  const topClass = result.class_name;
  const confidencePercent = result.confidence * (result.confidence <= 1 ? 100 : 1);
  const info = facts[topClass] || defaultFact;

  return (
    <div className="border border-botanical-ink p-6 flex flex-col gap-6 bg-white/30">
      {/* Classification Header */}
      <div>
        <span className="font-mono text-[10px] uppercase tracking-widest text-botanical-muted block mb-1">
          [05] Classification Result
        </span>
        <h3 className="font-display font-medium text-2xl text-botanical-ink">
          Analysis Complete
        </h3>
      </div>

      {/* Hero Result Block */}
      <div className="border border-botanical-ink/20 p-5 bg-botanical-bg flex flex-col items-center text-center gap-2 relative overflow-hidden">
        <span className="text-4xl filter drop-shadow-sm">{info.emoji}</span>
        <div className="flex flex-col mt-1">
          <span className="font-display font-bold text-2xl tracking-tight text-botanical-ink">
            {info.common_name}
          </span>
          <span className="font-mono text-[9px] uppercase tracking-wider text-botanical-muted mt-0.5">
            Taxonomy: {topClass}
          </span>
        </div>
        <div className="mt-3 font-mono text-[11px] font-semibold text-botanical-green bg-botanical-green/5 border border-botanical-green/20 px-3 py-1">
          CONFIDENCE: {confidencePercent.toFixed(1)}%
        </div>
      </div>

      {/* Botanical Profile */}
      <div className="flex flex-col gap-1.5 border-t border-botanical-ink/15 pt-4">
        <span className="font-mono text-[10px] uppercase tracking-wider text-botanical-muted">
          Botanical Profile
        </span>
        <p className="font-sans text-xs text-botanical-ink font-medium leading-relaxed">
          {info.desc}
        </p>
      </div>

      {/* Class Probabilities */}
      <div className="flex flex-col gap-3 border-t border-botanical-ink/15 pt-4">
        <span className="font-mono text-[10px] uppercase tracking-wider text-botanical-muted">
          Class Probabilities
        </span>
        <div className="flex flex-col gap-2.5">
          {Object.keys(facts).map((className) => {
            const classInfo = facts[className];
            const rawProb = result.all_probabilities[className] || 0;
            const probPercent = rawProb * (rawProb <= 1 ? 100 : 1);

            return (
              <div key={className} className="flex flex-col gap-1">
                <div className="flex justify-between items-center font-mono text-[10px] uppercase text-botanical-ink">
                  <div className="flex items-center gap-1.5 font-medium">
                    <span>{classInfo.emoji}</span>
                    <span>{classInfo.common_name}</span>
                  </div>
                  <span>{probPercent.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-botanical-ink/5 h-1 rounded-none overflow-hidden">
                  <div
                    className="h-full transition-all duration-1000 ease-out"
                    style={{
                      width: `${probPercent}%`,
                      backgroundColor: classInfo.color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Low Confidence warning */}
      {confidencePercent < 60 && (
        <div className="border border-amber-300 bg-amber-50/50 p-4 flex gap-3 text-amber-950">
          <AlertTriangle size={16} className="shrink-0 mt-0.5 text-amber-700" />
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[9px] uppercase tracking-wider font-bold">Inconclusive Sample</span>
            <p className="font-sans text-[11px] leading-relaxed text-amber-900 font-medium">
              The detection engine yielded a low confidence score. For maximum accuracy, ensure your plant sample is sharply focused, well-lit, and isolated.
            </p>
          </div>
        </div>
      )}

      {/* Offline Mode notice */}
      {result.isMock && (
        <div className="border border-botanical-green/30 bg-botanical-green/5 p-4 flex gap-3 text-botanical-ink">
          <Info size={16} className="shrink-0 mt-0.5 text-botanical-green" />
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[9px] uppercase tracking-wider font-bold text-botanical-green">
              Simulation Preset
            </span>
            <p className="font-sans text-[11px] leading-relaxed text-botanical-muted font-medium">
              Showing a pre-calculated model projection. To analyze your own custom uploaded photos, please connect a real <strong>GEMINI_API_KEY</strong> inside your Settings panel.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
