"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectController = void 0;
const project_service_1 = require("./project.service");
const errors_helper_1 = require("../../utils/errors-helper");
class ProjectController {
    constructor() {
        this.projectService = new project_service_1.ProjectService();
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const projectData = req.body;
                if (!projectData.projectCode || !projectData.detailsUrl || !projectData.imageUrl) {
                    res.status(400).json({ message: "Missing required fields" });
                    return;
                }
                const project = yield this.projectService.createProject(projectData);
                res.status(201).json(project);
            }
            catch (error) {
                res.status(500).json({ message: "Error creating project", error: (0, errors_helper_1.getErrorMessage)(error) });
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { languageCode } = req.params;
                if (!languageCode) {
                    res.status(400).json({ message: "Missing languageCode parameter" });
                    return;
                }
                const projects = yield this.projectService.getProjects(languageCode);
                res.status(200).json(projects);
            }
            catch (error) {
                res.status(500).json({ message: "Error retrieving projects", error: (0, errors_helper_1.getErrorMessage)(error) });
            }
        });
    }
    getProjectWithLanguages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { projectCode } = req.params;
                const project = yield this.projectService.getProjectWithLanguages(projectCode);
                if (!project) {
                    res.status(404).json({ message: "Project not found" });
                }
                res.json(project);
            }
            catch (error) {
                res.status(500).json({ message: "Error retrieving project", error: (0, errors_helper_1.getErrorMessage)(error) });
            }
        });
    }
    getByCode(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { languageCode, projectCode } = req.params;
                if (!languageCode || !projectCode) {
                    res.status(400).json({ message: "Missing languageCode or projectCode parameter" });
                    return;
                }
                const project = yield this.projectService.getProjectByCode(projectCode, languageCode);
                if (!project) {
                    res.status(404).json({ message: "Project not found" });
                    return;
                }
                res.status(200).json(project);
            }
            catch (error) {
                res.status(500).json({ message: "Error retrieving project", error: (0, errors_helper_1.getErrorMessage)(error) });
            }
        });
    }
}
exports.ProjectController = ProjectController;
