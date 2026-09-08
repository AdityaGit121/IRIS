import { GoogleGenAI, Type } from "@google/genai";

async function downloadExternalImage(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download image from ${url}`);
  }
  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer).toString("base64");
}

export default async function handler(req: any, res: any) {
  res.setHeader("Content-Type", "application/json");

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { image, sampleId, customApiKey } = req.body || {};
    const headerKey = req.headers?.['x-gemini-api-key'] as string | undefined;
    const defaultApiKey = process.env.GEMINI_API_KEY;

    const effectiveApiKey = (customApiKey || headerKey || defaultApiKey || "")
      .toString()
      .trim()
      .replace(/[\r\n\t "']/g, "");

    let base64Data = "";
    let mimeType = "image/jpeg";

    if (image) {
      if (typeof image === "string" && (image.startsWith("http://") || image.startsWith("https://"))) {
        base64Data = await downloadExternalImage(image);
        mimeType = image.includes(".png") ? "image/png" : "image/jpeg";
      } else {
        const match = typeof image === "string" ? image.match(/^data:(image\/\w+);base64,(.+)$/) : null;
        if (match) {
          mimeType = match[1];
          base64Data = match[2];
        } else {
          base64Data = image;
        }
      }
    } else {
      return res.status(400).json({ isFlower: false, error: "No image data provided" });
    }

    if (!base64Data) {
      return res.status(400).json({ isFlower: false, error: "Empty image data obtained. Please choose a valid image file." });
    }

    if (!effectiveApiKey) {
      return res.status(400).json({
        isFlower: false,
        error: "No Gemini API Key provided. Please open the 'API Key Input' dropdown at the top to enter your individual Gemini API Key."
      });
    }

    const ai = new GoogleGenAI({
      apiKey: effectiveApiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    const imagePart = {
      inlineData: {
        mimeType,
        data: base64Data,
      },
    };

    const promptPart = {
      text: `You are a world-class botanical AI expert and taxonomist.
Your task is to identify the exact flower or plant species in the provided image with maximum botanical precision (up to 99.9% accuracy), drawing upon global internet botanical knowledge covering 400,000+ species.
If the image does not show a flower, plant, or botanical element, set isFlower to false and specify the issue in the error field.
If it is a flower or plant:
1. Set isFlower to true.
2. Set 'class' to the most accurate common name of the flower species (e.g., Orchid, Lily, Hibiscus, Lavender, Lotus, Iris, Bluebell, Bird of Paradise, Rose, Sunflower, Tulip, Bougainvillea).
3. Provide the official scientific botanical name (e.g., 'Nelumbo nucifera', 'Passiflora caerulea').
4. Specify the botanical family (e.g., 'Orchidaceae', 'Asteraceae', 'Fabaceae').
5. Specify the native geographical region or primary habitat.
6. Provide a clear shiftReason explaining why Cloud AI was leveraged for this image.
7. Write an extremely rich, elegant 2-3 sentence botanical description of this species.
8. Provide a fascinating, unique fun fact.
9. Provide 3 highly practical care instructions.
10. For confidenceScores, calculate a realistic probability distribution (top 5 species/cultivars, summing to 100%).`,
    };

    const candidateModels = [
      "gemini-2.5-flash",
      "gemini-3.8-flash",
      "gemini-2.0-flash",
      "gemini-1.5-flash",
      "gemini-flash-latest",
      "gemini-3.1-flash-lite",
      "gemini-3.6-flash"
    ];

    let lastError: any = null;
    let response: any = null;

    for (const modelName of candidateModels) {
      try {
        response = await ai.models.generateContent({
          model: modelName,
          contents: { parts: [imagePart, promptPart] },
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                isFlower: { type: Type.BOOLEAN },
                class: { type: Type.STRING },
                confidence: { type: Type.NUMBER },
                confidenceScores: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      class: { type: Type.STRING },
                      confidence: { type: Type.NUMBER }
                    },
                    required: ["class", "confidence"]
                  }
                },
                scientificName: { type: Type.STRING },
                botanicalFamily: { type: Type.STRING },
                nativeRegion: { type: Type.STRING },
                shiftReason: { type: Type.STRING },
                description: { type: Type.STRING },
                funFact: { type: Type.STRING },
                careInstructions: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                error: { type: Type.STRING }
              },
              required: ["isFlower", "class", "confidence", "confidenceScores", "scientificName", "description", "funFact", "careInstructions"]
            }
          }
        });

        if (response && response.text) {
          break;
        }
      } catch (err: any) {
        lastError = err;
      }
    }

    if (!response || !response.text) {
      throw lastError || new Error("Cloud AI models were temporarily unable to process the image.");
    }

    const resultJson = JSON.parse(response.text);
    return res.status(200).json(resultJson);

  } catch (error: any) {
    let cleanMsg = error?.message || "An error occurred during Cloud AI classification.";
    if (cleanMsg.includes("429") || cleanMsg.includes("RESOURCE_EXHAUSTED") || cleanMsg.includes("quota")) {
      cleanMsg = "Cloud AI API request limit temporarily reached on the free tier. Please wait a moment and try again.";
    }
    return res.status(200).json({
      isFlower: false,
      error: cleanMsg
    });
  }
}
