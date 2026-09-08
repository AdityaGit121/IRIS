import { FLOWER_DATASET, FlowerDetail } from "../flowerDataset";
import { ConfidenceScore } from "../types";

export interface VisualFingerprint {
  dominantHue: number;
  saturation: number;
  brightness: number;
  hasContrastingCenter: boolean;
  greenFoliageRatio: number;
  colorSignature: number[]; // 16-element sampled color profile
}

export interface LearnedSpecies {
  id: string;
  key: string;
  commonName: string;
  scientificName: string;
  botanicalFamily: string;
  nativeRegion: string;
  description: string;
  funFact: string;
  careInstructions: string[];
  aliases: string[];
  learnedAt: number;
  learnedFrom: "Cloud AI Multimodal Model (Gemini Vision)";
  sampleThumbnail?: string;
  visualFingerprint?: VisualFingerprint;
  keywords: string[];
}

const STORAGE_KEY = "iris_bloom_learned_species_v2";

/**
 * Retrieve all learned species from persistent browser storage.
 */
export function getLearnedSpecies(): LearnedSpecies[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.warn("Failed to load learned species from localStorage:", err);
    return [];
  }
}

/**
 * Save a newly discovered species from Cloud AI to local memory.
 * Updates the local dataset so future scans can be identified on-device.
 */
export function saveLearnedSpecies(data: {
  commonName: string;
  scientificName: string;
  botanicalFamily?: string;
  nativeRegion?: string;
  description: string;
  funFact: string;
  careInstructions: string[];
  sampleThumbnail?: string;
  visualFingerprint?: VisualFingerprint;
}): LearnedSpecies {
  const existing = getLearnedSpecies();
  const normalizedKey = data.commonName.toLowerCase().trim();

  // Filter out any older duplicate with same key to update with fresher data
  const filtered = existing.filter(
    (item) => item.key !== normalizedKey && item.commonName.toLowerCase() !== normalizedKey
  );

  const newEntry: LearnedSpecies = {
    id: `learned_${normalizedKey.replace(/[^a-z0-9]/g, "_")}_${Date.now()}`,
    key: normalizedKey,
    commonName: data.commonName,
    scientificName: data.scientificName || "Botanical specimen",
    botanicalFamily: data.botanicalFamily || "Angiosperms",
    nativeRegion: data.nativeRegion || "Global / Cultivated",
    description: data.description,
    funFact: data.funFact,
    careInstructions: data.careInstructions || [
      "Ensure moderate sunlight and well-draining soil.",
      "Water when topsoil feels dry to the touch.",
      "Maintain comfortable room or garden temperature."
    ],
    aliases: [
      normalizedKey,
      data.scientificName.toLowerCase(),
      `${normalizedKey} plant`,
      `${normalizedKey} flower`
    ],
    learnedAt: Date.now(),
    learnedFrom: "Cloud AI Multimodal Model (Gemini Vision)",
    sampleThumbnail: data.sampleThumbnail,
    visualFingerprint: data.visualFingerprint,
    keywords: [
      normalizedKey,
      (data.botanicalFamily || "").toLowerCase(),
      (data.scientificName || "").toLowerCase()
    ]
  };

  const updated = [newEntry, ...filtered];
  try {
    // Keep max 50 learned items to stay well within localStorage size limits
    const trimmed = updated.slice(0, 50);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch (err) {
    console.warn("Could not save learned species to localStorage:", err);
  }

  return newEntry;
}

/**
 * Delete a specific learned species from local memory.
 */
export function deleteLearnedSpecies(id: string): void {
  try {
    const existing = getLearnedSpecies();
    const updated = existing.filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn("Could not delete learned species:", err);
  }
}

/**
 * Clear all learned species from local memory.
 */
export function clearAllLearnedSpecies(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.warn("Could not clear learned species:", err);
  }
}

/**
 * Build a combined botanical dataset containing both standard 106 built-in species
 * AND all user-learned species from Cloud AI.
 */
export function getCombinedBotanicalDataset(): Record<string, FlowerDetail> {
  const combined: Record<string, FlowerDetail> = { ...FLOWER_DATASET };
  const learnedList = getLearnedSpecies();

  for (const learned of learnedList) {
    combined[learned.key] = {
      scientificName: learned.scientificName,
      botanicalFamily: learned.botanicalFamily,
      nativeRegion: learned.nativeRegion,
      description: learned.description,
      funFact: learned.funFact,
      careInstructions: learned.careInstructions,
      aliases: learned.aliases
    };
  }

  return combined;
}

/**
 * Fast visual fingerprint extractor for on-device continual learning comparison.
 */
export async function extractImageFingerprint(
  imgElement: HTMLImageElement
): Promise<VisualFingerprint | undefined> {
  try {
    const width = 32;
    const height = 32;
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return undefined;

    ctx.drawImage(imgElement, 0, 0, width, height);
    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;

    let totalH = 0;
    let totalS = 0;
    let totalV = 0;
    let floralCount = 0;
    let foliageCount = 0;

    const colorSignature: number[] = [];

    for (let i = 0; i < 16; i++) {
      // Sample 16 spatial quadrant cells
      const px = Math.floor((i % 4) * (width / 4) + width / 8);
      const py = Math.floor(Math.floor(i / 4) * (height / 4) + height / 8);
      const idx = (py * width + px) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      // Compute simple luminance/hue code
      const avg = Math.round((r * 0.299 + g * 0.587 + b * 0.114));
      colorSignature.push(avg);
    }

    for (let i = 0; i < data.length; i += 8) {
      const r = data[i] / 255;
      const g = data[i + 1] / 255;
      const b = data[i + 2] / 255;

      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const diff = max - min;
      let h = 0;
      const s = max === 0 ? 0 : diff / max;
      const v = max;

      if (diff !== 0) {
        if (max === r) h = ((g - b) / diff) % 6;
        else if (max === g) h = (b - r) / diff + 2;
        else h = (r - g) / diff + 4;
        h = Math.round(h * 60);
        if (h < 0) h += 360;
      }

      if (h >= 75 && h <= 155 && s > 0.2) {
        foliageCount++;
      } else if (s > 0.15 && v > 0.15) {
        totalH += h;
        totalS += s;
        totalV += v;
        floralCount++;
      }
    }

    const totalSampled = data.length / 8;
    const avgH = floralCount > 0 ? Math.round(totalH / floralCount) : 45;
    const avgS = floralCount > 0 ? Math.round((totalS / floralCount) * 100) : 50;
    const avgV = floralCount > 0 ? Math.round((totalV / floralCount) * 100) : 60;
    const foliageRatio = Math.round((foliageCount / totalSampled) * 100);

    return {
      dominantHue: avgH,
      saturation: avgS,
      brightness: avgV,
      hasContrastingCenter: false,
      greenFoliageRatio: foliageRatio,
      colorSignature
    };
  } catch (e) {
    console.warn("Fingerprint extraction note:", e);
    return undefined;
  }
}

/**
 * Match an input image's visual traits against all learned species stored in local memory.
 */
export function matchLearnedSpecies(
  fingerprint: VisualFingerprint | undefined,
  mobileNetPreds: Array<{ className: string; probability: number }> = []
): { matched: LearnedSpecies; confidence: number } | null {
  const learnedList = getLearnedSpecies();
  if (learnedList.length === 0) return null;

  let bestMatch: LearnedSpecies | null = null;
  let bestScore = 0;

  for (const item of learnedList) {
    let score = 0;

    // 1. MobileNet alias or keyword matching
    if (mobileNetPreds && mobileNetPreds.length > 0) {
      for (const pred of mobileNetPreds) {
        const pName = pred.className.toLowerCase();
        const matches = item.aliases.some(
          (a) => pName.includes(a.toLowerCase()) || a.toLowerCase().includes(pName)
        );
        if (matches) {
          score += pred.probability * 70;
        }
      }
    }

    // 2. Visual fingerprint spatial & chromatic proximity
    if (fingerprint && item.visualFingerprint) {
      const hueDiff = Math.abs(fingerprint.dominantHue - item.visualFingerprint.dominantHue) % 360;
      const normalizedHueDiff = hueDiff > 180 ? 360 - hueDiff : hueDiff;
      if (normalizedHueDiff < 35) {
        score += Math.max(0, 30 * (1 - normalizedHueDiff / 35));
      }

      // Saturation & Foliage similarity
      const satDiff = Math.abs(fingerprint.saturation - item.visualFingerprint.saturation);
      if (satDiff < 30) score += 10;

      // Color signature correlation
      if (fingerprint.colorSignature && item.visualFingerprint.colorSignature) {
        let diffSum = 0;
        for (let i = 0; i < 16; i++) {
          diffSum += Math.abs(
            (fingerprint.colorSignature[i] || 0) - (item.visualFingerprint.colorSignature[i] || 0)
          );
        }
        const avgSignatureDiff = diffSum / 16;
        if (avgSignatureDiff < 40) {
          score += 25 * (1 - avgSignatureDiff / 40);
        }
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestMatch = item;
    }
  }

  if (bestMatch && bestScore >= 25) {
    const calibratedConfidence = Math.min(98, Math.round(55 + bestScore * 0.45));
    return {
      matched: bestMatch,
      confidence: calibratedConfidence
    };
  }

  return null;
}
