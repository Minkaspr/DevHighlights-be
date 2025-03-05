import { body, param, query } from "express-validator";

export const createProjectValidationRules = () => [
  body("projectCode")
    .notEmpty().withMessage("Project code is required")
    .isString().withMessage("Project code must be a string")
    .isLength({ min: 3, max: 32 }).withMessage("Project code must be between 3 and 32 characters")
    .matches(/^[a-zA-Z0-9_-]+$/).withMessage("Project code can only contain letters, numbers, dashes, and underscores"),

  body("detailsUrl")
    .notEmpty().withMessage("Details URL is required")
    .isURL().withMessage("Details URL must be a valid URL"),

  body("imageUrl")
    .notEmpty().withMessage("Image URL is required")
    .isURL().withMessage("Image URL must be a valid URL"),

  body("languages")
  .custom((langs, { req }) => {
    if (!req.body.hasOwnProperty("languages")) {
      throw new Error("Languages field is required");
    }
    if (!Array.isArray(langs)) {
      throw new Error("Languages must be an array");
    }
    if (langs.length === 0) {
      throw new Error("Languages must have at least one language");
    }
    return true;
  }),

  body("languages.*.code")
    .notEmpty().withMessage("Language code is required")
    .isString().withMessage("Language code must be a string")
    .isLength({ min: 2, max: 5 }).withMessage("Language code must be between 2 and 5 characters"),

  body("languages.*.title")
    .notEmpty().withMessage("Title is required")
    .isString().withMessage("Title must be a string")
    .isLength({ min: 2 }).withMessage("Title must have at least 2 characters"),

  body("languages.*.description")
    .notEmpty().withMessage("Description is required")
    .isString().withMessage("Description must be a string")
    .isLength({ min: 10 }).withMessage("Description must have at least 10 characters"),

  body("technologies")
    .custom((techs, { req }) => {
      if (!req.body.hasOwnProperty("technologies")) {
        throw new Error("Technologies field is required");
      }
      if (!Array.isArray(techs)) {
        throw new Error("Technologies must be an array");
      }
      if (techs.length === 0) {
        throw new Error("Technologies must have at least one technology");
      }
      return true;
    }),

  body("technologies.*")
    .notEmpty().withMessage("Technology must not be empty")
    .isString().withMessage("Technology must be a string"),
];

export const getAllProjectsValidationRules = () => [
  param("languageCode")
    .notEmpty().withMessage("Language code is required")
    .isString().withMessage("Language code must be a string")
    .isLength({ min: 2, max: 5 }).withMessage("Language code must be between 2 and 5 characters"),
  query("sortOrder")
    .optional()
    .isIn(["asc", "desc"])
    .withMessage("sortOrder must be 'asc' or 'desc'")
];

export const getProjectWithLanguagesValidationRules = () => [
  param("projectCode")
    .notEmpty().withMessage("Project code is required")
    .isString().withMessage("Project code must be a string")
    .isLength({ min: 3, max: 10 }).withMessage("Project code must be between 3 and 10 characters")
    .matches(/^[a-zA-Z0-9_-]+$/).withMessage("Project code can only contain letters, numbers, dashes, and underscores"),
];

export const getByCodeValidationRules = () => [
  param("languageCode")
    .notEmpty().withMessage("Language code is required")
    .isString().withMessage("Language code must be a string")
    .isLength({ min: 2, max: 5 }).withMessage("Language code must be between 2 and 5 characters"),

  param("projectCode")
    .notEmpty().withMessage("Project code is required")
    .isString().withMessage("Project code must be a string")
    .isLength({ min: 3, max: 10 }).withMessage("Project code must be between 3 and 10 characters")
    .matches(/^[a-zA-Z0-9_-]+$/).withMessage("Project code can only contain letters, numbers, dashes, and underscores"),
];
