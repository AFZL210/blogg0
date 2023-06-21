import express from "express";
import { verifyToken } from "../middleware/verifyJWT";
import { getUserData } from "../controller/user_controller";
const router = express.Router();

router.get("/user-data/:userId", getUserData)

export default router;