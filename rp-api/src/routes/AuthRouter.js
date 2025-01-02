import { Router } from "express";
import { login, profile, logout } from "../controllers/AuthController.js";
import { authenticateToken } from "../middlewares/Auth.js";
export const auth_router = Router();

auth_router.post("/login", login);
auth_router.get("/profile", authenticateToken, profile);
auth_router.get("/logout", authenticateToken, logout);
export default auth_router;
