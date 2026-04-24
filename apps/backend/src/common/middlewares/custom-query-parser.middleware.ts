import type { NextFunction, Request, Response } from "express";
import { trimQuery } from "../helper/utility";

export const customQueryParser = (req: Request, _res: Response, next: NextFunction) => {
  req.query = trimQuery(req.query);

  next();
};
