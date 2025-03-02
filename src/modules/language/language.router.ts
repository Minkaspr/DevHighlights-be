import { Router } from "express";
import { LanguageController } from "./language.controller";

const router = Router();
const controller = new LanguageController();

router.post("/", controller.create.bind(controller));
router.get("/", controller.getAll.bind(controller));
router.get("/:id", controller.getById.bind(controller));

export default router; 
