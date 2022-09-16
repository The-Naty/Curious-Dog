import { NextFunction, Request, Response } from "express";

class IndexController {
  public index = (req: Request, res: Response, next: NextFunction): void => {
    res.status(200).send("Welcome to Ask Dog API!!");
  };
}

export default IndexController;
