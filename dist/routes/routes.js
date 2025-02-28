"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const project_controller_1 = __importDefault(require("../modules/project/project-controller"));
const language_controller_1 = __importDefault(require("../modules/language/language-controller"));
const project_text_controller_1 = __importDefault(require("../modules/project-text/project-text-controller"));
const technology_controller_1 = __importDefault(require("../modules/technology/technology-controller"));
const project_technology_controller_1 = __importDefault(require("../modules/project-technology/project-technology-controller"));
const router = (0, express_1.Router)();
router.use("/projects", project_controller_1.default);
router.use("/languages", language_controller_1.default);
router.use("/project-texts", project_text_controller_1.default);
router.use("/technologies", technology_controller_1.default);
router.use("/project-technologies", project_technology_controller_1.default);
exports.default = router;
