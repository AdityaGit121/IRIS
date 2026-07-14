import React from "react";
import { FlowerInfo } from "../types";

interface AboutSidebarProps {
  classes: string[];
  facts: Record<string, FlowerInfo>;
}

export const AboutSidebar: React.FC<AboutSidebarProps> = ({ classes, facts }) => {
  return (
    <div className="flex flex-col gap-6">
      {/* Methodology Section */}
      <div className="border border-botanical-ink/10 p-6 flex flex-col gap-4 bg-white/40">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-botanical-muted block mb-1">
            [03] About / Methodology
          </span>
          <h3 className="font-display font-medium text-xl text-botanical-ink">
            Classifier System
          </h3>
        </div>

        <p className="font-sans text-xs text-botanical-muted leading-relaxed">
          This application was migrated from a TensorFlow Keras Python stack into a modern full-stack web app. It uses **Gemini 3.5 Flash** server-side to replicate the core Convolutional Neural Network (CNN) behavior.
        </p>

        <div className="border-t border-botanical-ink/10 pt-4">
          <span className="font-mono text-[9px] uppercase tracking-wider text-botanical-muted block mb-1">
            Core Architecture
          </span>
          <p className="font-sans text-[11px] text-botanical-muted leading-relaxed">
            Simulates a fine-tuned MobileNetV2 (pretrained on 1.4M ImageNet photos) with a specialized flower-classification head.
          </p>
        </div>
      </div>

      {/* Species Index Section */}
      <div className="flex flex-col gap-3">
        <span className="font-mono text-[10px] uppercase tracking-widest text-botanical-muted">
          [04] Species Index ({classes.length})
        </span>
        <div className="flex flex-wrap gap-2">
          {classes.map((cls) => {
            const info = facts[cls] || { emoji: "🌸", common_name: cls };
            return (
              <div
                key={cls}
                className="font-mono text-[11px] tracking-tight py-1.5 px-3 border border-botanical-ink/10 bg-white/20 hover:border-botanical-ink transition-colors flex items-center gap-1.5 capitalize text-botanical-ink"
              >
                <span>{info.emoji}</span>
                <span>{info.common_name}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Local Simulation Mode Footer Tag */}
      <div className="bg-botanical-green text-botanical-bg p-3 font-mono text-[10px] uppercase tracking-wider text-center font-medium">
        Local simulation mode active for example photos offline!
      </div>
    </div>
  );
};
