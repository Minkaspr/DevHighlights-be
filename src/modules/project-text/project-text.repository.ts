import { PrismaClient } from "@prisma/client";
import { IProjectText } from "./project-text.entity";
const prisma = new PrismaClient();

export class ProjectTextRepository {
  async createMany(texts: IProjectText[], tx?: any) {
    const prismaClient = tx || prisma;
    return await prismaClient.projectText.createMany({ data: texts });
  }

  async getAllByProjectId(projectId: number) {
    return await prisma.projectText.findMany({
      where: { projectId },
      include: { language: true }
    });
  }

  async getByProjectIdAndLanguageId(projectId: number, languageId: number) {
    return await prisma.projectText.findUnique({
      where: { projectId_languageId: { projectId, languageId } },
      include: { language: true }
    });
  }
}