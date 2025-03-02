import { PrismaClient } from "@prisma/client";
import { IProjectTechnology } from "./project-technology.entity";
const prisma = new PrismaClient();

export class ProjectTechnologyRepository {
  async createMany(technologies: IProjectTechnology[], tx?: any) {
    const prismaClient = tx || prisma;
    return await prismaClient.projectTechnology.createMany({ data: technologies });
  }

  async findTechnologiesByProjectId(projectId: number) {
    return await prisma.projectTechnology.findMany({
      where: { projectId },
      include: { technology: true },
    });
  }
}