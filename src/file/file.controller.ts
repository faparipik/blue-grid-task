import { Request, Response } from "express";
import { fetchFiles } from "../filesServer/filesServer.service";
import cache from "../libs/cache/cache.service";

import { FILES_KEY } from "../libs/cache/cache.consts";
import { formatFileInTreeStructure } from "./file.service";
import { Files } from "./file.dto";

export const getFiles = async (_req: Request, res: Response) => {
  const cachedFiles: Files | undefined = cache.get(FILES_KEY);
  if (cachedFiles) {
    res.send(cachedFiles);
    return;
  }
  const response = await fetchFiles();
  const formatedResponse = formatFileInTreeStructure(response);

  cache.set(FILES_KEY, formatedResponse);
  res.status(200).json(formatedResponse);
};
