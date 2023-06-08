import express from "express";
const router = express.Router();
import { registerUser, loginUser } from "../controller/auth_controller";

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;