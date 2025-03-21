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
exports.TechnologyService = void 0;
const technology_repository_1 = require("./technology.repository");
const error_types_1 = require("../../utils/error-types");
class TechnologyService {
    constructor() {
        this.technologyRepository = new technology_repository_1.TechnologyRepository();
    }
    createTechnology(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingTechnology = yield this.technologyRepository.getTechnologyByName(name);
            if (existingTechnology) {
                throw new error_types_1.UniqueConstraintError("name");
            }
            return this.technologyRepository.createTechnology(name);
        });
    }
    getTechnologies() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.technologyRepository.getTechnologies();
        });
    }
    getTechnologyById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const technology = yield this.technologyRepository.getTechnologyById(id);
            if (!technology)
                throw new error_types_1.NotFoundError("technology", "id", id.toString());
            return technology;
            //return this.technologyRepository.getTechnologyById(id);
        });
    }
    getTechnologyByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.technologyRepository.getTechnologyByName(name);
        });
    }
}
exports.TechnologyService = TechnologyService;
