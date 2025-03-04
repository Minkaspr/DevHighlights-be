import { Router } from "express";
import { LanguageController } from "./language.controller";
import { createLanguageValidationRules, getLanguageValidationRules } from "./language.validator";
import { validateRequest } from "../../middlewares/validation-middleware";

const router = Router();
const controller = new LanguageController();

router.post(
  "/", 
  createLanguageValidationRules(),
  validateRequest("Error creating language"),
  controller.create.bind(controller)
);
router.get("/", controller.getAll.bind(controller));
router.get(
  "/:id", 
  getLanguageValidationRules(),
  validateRequest("Invalid ID"),
  controller.getById.bind(controller)
);

export default router; 
