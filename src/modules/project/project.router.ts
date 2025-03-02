import { Router } from "express";
import { ProjectController } from "./project.controller";

const router = Router();
const controller = new ProjectController();

router.post("/project/", controller.create.bind(controller));
router.get("/lang/:languageCode", controller.getAll.bind(controller));
router.get("/project/:projectCode", controller.getProjectWithLanguages.bind(controller));
router.get("/project/:languageCode/:projectCode", controller.getByCode.bind(controller));

export default router;
