"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getByCodeValidationRules = exports.getProjectWithLanguagesValidationRules = exports.getAllProjectsValidationRules = exports.createProjectValidationRules = void 0;
const express_validator_1 = require("express-validator");
const createProjectValidationRules = () => [
    (0, express_validator_1.body)("projectCode")
        .notEmpty().withMessage("Project code is required")
        .isString().withMessage("Project code must be a string")
        .isLength({ min: 3, max: 10 }).withMessage("Project code must be between 3 and 10 characters")
        .matches(/^[a-zA-Z0-9_-]+$/).withMessage("Project code can only contain letters, numbers, dashes, and underscores"),
    (0, express_validator_1.body)("detailsUrl")
        .notEmpty().withMessage("Details URL is required")
        .isURL().withMessage("Details URL must be a valid URL"),
    (0, express_validator_1.body)("imageUrl")
        .notEmpty().withMessage("Image URL is required")
        .isURL().withMessage("Image URL must be a valid URL"),
    (0, express_validator_1.body)("languages")
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
    (0, express_validator_1.body)("languages.*.code")
        .notEmpty().withMessage("Language code is required")
        .isString().withMessage("Language code must be a string")
        .isLength({ min: 2, max: 5 }).withMessage("Language code must be between 2 and 5 characters"),
    (0, express_validator_1.body)("languages.*.title")
        .notEmpty().withMessage("Title is required")
        .isString().withMessage("Title must be a string")
        .isLength({ min: 2 }).withMessage("Title must have at least 2 characters"),
    (0, express_validator_1.body)("languages.*.description")
        .notEmpty().withMessage("Description is required")
        .isString().withMessage("Description must be a string")
        .isLength({ min: 10 }).withMessage("Description must have at least 10 characters"),
    (0, express_validator_1.body)("technologies")
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
    (0, express_validator_1.body)("technologies.*")
        .notEmpty().withMessage("Technology must not be empty")
        .isString().withMessage("Technology must be a string"),
];
exports.createProjectValidationRules = createProjectValidationRules;
const getAllProjectsValidationRules = () => [
    (0, express_validator_1.param)("languageCode")
        .notEmpty().withMessage("Language code is required")
        .isString().withMessage("Language code must be a string")
        .isLength({ min: 2, max: 5 }).withMessage("Language code must be between 2 and 5 characters"),
];
exports.getAllProjectsValidationRules = getAllProjectsValidationRules;
const getProjectWithLanguagesValidationRules = () => [
    (0, express_validator_1.param)("projectCode")
        .notEmpty().withMessage("Project code is required")
        .isString().withMessage("Project code must be a string")
        .isLength({ min: 3, max: 10 }).withMessage("Project code must be between 3 and 10 characters")
        .matches(/^[a-zA-Z0-9_-]+$/).withMessage("Project code can only contain letters, numbers, dashes, and underscores"),
];
exports.getProjectWithLanguagesValidationRules = getProjectWithLanguagesValidationRules;
const getByCodeValidationRules = () => [
    (0, express_validator_1.param)("languageCode")
        .notEmpty().withMessage("Language code is required")
        .isString().withMessage("Language code must be a string")
        .isLength({ min: 2, max: 5 }).withMessage("Language code must be between 2 and 5 characters"),
    (0, express_validator_1.param)("projectCode")
        .notEmpty().withMessage("Project code is required")
        .isString().withMessage("Project code must be a string")
        .isLength({ min: 3, max: 10 }).withMessage("Project code must be between 3 and 10 characters")
        .matches(/^[a-zA-Z0-9_-]+$/).withMessage("Project code can only contain letters, numbers, dashes, and underscores"),
];
exports.getByCodeValidationRules = getByCodeValidationRules;
