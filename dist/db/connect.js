"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const uri = process.env.MONGO_URI || "";
const connectDB = () => {
    mongoose_1.default.set('strictQuery', true);
    mongoose_1.default.connect(uri).then(() => console.log("connected to DB"));
};
exports.connectDB = connectDB;
