"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyJWT_1 = require("../middleware/verifyJWT");
const router = express_1.default.Router();
const post_controller_1 = require("../controller/post_controller");
router.get("/", post_controller_1.getAllPosts);
router.post("/new-post/:userId", verifyJWT_1.verifyToken, post_controller_1.newPost);
router.post("/like-post/:userId/:postId", verifyJWT_1.verifyToken, post_controller_1.likePost);
router.patch("/edit-post/:userId/:postId", verifyJWT_1.verifyToken, post_controller_1.editPost);
router.get("/get-post/:postId", post_controller_1.getPost);
router.delete("/delete-post/:userId/:postId", verifyJWT_1.verifyToken, post_controller_1.deletePost);
exports.default = router;
