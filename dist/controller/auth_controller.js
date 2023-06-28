"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.loginUser = exports.registerUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserModel_1 = __importDefault(require("../db/models/UserModel"));
const createError_1 = require("../utils/createError");
const registerUser = async (req, res, next) => {
    try {
        const UserData = req.body;
        const checkUser1 = await UserModel_1.default.findOne({ username: UserData.username });
        const checkUser2 = await UserModel_1.default.findOne({ email: UserData.email });
        if (checkUser1 || checkUser2)
            next((0, createError_1.createError)(409, "try a different username or email"));
        else {
            const hashedPassword = bcrypt_1.default.hashSync(UserData.password, 10);
            UserData.password = hashedPassword;
            const newUser = UserModel_1.default.create(UserData);
            (await newUser).save();
            next((0, createError_1.createError)(200, "created account succesfully"));
        }
    }
    catch (e) {
        return next(e);
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await UserModel_1.default.findOne({ username });
        if (!user)
            return next((0, createError_1.createError)(404, "User not found"));
        const checkPassword = bcrypt_1.default.compareSync(password, user.password);
        if (!checkPassword)
            return next((0, createError_1.createError)(401, "wrong password"));
        const { name, username: userName, email, _id } = user;
        const resData = {
            name, username: userName, email, _id, token: ""
        };
        const token = jsonwebtoken_1.default.sign({
            _id: user._id,
        }, process.env.JWT_SECRET || "were-is-my-secret", { expiresIn: '740h' });
        return res.cookie("token", token, {
            httpOnly: true
        }).status(200).json({ ...resData, token: token });
    }
    catch (e) {
        return next(e);
    }
};
exports.loginUser = loginUser;
const logout = async (req, res) => {
    res.clearCookie("token").json({ msg: "user logged out" }).status(200);
};
exports.logout = logout;
