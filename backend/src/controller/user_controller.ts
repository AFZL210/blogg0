import { Request, Response, NextFunction } from "express";
import User from "../db/models/UserMode";
import { createError } from "../utils/createError";

interface AuthRequest extends Request {
  userId: string;
}

export const getUserData = async (req: any | AuthRequest, res: Response) => {
  res.send(req.userId);
}