export default function handler(req: any, res: any) {
  const defaultApiKey = process.env.GEMINI_API_KEY;
  res.setHeader("Content-Type", "application/json");
  return res.status(200).json({
    status: "ok",
    apiReady: !!defaultApiKey,
    defaultApiReady: !!defaultApiKey,
    environment: "vercel-serverless"
  });
}
