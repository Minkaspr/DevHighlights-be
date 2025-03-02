import { PrismaClient } from "@prisma/client";
import { TechnologyEntity } from "./technology.entity";

const prisma = new PrismaClient();

export class TechnologyRepository {
  async createTechnology(name: string): Promise<TechnologyEntity> {
    return await prisma.technology.create({
      data: { name },
    });
  }

  async getTechnologies(): Promise<TechnologyEntity[]> {
    return await prisma.technology.findMany();
  }

  async getTechnologyById(id: number): Promise<TechnologyEntity | null> {
    return await prisma.technology.findUnique({ where: { id } });
  }

  async getTechnologyByName(name: string): Promise<TechnologyEntity | null> {
    return await prisma.technology.findUnique({ where: { name } });
  }
}
