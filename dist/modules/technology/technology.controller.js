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
exports.TechnologyController = void 0;
const technology_service_1 = require("./technology.service");
const api_response_1 = require("../../utils/api-response");
const error_handler_1 = require("../../utils/error-handler");
class TechnologyController {
    constructor() {
        this.technologyService = new technology_service_1.TechnologyService();
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = req.body;
                const technology = yield this.technologyService.createTechnology(name);
                //res.status(201).json(technology);
                (0, api_response_1.dataResponse)(res, technology, "Technology created successfully", 201);
            }
            catch (error) {
                //res.status(500).json({ message: "Error creating technology" });
                //errorResponse(res, "Error creating technology " + getErrorMessage(error), 500);
                (0, error_handler_1.errorHandler)(res, error);
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const technologies = yield this.technologyService.getTechnologies();
                //res.status(200).json(technologies);
                (0, api_response_1.dataResponse)(res, technologies, "Technologies retrieved successfully");
            }
            catch (error) {
                //res.status(500).json({ message: "Error retrieving technologies" });
                //errorResponse(res, "Error retrieving technologies " + getErrorMessage(error), 500);
                (0, error_handler_1.errorHandler)(res, error);
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const technology = yield this.technologyService.getTechnologyById(id);
                (0, api_response_1.dataResponse)(res, technology, "Technology retrieved successfully");
            }
            catch (error) {
                //res.status(500).json({ message: "Error retrieving technology" });
                //errorResponse(res, "Error retrieving technology " + getErrorMessage(error), 500);
                (0, error_handler_1.errorHandler)(res, error);
            }
        });
    }
}
exports.TechnologyController = TechnologyController;
