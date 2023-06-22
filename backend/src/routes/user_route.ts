import express from "express";
import { verifyToken } from "../middleware/verifyJWT";
import { deleteUser, followUser, getUserData, updateUser } from "../controller/user_controller";
const router = express.Router();

router.get("/user-data/:userId", getUserData);
router.patch("/user-update/:userId", verifyToken, updateUser);
router.post("/user-follow/:userId/:followId", verifyToken, followUser);
router.post("/user-delete/:userId", verifyToken, deleteUser);

export default router;