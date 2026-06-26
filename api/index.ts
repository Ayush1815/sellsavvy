export default async function (req, res) {
  try {
    const module = await import('../server/index.ts');
    const app = module.default;
    return app(req, res);
  } catch (err) {
    res.status(500).json({
      error: "Vercel Crash Debug",
      message: err.message,
      stack: err.stack
    });
  }
}
