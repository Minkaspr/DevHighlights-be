import { Router } from "express";
import { LanguageController } from "./language.controller";
import { createLanguageValidationRules, getLanguageValidationRules } from "./language.validation";
import { handleValidationErrors } from "../../middlewares/validation-handler";

const router = Router();
const controller = new LanguageController();

router.post(
  "/", 
  createLanguageValidationRules(),
  handleValidationErrors("Error creating language"),
  controller.create.bind(controller)
);
router.get("/", controller.getAll.bind(controller));
router.get(
  "/:id", 
  getLanguageValidationRules(),
  handleValidationErrors("Invalid ID"),
  controller.getById.bind(controller)
);

export default router; 
