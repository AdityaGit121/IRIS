import express from "express";
import path from "path";
import apiApp from "./app";

const rootApp = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Mount all /api/* routes (health, demo-images, predict, flower-facts)
rootApp.use(apiApp);

async function start() {
  if (process.env.NODE_ENV !== "production") {
    // Dev mode: Vite middleware handles the React app + HMR.
    // /public (including /public/flowers) is served automatically by Vite.
    // Dynamically imported so `vite` is never required at runtime in the
    // production bundle (it's a devDependency only).
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      root: path.join(__dirname, ".."),
      server: { middlewareMode: true },
      appType: "spa",
    });
    rootApp.use(vite.middlewares);
  } else {
    // Production: serve the Vite build output (includes copied /public assets,
    // e.g. dist/flowers/...).
    const distPath = path.join(__dirname, "..", "dist");
    rootApp.use(express.static(distPath));
    rootApp.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  rootApp.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

start();
