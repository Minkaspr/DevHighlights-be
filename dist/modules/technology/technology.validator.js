"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTechnologyValidationRules = exports.createTechnologyValidationRules = void 0;
const express_validator_1 = require("express-validator");
const createTechnologyValidationRules = () => [
    (0, express_validator_1.body)("name")
        .notEmpty().withMessage("Name is required")
        .isString().withMessage("Name must be a string")
        .isLength({ min: 2 }).withMessage("Name must have at least 2 characters"),
];
exports.createTechnologyValidationRules = createTechnologyValidationRules;
const getTechnologyValidationRules = () => [
    (0, express_validator_1.param)("id")
        .notEmpty().withMessage("ID is required")
        .isInt({ min: 1 }).withMessage("ID must be a positive integer greater than 0"),
];
exports.getTechnologyValidationRules = getTechnologyValidationRules;
