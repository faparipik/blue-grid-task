import express, { Request, Response } from "express";

const app = express();

const PORT = process.env.PORT || 5002;

app.get("/health", (_req: Request, res: Response) => {
  res.send("This server is fairly healthy.");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
