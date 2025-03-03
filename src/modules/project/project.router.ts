import { Router } from "express";
import { ProjectController } from "./project.controller";
import { handleValidationErrors } from "../../middlewares/validation-handler";
import { createProjectValidationRules, getAllProjectsValidationRules, getByCodeValidationRules, getProjectWithLanguagesValidationRules } from "./project.validation";

const router = Router();
const controller = new ProjectController();

router.post(
  "/project/", 
  createProjectValidationRules(),
  handleValidationErrors("Error creating project"),
  controller.create.bind(controller)
);
router.get(
  "/lang/:languageCode", 
  getAllProjectsValidationRules(),
  handleValidationErrors("Invalid language code"),
  controller.getAll.bind(controller)
);
router.get(
  "/project/:projectCode", 
  getProjectWithLanguagesValidationRules(),
  handleValidationErrors("Invalid project code"),
  controller.getProjectWithLanguages.bind(controller)
);
router.get(
  "/project/:languageCode/:projectCode", 
  getByCodeValidationRules(),
  handleValidationErrors("Invalid parameters"),
  controller.getByCode.bind(controller)
);

export default router;
