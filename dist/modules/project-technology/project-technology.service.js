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
exports.ProjectTechnologyService = void 0;
const project_technology_repository_1 = require("./project-technology.repository");
class ProjectTechnologyService {
    constructor() {
        this.repository = new project_technology_repository_1.ProjectTechnologyRepository();
    }
    createProjectTechnologies(technologies, tx) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.createMany(technologies, tx);
        });
    }
    getTechnologiesByProjectId(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            const technologies = yield this.repository.findTechnologiesByProjectId(projectId);
            return technologies.map(t => t.technology.name);
        });
    }
}
exports.ProjectTechnologyService = ProjectTechnologyService;
