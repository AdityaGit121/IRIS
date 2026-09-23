import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Camera,
  Video,
  Radio,
  RefreshCw,
  Zap,
  AlertTriangle,
  Play,
  Square,
  Sparkles,
  Info,
  ShieldCheck,
  Eye,
  Layers,
  HelpCircle,
  ExternalLink,
  Cpu,
  CheckCircle2,
  Copy,
  Check,
  MonitorPlay
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Hls from "hls.js";

interface LiveFeedScannerProps {
  onCaptureFrame: (imageDataUrl: string, autoRun?: boolean) => void;
  isAnalyzing: boolean;
  activeDetectionMode: "local" | "ai" | "auto";
}

type FeedMode = "webcam" | "stream";

interface StreamPreset {
  id: string;
  name: string;
  url: string;
  type: "simulated_hls" | "hls" | "mp4" | "iframe_webrtc";
  description: string;
  sampleSpeciesHint?: string;
  posterImage?: string;
}

const PRESET_STREAMS: StreamPreset[] = [
  {
    id: "mediamtx_drone1_hls",
    name: "MediaMTX HLS Stream (live/drone1)",
    url: "http://localhost:8888/live/drone1/index.m3u8",
    type: "hls",
    description: "Your active MediaMTX HLS stream on :8888",
    sampleSpeciesHint: "Live RTMP Ingest from Mobile / Drone",
    posterImage: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "mediamtx_webrtc_iframe",
    name: "MediaMTX WebRTC Player (:8889)",
    url: "http://localhost:8889/live/drone1",
    type: "iframe_webrtc",
    description: "Ultra-low latency WebRTC player directly from MediaMTX",
    sampleSpeciesHint: "Instant WebRTC Ingest (Zero lag)",
    posterImage: "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "sunflower_field_stream",
    name: "Sunfield Flora Botanical Stream (Live Loop)",
    url: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=1200&q=85",
    type: "simulated_hls",
    description: "High-resolution full bloom sunflower camera feed with dynamic wind vibration",
    sampleSpeciesHint: "Helianthus annuus (Sunflower)",
    posterImage: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "orchid_greenhouse_stream",
    name: "Exotic Orchid Conservatory (Live Loop)",
    url: "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=1200&q=85",
    type: "simulated_hls",
    description: "Orchidaceae greenhouse environment stream for rare tropical species identification",
    sampleSpeciesHint: "Phalaenopsis (Moth Orchid)",
    posterImage: "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=600&q=80"
  }
];

export const LiveFeedScanner: React.FC<LiveFeedScannerProps> = ({
  onCaptureFrame,
  isAnalyzing,
  activeDetectionMode
}) => {
  const [feedMode, setFeedMode] = useState<FeedMode>("webcam");
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("environment");
  const [cameraError, setCameraError] = useState<string | null>(null);

  // Stream Feed State
  const [streamUrl, setStreamUrl] = useState<string>("http://localhost:8888/live/drone1/index.m3u8");
  const [activeStreamPreset, setActiveStreamPreset] = useState<StreamPreset | null>(null);
  const [isStreamPlaying, setIsStreamPlaying] = useState<boolean>(false);
  const [isStreamLoading, setIsStreamLoading] = useState<boolean>(false);
  const [streamError, setStreamError] = useState<string | null>(null);
  const [showProtocolGuide, setShowProtocolGuide] = useState<boolean>(false);
  const [copiedUrl, setCopiedUrl] = useState<boolean>(false);

  // Quality & Sharpness Guard (Laplacian Variance / High Frequency Edge Detection)
  const [sharpnessScore, setSharpnessScore] = useState<number>(0);
  const [isAutoScanActive, setIsAutoScanActive] = useState<boolean>(false);
  const [qualityStatus, setQualityStatus] = useState<"optimal" | "blurry" | "dark" | "idle">("idle");
  const [capturedFlash, setCapturedFlash] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamVideoRef = useRef<HTMLVideoElement>(null);
  const streamCanvasRef = useRef<HTMLCanvasElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const hiddenCanvasRef = useRef<HTMLCanvasElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const simulatedStreamAnimRef = useRef<number | null>(null);
  const simulatedImageRef = useRef<HTMLImageElement | null>(null);
  const hlsInstanceRef = useRef<Hls | null>(null);

  // Stop current active webcam stream
  const stopWebcam = useCallback(() => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
    setIsAutoScanActive(false);
  }, []);

  // Clean up Hls.js instance
  const destroyHls = useCallback(() => {
    if (hlsInstanceRef.current) {
      hlsInstanceRef.current.destroy();
      hlsInstanceRef.current = null;
    }
  }, []);

  // Start Webcam with preferred facing mode
  const startWebcam = useCallback(async () => {
    stopWebcam();
    setCameraError(null);

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Camera API is not supported by your browser or requires HTTPS.");
      }

      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      mediaStreamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play().catch((e) => console.warn("Video play error:", e));
        };
      }
      setIsCameraActive(true);
    } catch (err: any) {
      console.error("Camera access error:", err);
      let message = "Unable to access camera.";
      if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
        message = "Camera permission was denied. Please grant camera access in browser settings.";
      } else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
        message = "No camera hardware detected on this device.";
      } else if (err.name === "NotReadableError") {
        message = "Camera is already in use by another application.";
      } else {
        message = err.message || "Failed to initialize video device.";
      }
      setCameraError(message);
      setIsCameraActive(false);
    }
  }, [facingMode, stopWebcam]);

  // Toggle Camera Facing
  const toggleFacingMode = () => {
    setFacingMode((prev) => (prev === "environment" ? "user" : "environment"));
  };

  useEffect(() => {
    if (isCameraActive) {
      startWebcam();
    }
  }, [facingMode]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopWebcam();
      handleStopStream();
    };
  }, [stopWebcam]);

  // Evaluate Frame Sharpness using Fast Canvas Gradient Variance
  const evaluateFrameQuality = (
    videoOrCanvas: HTMLVideoElement | HTMLCanvasElement
  ): { sharpness: number; status: "optimal" | "blurry" | "dark" } => {
    const canvas = hiddenCanvasRef.current || document.createElement("canvas");
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return { sharpness: 50, status: "optimal" };

    const sampleWidth = 120;
    const sampleHeight = 90;
    canvas.width = sampleWidth;
    canvas.height = sampleHeight;

    try {
      ctx.drawImage(videoOrCanvas, 0, 0, sampleWidth, sampleHeight);
      const imageData = ctx.getImageData(0, 0, sampleWidth, sampleHeight);
      const data = imageData.data;

      let totalBrightness = 0;
      let laplacianSum = 0;
      const gray: number[] = new Array(sampleWidth * sampleHeight);

      // Convert to grayscale
      for (let i = 0; i < data.length; i += 4) {
        const g = Math.round(0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]);
        gray[i / 4] = g;
        totalBrightness += g;
      }

      const avgBrightness = totalBrightness / (sampleWidth * sampleHeight);
      if (avgBrightness < 25) {
        return { sharpness: 10, status: "dark" };
      }

      // Measure high-frequency edge variance (Laplacian kernel approximation)
      for (let y = 1; y < sampleHeight - 1; y++) {
        for (let x = 1; x < sampleWidth - 1; x++) {
          const idx = y * sampleWidth + x;
          const center = gray[idx] * 4;
          const up = gray[idx - sampleWidth];
          const down = gray[idx + sampleWidth];
          const left = gray[idx - 1];
          const right = gray[idx + 1];

          const laplacian = Math.abs(center - (up + down + left + right));
          laplacianSum += laplacian;
        }
      }

      const meanLaplacian = laplacianSum / ((sampleWidth - 2) * (sampleHeight - 2));
      const normalizedSharpness = Math.min(100, Math.round((meanLaplacian / 12) * 100));

      const status = normalizedSharpness < 25 ? "blurry" : "optimal";
      return { sharpness: normalizedSharpness, status };
    } catch {
      return { sharpness: 75, status: "optimal" };
    }
  };

  // Continuous Frame Quality Monitoring
  useEffect(() => {
    if (!isCameraActive && !isStreamPlaying) {
      setQualityStatus("idle");
      setSharpnessScore(0);
      return;
    }

    const interval = window.setInterval(() => {
      let targetElement: HTMLVideoElement | HTMLCanvasElement | null = null;
      if (feedMode === "webcam" && videoRef.current && videoRef.current.readyState >= 2) {
        targetElement = videoRef.current;
      } else if (feedMode === "stream") {
        if (activeStreamPreset?.type === "simulated_hls" && streamCanvasRef.current) {
          targetElement = streamCanvasRef.current;
        } else if (streamVideoRef.current && streamVideoRef.current.readyState >= 2) {
          targetElement = streamVideoRef.current;
        }
      }

      if (targetElement) {
        const { sharpness, status } = evaluateFrameQuality(targetElement);
        setSharpnessScore(sharpness);
        setQualityStatus(status);

        // Auto-scan trigger when stable and clear
        if (isAutoScanActive && !isAnalyzing && status === "optimal" && sharpness >= 40) {
          captureAndSend(true);
        }
      }
    }, 500);

    return () => window.clearInterval(interval);
  }, [isCameraActive, isStreamPlaying, feedMode, isAutoScanActive, isAnalyzing, activeStreamPreset]);

  // Capture Current Frame & Send to Classifier
  const captureAndSend = (autoTrigger = false) => {
    let sourceElement: HTMLVideoElement | HTMLCanvasElement | HTMLImageElement | null = null;

    if (feedMode === "webcam") {
      if (!videoRef.current || videoRef.current.readyState < 2) return;
      sourceElement = videoRef.current;
    } else {
      if (activeStreamPreset?.type === "simulated_hls" && streamCanvasRef.current) {
        sourceElement = streamCanvasRef.current;
      } else if (streamVideoRef.current && streamVideoRef.current.readyState >= 2) {
        sourceElement = streamVideoRef.current;
      } else if (simulatedImageRef.current) {
        sourceElement = simulatedImageRef.current;
      }
    }

    if (!sourceElement) return;

    // Visual shutter flash effect
    setCapturedFlash(true);
    setTimeout(() => setCapturedFlash(false), 200);

    const canvas = document.createElement("canvas");
    let width = 1280;
    let height = 720;

    if (sourceElement instanceof HTMLVideoElement) {
      width = sourceElement.videoWidth || 1280;
      height = sourceElement.videoHeight || 720;
    } else if (sourceElement instanceof HTMLCanvasElement) {
      width = sourceElement.width || 1280;
      height = sourceElement.height || 720;
    } else if (sourceElement instanceof HTMLImageElement) {
      width = sourceElement.naturalWidth || 1280;
      height = sourceElement.naturalHeight || 720;
    }

    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    try {
      ctx.drawImage(sourceElement, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
      onCaptureFrame(dataUrl, autoTrigger);
    } catch (err) {
      console.warn("Canvas capture error:", err);
      if (activeStreamPreset?.url) {
        onCaptureFrame(activeStreamPreset.url, autoTrigger);
      }
    }
  };

  // Start Simulated Live Stream Animator
  const startSimulatedStreamLoop = (imgSrc: string) => {
    destroyHls();
    if (simulatedStreamAnimRef.current) {
      cancelAnimationFrame(simulatedStreamAnimRef.current);
    }

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imgSrc;
    simulatedImageRef.current = img;

    img.onload = () => {
      setIsStreamLoading(false);
      setIsStreamPlaying(true);
      setStreamError(null);

      const canvas = streamCanvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = 1280;
      canvas.height = 720;

      let tick = 0;
      const render = () => {
        tick++;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Gentle camera pan/zoom effect to simulate real-time wind movement on flowers
        const panX = Math.sin(tick * 0.015) * 8;
        const panY = Math.cos(tick * 0.012) * 5;
        const zoom = 1 + Math.sin(tick * 0.008) * 0.02;

        const drawW = canvas.width * zoom;
        const drawH = canvas.height * zoom;
        const drawX = (canvas.width - drawW) / 2 + panX;
        const drawY = (canvas.height - drawH) / 2 + panY;

        ctx.drawImage(img, drawX, drawY, drawW, drawH);

        // Live HUD timecode overlay directly inside the canvas stream
        const now = new Date();
        const timecode = `LIVE REC: ${now.toISOString().replace("T", " ").substring(0, 19)} UTC`;
        ctx.fillStyle = "rgba(15, 23, 42, 0.65)";
        ctx.fillRect(16, canvas.height - 42, 320, 26);
        ctx.fillStyle = "#34d399";
        ctx.font = "bold 13px monospace";
        ctx.fillText(timecode, 26, canvas.height - 25);

        simulatedStreamAnimRef.current = requestAnimationFrame(render);
      };

      render();
    };

    img.onerror = () => {
      setIsStreamLoading(false);
      setIsStreamPlaying(false);
      setStreamError("Failed to stream visual feed. Check network connection.");
    };
  };

  // Connect & Play Stream URL (Hls.js, MediaMTX, Direct Video, or WebRTC iFrame)
  const handleConnectStream = (overrideUrl?: string, preset?: StreamPreset) => {
    const targetUrl = (overrideUrl || streamUrl).trim();
    if (!targetUrl) {
      setStreamError("Please enter a valid live stream or video URL.");
      return;
    }

    setStreamError(null);
    setIsStreamLoading(true);
    setIsStreamPlaying(false);
    destroyHls();

    // Check if HTTPS page is trying to load unencrypted HTTP (Mixed Content warning)
    const isHttpsPage = window.location.protocol === "https:";
    const isHttpUrl = /^http:\/\//i.test(targetUrl);
    const isLocalhost = targetUrl.includes("localhost") || targetUrl.includes("127.0.0.1") || targetUrl.includes("192.168.");

    if (preset && preset.type === "simulated_hls") {
      setActiveStreamPreset(preset);
      startSimulatedStreamLoop(preset.url);
      return;
    }

    if (preset?.type === "iframe_webrtc" || targetUrl.includes(":8889")) {
      setActiveStreamPreset(preset || {
        id: "webrtc_player",
        name: "MediaMTX WebRTC Player",
        url: targetUrl,
        type: "iframe_webrtc",
        description: "Direct WebRTC stream"
      });
      setIsStreamLoading(false);
      setIsStreamPlaying(true);
      return;
    }

    // Standardize MediaMTX HLS URL if user entered without /index.m3u8
    let finalHlsUrl = targetUrl;
    if (targetUrl.includes(":8888") && !targetUrl.endsWith(".m3u8") && !targetUrl.includes("index.m3u8")) {
      finalHlsUrl = targetUrl.replace(/\/$/, "") + "/index.m3u8";
    }

    // Check if URL is an HLS stream (.m3u8 or contains MediaMTX :8888 path)
    const isHls = /\.m3u8($|\?)/i.test(finalHlsUrl) || finalHlsUrl.includes(":8888") || preset?.type === "hls";

    if (isHls) {
      setActiveStreamPreset(preset || {
        id: "hls_live_stream",
        name: "MediaMTX Live HLS Feed",
        url: finalHlsUrl,
        type: "hls",
        description: "Decoded via Hls.js Pipeline"
      });

      if (simulatedStreamAnimRef.current) {
        cancelAnimationFrame(simulatedStreamAnimRef.current);
      }

      const video = streamVideoRef.current;
      if (!video) {
        setIsStreamLoading(false);
        return;
      }

      if (Hls.isSupported()) {
        const hls = new Hls({
          enableWorker: true,
          lowLatencyMode: true,
          backBufferLength: 30,
          manifestLoadingMaxRetry: 4,
          levelLoadingMaxRetry: 4
        });
        hlsInstanceRef.current = hls;

        hls.loadSource(finalHlsUrl);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          setIsStreamLoading(false);
          video.play().then(() => {
            setIsStreamPlaying(true);
          }).catch((e) => {
            console.warn("Autoplay blocked, clicking Play will resume:", e);
            setIsStreamPlaying(true);
          });
        });

        hls.on(Hls.Events.ERROR, (_event, data) => {
          console.warn("HLS Engine event:", data);
          if (data.fatal) {
            setIsStreamLoading(false);
            setIsStreamPlaying(false);
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                if (isHttpsPage && isHttpUrl && isLocalhost) {
                  setStreamError(
                    "Mixed Content Blocked: You are browsing via an HTTPS cloud URL, so your browser blocks direct unencrypted http://localhost. Run the app locally via http://localhost:3000 to stream directly."
                  );
                } else {
                  setStreamError(
                    "Stream Not Active Yet: MediaMTX received no video data. Make sure your phone's RTMP app is currently streaming (NOT 'closed: EOF'). Keep streaming on the phone and click Connect again."
                  );
                }
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                hls.recoverMediaError();
                break;
              default:
                destroyHls();
                setStreamError("Unable to decode live stream. Make sure phone app is currently broadcasting RTMP.");
                break;
            }
          }
        });
        return;
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        // Native Safari HLS
        video.src = finalHlsUrl;
        video.onloadedmetadata = () => {
          setIsStreamLoading(false);
          video.play().then(() => setIsStreamPlaying(true));
        };
        video.onerror = () => {
          setIsStreamLoading(false);
          setIsStreamPlaying(false);
          setStreamError("Safari could not play this HLS link.");
        };
        return;
      }
    }

    // Check if custom URL is an image link
    const isImageFormat = /\.(jpg|jpeg|png|webp|svg)($|\?)/i.test(targetUrl) || targetUrl.includes("images.unsplash.com");
    if (isImageFormat) {
      setActiveStreamPreset({
        id: "custom_img_feed",
        name: "Custom Live Video Feed",
        url: targetUrl,
        type: "simulated_hls",
        description: "User supplied continuous video stream",
        posterImage: targetUrl
      });
      startSimulatedStreamLoop(targetUrl);
      return;
    }

    // Standard HTML5 MP4 / WebM video playback
    setActiveStreamPreset(null);
    if (simulatedStreamAnimRef.current) {
      cancelAnimationFrame(simulatedStreamAnimRef.current);
    }

    if (streamVideoRef.current) {
      streamVideoRef.current.crossOrigin = "anonymous";
      streamVideoRef.current.src = targetUrl;
      streamVideoRef.current.load();
      streamVideoRef.current
        .play()
        .then(() => {
          setIsStreamLoading(false);
          setIsStreamPlaying(true);
        })
        .catch((err) => {
          console.warn("Direct HTML5 Video Stream playback error:", err);
          setIsStreamLoading(false);
          setIsStreamPlaying(false);
          setStreamError(
            "Browser could not decode direct stream. If using MediaMTX, click the Protocol & MediaMTX Guide."
          );
        });
    }
  };

  const handleStopStream = () => {
    destroyHls();
    if (simulatedStreamAnimRef.current) {
      cancelAnimationFrame(simulatedStreamAnimRef.current);
      simulatedStreamAnimRef.current = null;
    }
    if (streamVideoRef.current) {
      streamVideoRef.current.pause();
      streamVideoRef.current.src = "";
    }
    setIsStreamPlaying(false);
    setIsStreamLoading(false);
    setActiveStreamPreset(null);
    setIsAutoScanActive(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  return (
    <div id="live-feed-scanner-container" className="space-y-4">
      {/* Hidden Canvas for Laplacian Variance Metric */}
      <canvas ref={hiddenCanvasRef} className="hidden" />

      {/* Feed Mode Toggle */}
      <div className="flex bg-stone-100 p-1 rounded-xl border border-stone-200/80">
        <button
          type="button"
          onClick={() => {
            setFeedMode("webcam");
            handleStopStream();
          }}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            feedMode === "webcam"
              ? "bg-white text-stone-900 shadow-xs"
              : "text-stone-500 hover:text-stone-800"
          }`}
        >
          <Camera className="w-3.5 h-3.5 text-emerald-700" />
          <span>Live Web Camera</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setFeedMode("stream");
            stopWebcam();
          }}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            feedMode === "stream"
              ? "bg-white text-stone-900 shadow-xs"
              : "text-stone-500 hover:text-stone-800"
          }`}
        >
          <Radio className="w-3.5 h-3.5 text-purple-700" />
          <span className="flex items-center gap-1">
            <span>Stream Link</span>
            <span className="bg-purple-100 text-purple-800 font-bold text-[9px] px-1.5 py-0.2 rounded">MediaMTX / HLS</span>
          </span>
        </button>
      </div>

      {/* -------------------- 1. WEBCAM SCANNER MODE -------------------- */}
      {feedMode === "webcam" && (
        <div className="space-y-3.5">
          {/* Video Viewport */}
          <div className="relative rounded-2xl overflow-hidden bg-stone-950 aspect-video flex items-center justify-center border border-stone-800 shadow-inner group">
            {/* Shutter Flash Animation */}
            {capturedFlash && (
              <div className="absolute inset-0 bg-white/90 z-30 pointer-events-none transition-opacity duration-200" />
            )}

            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`w-full h-full object-cover select-none ${
                facingMode === "user" ? "scale-x-[-1]" : ""
              } ${isCameraActive ? "block" : "hidden"}`}
            />

            {/* Target Reticle / AR Frame */}
            {isCameraActive && (
              <div className="absolute inset-0 pointer-events-none z-10 flex flex-col items-center justify-center p-6">
                {/* Holographic Botanical Scanning Box */}
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 border-2 border-dashed border-emerald-400/70 rounded-3xl flex items-center justify-center shadow-[0_0_25px_rgba(16,185,129,0.2)]">
                  {/* Corner Markers */}
                  <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-emerald-400 rounded-tl-md" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-emerald-400 rounded-tr-md" />
                  <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-emerald-400 rounded-bl-md" />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-emerald-400 rounded-br-md" />

                  {/* Center Dot */}
                  <div className="w-2 h-2 rounded-full bg-emerald-400/80 animate-ping" />
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-300 absolute" />

                  {/* Dynamic Laser Line if Analyzing */}
                  {isAnalyzing && (
                    <motion.div
                      initial={{ y: -90, opacity: 0 }}
                      animate={{ y: 90, opacity: 1 }}
                      transition={{ repeat: Infinity, duration: 1.4, repeatType: "reverse" }}
                      className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_#34d399]"
                    />
                  )}
                </div>

                {/* Subtitle / Reticle Instruction */}
                <div className="mt-3 px-3 py-1 rounded-full bg-stone-900/80 backdrop-blur-md border border-stone-700/60 text-[10px] font-medium text-stone-200 flex items-center gap-1.5">
                  <Eye className="w-3 h-3 text-emerald-400" />
                  <span>Align flower within the reticle for highest accuracy</span>
                </div>
              </div>
            )}

            {/* Inactive Standby Screen */}
            {!isCameraActive && !cameraError && (
              <div className="text-center p-6 space-y-3 z-10">
                <div className="w-12 h-12 bg-stone-900 text-stone-400 rounded-full flex items-center justify-center mx-auto border border-stone-800 shadow-md">
                  <Camera className="w-6 h-6 text-emerald-500" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-white">Live Camera Offline</p>
                  <p className="text-xs text-stone-400 max-w-xs">
                    Start webcam to point your mobile or desktop camera directly at blooming flora.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={startWebcam}
                  className="bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all shadow-md flex items-center gap-1.5 mx-auto cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Start Camera Feed</span>
                </button>
              </div>
            )}

            {/* Error Overlay */}
            {cameraError && (
              <div className="text-center p-6 space-y-3 z-10 max-w-sm">
                <div className="w-10 h-10 bg-red-950/80 text-red-400 rounded-full flex items-center justify-center mx-auto border border-red-800">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <p className="text-xs text-red-300 font-medium leading-relaxed">{cameraError}</p>
                <button
                  type="button"
                  onClick={startWebcam}
                  className="bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium px-3.5 py-1.5 rounded-lg border border-stone-700 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Try Again</span>
                </button>
              </div>
            )}

            {/* Real-time Quality & Sharpness Badge Overlay */}
            {isCameraActive && (
              <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5">
                <div
                  className={`px-2.5 py-1 rounded-lg backdrop-blur-md text-[10px] font-bold border flex items-center gap-1.5 ${
                    qualityStatus === "optimal"
                      ? "bg-emerald-950/80 text-emerald-300 border-emerald-700/60"
                      : qualityStatus === "dark"
                      ? "bg-amber-950/80 text-amber-300 border-amber-700/60"
                      : "bg-red-950/80 text-red-300 border-red-700/60"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      qualityStatus === "optimal"
                        ? "bg-emerald-400 animate-pulse"
                        : qualityStatus === "dark"
                        ? "bg-amber-400"
                        : "bg-red-400"
                    }`}
                  />
                  <span>
                    {qualityStatus === "optimal"
                      ? `Frame Sharp (${sharpnessScore}%)`
                      : qualityStatus === "dark"
                      ? "Low Lighting"
                      : "Motion Blur Detected"}
                  </span>
                </div>
              </div>
            )}

            {/* Camera Controls Overlay */}
            {isCameraActive && (
              <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={toggleFacingMode}
                  className="bg-stone-900/80 hover:bg-stone-800 text-stone-200 p-2 rounded-xl backdrop-blur-md border border-stone-700/60 transition-colors shadow-sm cursor-pointer"
                  title="Switch Front/Rear Camera"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={stopWebcam}
                  className="bg-stone-900/80 hover:bg-red-900/80 text-stone-200 hover:text-white p-2 rounded-xl backdrop-blur-md border border-stone-700/60 transition-colors shadow-sm cursor-pointer"
                  title="Stop Camera"
                >
                  <Square className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Action Bar for Camera */}
          {isCameraActive && (
            <div className="space-y-2">
              <div className="flex gap-2.5">
                <button
                  type="button"
                  onClick={() => captureAndSend(true)}
                  disabled={isAnalyzing}
                  className="flex-1 bg-emerald-800 hover:bg-emerald-700 text-white font-semibold py-2.5 px-4 rounded-xl shadow-md text-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Camera className="w-4 h-4" />
                  <span>{isAnalyzing ? "Analyzing Specimen..." : "Capture & Identify Flower"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsAutoScanActive(!isAutoScanActive)}
                  className={`py-2.5 px-3.5 rounded-xl border text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                    isAutoScanActive
                      ? "bg-purple-100 text-purple-900 border-purple-300 ring-2 ring-purple-500/20"
                      : "bg-white text-stone-700 border-stone-200 hover:bg-stone-50"
                  }`}
                  title="Auto-scan triggers when camera is held steady"
                >
                  <Zap className={`w-3.5 h-3.5 ${isAutoScanActive ? "text-purple-700 animate-pulse" : "text-stone-400"}`} />
                  <span>{isAutoScanActive ? "Auto-Scan: ON" : "Auto-Scan"}</span>
                </button>
              </div>

              {/* Engine Route & Mode Note */}
              <div className="flex items-center justify-between text-[11px] text-stone-500 px-1">
                <span>
                  Active Engine:{" "}
                  <strong className="text-stone-800">
                    {activeDetectionMode === "local"
                      ? "Local ML (Offline 106 Taxa)"
                      : activeDetectionMode === "ai"
                      ? "Cloud Multimodal AI"
                      : "Auto Dual-Engine (Smart Shift)"}
                  </strong>
                </span>
                <span className="flex items-center gap-1 text-emerald-700 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Blur-Gated</span>
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* -------------------- 2. STREAM LINK SCANNER (MEDIAMTX / HLS / RTMP / RTSP) -------------------- */}
      {feedMode === "stream" && (
        <div className="space-y-3.5">
          {/* Stream Player Viewport */}
          <div className="relative rounded-2xl overflow-hidden bg-stone-950 aspect-video flex items-center justify-center border border-stone-800 shadow-inner">
            {/* Shutter Flash Animation */}
            {capturedFlash && (
              <div className="absolute inset-0 bg-white/90 z-30 pointer-events-none transition-opacity duration-200" />
            )}

            {/* Render Canvas Stream (for Simulated Live Video Feeds) */}
            <canvas
              ref={streamCanvasRef}
              className={`w-full h-full object-cover select-none ${
                activeStreamPreset?.type === "simulated_hls" && isStreamPlaying ? "block" : "hidden"
              }`}
            />

            {/* Render iFrame for WebRTC / WHEP Player */}
            {activeStreamPreset?.type === "iframe_webrtc" && isStreamPlaying && (
              <iframe
                ref={iframeRef}
                src={streamUrl}
                title="MediaMTX WebRTC Stream"
                className="w-full h-full border-0"
                allow="autoplay; fullscreen"
              />
            )}

            {/* Standard Video element (Hls.js / MediaMTX / Direct Video) */}
            <video
              ref={streamVideoRef}
              autoPlay
              playsInline
              muted
              loop
              className={`w-full h-full object-cover select-none ${
                activeStreamPreset?.type !== "simulated_hls" && activeStreamPreset?.type !== "iframe_webrtc" && isStreamPlaying
                  ? "block"
                  : "hidden"
              }`}
            />

            {/* Quality badge for stream */}
            {isStreamPlaying && (
              <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5">
                <div className="px-2.5 py-1 rounded-lg backdrop-blur-md text-[10px] font-bold border bg-purple-950/80 text-purple-300 border-purple-700/60 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
                  <span>
                    {activeStreamPreset?.id.includes("mediamtx")
                      ? "MEDIAMTX LIVE INGEST"
                      : "LIVE BOTANICAL FEED"}
                  </span>
                </div>
              </div>
            )}

            {/* Stream Loading Indicator */}
            {isStreamLoading && (
              <div className="absolute inset-0 bg-stone-950/80 z-20 flex flex-col items-center justify-center gap-2">
                <RefreshCw className="w-6 h-6 text-purple-400 animate-spin" />
                <span className="text-xs text-stone-300 font-medium">Connecting to MediaMTX / HLS ingest...</span>
              </div>
            )}

            {/* Standby View for Stream */}
            {!isStreamPlaying && !isStreamLoading && !streamError && (
              <div className="text-center p-6 space-y-2.5 z-10 max-w-sm">
                <div className="w-12 h-12 bg-stone-900 text-stone-400 rounded-full flex items-center justify-center mx-auto border border-stone-800 shadow-md">
                  <Cpu className="w-6 h-6 text-purple-400" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-white">MediaMTX & HLS Stream Ready</p>
                  <p className="text-xs text-stone-400">
                    Keep your phone RTMP broadcasting actively, then select the <strong>MediaMTX Stream</strong> preset below.
                  </p>
                </div>
              </div>
            )}

            {/* Stream Error Feedback with Diagnostic Advice */}
            {streamError && (
              <div className="text-center p-6 space-y-3 z-10 max-w-md">
                <div className="w-10 h-10 bg-red-950/80 text-red-400 rounded-full flex items-center justify-center mx-auto border border-red-800">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <p className="text-xs text-red-300 font-medium leading-relaxed">{streamError}</p>
                <div className="flex justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowProtocolGuide(true)}
                    className="bg-purple-900/80 hover:bg-purple-800 text-purple-200 text-xs font-semibold px-3.5 py-1.5 rounded-lg border border-purple-700/50 transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>MediaMTX & Browser Fix Guide</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* URL Input & Connect Controls */}
          <div className="space-y-2">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="url"
                  value={streamUrl}
                  onChange={(e) => setStreamUrl(e.target.value)}
                  placeholder="http://localhost:8888/live/drone1/index.m3u8"
                  className="w-full bg-white border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 font-mono"
                />
              </div>

              {!isStreamPlaying ? (
                <button
                  type="button"
                  onClick={() => handleConnectStream()}
                  className="bg-purple-800 hover:bg-purple-700 text-white font-semibold px-4 py-2.5 rounded-xl text-xs shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Connect</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleStopStream}
                  className="bg-stone-800 hover:bg-red-800 text-white font-semibold px-4 py-2.5 rounded-xl text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Square className="w-3.5 h-3.5" />
                  <span>Stop Feed</span>
                </button>
              )}
            </div>

            {/* Stream Action Buttons */}
            {isStreamPlaying && (
              <div className="flex gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => captureAndSend(true)}
                  disabled={isAnalyzing}
                  className="flex-1 bg-purple-800 hover:bg-purple-700 text-white font-semibold py-2.5 px-4 rounded-xl shadow-md text-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Camera className="w-4 h-4" />
                  <span>{isAnalyzing ? "Analyzing Stream Keyframe..." : "Sample Stream & Detect Species"}</span>
                </button>
              </div>
            )}

            {/* Sample Stream Presets */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1">
                  <Layers className="w-3 h-3 text-purple-700" />
                  <span>Stream Presets & Ingest Modes</span>
                </span>
                <button
                  type="button"
                  onClick={() => setShowProtocolGuide(!showProtocolGuide)}
                  className="text-[11px] text-purple-700 hover:text-purple-800 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Info className="w-3 h-3" />
                  <span>MediaMTX Guide</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {PRESET_STREAMS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => {
                      setStreamUrl(preset.url);
                      handleConnectStream(preset.url, preset);
                    }}
                    className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                      activeStreamPreset?.id === preset.id
                        ? "border-purple-600 bg-purple-50/70 shadow-sm ring-1 ring-purple-500/20"
                        : preset.id.includes("mediamtx")
                        ? "border-purple-300 hover:border-purple-500 bg-purple-50/30"
                        : "border-stone-200 hover:border-purple-400 bg-white hover:bg-purple-50/40"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-1">
                      <div className="text-xs font-semibold text-stone-900 flex items-center gap-1.5">
                        {preset.id.includes("mediamtx") && (
                          <Cpu className="w-3.5 h-3.5 text-purple-700 flex-shrink-0" />
                        )}
                        <span>{preset.name}</span>
                      </div>
                      {activeStreamPreset?.id === preset.id && (
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0 mt-1" />
                      )}
                    </div>
                    <div className="text-[10px] text-stone-500 mt-1 line-clamp-1">{preset.description}</div>
                    {preset.sampleSpeciesHint && (
                      <span className="mt-1.5 text-[9px] font-bold text-purple-800 bg-purple-100/70 border border-purple-200 px-1.5 py-0.5 rounded-md self-start">
                        {preset.sampleSpeciesHint}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* -------------------- 3. MEDIAMTX & RTSP/RTMP PROTOCOL GUIDE MODAL -------------------- */}
      <AnimatePresence>
        {showProtocolGuide && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowProtocolGuide(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-stone-200 space-y-4 text-stone-800 max-h-[88vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-stone-900">MediaMTX Live Stream Checklist</h3>
                    <p className="text-xs text-stone-500">Why stream disconnected & how to reconnect</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowProtocolGuide(false)}
                  className="text-stone-400 hover:text-stone-700 p-1.5 rounded-lg transition-colors cursor-pointer text-xs font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3.5 text-xs leading-relaxed text-stone-600">
                {/* Critical Status */}
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-950 space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-amber-900">
                    <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    <span>Publisher Disconnection Notice (`closed: EOF`):</span>
                  </div>
                  <p className="text-[11px] text-amber-900 leading-relaxed">
                    Your logs show: <code className="bg-amber-100 px-1 py-0.5 rounded font-mono text-amber-950 font-semibold">[RTMP] closed: EOF</code>.
                    When the phone app stops streaming or goes into the background, MediaMTX has no live video frames to serve to HLS (`:8888`).
                  </p>
                </div>

                {/* 3 Step Reconnect Checklist */}
                <div className="space-y-2">
                  <h4 className="font-bold text-stone-900">Follow these 3 quick steps:</h4>
                  <ol className="list-decimal pl-4 space-y-2 text-stone-700 text-[11px]">
                    <li>
                      <strong>Keep Mobile App Streaming:</strong> On your phone app, tap <strong>"Start Streaming"</strong> so your MediaMTX console prints <code className="bg-stone-100 px-1 rounded font-mono text-emerald-800">[path live/drone1] stream is available</code>.
                    </li>
                    <li>
                      <strong>Open Local App:</strong> Open <a href="http://localhost:3000" target="_blank" rel="noreferrer" className="text-purple-700 font-bold underline">http://localhost:3000</a> on your PC (or http://127.0.0.1:3000).
                    </li>
                    <li>
                      <strong>Click Connect:</strong> Select <strong>"MediaMTX HLS Stream"</strong> or paste:
                      <div className="flex items-center gap-2 bg-stone-900 text-stone-100 p-2 rounded-lg font-mono text-[10px] mt-1">
                        <span className="flex-1 select-all">http://localhost:8888/live/drone1/index.m3u8</span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard("http://localhost:8888/live/drone1/index.m3u8")}
                          className="bg-stone-800 hover:bg-stone-700 text-stone-200 px-2 py-0.5 rounded text-[9px] cursor-pointer"
                        >
                          {copiedUrl ? "Copied" : "Copy"}
                        </button>
                      </div>
                    </li>
                  </ol>
                </div>

                {/* Alternative: WebRTC (:8889) */}
                <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl text-purple-950 space-y-1">
                  <div className="font-bold text-purple-900 flex items-center gap-1.5">
                    <MonitorPlay className="w-3.5 h-3.5" />
                    <span>Alternative: Zero-Lag WebRTC Player (:8889)</span>
                  </div>
                  <p className="text-[11px] text-purple-800">
                    MediaMTX also hosts an instant WebRTC player at <code className="bg-purple-100 px-1 rounded font-mono">http://localhost:8889/live/drone1</code>. You can select the <strong>"MediaMTX WebRTC Player (:8889)"</strong> preset to view it with zero buffering delay.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowProtocolGuide(false)}
                  className="bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs px-4 py-2 rounded-xl transition-colors cursor-pointer"
                >
                  Close Guide
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
