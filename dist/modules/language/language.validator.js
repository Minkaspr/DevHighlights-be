"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLanguageValidationRules = exports.createLanguageValidationRules = void 0;
const express_validator_1 = require("express-validator");
const createLanguageValidationRules = () => [
    (0, express_validator_1.body)("code")
        .notEmpty().withMessage("Code is required")
        .isString().withMessage("Code must be a string")
        .isLength({ min: 2, max: 5 }).withMessage("Code must be between 2 and 5 characters"),
    (0, express_validator_1.body)("name")
        .notEmpty().withMessage("Name is required")
        .isString().withMessage("Name must be a string")
        .isLength({ min: 2 }).withMessage("Name must have at least 2 characters"),
];
exports.createLanguageValidationRules = createLanguageValidationRules;
const getLanguageValidationRules = () => [
    (0, express_validator_1.param)("id")
        .notEmpty().withMessage("ID is required")
        .isInt({ min: 1 }).withMessage("ID must be a positive integer greater than 0")
];
exports.getLanguageValidationRules = getLanguageValidationRules;
