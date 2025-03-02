"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const project_router_1 = __importDefault(require("../modules/project/project.router"));
const language_router_1 = __importDefault(require("../modules/language/language.router"));
const technology_router_1 = __importDefault(require("../modules/technology/technology.router"));
const router = (0, express_1.Router)();
router.use("/projects", project_router_1.default);
router.use("/languages", language_router_1.default);
router.use("/technologies", technology_router_1.default);
exports.default = router;
