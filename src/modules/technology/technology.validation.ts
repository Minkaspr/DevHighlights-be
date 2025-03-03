import { body, param } from "express-validator";

export const createTechnologyValidationRules = () => [
  body("name")
    .notEmpty().withMessage("Name is required")
    .isString().withMessage("Name must be a string")
    .isLength({ min: 2 }).withMessage("Name must have at least 2 characters"),
];

export const getTechnologyValidationRules = () => [
  param("id")
    .notEmpty().withMessage("ID is required")
    .isInt({ min: 1 }).withMessage("ID must be a positive integer greater than 0"),
];
