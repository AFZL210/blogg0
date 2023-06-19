import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "";
import { createError } from "../utils/createError";

interface AuthRequest extends Request {
    userId: string;
}

export const verifyToken = (req: any | AuthRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    if (!token) return next(createError(403, "you are not authenticated"));

    else {
        jwt.verify(token, JWT_SECRET, (err: any, payload: any) => {
            if (payload === undefined) return next(createError(403, "invalid token"));
            if (err) return next(createError(403, "invalid token"));

            req.userId = payload._id || "";
            next();
        })
    }
}