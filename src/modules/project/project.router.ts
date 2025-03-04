import { Router } from "express";
import { ProjectController } from "./project.controller";
import { validateRequest } from "../../middlewares/validation-middleware";
import { createProjectValidationRules, getAllProjectsValidationRules, getByCodeValidationRules, getProjectWithLanguagesValidationRules } from "./project.validator";

const router = Router();
const controller = new ProjectController();

router.post(
  "/project/", 
  createProjectValidationRules(),
  validateRequest("Error creating project"),
  controller.create.bind(controller)
);
router.get(
  "/lang/:languageCode", 
  getAllProjectsValidationRules(),
  validateRequest("Invalid language code"),
  controller.getAll.bind(controller)
);
router.get(
  "/project/:projectCode", 
  getProjectWithLanguagesValidationRules(),
  validateRequest("Invalid project code"),
  controller.getProjectWithLanguages.bind(controller)
);
router.get(
  "/project/:languageCode/:projectCode", 
  getByCodeValidationRules(),
  validateRequest("Invalid parameters"),
  controller.getByCode.bind(controller)
);

export default router;
