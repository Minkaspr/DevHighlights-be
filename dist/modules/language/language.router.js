"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const language_controller_1 = require("./language.controller");
const language_validator_1 = require("./language.validator");
const validation_middleware_1 = require("../../middlewares/validation-middleware");
const router = (0, express_1.Router)();
const controller = new language_controller_1.LanguageController();
router.post("/", (0, language_validator_1.createLanguageValidationRules)(), (0, validation_middleware_1.validateRequest)("Error creating language"), controller.create.bind(controller));
router.get("/", controller.getAll.bind(controller));
router.get("/:id", (0, language_validator_1.getLanguageValidationRules)(), (0, validation_middleware_1.validateRequest)("Invalid ID"), controller.getById.bind(controller));
exports.default = router;
