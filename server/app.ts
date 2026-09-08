import express from "express";
import path from "path";
import fs from "fs";
import { GoogleGenAI, Type } from "@google/genai";

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({
  apiKey: apiKey || "",
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

const app = express();

// Increase JSON limit to support base64 image uploads
app.use(express.json({ limit: "15mb" }));

// Curator of sample images (demonstrating both Trained ML dataset matches and Cloud AI shifts)
const SAMPLES = [
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
  }
];

// 1. Healthcheck Route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", apiReady: !!apiKey });
});

// 2. Fetch Sample Images
app.get("/api/samples", (req, res) => {
  res.json(SAMPLES);
});

// Helper to download external image as base64 for Gemini
async function downloadExternalImage(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download image from ${url}`);
  }
  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer).toString("base64");
}

// 3. Flower Detection Route using Gemini multimodal model
app.post("/api/detect", async (req, res) => {
  try {
    const { image, sampleId } = req.body;

    let base64Data = "";
    let mimeType = "image/jpeg";

    if (sampleId) {
      // Find the selected sample
      const sample = SAMPLES.find(s => s.id === sampleId);
      if (!sample) {
        return res.status(404).json({ error: "Sample image not found" });
      }

      if (sample.isLocal) {
        // Read file from public folder
        const localPath = path.join(process.cwd(), "public", sample.path);
        if (fs.existsSync(localPath)) {
          const fileBuffer = fs.readFileSync(localPath);
          base64Data = fileBuffer.toString("base64");
          mimeType = sample.path.endsWith(".png") ? "image/png" : "image/jpeg";
        } else {
          return res.status(404).json({ error: `Local sample file does not exist at ${localPath}` });
        }
      } else {
        // Download external sample
        base64Data = await downloadExternalImage(sample.path);
      }
    } else if (image) {
      // Extract base64 and mimeType from user dataUrl e.g. "data:image/png;base64,..."
      const match = image.match(/^data:(image\/\w+);base64,(.+)$/);
      if (match) {
        mimeType = match[1];
        base64Data = match[2];
      } else {
        // Assume direct base64
        base64Data = image;
      }
    } else {
      return res.status(400).json({ error: "No image data or sample ID provided" });
    }

    if (!base64Data) {
      return res.status(400).json({ error: "Empty image data obtained" });
    }

    if (!apiKey) {
      return res.status(503).json({
        error: "Gemini API key is not configured in the AI Studio platform yet. Please check your Settings > Secrets panel."
      });
    }

    // Call Gemini API with Structured Schema and automatic fallback model retry mechanism
    const imagePart = {
      inlineData: {
        mimeType,
        data: base64Data,
      },
    };

    const promptPart = {
      text: `You are a world-class botanical AI expert and taxonomist. The user's application attempted to identify this flower using an on-device trained ML model, but shifted to you (Cloud AI Vision) because the image was unclear, complex, or the flower species was not in the local trained dataset.
Your task is to identify the exact flower or plant species in the provided image with maximum botanical precision (up to 99.9% accuracy), drawing upon global internet botanical knowledge covering 400,000+ species.
If the image does not show a flower, plant, or botanical element, set isFlower to false and specify the issue in the error field.
If it is a flower or plant:
1. Set isFlower to true.
2. Set 'class' to the most accurate common name of the flower species (e.g., Orchid, Lily, Hibiscus, Lavender, Lotus, Iris, Bluebell, Bird of Paradise, etc.).
3. Provide the official scientific botanical name (e.g., 'Nelumbo nucifera', 'Passiflora caerulea').
4. Specify the botanical family (e.g., 'Orchidaceae', 'Asteraceae', 'Fabaceae').
5. Specify the native geographical region or primary habitat.
6. Provide a clear shiftReason explaining why Cloud AI was leveraged for this image (e.g., "Specimen is outside local offline trained dataset", "Complex floral angle and petal occlusion resolved via multimodal vision", or "Sub-species requires internet-scale taxonomic resolution").
7. Write an extremely rich, elegant 3-4 sentence botanical description of this species.
8. Provide a fascinating, unique fun fact.
9. Provide 3 highly practical care instructions.
10. For confidenceScores, calculate a realistic probability distribution (summing to exactly 100%) for the top 5 most closely related or visually similar botanical species/cultivars based on the image's features. The winning class must match the 'class' field and have the highest confidence score.`,
    };

    const candidateModels = ["gemini-3.5-flash", "gemini-3.8-flash", "gemini-3.6-flash", "gemini-3.1-flash-lite", "gemini-flash-latest"];
    let lastError: any = null;
    let response: any = null;

    for (const modelName of candidateModels) {
      for (let attempt = 1; attempt <= 2; attempt++) {
        try {
          console.log(`Attempting classification with model: ${modelName} (Attempt ${attempt}/2)`);
          response = await ai.models.generateContent({
            model: modelName,
            contents: { parts: [imagePart, promptPart] },
            config: {
              responseMimeType: "application/json",
              responseSchema: {
                type: Type.OBJECT,
                properties: {
                  isFlower: {
                    type: Type.BOOLEAN,
                    description: "Whether the image is verified as a flower or plant."
                  },
                  class: {
                    type: Type.STRING,
                    description: "Identified flower common name. Can be any plant/flower species in the world (e.g., Orchid, Lavender, Lotus, Lily, Iris, Hibiscus, Rose, Tulip)."
                  },
                  confidence: {
                    type: Type.NUMBER,
                    description: "Confidence percentage (0 to 100) of the identified class."
                  },
                  confidenceScores: {
                    type: Type.ARRAY,
                    description: "Confidence scores for the top 5 visual matches or related species, summing up to exactly 100%.",
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        class: { type: Type.STRING },
                        confidence: { type: Type.NUMBER }
                      },
                      required: ["class", "confidence"]
                    }
                  },
                  scientificName: {
                    type: Type.STRING,
                    description: "Scientific botanical name."
                  },
                  botanicalFamily: {
                    type: Type.STRING,
                    description: "Botanical family name (e.g., Asteraceae, Rosaceae, Orchidaceae)."
                  },
                  nativeRegion: {
                    type: Type.STRING,
                    description: "Native geographical region or primary habitat."
                  },
                  shiftReason: {
                    type: Type.STRING,
                    description: "Brief reason explaining why Cloud AI was leveraged for this image."
                  },
                  description: {
                    type: Type.STRING,
                    description: "A rich, elegant 2-3 sentence botanical description of this flower species."
                  },
                  funFact: {
                    type: Type.STRING,
                    description: "An interesting and unique fun fact about this specific flower."
                  },
                  careInstructions: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "3 concise care guidelines (e.g. Watering, Sunlight, Soil)."
                  },
                  error: {
                    type: Type.STRING,
                    description: "Error message explaining why identification is not possible or why it is not a flower."
                  }
                },
                required: ["isFlower", "class", "confidence", "confidenceScores", "scientificName", "description", "funFact", "careInstructions"]
              }
            }
          });

          if (response && response.text) {
            console.log(`Successfully completed classification using model: ${modelName} on attempt ${attempt}`);
            break;
          }
        } catch (err: any) {
          const errMsg = err?.message || String(err);
          console.warn(`Model ${modelName} failed on attempt ${attempt}:`, errMsg);
          lastError = err;

          // If the error indicates a 404/not found/no longer available, don't retry this model candidate
          if (errMsg.includes("404") || errMsg.includes("NOT_FOUND") || errMsg.includes("no longer available")) {
            break;
          }

          // If we have another attempt, sleep for a short duration
          if (attempt < 2) {
            await new Promise((resolve) => setTimeout(resolve, 800));
          }
        }
      }

      if (response && response.text) {
        break; // Successfully got a response, exit the candidate loop
      }
    }

    if (!response || !response.text) {
      throw lastError || new Error("All candidate models failed to generate a response");
    }

    const resultText = response.text;
    const resultJson = JSON.parse(resultText);
    res.json(resultJson);

  } catch (error: any) {
    console.error("Classification error:", error);
    res.status(500).json({
      error: "An error occurred during classification. Please make sure the image is valid and the API key is active.",
      details: error.message || error
    });
  }
});

export default app;
