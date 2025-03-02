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
exports.ProjectTextService = void 0;
const project_text_repository_1 = require("./project-text.repository");
class ProjectTextService {
    constructor() {
        this.repository = new project_text_repository_1.ProjectTextRepository();
    }
    createProjectTexts(texts, tx) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.createMany(texts, tx);
        });
    }
    getAllTextsByProjectId(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.getAllByProjectId(projectId);
        });
    }
    getTextByProjectIdAndLanguageId(projectId, languageId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.getByProjectIdAndLanguageId(projectId, languageId);
        });
    }
}
exports.ProjectTextService = ProjectTextService;
