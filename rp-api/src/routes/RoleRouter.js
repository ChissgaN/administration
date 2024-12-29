import { Router } from "express";
import { index, show } from "../controllers/RoleController.js";

export const role_router = Router();

role_router.get("/", index);
role_router.get("/:id", show);

export default role_router;
