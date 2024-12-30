import { Router } from "express";
import {
  store,
  update,
  updateStatus,
  index,
  show,
} from "../controllers/OrderController.js";

export const order_router = Router();

order_router.get("/", index);
order_router.post("/", store);
order_router.get("/:id", show);
order_router.put("/:id", update);
order_router.patch("/:id", updateStatus);

export default order_router;
