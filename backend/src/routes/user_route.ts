import express from "express";
import { verifyToken } from "../middleware/verifyJWT";
import { getUserData } from "../controller/user_controller";
const router = express.Router();

router.get("/", verifyToken, getUserData)

export default router;