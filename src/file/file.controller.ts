import { Request, Response } from "express";

export const getFiles = (_req: Request, res: Response) => {
  res.status(200).json({ test: "TEst" });
};
