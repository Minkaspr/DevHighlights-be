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
exports.LanguageService = void 0;
const language_repository_1 = require("./language.repository");
const error_types_1 = require("../../utils/error-types");
class LanguageService {
    constructor() {
        this.languageRepository = new language_repository_1.LanguageRepository();
    }
    createLanguage(language) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.languageRepository.createLanguage(language);
        });
    }
    getLanguages() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.languageRepository.getLanguages();
        });
    }
    getLanguageById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const language = yield this.languageRepository.getLanguageById(id);
            if (!language) {
                throw new error_types_1.NotFoundError("language", "id", id.toString());
            }
            return language;
            //return this.languageRepository.getLanguageById(id);
        });
    }
    getLanguageByCode(code) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.languageRepository.getLanguageByCode(code);
        });
    }
}
exports.LanguageService = LanguageService;
