import { Router } from "express";
import projectRouter from "../modules/project/project-controller";
import languageRouter from "../modules/language/language.routes"
import projectTextRouter from "../modules/project-text/project-text-controller";
import technologyRouter from "../modules/technology/technology-controller";
import projectTechnologyRouter from "../modules/project-technology/project-technology-controller";

const router = Router();

router.use("/projects", projectRouter);
router.use("/languages", languageRouter);
router.use("/project-texts", projectTextRouter);
router.use("/technologies", technologyRouter);
router.use("/project-technologies", projectTechnologyRouter);

export default router;
