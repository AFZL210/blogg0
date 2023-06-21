import express from "express";
import { verifyToken } from "../middleware/verifyJWT";
const router = express.Router();
import { getAllPosts, newPost, deletePost } from "../controller/post_controller";

router.get("/", getAllPosts);
router.post("/new-post/:userId", verifyToken, newPost);
router.delete("/delete-post/:userId/:postId", verifyToken, deletePost);

export default router;