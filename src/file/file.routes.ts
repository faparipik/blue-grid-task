import { Router } from "express";
import { getFiles } from "./file.controller";

const router = Router();

router.get("/", getFiles);

export default router;
