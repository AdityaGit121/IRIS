import { GoogleGenAI } from "@google/genai";

export default async function handler(req: any, res: any) {
  res.setHeader("Content-Type", "application/json");

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const rawKey = req.body?.apiKey || req.headers?.['x-gemini-api-key'] || "";
    const keyToTest = String(rawKey).trim().replace(/[\r\n\t "']/g, "");

    if (!keyToTest) {
      return res.status(200).json({ valid: false, error: "API Key is empty. Please enter your Gemini API Key." });
    }

    if (keyToTest.length < 20) {
      return res.status(200).json({ valid: false, error: "Key appears too short. Google Gemini API keys usually start with 'AIzaSy' (39 characters)." });
    }

    const testAi = new GoogleGenAI({
      apiKey: keyToTest,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    const candidateModels = [
      "gemini-2.5-flash",
      "gemini-3.8-flash",
      "gemini-2.0-flash",
      "gemini-1.5-flash",
      "gemini-flash-latest",
      "gemini-3.1-flash-lite",
      "gemini-3.6-flash"
    ];

    let success = false;
    let warningMsg: string | undefined = undefined;
    let lastErrStr = "";

    for (const modelName of candidateModels) {
      try {
        const testCall = testAi.models.generateContent({
          model: modelName,
          contents: "Hello",
        });

        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Verification timeout")), 6000)
        );

        const testResp: any = await Promise.race([testCall, timeoutPromise]);
        if (testResp && (testResp.text || testResp.candidates)) {
          success = true;
          break;
        }
      } catch (e: any) {
        lastErrStr = e?.message || String(e);
        if (lastErrStr.includes("RESOURCE_EXHAUSTED") || lastErrStr.includes("429") || lastErrStr.includes("quota")) {
          success = true;
          warningMsg = "Key is valid & authenticated (rate-limited on free tier). Ready for botanical detections!";
          break;
        }
        if (lastErrStr.includes("API_KEY_INVALID") || lastErrStr.includes("400") || lastErrStr.includes("PERMISSION_DENIED")) {
          break;
        }
      }
    }

    if (success) {
      return res.status(200).json({
        valid: true,
        message: warningMsg || "Gemini API Key is authentic and verified with Google AI!",
        warning: warningMsg
      });
    }

    let userFriendly = "Google Gemini rejected this key. Please verify that your API key is active in Google AI Studio.";
    if (lastErrStr.includes("API_KEY_INVALID") || lastErrStr.includes("400")) {
      userFriendly = "Invalid Gemini API Key. Please copy your key directly from Google AI Studio.";
    } else if (lastErrStr.includes("PERMISSION_DENIED") || lastErrStr.includes("403")) {
      userFriendly = "Permission denied. Ensure the Generative Language API is enabled for this project.";
    }

    return res.status(200).json({ valid: false, error: userFriendly });
  } catch (err: any) {
    return res.status(200).json({
      valid: false,
      error: "Unable to reach Google Gemini authentication service. Please check your internet connection."
    });
  }
}
