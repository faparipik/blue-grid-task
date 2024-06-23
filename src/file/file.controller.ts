import { Request, Response } from "express";
import { fetchFiles } from "../filesServer/filesServer.service";

export const getFiles = async (_req: Request, res: Response) => {
  const response = await fetchFiles();
  res.status(200).json(response);
};
