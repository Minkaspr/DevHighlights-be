import { Router } from "express";
import projectRouter from "../modules/project/project.router";
import languageRouter from "../modules/language/language.router"
import technologyRouter from "../modules/technology/technology.router"

const router = Router();

router.use("/projects", projectRouter);
router.use("/languages", languageRouter);
router.use("/technologies", technologyRouter);

export default router;
