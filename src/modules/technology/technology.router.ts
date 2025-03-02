import { Router } from "express";
import { TechnologyController } from "./technology.controller";

const router = Router();
const controller = new TechnologyController();

router.post("/", controller.create.bind(controller));
router.get("/", controller.getAll.bind(controller));
router.get("/:id", controller.getById.bind(controller));

export default router;
