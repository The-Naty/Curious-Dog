import { Request, Response, NextFunction } from "express";

const errorHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(500).json({ msg: "Internal Server Error" });
};

export default errorHandlerMiddleware;
