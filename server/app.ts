import express from "express";
import path from "path";
import fs from "fs";
import { GoogleGenAI, Type } from "@google/genai";

const app = express();

// Set up JSON body parser with increased limit for base64 images
app.use(express.json({ limit: "25mb" }));

// Mock data of flower information from the original class_info.py
const FLOWER_INFO: Record<string, { emoji: string; common_name: string; desc: string; color: string }> = {
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

const DEFAULT_INFO = {
  emoji: "🌸",
  common_name: "Unknown",
  desc: "No additional information available for this class.",
  color: "#8e2de2",
};

// Hardcoded representative subset of demo images, served statically from /public/flowers
const DEMO_IMAGES = [
  {
    id: "daisy_1",
    path: "flowers/daisy/100080576_f52e8ee070_n.jpg",
    class: "daisy",
    name: "Classic Daisy",
  },
  {
    id: "daisy_2",
    path: "flowers/daisy/10140303196_b88d3d6cec.jpg",
    class: "daisy",
    name: "Meadow Daisy",
  },
  {
    id: "dandelion_1",
    path: "flowers/dandelion/10043234166_e6dd915111_n.jpg",
    class: "dandelion",
    name: "Golden Dandelion",
  },
  {
    id: "dandelion_2",
    path: "flowers/dandelion/10200780773_c6051a7d71_n.jpg",
    class: "dandelion",
    name: "Dandelion Seed Puff",
  },
];

// Lazy-initialization of Gemini SDK client
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is not set");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Resolve project root reliably whether running from source (ts-node/tsx) or
// from the compiled dist/server bundle, and whether deployed on Render or
// as a Vercel serverless function (process.cwd() differs across these).
const PROJECT_ROOT = path.join(__dirname, "..");

// ---------------------------------------------------------
// API Routes
// ---------------------------------------------------------

// Health check — used by Render/uptime checks
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

// Get list of built-in demo images
app.get("/api/demo-images", (_req, res) => {
  res.json({ demos: DEMO_IMAGES });
});

// Image Prediction Endpoint
app.post("/api/predict", async (req, res) => {
  const { image, mimeType, demoId } = req.body;

  try {
    const hasApiKey = !!process.env.GEMINI_API_KEY;

    if (!hasApiKey && demoId) {
      const demo = DEMO_IMAGES.find((d) => d.id === demoId);
      if (demo) {
        console.log(`Missing API Key — using local prediction for demo image: ${demo.name}`);

        const predictedClass = demo.class;
        const allProbs: Record<string, number> = {
          daisy: 0.01,
          dandelion: 0.01,
          rose: 0.01,
          sunflower: 0.01,
          tulip: 0.01,
        };
        allProbs[predictedClass] = 0.96;

        return res.json({
          class_name: predictedClass,
          confidence: 0.96,
          all_probabilities: allProbs,
          isMock: true,
          warning: "Using local offline simulation. Set the GEMINI_API_KEY environment variable to enable real AI vision for custom photos!",
        });
      }
    }

    if (!hasApiKey) {
      return res.status(400).json({
        error: "GEMINI_API_KEY_MISSING",
        message: "GEMINI_API_KEY is not configured on the server. Add it as an environment variable in your hosting provider's dashboard.",
      });
    }

    let base64Data = image;
    let finalMimeType = mimeType || "image/jpeg";

    if (demoId && !image) {
      const demo = DEMO_IMAGES.find((d) => d.id === demoId);
      if (demo) {
        const filePath = path.join(PROJECT_ROOT, "public", demo.path);
        if (fs.existsSync(filePath)) {
          const fileBuffer = fs.readFileSync(filePath);
          base64Data = fileBuffer.toString("base64");
          finalMimeType = "image/jpeg";
        }
      }
    }

    if (!base64Data) {
      return res.status(400).json({
        error: "MISSING_IMAGE",
        message: "No image data or demo ID provided for prediction.",
      });
    }

    const ai = getGeminiClient();

    const imagePart = {
      inlineData: {
        mimeType: finalMimeType,
        data: base64Data,
      },
    };

    const promptPart = {
      text: `You are an expert botanist and flower species classification engine.
Analyze this flower image and classify it into exactly one of the following 5 categories: "daisy", "dandelion", "rose", "sunflower", "tulip".

If the image is not a flower or does not belong to any of these classes, still map it to the closest class but assign a low confidence.

Return a JSON object conforming to this schema:
{
  "class_name": "string (one of: daisy, dandelion, rose, sunflower, tulip)",
  "confidence": "number (a float between 0.0 and 1.0 representing your confidence level)",
  "all_probabilities": {
    "daisy": 0.0,
    "dandelion": 0.0,
    "rose": 0.0,
    "sunflower": 0.0,
    "tulip": 0.0
  }
}
Note: The sum of all_probabilities should equal 1.0 (or very close to it). Ensure you return valid JSON and nothing else.`,
    };

    console.log("Dispatching request to Gemini API...");
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [imagePart, promptPart],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            class_name: {
              type: Type.STRING,
              description: "The classified flower class, must be one of: daisy, dandelion, rose, sunflower, tulip",
            },
            confidence: {
              type: Type.NUMBER,
              description: "Confidence probability between 0.0 and 1.0",
            },
            all_probabilities: {
              type: Type.OBJECT,
              description: "Object mapping all 5 classes to their respective probabilities",
              properties: {
                daisy: { type: Type.NUMBER },
                dandelion: { type: Type.NUMBER },
                rose: { type: Type.NUMBER },
                sunflower: { type: Type.NUMBER },
                tulip: { type: Type.NUMBER },
              },
              required: ["daisy", "dandelion", "rose", "sunflower", "tulip"],
            },
          },
          required: ["class_name", "confidence", "all_probabilities"],
        },
      },
    });

    const textResponse = response.text;
    if (!textResponse) {
      throw new Error("No response text received from Gemini API");
    }

    const prediction = JSON.parse(textResponse.trim());
    res.json(prediction);
  } catch (error: any) {
    console.error("Prediction error:", error);
    res.status(500).json({
      error: "PREDICTION_FAILED",
      message: error.message || "An error occurred during classification.",
    });
  }
});

// Serve Flower facts dictionary directly so the UI is synchronized
app.get("/api/flower-facts", (_req, res) => {
  res.json({ facts: FLOWER_INFO, default: DEFAULT_INFO });
});

export default app;
