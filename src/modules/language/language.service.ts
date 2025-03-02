import { LanguageRepository } from "./language.repository";
import { LanguageEntity } from "./language.entity";

export class LanguageService {
  private languageRepository = new LanguageRepository();

  async createLanguage(language: Omit<LanguageEntity, "id">): Promise<LanguageEntity> {
    return this.languageRepository.createLanguage(language);
  }

  async getLanguages(): Promise<LanguageEntity[]> {
    return this.languageRepository.getLanguages();
  }

  async getLanguageById(id: number): Promise<LanguageEntity | null> {
    return this.languageRepository.getLanguageById(id);
  }

  async getLanguageByCode(code: string): Promise<LanguageEntity | null> {
    return this.languageRepository.getLanguageByCode(code);
  }
}
