"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.followUser = exports.getUserData = void 0;
const UserModel_1 = __importDefault(require("../db/models/UserModel"));
const createError_1 = require("../utils/createError");
const mongoose_1 = __importDefault(require("mongoose"));
const getUserData = async (req, res, next) => {
    const userId = req.params.userId;
    try {
        const isUser = await UserModel_1.default.findById(userId);
        if (!isUser)
            return next((0, createError_1.createError)(404, "user not found"));
        const user = await UserModel_1.default.findById(userId).populate('followers follows myPosts');
        return res.status(200).json(user);
    }
    catch (e) {
        next((0, createError_1.createError)(404, "user not found or error"));
    }
};
exports.getUserData = getUserData;
const followUser = async (req, res, next) => {
    const userId = new mongoose_1.default.Types.ObjectId(req.params.userId);
    const followId = new mongoose_1.default.Types.ObjectId(req.params.followId);
    try {
        const user = await UserModel_1.default.findById(userId);
        const isFollow = user?.follows.includes(followId);
        if (isFollow) {
            await UserModel_1.default.findByIdAndUpdate(userId, { $pull: { follows: followId } }, { new: false });
            await UserModel_1.default.findByIdAndUpdate(followId, { $pull: { followers: userId } }, { new: false });
            return res.status(200).json({ msg: "unfollowed user" });
        }
        else {
            await UserModel_1.default.findByIdAndUpdate(userId, { $push: { follows: followId } }, { new: false });
            await UserModel_1.default.findByIdAndUpdate(followId, { $push: { followers: userId } }, { new: false });
            return res.status(200).json({ msg: "followed user" });
        }
    }
    catch (e) {
        return next((0, createError_1.createError)(403, "error following user"));
    }
};
exports.followUser = followUser;
const updateUser = async (req, res, next) => {
    const userId = req.params.userId;
    const newData = req.body;
    try {
        await UserModel_1.default.findByIdAndUpdate(userId, newData, { new: false });
        return res.status(200).json({ msg: "updated user data" });
    }
    catch (e) {
        return next((0, createError_1.createError)(403, "error updating user"));
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res, next) => {
    const userId = req.params.userId;
    try {
        await UserModel_1.default.findByIdAndDelete(userId);
        return res.status(200).json({ msg: "delted user" });
    }
    catch (e) {
        return next((0, createError_1.createError)(403, "error deleting user"));
    }
};
exports.deleteUser = deleteUser;
