import { Router } from "express";
import { upload } from "../libs/multer.js";
import {store,remove,update,index, show} from "../controllers/ProductController.js";

export const product_router = Router();

product_router.get("/", index);
product_router.get("/:id", show);
product_router.post("/", upload.single("photo"), store);
product_router.put("/:id", upload.single("photo"), update);
product_router.delete("/:id", remove);

export default product_router;