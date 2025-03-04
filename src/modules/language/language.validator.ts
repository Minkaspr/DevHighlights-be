import { body, param } from "express-validator";

export const createLanguageValidationRules = () => [
  body("code")
    .notEmpty().withMessage("Code is required")
    .isString().withMessage("Code must be a string")
    .isLength({ min: 2, max: 5 }).withMessage("Code must be between 2 and 5 characters"),

  body("name")
    .notEmpty().withMessage("Name is required")
    .isString().withMessage("Name must be a string")
    .isLength({ min: 2 }).withMessage("Name must have at least 2 characters"),
];

export const getLanguageValidationRules = () => [
  param("id")
    .notEmpty().withMessage("ID is required")
    .isInt({ min: 1 }).withMessage("ID must be a positive integer greater than 0")
];