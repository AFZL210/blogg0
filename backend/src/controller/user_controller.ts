import { Request, Response, NextFunction } from "express";
import User from "../db/models/UserMode";
import { createError } from "../utils/createError";

export const getUserData = async (req: Request, res: Response) => {
  res.send(req.params);
}
