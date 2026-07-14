import React, { useState, useEffect } from "react";
import { AlertCircle, ArrowUpRight } from "lucide-react";
import { AboutSidebar } from "./components/AboutSidebar";
import { ImageUploader } from "./components/ImageUploader";
import { PredictionResult } from "./components/PredictionResult";
import { DemoGallery } from "./components/DemoGallery";
import { FlowerInfo, DemoImage, PredictionResult as ResultType } from "./types";

// Fallback facts if the API load fails (for safety)
const FALLBACK_FACTS: Record<string, FlowerInfo> = {
  daisy: {
    emoji: "🌼",
    common_name: "Daisy",
    desc: "White petals surrounding a yellow center disk. One of the most widely recognized wildflowers, found across temperate climates worldwide.",
    color: "#f4d35e",
  },
  dandelion: {
    emoji: "🌾",
    common_name: "Dandelion",
    desc: "Bright yellow flower head that matures into the familiar white seed puff. Extremely common in lawns and open fields.",
    color: "#f7b32b",
  },
  rose: {
    emoji: "🌹",
    common_name: "Rose",
    desc: "Layered, spiraled petals, often fragrant. Cultivated in thousands of varieties across nearly every color.",
    color: "#e0559b",
  },
  sunflower: {
    emoji: "🌻",
    common_name: "Sunflower",
    desc: "Large flower head with yellow petals around a dark central disk packed with seeds. Known for heliotropism in young plants.",
    color: "#f4a300",
  },
  tulip: {
    emoji: "🌷",
    common_name: "Tulip",
    desc: "Cup-shaped flower with smooth, often vividly colored petals. Iconic spring bloom, especially associated with the Netherlands.",
    color: "#8e2de2",
  },
};

const DEFAULT_FACT: FlowerInfo = {
  emoji: "🌸",
  common_name: "Unknown",
  desc: "No additional information available for this class.",
  color: "#8e2de2",
};

export default function App() {
  const [facts, setFacts] = useState<Record<string, FlowerInfo>>(FALLBACK_FACTS);
  const [classes, setClasses] = useState<string[]>(Object.keys(FALLBACK_FACTS));
  const [demos, setDemos] = useState<DemoImage[]>([]);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedMimeType, setSelectedMimeType] = useState<string | null>(null);
  const [rawBase64, setRawBase64] = useState<string | null>(null);
  const [selectedDemoId, setSelectedDemoId] = useState<string | null>(null);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [prediction, setPrediction] = useState<ResultType | null>(null);
  const [error, setError] = useState<{ type: string; message: string } | null>(null);

  // Load flower facts and demos from the backend
  useEffect(() => {
    fetch("/api/flower-facts")
      .then((res) => res.json())
      .then((data) => {
        if (data.facts) {
          setFacts(data.facts);
          setClasses(Object.keys(data.facts));
        }
      })
      .catch((err) => console.warn("Failed to load flower facts from server, using fallbacks:", err));

    fetch("/api/demo-images")
      .then((res) => res.json())
      .then((data) => {
        if (data.demos) {
          setDemos(data.demos);
        }
      })
      .catch((err) => console.warn("Failed to load demo images from server:", err));
  }, []);

  const handleUpload = (file: File) => {
    setError(null);
    setPrediction(null);
    setSelectedDemoId(null);

    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result as string;
      setSelectedImage(dataUrl);

      // Extract raw base64 and mime type
      const mime = dataUrl.substring(dataUrl.indexOf(":") + 1, dataUrl.indexOf(";"));
      const raw = dataUrl.substring(dataUrl.indexOf(",") + 1);
      setSelectedMimeType(mime);
      setRawBase64(raw);
    };
    reader.readAsDataURL(file);
  };

  const handleSelectDemo = (demo: DemoImage) => {
    setError(null);
    setPrediction(null);
    setSelectedDemoId(demo.id);
    setSelectedImage(`/${demo.path}`);
    setSelectedMimeType("image/jpeg");
    setRawBase64(null); // Server will read the file from disk directly using demoId
  };

  const handleClear = () => {
    setSelectedImage(null);
    setSelectedMimeType(null);
    setRawBase64(null);
    setSelectedDemoId(null);
    setPrediction(null);
    setError(null);
  };

  const handlePredict = async () => {
    if (!selectedImage && !selectedDemoId) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: rawBase64, // will be null if a demo is selected and custom upload is empty
          mimeType: selectedMimeType,
          demoId: selectedDemoId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw {
          type: data.error || "SERVER_ERROR",
          message: data.message || "Classification failed. Please try again.",
        };
      }

      setPrediction(data);
    } catch (err: any) {
      console.error("Prediction dispatch error:", err);
      setError({
        type: err.type || "UNKNOWN",
        message: err.message || "Could not complete classification. Check your connection or API key.",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="stApp min-h-screen flex flex-col justify-between font-sans selection:bg-botanical-green selection:text-botanical-bg bg-botanical-bg">
      {/* Header */}
      <header className="px-6 py-8 md:px-12 border-b-1.5 border-botanical-ink flex items-end justify-between">
        <div className="brand">
          <div className="font-mono text-[10px] uppercase tracking-widest text-botanical-muted">
            [01] Classification System
          </div>
          <h1 className="font-display font-light text-4xl md:text-5xl tracking-tight text-botanical-ink mt-1.5">
            IRIS
          </h1>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 border-b-1.5 border-botanical-ink">
        
        {/* Left Panel: Upload and Example sets */}
        <section className="lg:col-span-7 p-6 md:p-12 border-r-0 lg:border-r-1.5 border-botanical-ink flex flex-col gap-8 justify-between">
          <div className="flex flex-col gap-8">
            <ImageUploader
              image={selectedImage}
              onUpload={handleUpload}
              onClear={handleClear}
              onPredict={handlePredict}
              isAnalyzing={isAnalyzing}
              disabledPredict={!selectedImage && !selectedDemoId}
            />

            <DemoGallery
              demos={demos}
              onSelect={handleSelectDemo}
              selectedId={selectedDemoId}
              disabled={isAnalyzing}
            />
          </div>

          {/* Missing API Key Warning Box */}
          {error?.type === "GEMINI_API_KEY_MISSING" && (
            <div className="border border-amber-300 bg-amber-50/50 p-6 mt-6 flex flex-col gap-4 text-amber-950">
              <div className="flex items-center gap-2">
                <AlertCircle size={18} className="text-amber-700" />
                <span className="font-mono text-[10px] uppercase tracking-wider font-bold">
                  Secret Key Required
                </span>
              </div>
              <p className="font-sans text-xs leading-relaxed font-medium">
                To run live botanical classifications on your own photos, configure your Gemini API Key:
              </p>
              <div className="flex flex-col gap-2 text-xs font-mono">
                <div className="flex items-center gap-2 bg-white/60 p-2.5 border border-amber-200/50">
                  <span className="text-botanical-green font-bold">1.</span>
                  <span>Click <strong>Settings</strong> gear (left editor sidebar)</span>
                </div>
                <div className="flex items-center gap-2 bg-white/60 p-2.5 border border-amber-200/50">
                  <span className="text-botanical-green font-bold">2.</span>
                  <span>Add a Secret named <code>GEMINI_API_KEY</code></span>
                </div>
              </div>
              <p className="font-sans text-[11px] text-amber-800 leading-relaxed italic font-medium mt-1">
                💡 Quick test: Click any preset image in the gallery below the upload node to instantly run locally simulated predictions offline!
              </p>
            </div>
          )}

          {/* Other Errors */}
          {error && error.type !== "GEMINI_API_KEY_MISSING" && (
            <div className="border border-rose-300 bg-rose-50/50 p-4 mt-6 flex gap-3 items-center text-rose-950 text-xs">
              <AlertCircle size={16} className="shrink-0 text-rose-700" />
              <p className="font-sans font-medium">{error.message}</p>
            </div>
          )}
        </section>

        {/* Right Panel: Prediction result and Information info cards */}
        <aside className="lg:col-span-5 p-6 md:p-12 flex flex-col gap-8 bg-botanical-bg/40">
          <PredictionResult
            result={prediction}
            facts={facts}
            defaultFact={DEFAULT_FACT}
            isAnalyzing={isAnalyzing}
          />

          <AboutSidebar classes={classes} facts={facts} />
        </aside>
      </main>

      {/* Footer */}
      <footer className="px-6 py-4 md:px-12 flex flex-col sm:flex-row justify-between items-center gap-4">
        <span className="font-mono text-[10px] uppercase tracking-widest text-botanical-muted">
          MobileNetV2 Fine-Tuning
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-botanical-muted">
          Full-Stack Vision v2.0
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-botanical-muted flex items-center gap-1">
          AI Studio Build <ArrowUpRight size={10} />
        </span>
      </footer>
    </div>
  );
}
