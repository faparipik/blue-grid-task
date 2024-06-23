import { Request, Response } from "express";
import { fetchFiles } from "../filesServer/filesServer.service";
import cache from "../cache/cache.service";
import FILES_KEY from "../cache/cache.consts";
export const getFiles = async (_req: Request, res: Response) => {
  const cachedFiles = cache.get(FILES_KEY);
  if (cachedFiles) {
    res.send(cachedFiles);
    return;
  }
  const response = await fetchFiles();
  cache.set(FILES_KEY, response);
  res.status(200).json(response);
};
