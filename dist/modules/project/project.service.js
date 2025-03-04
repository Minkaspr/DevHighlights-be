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
exports.ProjectService = void 0;
const project_repository_1 = require("./project.repository");
const project_text_service_1 = require("../project-text/project-text.service");
const project_technology_service_1 = require("../project-technology/project-technology.service");
const client_1 = require("@prisma/client");
const language_service_1 = require("../language/language.service");
const technology_service_1 = require("../technology/technology.service");
const error_types_1 = require("../../utils/error-types");
const error_helper_1 = require("../../utils/error-helper");
const prisma = new client_1.PrismaClient();
class ProjectService {
    constructor() {
        this.projectRepository = new project_repository_1.ProjectRepository();
        this.projectTextService = new project_text_service_1.ProjectTextService();
        this.projectTechnologyService = new project_technology_service_1.ProjectTechnologyService();
        this.languageService = new language_service_1.LanguageService();
        this.technologyService = new technology_service_1.TechnologyService();
    }
    createProject(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingProject = yield this.projectRepository.getByCode(data.projectCode);
                if (existingProject) {
                    throw new error_types_1.UniqueConstraintError("projectCode");
                }
                return yield prisma.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                    const projectData = {
                        projectCode: data.projectCode,
                        detailsUrl: data.detailsUrl,
                        imageUrl: data.imageUrl
                    };
                    const project = yield this.projectRepository.create(projectData, tx);
                    const projectTexts = yield Promise.all(data.languages.map((lang) => __awaiter(this, void 0, void 0, function* () {
                        const language = yield this.languageService.getLanguageByCode(lang.code);
                        if (!language)
                            throw new error_types_1.NotFoundError("language", "code", lang.code);
                        return {
                            projectId: project.id,
                            languageId: language.id,
                            title: lang.title,
                            description: lang.description
                        };
                    })));
                    yield this.projectTextService.createProjectTexts(projectTexts, tx);
                    const projectTechnologies = yield Promise.all(data.technologies.map((techName) => __awaiter(this, void 0, void 0, function* () {
                        const technology = yield this.technologyService.getTechnologyByName(techName);
                        if (!technology)
                            throw new error_types_1.NotFoundError("technology", "technologyName", techName);
                        return {
                            projectId: project.id,
                            technologyId: technology.id,
                        };
                    })));
                    yield this.projectTechnologyService.createProjectTechnologies(projectTechnologies, tx);
                    return project;
                }));
            }
            catch (error) {
                if (error instanceof error_types_1.NotFoundError || error instanceof error_types_1.UniqueConstraintError) {
                    throw error;
                }
                throw new error_types_1.InternalServerError((0, error_helper_1.getErrorMessage)(error));
            }
        });
    }
    getProjects(languageCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const projects = yield this.projectRepository.getAll(languageCode);
            return projects.map(project => ({
                id: project.id,
                projectCode: project.projectCode,
                detailsUrl: project.detailsUrl,
                imageUrl: project.imageUrl,
                texts: project.texts.length > 0
                    ? {
                        title: project.texts[0].title,
                        description: project.texts[0].description
                    }
                    : null,
                technologies: project.technologies.map(t => t.technology.name)
            }));
        });
    }
    getProjectWithLanguages(projectCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const project = yield this.projectRepository.getProjectWithLanguages(projectCode);
            if (!project)
                throw new error_types_1.NotFoundError("project", "projectCode", projectCode);
            return {
                projectCode: project.projectCode,
                detailsUrl: project.detailsUrl,
                imageUrl: project.imageUrl,
                languages: project.texts.map(text => ({
                    languageCode: text.language.code,
                    title: text.title,
                    description: text.description,
                })),
                technologies: project.technologies.map(t => t.technology.name),
            };
        });
    }
    getProjectByCode(projectCode, languageCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const project = yield this.projectRepository.getByCode(projectCode);
            if (!project)
                throw new error_types_1.NotFoundError("project", "projectCode", projectCode);
            const language = yield this.languageService.getLanguageByCode(languageCode);
            if (!language)
                throw new error_types_1.NotFoundError("language", "languageCode", languageCode);
            const technologies = yield this.projectTechnologyService.getTechnologiesByProjectId(project.id);
            const text = yield this.projectTextService.getTextByProjectIdAndLanguageId(project.id, language.id);
            return {
                id: project.id,
                projectCode: project.projectCode,
                detailsUrl: project.detailsUrl,
                imageUrl: project.imageUrl,
                texts: text ? { title: text.title, description: text.description } : null,
                technologies,
            };
        });
    }
}
exports.ProjectService = ProjectService;
