import React, { useRef, useState } from "react";
import { UploadCloud, X, Search } from "lucide-react";

interface ImageUploaderProps {
  image: string | null;
  onUpload: (file: File) => void;
  onClear: () => void;
  onPredict: () => void;
  isAnalyzing: boolean;
  disabledPredict: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  image,
  onUpload,
  onClear,
  onPredict,
  isAnalyzing,
  disabledPredict,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        onUpload(file);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-display font-medium text-3xl text-botanical-ink">
          Upload Flower Photo
        </h2>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {!image ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={triggerFileSelect}
          className={`dot-pattern border min-h-[220px] p-8 flex flex-col items-center justify-center gap-4 text-center cursor-pointer transition-all ${
            isDragOver
              ? "border-botanical-green bg-botanical-green/5"
              : "border-botanical-ink/20 hover:border-botanical-ink"
          }`}
        >
          <div className="p-3 bg-botanical-ink/5 border border-botanical-ink/10 text-botanical-ink/60">
            <UploadCloud size={24} strokeWidth={1.5} />
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-mono text-xs uppercase tracking-wide text-botanical-ink">
              Drag & drop or browse from device
            </p>
            <p className="font-mono text-[9px] uppercase tracking-wider text-botanical-muted mt-0.5">
              Supports JPG, JPEG, PNG
            </p>
          </div>
        </div>
      ) : (
        <div className="relative border border-botanical-ink rounded-none overflow-hidden aspect-video bg-botanical-ink/5 group flex items-center justify-center">
          <img
            src={image}
            alt="Uploaded preview"
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain max-h-[300px]"
          />
          <button
            onClick={onClear}
            className="absolute top-3 right-3 p-1.5 bg-botanical-ink text-botanical-bg hover:bg-botanical-green transition-all cursor-pointer"
            title="Remove image"
          >
            <X size={16} />
          </button>
        </div>
      )}

      <button
        onClick={onPredict}
        disabled={disabledPredict || isAnalyzing}
        className={`w-full py-4 px-6 font-mono text-xs uppercase tracking-widest text-center transition-all ${
          disabledPredict || isAnalyzing
            ? "bg-botanical-ink/10 text-botanical-muted cursor-not-allowed border border-botanical-ink/10"
            : "bg-botanical-ink text-botanical-bg hover:bg-botanical-green hover:text-white hover:shadow-sm cursor-pointer border border-botanical-ink"
        }`}
      >
        {isAnalyzing ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-botanical-bg/30 border-t-botanical-bg rounded-full animate-spin" />
            <span>Analyzing Botanical Specimen...</span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <Search size={14} />
            <span>Detect Flower</span>
          </div>
        )}
      </button>
    </div>
  );
};
