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
exports.LanguageController = void 0;
const language_service_1 = require("./language.service");
class LanguageController {
    constructor() {
        this.languageService = new language_service_1.LanguageService();
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { code, name } = req.body;
                const language = { code, name };
                const createdLanguage = yield this.languageService.createLanguage(language);
                res.status(201).json(createdLanguage);
            }
            catch (error) {
                res.status(500).json({ message: "Error creating language" });
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const languages = yield this.languageService.getLanguages();
                res.status(200).json(languages);
            }
            catch (error) {
                res.status(500).json({ message: "Error retrieving languages" });
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const language = yield this.languageService.getLanguageById(id);
                if (!language)
                    res.status(404).json({ message: "Language not found" });
                res.status(200).json(language);
            }
            catch (error) {
                res.status(500).json({ message: "Error retrieving language" });
            }
        });
    }
}
exports.LanguageController = LanguageController;
