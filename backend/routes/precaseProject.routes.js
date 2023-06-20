import express from "express";

import auth from "../configs/auth";
import controllers from "../controllers/precastProject.controller";

const router = express.Router();
router.get("/", auth.required, controllers.onGetAll);
router.get("/:id", auth.required, controllers.onGetById);
router.post("/", auth.required, controllers.onInsert);
router.put("/:id", auth.required, controllers.onUpdate);
router.delete("/:id", auth.required, controllers.onDelete);

export default router;
