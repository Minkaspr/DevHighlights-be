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
exports.ProjectRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ProjectRepository {
    create(data, tx) {
        return __awaiter(this, void 0, void 0, function* () {
            return tx.project.create({
                data: {
                    projectCode: data.projectCode,
                    detailsUrl: data.detailsUrl,
                    imageUrl: data.imageUrl,
                },
            });
        });
    }
    getAll(languageCode) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.project.findMany({
                include: {
                    texts: {
                        where: { language: { code: languageCode } },
                        select: { title: true, description: true }
                    },
                    technologies: {
                        include: { technology: { select: { name: true } } }
                    },
                },
            });
        });
    }
    getProjectWithLanguages(projectCode) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.project.findUnique({
                where: { projectCode },
                include: {
                    texts: { include: { language: true } }, // Traemos los textos con el idioma
                    technologies: { include: { technology: true } }, // Traemos las tecnologías
                },
            });
        });
    }
    getByCode(projectCode) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.project.findUnique({
                where: { projectCode },
                select: {
                    id: true,
                    projectCode: true,
                    detailsUrl: true,
                    imageUrl: true
                }
            });
        });
    }
}
exports.ProjectRepository = ProjectRepository;
