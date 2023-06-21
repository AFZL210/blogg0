import { Request, Response, NextFunction } from "express";
import User from "../db/models/UserMode";
import { createError } from "../utils/createError";

export const getUserData = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;

  try {
    const isUser = await User.findById(userId);

    if (!isUser) return next(createError(404, "user not found"));

    const user = await User.findById(userId).populate('followers follows myPosts');

    return res.status(200).json(user);

  } catch (e) {
    next(createError(404, "user not found or error"))
  }
}

export const followUser = async (req: Request, res: Response, next: NextFunction) => {
  try {

  } catch (e) {

  }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {

  } catch (e) {

  }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {

  } catch (e) {

  }
}