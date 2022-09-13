import { Request, Response, NextFunction } from "express";

const errorHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(500).json({ msg: "Serever Internal Error!" });
};

export default errorHandlerMiddleware;
