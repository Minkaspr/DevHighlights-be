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
const api_response_1 = require("../../utils/api-response");
const error_handler_1 = require("../../utils/error-handler");
class ProjectController {
    constructor() {
        this.projectService = new project_service_1.ProjectService();
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const projectData = req.body;
                const project = yield this.projectService.createProject(projectData);
                //res.status(201).json(project);
                (0, api_response_1.successResponse)(res, "Project created", 204);
            }
            catch (error) {
                //res.status(500).json({ message: "Error creating project", error: getErrorMessage(error) });
                //errorResponse(res, "Error creating project" + getErrorMessage(error), 500);
                (0, error_handler_1.errorHandler)(res, error);
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { languageCode } = req.params;
                const projects = yield this.projectService.getProjects(languageCode);
                //res.status(200).json(projects);
                (0, api_response_1.dataResponse)(res, projects, "Projects retrieved successfully");
            }
            catch (error) {
                // res.status(500).json({ message: "Error retrieving projects", error: getErrorMessage(error) });
                //errorResponse(res, "Error retrieving projects " + getErrorMessage(error), 500);
                (0, error_handler_1.errorHandler)(res, error);
            }
        });
    }
    getProjectWithLanguages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { projectCode } = req.params;
                const project = yield this.projectService.getProjectWithLanguages(projectCode);
                //res.json(project);
                (0, api_response_1.dataResponse)(res, project, "Project retrieved successfully");
            }
            catch (error) {
                //res.status(500).json({ message: "Error retrieving project", error: getErrorMessage(error) });
                //errorResponse(res, "Error retrieving project " + getErrorMessage(error), 500);
                (0, error_handler_1.errorHandler)(res, error);
            }
        });
    }
    getByCode(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { languageCode, projectCode } = req.params;
                const project = yield this.projectService.getProjectByCode(projectCode, languageCode);
                //res.status(200).json(project);
                (0, api_response_1.dataResponse)(res, project, "Project retrieved successfully");
            }
            catch (error) {
                //res.status(500).json({ message: "Error retrieving project", error: getErrorMessage(error) });
                //errorResponse(res, "Error retrieving project " + getErrorMessage(error), 500);
                (0, error_handler_1.errorHandler)(res, error);
            }
        });
    }
}
exports.ProjectController = ProjectController;
