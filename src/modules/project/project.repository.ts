import { PrismaClient, Prisma } from "@prisma/client";
import { IProject } from "./project.entity";

const prisma = new PrismaClient();

export class ProjectRepository {
  async create(data: IProject, tx: Prisma.TransactionClient) {
    return tx.project.create({
      data: {
        projectCode: data.projectCode,
        detailsUrl: data.detailsUrl,
        imageUrl: data.imageUrl,
      },
    });
  }

  async getAll(languageCode: string, sortOrder: string) {
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
      orderBy: { id: sortOrder as Prisma.SortOrder}
    });
  }

  async getProjectWithLanguages(projectCode: string) {
    return await prisma.project.findUnique({
      where: { projectCode },
      include: {
        texts: { include: { language: true } }, // Traemos los textos con el idioma
        technologies: { include: { technology: true } }, // Traemos las tecnologías
      },
    });
  }

  async getByCode(projectCode: string) {
    return prisma.project.findUnique({
      where: { projectCode },
      select: {
        id: true,
        projectCode: true,
        detailsUrl: true,
        imageUrl: true
      }
    });
  }
}
