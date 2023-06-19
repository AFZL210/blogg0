import express from "express";
const router = express.Router();
import { registerUser, loginUser, validateUser } from "../controller/auth_controller";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/validate", validateUser);

export default router;