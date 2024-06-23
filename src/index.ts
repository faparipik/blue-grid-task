import express, { Request, Response } from "express";
import apiRoutes from "./api.routes";
import ErrorHandler from "./middleware/errorHandler";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api", apiRoutes);

app.get("/health", (_req: Request, res: Response) => {
  res.send("This server is fairly healthy.");
});

app.use(ErrorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
