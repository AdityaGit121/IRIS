import app from "../server/app";

// Vercel's Node.js runtime treats a default-exported Express app as a
// standard (req, res) request handler — no app.listen() call needed here.
export default app;
