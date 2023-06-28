"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyJWT_1 = require("../middleware/verifyJWT");
const user_controller_1 = require("../controller/user_controller");
const router = express_1.default.Router();
router.get("/user-data/:userId", user_controller_1.getUserData);
router.patch("/user-update/:userId", verifyJWT_1.verifyToken, user_controller_1.updateUser);
router.post("/user-follow/:userId/:followId", verifyJWT_1.verifyToken, user_controller_1.followUser);
router.post("/user-delete/:userId", verifyJWT_1.verifyToken, user_controller_1.deleteUser);
exports.default = router;
