import React from "react";
import { DemoImage } from "../types";

interface DemoGalleryProps {
  demos: DemoImage[];
  onSelect: (demo: DemoImage) => void;
  selectedId: string | null;
  disabled: boolean;
}

export const DemoGallery: React.FC<DemoGalleryProps> = ({
  demos,
  onSelect,
  selectedId,
  disabled,
}) => {
  if (demos.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-botanical-green rounded-full animate-pulse" />
        <span className="font-mono text-[10px] uppercase tracking-widest text-botanical-ink font-semibold">
          Select Specimen Gallery
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {demos.map((demo) => {
          const isSelected = selectedId === demo.id;
          return (
            <button
              key={demo.id}
              onClick={() => onSelect(demo)}
              disabled={disabled}
              className={`group relative aspect-square overflow-hidden border-2 transition-all duration-300 text-left ${
                isSelected
                  ? "border-botanical-green ring-4 ring-botanical-green/20 scale-[0.98] shadow-md"
                  : "border-botanical-ink/15 hover:border-botanical-green/60 hover:shadow-lg"
              } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            >
              <img
                src={`/${demo.path}`}
                alt={demo.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 saturate-[1.1] contrast-[1.05]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-botanical-ink/90 via-botanical-ink/50 to-transparent p-2.5 pt-6 transition-all duration-300 group-hover:from-botanical-green/90">
                <p className="text-[10px] font-mono font-bold text-botanical-bg truncate leading-tight">
                  {demo.name}
                </p>
                <p className="text-[8px] font-mono text-botanical-bg/85 uppercase tracking-wider capitalize mt-1 flex items-center gap-1">
                  <span className="w-1 h-1 bg-botanical-green rounded-full inline-block" />
                  {demo.class}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
