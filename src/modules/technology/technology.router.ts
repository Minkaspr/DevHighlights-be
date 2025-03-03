import { Router } from "express";
import { TechnologyController } from "./technology.controller";
import { handleValidationErrors } from "../../middlewares/validation-handler";
import { createTechnologyValidationRules, getTechnologyValidationRules } from "./technology.validation";

const router = Router();
const controller = new TechnologyController();

router.post(
  "/", 
  createTechnologyValidationRules(),
  handleValidationErrors("Error creating technology"),
  controller.create.bind(controller)
);
router.get("/", controller.getAll.bind(controller));
router.get(
  "/:id", 
  getTechnologyValidationRules(),
  handleValidationErrors("Invalid ID"),
  controller.getById.bind(controller)
);

export default router;
