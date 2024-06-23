import { ErrorRequestHandler, Request, Response } from "express";

interface ResponseError extends Error {
  status?: number;
}

const ErrorHandler: ErrorRequestHandler = (
  err: ResponseError,
  _req: Request,
  res: Response
) => {
  const errStatus = err?.status || 500;
  const errMsg = err.message || "Something went wrong";

  return res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: process.env.NODE_ENV === "development" ? err.stack : {},
  });
};

export default ErrorHandler;
