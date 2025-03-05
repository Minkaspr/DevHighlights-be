import { LanguageRepository } from "./language.repository";
import { LanguageEntity } from "./language.entity";
import { NotFoundError, UniqueConstraintError } from "../../utils/error-types";

export class LanguageService {
  private languageRepository = new LanguageRepository();

  async createLanguage(language: Omit<LanguageEntity, "id">): Promise<LanguageEntity> {
    const existingLanguage = await this.languageRepository.getLanguageByCode(language.code);
    if (existingLanguage) {
      throw new UniqueConstraintError("code");
    }
    return this.languageRepository.createLanguage(language);
  }

  async getLanguages(): Promise<LanguageEntity[]> {
    return this.languageRepository.getLanguages();
  }

  async getLanguageById(id: number): Promise<LanguageEntity | null> {
    const language = await this.languageRepository.getLanguageById(id);
    if (!language) {
      throw new NotFoundError("language", "id", id.toString());
    }
    return language
    //return this.languageRepository.getLanguageById(id);
  }

  async getLanguageByCode(code: string): Promise<LanguageEntity | null> {
    return this.languageRepository.getLanguageByCode(code);
  }
}
