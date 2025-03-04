import { Router } from "express";
import { TechnologyController } from "./technology.controller";
import { validateRequest } from "../../middlewares/validation-middleware";
import { createTechnologyValidationRules, getTechnologyValidationRules } from "./technology.validator";

const router = Router();
const controller = new TechnologyController();

router.post(
  "/", 
  createTechnologyValidationRules(),
  validateRequest("Error creating technology"),
  controller.create.bind(controller)
);
router.get("/", controller.getAll.bind(controller));
router.get(
  "/:id", 
  getTechnologyValidationRules(),
  validateRequest("Invalid ID"),
  controller.getById.bind(controller)
);

export default router;
