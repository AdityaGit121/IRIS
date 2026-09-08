import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Upload,
  Image as ImageIcon,
  Sparkles,
  AlertCircle,
  Info,
  Droplet,
  Sun,
  Sprout,
  RotateCcw,
  Camera,
  Leaf,
  TrendingUp,
  X,
  Cpu,
  Globe,
  Zap,
  Layers,
  BookOpen,
  Brain,
  Key
} from "lucide-react";
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";
import { SampleImage, DetectionResult, ConfidenceScore, DetectionMode } from "./types";
import { SpeciesCatalogModal } from "./components/SpeciesCatalogModal";
import { LearnedKnowledgeModal } from "./components/LearnedKnowledgeModal";
import { ApiKeyDropdown } from "./components/ApiKeyDropdown";
import { classifyBotanicalSpecimen } from "./utils/botanicalClassifier";
import {
  getLearnedSpecies,
  saveLearnedSpecies,
  getCombinedBotanicalDataset,
  LearnedSpecies,
  extractImageFingerprint
} from "./utils/localKnowledgeBase";
import { identifyFlowerWithGeminiDirect } from "./utils/geminiDirect";

const FLOWER_EMOJI_MAP: Record<string, { emoji: string; accent: string; bg: string; border: string; textClass: string }> = {
  daisy: { emoji: "🌼", accent: "#f59e0b", bg: "bg-amber-50/80", border: "border-amber-200", textClass: "text-amber-800" },
  dandelion: { emoji: "🌾", accent: "#eab308", bg: "bg-yellow-50/80", border: "border-yellow-200", textClass: "text-yellow-800" },
  rose: { emoji: "🌹", accent: "#f43f5e", bg: "bg-rose-50/80", border: "border-rose-200", textClass: "text-rose-800" },
  sunflower: { emoji: "🌻", accent: "#ea580c", bg: "bg-orange-50/80", border: "border-orange-200", textClass: "text-orange-800" },
  tulip: { emoji: "🌷", accent: "#a855f7", bg: "bg-purple-50/80", border: "border-purple-200", textClass: "text-purple-800" },
  orchid: { emoji: "🌸", accent: "#ec4899", bg: "bg-pink-50/80", border: "border-pink-200", textClass: "text-pink-800" },
  lavender: { emoji: "🪻", accent: "#8b5cf6", bg: "bg-violet-50/80", border: "border-violet-200", textClass: "text-violet-800" },
  lily: { emoji: "⚜️", accent: "#0d9488", bg: "bg-teal-50/80", border: "border-teal-200", textClass: "text-teal-800" },
  hibiscus: { emoji: "🌺", accent: "#ef4444", bg: "bg-red-50/80", border: "border-red-200", textClass: "text-red-800" },
  lotus: { emoji: "🪷", accent: "#06b6d4", bg: "bg-cyan-50/80", border: "border-cyan-200", textClass: "text-cyan-800" },
  "water lily": { emoji: "🪷", accent: "#0284c7", bg: "bg-sky-50/80", border: "border-sky-200", textClass: "text-sky-800" },
  marigold: { emoji: "🏵️", accent: "#f59e0b", bg: "bg-amber-50/80", border: "border-amber-200", textClass: "text-amber-800" },
  poppy: { emoji: "🌺", accent: "#dc2626", bg: "bg-red-50/80", border: "border-red-200", textClass: "text-red-800" },
  iris: { emoji: "🪻", accent: "#7c3aed", bg: "bg-indigo-50/80", border: "border-indigo-200", textClass: "text-indigo-800" },
  violet: { emoji: "💜", accent: "#9333ea", bg: "bg-purple-50/80", border: "border-purple-200", textClass: "text-purple-800" },
  "bird of paradise": { emoji: "🦜", accent: "#f97316", bg: "bg-orange-50/80", border: "border-orange-200", textClass: "text-orange-800" },
  bougainvillea: { emoji: "🌺", accent: "#d946ef", bg: "bg-fuchsia-50/80", border: "border-fuchsia-200", textClass: "text-fuchsia-800" },
  hydrangea: { emoji: "💠", accent: "#3b82f6", bg: "bg-blue-50/80", border: "border-blue-200", textClass: "text-blue-800" },
  carnation: { emoji: "🌸", accent: "#f43f5e", bg: "bg-rose-50/80", border: "border-rose-200", textClass: "text-rose-800" },
  peony: { emoji: "🌸", accent: "#ec4899", bg: "bg-pink-50/80", border: "border-pink-200", textClass: "text-pink-800" },
  dahlia: { emoji: "🌺", accent: "#e11d48", bg: "bg-rose-50/80", border: "border-rose-200", textClass: "text-rose-800" },
  allium: { emoji: "🟣", accent: "#8b5cf6", bg: "bg-purple-50/80", border: "border-purple-200", textClass: "text-purple-800" },
  daffodil: { emoji: "🌼", accent: "#eab308", bg: "bg-yellow-50/80", border: "border-yellow-200", textClass: "text-yellow-800" },
  jasmine: { emoji: "🌼", accent: "#10b981", bg: "bg-emerald-50/80", border: "border-emerald-200", textClass: "text-emerald-800" },
  magnolia: { emoji: "🤍", accent: "#64748b", bg: "bg-slate-50/80", border: "border-slate-200", textClass: "text-slate-800" },
  passionflower: { emoji: "🌀", accent: "#6366f1", bg: "bg-indigo-50/80", border: "border-indigo-200", textClass: "text-indigo-800" }
};

function getFlowerPalette(name: string) {
  const lower = (name || "").toLowerCase().trim();
  for (const [key, val] of Object.entries(FLOWER_EMOJI_MAP)) {
    if (lower.includes(key) || key.includes(lower)) {
      return {
        ...val,
        text: val.textClass
      };
    }
  }
  return {
    bg: "bg-emerald-50/70",
    text: "text-emerald-950",
    border: "border-emerald-200",
    accent: "#059669",
    emoji: "🌸",
    textClass: "text-emerald-800"
  };
}

const DEFAULT_SAMPLES: SampleImage[] = [
  {
    id: "daisy_1",
    class: "daisy",
    name: "Daisy (Trained ML)",
    path: "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?auto=format&fit=crop&w=600&q=80",
    isLocal: false,
    expectedEngine: "ml_trained"
  },
  {
    id: "rose_1",
    class: "rose",
    name: "Red Rose (Trained ML)",
    path: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
    isLocal: false,
    expectedEngine: "ml_trained"
  },
  {
    id: "sunflower_1",
    class: "sunflower",
    name: "Sunflower (Trained ML)",
    path: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=600&q=80",
    isLocal: false,
    expectedEngine: "ml_trained"
  },
  {
    id: "dandelion_1",
    class: "dandelion",
    name: "Dandelion (Trained ML)",
    path: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=600&q=80",
    isLocal: false,
    expectedEngine: "ml_trained"
  },
  {
    id: "orchid_1",
    class: "orchid",
    name: "Exotic Orchid (Shifts to AI)",
    path: "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=600&q=80",
    isLocal: false,
    expectedEngine: "ai_cloud"
  },
  {
    id: "lotus_1",
    class: "lotus",
    name: "Sacred Lotus (Shifts to AI)",
    path: "https://images.unsplash.com/photo-1508615039623-a25605d2b022?auto=format&fit=crop&w=600&q=80",
    isLocal: false,
    expectedEngine: "ai_cloud"
  },
  {
    id: "hibiscus_1",
    class: "hibiscus",
    name: "Tropical Hibiscus (Shifts to AI)",
    path: "https://images.unsplash.com/photo-1550950158-d0d960dff51b?auto=format&fit=crop&w=600&q=80",
    isLocal: false,
    expectedEngine: "ai_cloud"
  },
  {
    id: "birdofparadise_1",
    class: "bird of paradise",
    name: "Bird of Paradise (Shifts to AI)",
    path: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80",
    isLocal: false,
    expectedEngine: "ai_cloud"
  }
];

export default function App() {
  // Custom Selection between Local ML vs Cloud AI vs Auto Dual Engine
  const [detectionMode, setDetectionMode] = useState<DetectionMode>("local");

  // User's Individual Gemini API Key stored in browser localStorage
  const [userApiKey, setUserApiKey] = useState<string>(() => {
    try {
      return localStorage.getItem("user_gemini_api_key") || "";
    } catch {
      return "";
    }
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedSampleId, setSelectedSampleId] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisPhase, setAnalysisPhase] = useState<"idle" | "ml_scanning" | "ml_matched" | "ml_not_found" | "shifting_to_ai" | "ai_searching">("idle");
  const [shiftNotice, setShiftNotice] = useState<string | null>(null);
  const [analysisLog, setAnalysisLog] = useState<string>("");
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [localUnindexedNotice, setLocalUnindexedNotice] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [apiOnline, setApiOnline] = useState<boolean>(true);
  const [samples, setSamples] = useState<SampleImage[]>(DEFAULT_SAMPLES);
  const [isCatalogOpen, setIsCatalogOpen] = useState<boolean>(false);
  const [isLearnedModalOpen, setIsLearnedModalOpen] = useState<boolean>(false);

  // Continual Learning Engine state
  const [learnedSpeciesList, setLearnedSpeciesList] = useState<LearnedSpecies[]>([]);
  const [latestLearnedNotice, setLatestLearnedNotice] = useState<string | null>(null);

  // TensorFlow.js & On-Device ML state
  const [mlModel, setMlModel] = useState<mobilenet.MobileNet | null>(null);
  const [isModelLoading, setIsModelLoading] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewImgRef = useRef<HTMLImageElement>(null);

  const handleApiKeyChange = (newKey: string) => {
    setUserApiKey(newKey);
    try {
      if (newKey) {
        localStorage.setItem("user_gemini_api_key", newKey);
      } else {
        localStorage.removeItem("user_gemini_api_key");
      }
    } catch (e) {
      console.warn("Could not access localStorage for API Key:", e);
    }
  };

  // Refresh learned species from storage
  const refreshLearnedSpecies = () => {
    const list = getLearnedSpecies();
    setLearnedSpeciesList(list);
  };

  // Initialize On-Device ML, Check Health, Load Samples & Load Learned Species on mount
  useEffect(() => {
    refreshLearnedSpecies();

    async function initSystem() {
      // Check Health
      try {
        const healthRes = await fetch("/api/health");
        if (healthRes.ok) {
          const health = await healthRes.json();
          setApiOnline(health.apiReady);
        }
      } catch (e) {
        console.error("Failed to fetch API health:", e);
      }

      // Fetch Sample Images for easy interactive testing
      try {
        const samplesRes = await fetch("/api/samples");
        if (samplesRes.ok) {
          const sampleList = await samplesRes.json();
          setSamples(sampleList);
        }
      } catch (e) {
        console.error("Failed to fetch sample botanical images:", e);
      }

      // Fast, lightweight MobileNet initialization with race timeout
      try {
        setIsModelLoading(true);
        await tf.ready();
        const loadPromise = mobilenet.load({
          version: 1,
          alpha: 0.5,
        });
        const timeoutPromise = new Promise<null>((resolve) => setTimeout(() => resolve(null), 3000));
        const loadedModel = await Promise.race([loadPromise, timeoutPromise]);
        if (loadedModel) {
          setMlModel(loadedModel);
        }
      } catch (err) {
        console.warn("MobileNet load notice (high-accuracy on-device botanical engine remains active):", err);
      } finally {
        setIsModelLoading(false);
      }
    }

    initSystem();
  }, []);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setSelectedSampleId(null);
      setError(null);
      setResult(null);
      setShiftNotice(null);
      setLocalUnindexedNotice(null);
      setLatestLearnedNotice(null);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle drag and drop
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
        setSelectedFile(file);
        setSelectedSampleId(null);
        setError(null);
        setResult(null);
        setShiftNotice(null);
        setLocalUnindexedNotice(null);
        setLatestLearnedNotice(null);

        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setError("Only image files (JPG, PNG, WEBP) are accepted.");
      }
    }
  };

  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Select a sample flower for instant testing
  const handleSelectSample = (sample: SampleImage) => {
    setSelectedFile(null);
    setSelectedSampleId(sample.id);
    setImagePreview(sample.path);
    setError(null);
    setResult(null);
    setShiftNotice(null);
    setLocalUnindexedNotice(null);
    setLatestLearnedNotice(null);
  };

  // Core Execution Flow for Cloud AI Multimodal Model with Automatic Continual Learning to Local ML
  const runCloudAIDetection = async (reason?: string) => {
    setIsAnalyzing(true);
    setError(null);
    setLocalUnindexedNotice(null);
    setAnalysisPhase("ai_searching");
    setAnalysisLog("Executing Cloud AI Vision with global internet taxonomy (400,000+ species)...");

    try {
      let data: any = null;
      let serverSucceeded = false;

      // 1. First attempt via backend API route (works on full-stack dev/server environments)
      try {
        const headers: Record<string, string> = { "Content-Type": "application/json" };
        if (userApiKey && userApiKey.trim()) {
          headers["x-gemini-api-key"] = userApiKey.trim();
        }

        const payload: any = {
          image: selectedSampleId ? undefined : imagePreview,
          sampleId: selectedSampleId || undefined,
          customApiKey: userApiKey ? userApiKey.trim() : undefined,
          shiftReason: reason || "User explicitly selected Cloud AI Multimodal Model"
        };

        const response = await fetch("/api/detect", {
          method: "POST",
          headers,
          body: JSON.stringify(payload),
        });

        const contentType = response.headers.get("content-type") || "";

        if (response.ok && contentType.includes("application/json")) {
          const parsed = await response.json();
          if (parsed && typeof parsed.isFlower === "boolean") {
            data = parsed;
            serverSucceeded = true;
          }
        }
      } catch (serverErr) {
        console.warn("Backend API route not reachable (typical on Vercel static deployments):", serverErr);
      }

      // 2. If backend was unreachable or static (e.g. Vercel SPA) and user has an API Key, run direct browser Gemini
      if (!serverSucceeded) {
        if (userApiKey && userApiKey.trim() && imagePreview) {
          setAnalysisLog("Running direct browser Gemini Multimodal Vision...");
          try {
            data = await identifyFlowerWithGeminiDirect(
              imagePreview,
              userApiKey.trim(),
              reason || "Multimodal Cloud AI Vision",
              previewImgRef.current
            );
          } catch (directErr: any) {
            console.error("Direct browser Gemini error:", directErr);
            setError(directErr?.message || "Cloud AI was unable to identify this specimen. Please verify your Gemini API key in the top bar.");
            return;
          }
        } else if (!data) {
          // No server and no user API key provided
          setError(
            "Gemini API Key Required: When running on Vercel / browser static mode, please click 'API Key Input' in the top header to enter your free Google Gemini API Key."
          );
          return;
        }
      }

      if (!data) {
        setError("Cloud AI Vision was unable to identify this specimen. Please verify that the flower is in clear focus and try again.");
        return;
      }

      if (data.isFlower === false) {
        setError(data.error || "The image uploaded does not appear to contain a recognized flower or plant species.");
      } else {
        // AUTOMATIC CONTINUAL LEARNING:
        // Automatically save the detected species to local memory so future local scans immediately recognize it!
        let visualFp = undefined;
        if (previewImgRef.current) {
          try {
            visualFp = await extractImageFingerprint(previewImgRef.current);
          } catch (fpErr) {
            console.warn("Fingerprint extraction for learning:", fpErr);
          }
        }

        saveLearnedSpecies({
          commonName: data.class,
          scientificName: data.scientificName,
          botanicalFamily: data.botanicalFamily,
          nativeRegion: data.nativeRegion,
          description: data.description,
          funFact: data.funFact,
          careInstructions: data.careInstructions,
          sampleThumbnail: imagePreview || undefined,
          visualFingerprint: visualFp
        });

        refreshLearnedSpecies();
        setLatestLearnedNotice(data.class);

        const keyNotice = userApiKey
          ? "Cloud AI Vision (Personal Gemini Key)"
          : "Cloud AI Vision & Internet Knowledge (Gemini)";

        setResult({
          ...data,
          source: data.source || keyNotice,
          pipelineStage: "ai_cloud",
          isNewlyLearned: true,
          shiftReason: data.shiftReason || reason || "Identified via Gemini Cloud AI Vision and auto-learned into Local ML memory."
        });
      }
    } catch (err: any) {
      console.error("Cloud AI Analysis Error:", err);
      setError(err?.message || "Identification could not be completed. Please check your network connection or enter your Gemini API key in the 'API Key Input' dropdown at the top.");
    } finally {
      setIsAnalyzing(false);
      setAnalysisPhase("idle");
    }
  };

  // Main Detection Dispatcher based on Custom User Selection
  const runDetection = async () => {
    if (!imagePreview) {
      setError("Please upload or choose a flower image first.");
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setResult(null);
    setShiftNotice(null);
    setLocalUnindexedNotice(null);
    setLatestLearnedNotice(null);

    // MODE 1: CLOUD AI MULTIMODAL MODEL (User Selected Cloud AI Directly)
    if (detectionMode === "ai") {
      await runCloudAIDetection("User explicitly selected Cloud AI Multimodal Model");
      return;
    }

    // MODE 2 & 3: LOCAL ML MODEL or AUTO DUAL ENGINE
    setAnalysisPhase("ml_scanning");
    setAnalysisLog("Scanning on-device neural features across 106 built-in species + learned memory cache...");

    let mobileNetPreds: Array<{ className: string; probability: number }> = [];
    if (mlModel && previewImgRef.current) {
      try {
        const mobilenetTask = mlModel.classify(previewImgRef.current);
        const timeoutTask = new Promise<any[]>((resolve) => setTimeout(() => resolve([]), 1500));
        mobileNetPreds = await Promise.race([mobilenetTask, timeoutTask]);
      } catch (err) {
        console.warn("MobileNet tensor extraction note:", err);
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 350));

    // Execute high-accuracy on-device botanical vision classification (including learned memory)
    let botanicalMatch: any = null;
    if (previewImgRef.current) {
      try {
        botanicalMatch = await classifyBotanicalSpecimen(previewImgRef.current, mobileNetPreds);
      } catch (classifierErr) {
        console.warn("On-device botanical classifier error:", classifierErr);
      }
    }

    const matchedKey = botanicalMatch?.matchedKey;
    const confidence = botanicalMatch?.confidence || 0;
    const isLearned = botanicalMatch?.isLearnedFromAI;
    const combinedCatalog = getCombinedBotanicalDataset();

    // CASE A: Found in Local ML Catalog or Learned Memory (>= 35% confidence)
    if (matchedKey && combinedCatalog[matchedKey] && confidence >= 35) {
      setAnalysisPhase("ml_matched");
      setAnalysisLog(`Specimen successfully identified in Local ML: ${matchedKey.toUpperCase()} (${confidence}% confidence).`);
      const localDetail = combinedCatalog[matchedKey];

      await new Promise((resolve) => setTimeout(resolve, 400));

      setResult({
        isFlower: true,
        class: matchedKey,
        confidence: confidence,
        confidenceScores: botanicalMatch.confidenceScores,
        scientificName: localDetail.scientificName,
        botanicalFamily: localDetail.botanicalFamily,
        nativeRegion: localDetail.nativeRegion,
        description: localDetail.description,
        funFact: localDetail.funFact,
        careInstructions: localDetail.careInstructions,
        source: isLearned
          ? "Local ML Model (Learned Memory Cache)"
          : "Trained ML Model (On-Device Dataset)",
        pipelineStage: isLearned ? "ml_learned" : "ml_trained",
        shiftReason: isLearned
          ? "Identified instantly on-device using previously learned Cloud AI profile saved in local memory!"
          : "Identified directly by on-device convolutional weights across 106 built-in species. Zero cloud latency."
      });
      setIsAnalyzing(false);
      setAnalysisPhase("idle");
      return;
    }

    // CASE B: In Pure Local ML Mode, Specimen is Unindexed / Not Found
    if (detectionMode === "local") {
      setIsAnalyzing(false);
      setAnalysisPhase("ml_not_found");
      setLocalUnindexedNotice(
        "Specimen is not recognized in your Local ML Knowledge Base (confidence < 35% or unindexed species)."
      );
      return;
    }

    // CASE C: In Auto Dual Engine Mode, Automatically Shift to Cloud AI
    const shiftExplanation = !matchedKey
      ? "Species is not present in local botanical dataset"
      : `Input image was unclear or complex floral angle with low ML confidence (${confidence}%)`;

    setShiftNotice(shiftExplanation);
    setAnalysisPhase("shifting_to_ai");
    setAnalysisLog(`Local dataset inconclusive (${shiftExplanation}). Shifting to Cloud AI Vision...`);

    await new Promise((resolve) => setTimeout(resolve, 600));
    await runCloudAIDetection(shiftExplanation);
  };

  // Clear states
  const resetApp = () => {
    setSelectedFile(null);
    setSelectedSampleId(null);
    setImagePreview(null);
    setResult(null);
    setError(null);
    setLocalUnindexedNotice(null);
    setLatestLearnedNotice(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const activePalette = result ? getFlowerPalette(result.class) : getFlowerPalette("unknown");

  return (
    <div id="app-container" className="min-h-screen bg-stone-50/50 text-stone-800 font-sans selection:bg-emerald-100 selection:text-emerald-950 pb-16">
      {/* Top Banner Status when no Key is available anywhere */}
      {!apiOnline && !userApiKey && (
        <div id="api-warning-banner" className="bg-amber-50 border-b border-amber-200 px-4 py-2.5 text-center text-xs text-amber-800 flex items-center justify-center gap-2 font-medium">
          <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <span>
            Gemini API Key is not set on the server. Please enter your individual Gemini API key using the <strong>API Key Input</strong> dropdown at the top.
          </span>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Header */}
        <header id="app-header" className="text-center max-w-3xl mx-auto mb-8 mt-2">
          {/* Top-down Action Row including API Key Dropdown */}
          <div className="flex justify-center flex-wrap items-center gap-2 mb-3.5">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-emerald-50/80 text-emerald-800 border border-emerald-200/60 px-3.5 py-1.5 rounded-full text-xs font-semibold"
            >
              <Leaf className="w-3.5 h-3.5" />
              <span>Multi-Model Botanical Vision</span>
            </motion.div>

            {/* Individual User API Key Top-Down Dropdown */}
            <ApiKeyDropdown
              userApiKey={userApiKey}
              onApiKeyChange={handleApiKeyChange}
              defaultApiReady={apiOnline}
            />

            <motion.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              onClick={() => setIsLearnedModalOpen(true)}
              className="inline-flex items-center gap-1.5 bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200/80 px-3 py-1.5 rounded-full text-xs font-semibold transition-all shadow-xs cursor-pointer"
            >
              <Brain className="w-3.5 h-3.5 text-teal-700" />
              <span>Learned Memory: {learnedSpeciesList.length}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </motion.button>

            <motion.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              onClick={() => setIsCatalogOpen(true)}
              className="inline-flex items-center gap-1.5 bg-emerald-800 hover:bg-emerald-900 text-white px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>106-Species Catalog</span>
            </motion.button>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 font-serif"
          >
            🌸 Iris Bloom AI <span className="text-emerald-700 font-normal italic font-serif">Flower Vision</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-2 text-sm sm:text-base text-stone-600 leading-relaxed font-light"
          >
            Choose between <strong>Local ML Model</strong> (instant on-device neural detection) and <strong>Cloud AI Multimodal Model</strong> (powered by your individual Gemini API key). Whenever Cloud AI identifies a new specimen, it is instantly learned into your Local ML model for future zero-cloud recognition.
          </motion.p>
        </header>

        {/* Custom Model Selector Segmented Control */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="bg-white p-1.5 rounded-2xl border border-stone-200/90 shadow-sm grid grid-cols-3 gap-1.5">
            {/* Option 1: Local ML Model */}
            <button
              id="mode-btn-local"
              onClick={() => {
                setDetectionMode("local");
                setError(null);
                setLocalUnindexedNotice(null);
              }}
              className={`p-3 rounded-xl text-left transition-all flex flex-col justify-between cursor-pointer ${
                detectionMode === "local"
                  ? "bg-emerald-800 text-white shadow-sm ring-1 ring-emerald-900"
                  : "bg-transparent hover:bg-stone-50 text-stone-700"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm">
                  <Cpu className="w-4 h-4 shrink-0" />
                  <span>Local ML Model</span>
                </div>
                {detectionMode === "local" && (
                  <span className="w-2 h-2 rounded-full bg-emerald-300"></span>
                )}
              </div>
              <p className={`text-[10px] sm:text-[11px] mt-1 leading-tight ${
                detectionMode === "local" ? "text-emerald-100" : "text-stone-500"
              }`}>
                On-device dataset (106 base + {learnedSpeciesList.length} learned)
              </p>
            </button>

            {/* Option 2: Cloud AI Multimodal Model */}
            <button
              id="mode-btn-ai"
              onClick={() => {
                setDetectionMode("ai");
                setError(null);
                setLocalUnindexedNotice(null);
              }}
              className={`p-3 rounded-xl text-left transition-all flex flex-col justify-between cursor-pointer ${
                detectionMode === "ai"
                  ? "bg-purple-800 text-white shadow-sm ring-1 ring-purple-900"
                  : "bg-transparent hover:bg-stone-50 text-stone-700"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm">
                  <Globe className="w-4 h-4 shrink-0" />
                  <span>Cloud AI Vision</span>
                </div>
                {detectionMode === "ai" && (
                  <span className="w-2 h-2 rounded-full bg-purple-300"></span>
                )}
              </div>
              <p className={`text-[10px] sm:text-[11px] mt-1 leading-tight ${
                detectionMode === "ai" ? "text-purple-100" : "text-stone-500"
              }`}>
                Gemini AI (uses your API key & auto-learns)
              </p>
            </button>

            {/* Option 3: Smart Auto Dual Engine */}
            <button
              id="mode-btn-auto"
              onClick={() => {
                setDetectionMode("auto");
                setError(null);
                setLocalUnindexedNotice(null);
              }}
              className={`p-3 rounded-xl text-left transition-all flex flex-col justify-between cursor-pointer ${
                detectionMode === "auto"
                  ? "bg-teal-800 text-white shadow-sm ring-1 ring-teal-900"
                  : "bg-transparent hover:bg-stone-50 text-stone-700"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm">
                  <Zap className="w-4 h-4 shrink-0" />
                  <span>Auto Dual-Engine</span>
                </div>
                {detectionMode === "auto" && (
                  <span className="w-2 h-2 rounded-full bg-teal-300"></span>
                )}
              </div>
              <p className={`text-[10px] sm:text-[11px] mt-1 leading-tight ${
                detectionMode === "auto" ? "text-teal-100" : "text-stone-500"
              }`}>
                Local ML first, shifts to Cloud AI if unknown
              </p>
            </button>
          </div>
        </div>

        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Upload */}
          <div className="lg:col-span-4 space-y-6">
            {/* Input card */}
            <section id="upload-panel" className="bg-white border border-stone-200/80 rounded-2xl p-6 shadow-sm">
              <h2 className="text-base font-bold text-stone-900 mb-4 flex items-center gap-2">
                <Camera className="w-4 h-4 text-emerald-700" />
                <span>Choose Flower Image</span>
              </h2>

              {/* Upload Zone */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={imagePreview ? undefined : triggerFileInput}
                className={`relative border-2 border-dashed rounded-xl p-6 transition-all duration-200 text-center cursor-pointer ${
                  isDragOver
                    ? "border-emerald-500 bg-emerald-50/30 scale-[0.99]"
                    : imagePreview
                    ? "border-stone-200 bg-stone-50/50 cursor-default"
                    : "border-stone-300 hover:border-emerald-600 hover:bg-stone-50/30"
                }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />

                <AnimatePresence mode="wait">
                  {imagePreview ? (
                    <motion.div
                      key="preview"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="relative rounded-lg overflow-hidden max-h-72 flex items-center justify-center bg-stone-100"
                    >
                      <img
                        ref={previewImgRef}
                        src={imagePreview}
                        alt="Target flower preview"
                        className="object-contain max-h-72 w-full select-none"
                        referrerPolicy="no-referrer"
                        crossOrigin="anonymous"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          resetApp();
                        }}
                        className="absolute top-2.5 right-2.5 bg-stone-900/80 text-white hover:bg-stone-950 p-1.5 rounded-full shadow-md transition-colors cursor-pointer"
                        title="Remove image"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="prompt"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="py-6 space-y-2.5"
                    >
                      <div className="mx-auto w-10 h-10 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center">
                        <Upload className="w-5 h-5" />
                      </div>
                      <div className="text-sm font-medium text-stone-700">
                        Drag and drop your flower photo here
                      </div>
                      <p className="text-xs text-stone-500">
                        Supports JPG, PNG, WEBP up to 10MB
                      </p>
                      <span className="inline-block mt-2 bg-stone-100 hover:bg-stone-200/80 text-stone-800 text-xs font-semibold px-3 py-1.5 rounded-md transition-colors border border-stone-200">
                        Or select manually
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Action Button */}
              {imagePreview && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-5 flex gap-3"
                >
                  <button
                    id="btn-run-detection"
                    onClick={runDetection}
                    disabled={isAnalyzing}
                    className={`flex-1 font-semibold py-3 px-4 rounded-xl shadow-md active:scale-[0.98] disabled:opacity-50 transition-all flex items-center justify-center gap-2 text-sm text-white cursor-pointer ${
                      detectionMode === "local"
                        ? "bg-emerald-800 hover:bg-emerald-700 shadow-emerald-900/15"
                        : detectionMode === "ai"
                        ? "bg-purple-800 hover:bg-purple-700 shadow-purple-900/15"
                        : "bg-teal-800 hover:bg-teal-700 shadow-teal-900/15"
                    }`}
                  >
                    <Sparkles className="w-4 h-4 animate-pulse" />
                    <span>
                      {isAnalyzing
                        ? "Executing Analysis..."
                        : detectionMode === "local"
                        ? "Detect with Local ML Model"
                        : detectionMode === "ai"
                        ? "Identify with Cloud AI Model"
                        : "Analyze (Auto Dual-Engine)"}
                    </span>
                  </button>

                  <button
                    onClick={resetApp}
                    disabled={isAnalyzing}
                    className="bg-stone-100 hover:bg-stone-200 text-stone-700 p-3 rounded-xl border border-stone-200/80 transition-colors cursor-pointer"
                    title="Reset App"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
            </section>

            {/* Curated Botanical Test Cards */}
            <section id="sample-picker" className="bg-white border border-stone-200/80 rounded-2xl p-5 shadow-sm space-y-3.5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-600 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Test Specimens</span>
                </h3>
                <span className="text-[10px] text-stone-400 font-medium">Click to Load</span>
              </div>
              <p className="text-xs text-stone-500 leading-relaxed font-light">
                Select a sample below to test <strong>Local ML Model</strong> instant detection or <strong>Cloud AI Vision</strong> learning.
              </p>

              <div className="grid grid-cols-2 gap-2 pt-1">
                {samples.map((sample) => {
                  const isMl = (sample as any).expectedEngine === "ml_trained";
                  const isSelected = imagePreview === sample.path;

                  return (
                    <button
                      key={sample.id}
                      onClick={() => handleSelectSample(sample)}
                      disabled={isAnalyzing}
                      className={`p-2.5 rounded-xl border text-left transition-all relative group flex flex-col justify-between min-h-[78px] cursor-pointer ${
                        isSelected
                          ? "border-emerald-600 bg-emerald-50/40 ring-1 ring-emerald-600/30"
                          : "border-stone-200 hover:border-stone-300 hover:bg-stone-50/70"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-1">
                        <span className="text-xs font-semibold text-stone-900 line-clamp-1">
                          {sample.name.replace(/\(.*\)/, "")}
                        </span>
                        <span className="text-sm select-none">
                          {getFlowerPalette(sample.class).emoji}
                        </span>
                      </div>
                      <div className="mt-2">
                        <span className={`inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded-md ${
                          isMl
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                            : "bg-purple-100 text-purple-800 border border-purple-200"
                        }`}>
                          {isMl ? (
                            <>
                              <Cpu className="w-2.5 h-2.5" />
                              <span>In Local ML</span>
                            </>
                          ) : (
                            <>
                              <Zap className="w-2.5 h-2.5" />
                              <span>Learns from AI</span>
                            </>
                          )}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Continual Learning Status Info Card */}
            <section className="bg-gradient-to-br from-teal-900 to-emerald-950 text-white rounded-2xl p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-xs">
                  <Brain className="w-4 h-4 text-emerald-400" />
                  <span>Continual Learning Engine</span>
                </div>
                <button
                  onClick={() => setIsLearnedModalOpen(true)}
                  className="text-[10px] text-emerald-300 hover:text-emerald-200 font-bold underline cursor-pointer"
                >
                  View ({learnedSpeciesList.length})
                </button>
              </div>
              <p className="text-[11px] text-emerald-100/80 leading-relaxed font-light">
                When you run <strong>Cloud AI Multimodal Model</strong>, new flower classifications are automatically indexed in your local browser memory. Subsequent scans of the same flower in <strong>Local ML Mode</strong> will recognize it directly without using cloud AI!
              </p>
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-emerald-300 font-semibold">
                <span>Total On-Device Index:</span>
                <span>{106 + learnedSpeciesList.length} Species</span>
              </div>
            </section>
          </div>

          {/* Right Column: Analysis & Insights */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {/* 1. Loading State with Multi-Stage Progression */}
              {isAnalyzing && (
                <motion.div
                  key="analyzing"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="bg-white border border-stone-200/80 rounded-2xl p-8 shadow-sm flex flex-col items-center justify-center text-center space-y-6 min-h-[460px]"
                >
                  {/* Visual Tracker */}
                  <div className="w-full max-w-md bg-stone-50 border border-stone-200/80 rounded-2xl p-5 space-y-4">
                    <span className="text-[11px] uppercase tracking-wider font-extrabold text-stone-500 block text-center">
                      Execution Mode: {detectionMode === "local" ? "Local ML Only" : detectionMode === "ai" ? "Cloud AI Multimodal Model" : "Auto Dual-Engine"}
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative">
                      {/* Step 1: Trained ML Model */}
                      <div className={`p-3 rounded-xl border text-left transition-all ${
                        analysisPhase === "ml_scanning"
                          ? "border-emerald-500 bg-emerald-50/80 ring-2 ring-emerald-500/20"
                          : analysisPhase === "ml_matched"
                          ? "border-emerald-600 bg-emerald-100/60"
                          : "border-stone-200 bg-white opacity-70"
                      }`}>
                        <div className="flex items-center gap-2 mb-1">
                          <Cpu className={`w-4 h-4 ${
                            analysisPhase === "ml_scanning" ? "text-emerald-700 animate-pulse" : "text-stone-600"
                          }`} />
                          <span className="text-xs font-bold text-stone-900">1. Local ML Model</span>
                        </div>
                        <p className="text-[10px] text-stone-500 leading-tight">
                          {analysisPhase === "ml_scanning"
                            ? "Analyzing local weights & learned memory..."
                            : analysisPhase === "ml_matched"
                            ? "✓ Specimen identified in Local ML!"
                            : "On-device search complete"}
                        </p>
                      </div>

                      {/* Step 2: Cloud AI Vision */}
                      <div className={`p-3 rounded-xl border text-left transition-all ${
                        analysisPhase === "shifting_to_ai"
                          ? "border-amber-500 bg-amber-50/80 ring-2 ring-amber-500/20 animate-pulse"
                          : analysisPhase === "ai_searching"
                          ? "border-purple-500 bg-purple-50/80 ring-2 ring-purple-500/20"
                          : "border-stone-200 bg-white opacity-50"
                      }`}>
                        <div className="flex items-center gap-2 mb-1">
                          <Globe className={`w-4 h-4 ${
                            analysisPhase === "ai_searching" ? "text-purple-700 animate-spin" : "text-stone-500"
                          }`} />
                          <span className="text-xs font-bold text-stone-900">2. Cloud AI Vision</span>
                        </div>
                        <p className="text-[10px] text-stone-500 leading-tight">
                          {analysisPhase === "shifting_to_ai"
                            ? "⚡ Shifting to Cloud AI..."
                            : analysisPhase === "ai_searching"
                            ? "Querying internet taxonomy with your API Key..."
                            : "Standby"}
                        </p>
                      </div>
                    </div>

                    {shiftNotice && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-purple-50 border border-purple-200/80 rounded-xl p-2.5 text-center text-xs text-purple-900 font-medium flex items-center justify-center gap-1.5"
                      >
                        <Zap className="w-3.5 h-3.5 text-purple-600 flex-shrink-0" />
                        <span>Shift Reason: {shiftNotice}</span>
                      </motion.div>
                    )}
                  </div>

                  {/* Pulsing visual core */}
                  <div className="space-y-2 max-w-md">
                    <h3 className="text-base font-serif font-bold text-stone-900">
                      {analysisPhase === "ml_scanning"
                        ? "Searching Local Botanical Dataset & Memory..."
                        : analysisPhase === "shifting_to_ai"
                        ? "Transitioning to Gemini AI Vision..."
                        : "Querying Global Botanical Database with Gemini..."}
                    </h3>
                    <p className="text-xs text-stone-600 font-medium">
                      {analysisLog}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* 2. LOCAL ML UNINDEXED NOTICE (When in Local ML Mode and flower is not found) */}
              {localUnindexedNotice && !isAnalyzing && !result && !error && (
                <motion.div
                  key="local-unindexed"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="bg-white border border-stone-200/90 rounded-2xl p-8 shadow-sm flex flex-col items-center text-center space-y-6 min-h-[420px] justify-center"
                >
                  <div className="w-14 h-14 bg-amber-50 border border-amber-200 text-amber-700 rounded-2xl flex items-center justify-center shadow-xs">
                    <Brain className="w-7 h-7" />
                  </div>
                  
                  <div className="max-w-md space-y-2">
                    <span className="text-xs uppercase font-extrabold tracking-wider text-amber-700 bg-amber-100/80 px-2.5 py-1 rounded-md">
                      Not Found in Local ML Model
                    </span>
                    <h3 className="text-xl font-serif font-bold text-stone-900 pt-1">
                      Specimen Not Yet Learned
                    </h3>
                    <p className="text-sm text-stone-600 leading-relaxed font-light">
                      This flower is not present in your local 106 built-in species catalog and has not been learned into your device's memory yet.
                    </p>
                  </div>

                  <div className="bg-stone-50 border border-stone-200/80 rounded-xl p-4 max-w-md text-left text-xs text-stone-600 space-y-2">
                    <div className="font-semibold text-stone-800 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                      <span>1-Click Cloud AI Identification & Local ML Learning</span>
                    </div>
                    <p className="text-stone-500 leading-relaxed">
                      Click below to let Cloud AI Multimodal Model identify this flower with global taxonomy (400,000+ species). The result will be <strong>automatically learned and stored</strong> on your device so next time you can detect it directly with Local ML!
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
                    <button
                      id="btn-escalate-to-ai"
                      onClick={() => runCloudAIDetection("Escalated from Local ML Model scan")}
                      className="flex-1 bg-purple-800 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md shadow-purple-900/15 transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
                    >
                      <Globe className="w-4 h-4" />
                      <span>Analyze with Cloud AI & Learn Species</span>
                    </button>
                    <button
                      onClick={resetApp}
                      className="bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold px-4 py-3 rounded-xl transition-colors cursor-pointer"
                    >
                      Try Another Photo
                    </button>
                  </div>
                </motion.div>
              )}

              {/* 3. Error State with Actionable Guidance */}
              {error && !isAnalyzing && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="bg-red-50/60 border border-red-200 rounded-2xl p-8 shadow-sm flex flex-col items-center text-center space-y-5 min-h-[340px] justify-center"
                >
                  <div className="w-12 h-12 bg-red-100 text-red-800 rounded-full flex items-center justify-center shadow-xs">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <div className="max-w-md space-y-2">
                    <h3 className="text-base font-bold text-red-950">Identification Halted</h3>
                    <p className="text-sm text-red-800/90 leading-relaxed font-normal">{error}</p>
                  </div>

                  <div className="flex flex-wrap gap-2.5 justify-center max-w-md pt-2">
                    {(!userApiKey || error.toLowerCase().includes("api key") || error.toLowerCase().includes("vercel")) && (
                      <button
                        onClick={() => {
                          const trigger = document.getElementById("api-key-header-button");
                          if (trigger) {
                            trigger.click();
                            trigger.scrollIntoView({ behavior: "smooth" });
                          }
                        }}
                        className="bg-purple-800 hover:bg-purple-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <Key className="w-3.5 h-3.5" />
                        <span>Open API Key Input</span>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setDetectionMode("local");
                        setError(null);
                        runDetection();
                      }}
                      className="bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Cpu className="w-3.5 h-3.5" />
                      <span>Try with Local ML Model</span>
                    </button>

                    <button
                      onClick={resetApp}
                      className="bg-white hover:bg-stone-100 border border-stone-200 text-stone-700 text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
                    >
                      Clear & Try Another Photo
                    </button>
                  </div>
                </motion.div>
              )}

              {/* 4. Successful Detection Result */}
              {result && !isAnalyzing && !error && (
                <motion.div
                  key="result"
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: -15, transition: { duration: 0.2 } }}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.08,
                        delayChildren: 0.05
                      }
                    }
                  }}
                  className="space-y-6"
                >
                  {/* Notification banner when newly learned from Cloud AI */}
                  {result.isNewlyLearned && (
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: -10 },
                        visible: { opacity: 1, y: 0 }
                      }}
                      className="bg-emerald-800 text-white rounded-2xl p-4.5 shadow-md flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-emerald-700/80 border border-emerald-600/60 shrink-0">
                          <Sparkles className="w-5 h-5 text-emerald-200" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white flex items-center gap-2">
                            ✨ Learned to Local ML Model!
                          </h4>
                          <p className="text-xs text-emerald-100/90 leading-tight mt-0.5">
                            "{result.class}" is now stored in your on-device knowledge base. Next time you scan this flower in <strong>Local ML Model</strong> mode, it will identify it immediately offline!
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setIsLearnedModalOpen(true)}
                        className="shrink-0 bg-white text-emerald-900 hover:bg-emerald-50 text-xs font-bold px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                      >
                        View Memory
                      </button>
                    </motion.div>
                  )}

                  {/* Card 1: Engine Provenance Banner */}
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 12, scale: 0.99 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
                      }
                    }}
                    className={`border rounded-2xl p-4.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm ${
                      result.pipelineStage === "ml_learned"
                        ? "bg-teal-50/90 border-teal-200 text-teal-950"
                        : result.pipelineStage === "ml_trained"
                        ? "bg-emerald-50/90 border-emerald-200 text-emerald-950"
                        : "bg-purple-50/90 border-purple-200 text-purple-950"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <motion.div
                        initial={{ scale: 0.8, rotate: -10 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                        className={`p-2.5 rounded-xl flex-shrink-0 ${
                          result.pipelineStage === "ml_learned"
                            ? "bg-teal-100 text-teal-800 border border-teal-200"
                            : result.pipelineStage === "ml_trained"
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                            : "bg-purple-100 text-purple-800 border border-purple-200"
                        }`}
                      >
                        {result.pipelineStage === "ml_learned" ? (
                          <Brain className="w-5 h-5" />
                        ) : result.pipelineStage === "ml_trained" ? (
                          <Cpu className="w-5 h-5" />
                        ) : (
                          <Zap className="w-5 h-5" />
                        )}
                      </motion.div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-extrabold uppercase tracking-wide">
                            {result.pipelineStage === "ml_learned"
                              ? "Identified from Local Learned Memory (Zero Cloud Delay)"
                              : result.pipelineStage === "ml_trained"
                              ? "Identified by Local ML Model (106 Catalog)"
                              : "Identified via Cloud AI Multimodal Model (Gemini Vision)"}
                          </span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${
                            result.pipelineStage === "ml_learned"
                              ? "bg-teal-200/80 text-teal-900"
                              : result.pipelineStage === "ml_trained"
                              ? "bg-emerald-200/80 text-emerald-900"
                              : "bg-purple-200/80 text-purple-900"
                          }`}>
                            {result.pipelineStage === "ml_learned"
                              ? "Learned Memory"
                              : result.pipelineStage === "ml_trained"
                              ? "Local ML"
                              : "Cloud AI"}
                          </span>
                        </div>
                        <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                          {result.shiftReason}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Card 2: Hero Class Card */}
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 16, scale: 0.985 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
                      }
                    }}
                    className={`border rounded-2xl overflow-hidden shadow-sm transition-all bg-white ${activePalette.border}`}
                  >
                    {/* dynamic banner matching flower colors */}
                    <div className={`p-6 border-b flex flex-col sm:flex-row items-center sm:justify-between gap-4 ${activePalette.bg} ${activePalette.border}`}>
                      <div className="flex items-center gap-4 text-center sm:text-left">
                        <motion.span
                          initial={{ scale: 0.5, rotate: -15, opacity: 0 }}
                          animate={{ scale: 1, rotate: 0, opacity: 1 }}
                          transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.15 }}
                          className="text-5xl select-none filter drop-shadow-sm leading-none"
                        >
                          {activePalette.emoji}
                        </motion.span>
                        <div>
                          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                            <h3 className="text-2xl font-serif font-black tracking-tight text-stone-900 capitalize">
                              {result.class}
                            </h3>
                          </div>
                          <p className="text-xs italic font-semibold text-stone-600 mt-0.5">
                            {result.scientificName}
                          </p>
                          {(result.botanicalFamily || result.nativeRegion) && (
                            <motion.div
                              initial={{ opacity: 0, y: 4 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.4, delay: 0.2 }}
                              className="flex flex-wrap gap-2 mt-1.5"
                            >
                              {result.botanicalFamily && (
                                <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-white/80 border border-stone-200 px-2 py-0.5 rounded-md text-stone-700">
                                  <Leaf className="w-2.5 h-2.5 text-emerald-700" />
                                  <span>Family: {result.botanicalFamily}</span>
                                </span>
                              )}
                              {result.nativeRegion && (
                                <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-white/80 border border-stone-200 px-2 py-0.5 rounded-md text-stone-700">
                                  <Globe className="w-2.5 h-2.5 text-blue-600" />
                                  <span>{result.nativeRegion}</span>
                                </span>
                              )}
                            </motion.div>
                          )}
                        </div>
                      </div>
                      
                      <motion.div
                        initial={{ scale: 0.85, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
                        className="bg-white/95 backdrop-blur-xs border border-stone-200/60 px-4 py-2 rounded-xl text-center shadow-xs"
                      >
                        <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500 block">Confidence</span>
                        <span className="text-lg font-black text-emerald-800">{result.confidence.toFixed(1)}%</span>
                      </motion.div>
                    </div>

                    {/* Rich botanical description */}
                    <div className="p-6 space-y-6">
                      <div className="space-y-2">
                        <h4 className="text-xs uppercase font-extrabold tracking-wider text-stone-400">Botanical Taxonomy & Facts</h4>
                        <p className="text-stone-700 text-sm leading-relaxed font-light">
                          {result.description}
                        </p>
                      </div>

                      {/* Probabilities */}
                      <div className="space-y-3.5">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs uppercase font-extrabold tracking-wider text-stone-400 flex items-center gap-1.5">
                            <TrendingUp className="w-3.5 h-3.5 text-stone-500" />
                            <span>Probability Distribution</span>
                          </h4>
                          <span className="text-[10px] text-stone-400 font-medium">Sum: 100%</span>
                        </div>

                        <div className="grid gap-3">
                          {result.confidenceScores.map((score: ConfidenceScore, index: number) => {
                            const isPredictedClass = score.class.toLowerCase() === result.class.toLowerCase();
                            const palette = getFlowerPalette(score.class);
                            
                            return (
                              <motion.div
                                key={score.class}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                  duration: 0.4,
                                  delay: 0.2 + index * 0.08,
                                  ease: [0.22, 1, 0.36, 1]
                                }}
                                className="space-y-1"
                              >
                                <div className="flex items-center justify-between text-xs font-semibold">
                                  <span className={`capitalize flex items-center gap-1.5 ${
                                    isPredictedClass ? "text-stone-900 font-bold" : "text-stone-600"
                                  }`}>
                                    <span>{palette.emoji}</span>
                                    <span>{score.class}</span>
                                    {isPredictedClass && (
                                      <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-bold">
                                        Top
                                      </span>
                                    )}
                                  </span>
                                  <span className={`font-mono ${isPredictedClass ? "text-emerald-800 font-bold" : "text-stone-500"}`}>
                                    {score.confidence.toFixed(1)}%
                                  </span>
                                </div>
                                <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${Math.max(2, score.confidence)}%` }}
                                    transition={{
                                      duration: 0.8,
                                      delay: 0.25 + index * 0.08,
                                      ease: [0.22, 1, 0.36, 1]
                                    }}
                                    className={`h-full rounded-full ${
                                      isPredictedClass ? "bg-emerald-600" : "bg-stone-300"
                                    }`}
                                  />
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Horticultural Care & Fun Facts */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        {/* Care Instructions */}
                        <div className="bg-stone-50/70 rounded-xl p-4 border border-stone-200/60 space-y-2.5">
                          <h5 className="text-xs uppercase font-extrabold tracking-wider text-emerald-800 flex items-center gap-1.5">
                            <Sprout className="w-3.5 h-3.5 text-emerald-700" />
                            <span>Care & Cultivation</span>
                          </h5>
                          <ul className="space-y-1.5 text-xs text-stone-600">
                            {result.careInstructions.map((instruction: string, i: number) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-emerald-600 font-bold">•</span>
                                <span className="leading-relaxed">{instruction}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Botanical Fun Fact */}
                        <div className="bg-amber-50/60 rounded-xl p-4 border border-amber-200/60 space-y-2.5">
                          <h5 className="text-xs uppercase font-extrabold tracking-wider text-amber-900 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                            <span>Did You Know?</span>
                          </h5>
                          <p className="text-xs text-amber-950 leading-relaxed font-light">
                            {result.funFact}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {/* 5. Idle Empty Slate */}
              {!result && !isAnalyzing && !error && !localUnindexedNotice && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white border border-stone-200/80 rounded-2xl p-12 text-center flex flex-col items-center justify-center min-h-[460px] space-y-4 shadow-sm"
                >
                  <div className="w-16 h-16 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center text-emerald-700 shadow-xs">
                    <Leaf className="w-8 h-8" />
                  </div>
                  <div className="max-w-md space-y-1.5">
                    <h3 className="text-lg font-serif font-bold text-stone-900">
                      Ready for Botanical Vision
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-500 leading-relaxed font-light">
                      Upload your flower photograph or pick one of the curated samples on the left. Toggle between <strong>Local ML Model</strong> and <strong>Cloud AI Multimodal Model</strong> anytime.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                    <span className="inline-flex items-center gap-1 text-xs text-stone-600 bg-stone-100 px-3 py-1 rounded-full font-medium">
                      <Cpu className="w-3.5 h-3.5 text-emerald-700" />
                      Instant Local ML
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-stone-600 bg-stone-100 px-3 py-1 rounded-full font-medium">
                      <Key className="w-3.5 h-3.5 text-purple-700" />
                      Individual API Key
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-stone-600 bg-stone-100 px-3 py-1 rounded-full font-medium">
                      <Brain className="w-3.5 h-3.5 text-teal-700" />
                      Continual Learning
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* 106-Species Catalog Modal */}
      <SpeciesCatalogModal
        isOpen={isCatalogOpen}
        onClose={() => setIsCatalogOpen(false)}
      />

      {/* Continual Learning Memory Modal */}
      <LearnedKnowledgeModal
        isOpen={isLearnedModalOpen}
        onClose={() => setIsLearnedModalOpen(false)}
        learnedList={learnedSpeciesList}
        onLearnedListUpdated={refreshLearnedSpecies}
        onSelectSampleToTest={(thumb) => {
          setImagePreview(thumb);
          setSelectedFile(null);
          setSelectedSampleId(null);
          setResult(null);
          setError(null);
          setLocalUnindexedNotice(null);
        }}
      />
    </div>
  );
}
