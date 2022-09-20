import { NextFunction, Request, Response } from "express";

export interface IIndexController {
  index(req: Request, res: Response, next: NextFunction): void;
}
export class IndexController implements IIndexController {
  public index = (req: Request, res: Response, next: NextFunction): void => {
    res.status(200).send("Welcome to Ask Dog API!!");
  };
}
