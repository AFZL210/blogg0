"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "";
const createError_1 = require("../utils/createError");
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token || token.length === 0)
        return next((0, createError_1.createError)(403, "you are not authenticated"));
    else {
        jsonwebtoken_1.default.verify(token, JWT_SECRET, (err, payload) => {
            if (payload === undefined)
                return next((0, createError_1.createError)(403, "invalid token"));
            if (err)
                return next((0, createError_1.createError)(403, "invalid token"));
            if (payload._id !== req.params.userId)
                return next((0, createError_1.createError)(403, "invalid token"));
            next();
        });
    }
};
exports.verifyToken = verifyToken;
