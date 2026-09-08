export default function handler(req: any, res: any) {
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

  res.setHeader("Content-Type", "application/json");
  return res.status(200).json(SAMPLES);
}
