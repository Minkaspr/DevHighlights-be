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
const api_response_1 = require("../../utils/api-response");
const error_handler_1 = require("../../utils/error-handler");
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
                //res.status(201).json(createdLanguage);
                (0, api_response_1.dataResponse)(res, createdLanguage, "Language created successfully", 201);
            }
            catch (error) {
                //res.status(500).json({ message: "Error creating language" });
                //errorResponse(res, "Error creating language " + getErrorMessage(error), 500);
                (0, error_handler_1.errorHandler)(res, error);
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const languages = yield this.languageService.getLanguages();
                //res.status(200).json(languages);
                (0, api_response_1.dataResponse)(res, languages, "Languages retrieved successfully");
            }
            catch (error) {
                //res.status(500).json({ message: "Error retrieving languages" });
                //errorResponse(res, "Error retrieving languages " + getErrorMessage(error), 500);
                (0, error_handler_1.errorHandler)(res, error);
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const language = yield this.languageService.getLanguageById(id);
                /* if (!language) {
                  //res.status(404).json({ message: "Language not found" });
                  errorResponse(res, "Language not found", 404);
                } */
                //res.status(200).json(language);
                (0, api_response_1.dataResponse)(res, language, "Language retrieved successfully");
            }
            catch (error) {
                //res.status(500).json({ message: "Error retrieving language" });
                //errorResponse(res, "Error retrieving language " + getErrorMessage(error), 500);
                (0, error_handler_1.errorHandler)(res, error);
            }
        });
    }
}
exports.LanguageController = LanguageController;
