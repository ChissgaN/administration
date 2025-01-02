import { Router } from "express";
import { login, profile } from "../controllers/AuthController.js";
import { authenticateToken } from "../middlewares/Auth.js";
export const auth_router = Router();

auth_router.post("/login", login);
auth_router.get("/profile", authenticateToken, profile);
export default auth_router;
