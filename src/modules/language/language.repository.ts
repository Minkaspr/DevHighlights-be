import { PrismaClient, Language } from "@prisma/client";
import { LanguageEntity } from "./language.entity";

const prisma = new PrismaClient();

export class LanguageRepository {
  async createLanguage(language: Omit<LanguageEntity, "id">): Promise<LanguageEntity> {
    return await prisma.language.create({
      data: language,
    });
  }

  async getLanguages(): Promise<LanguageEntity[]> {
    return await prisma.language.findMany();
  }

  async getLanguageById(id: number): Promise<LanguageEntity | null> {
    return await prisma.language.findUnique({ where: { id } });
  }
}
