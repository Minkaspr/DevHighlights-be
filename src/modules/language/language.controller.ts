import { Request, Response } from "express";
import { LanguageService } from "./language.service";
import { LanguageEntity } from "./language.entity";

export class LanguageController {
  private languageService = new LanguageService();

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { code, name } = req.body;
      const language: Omit<LanguageEntity, "id"> = { code, name };
      const createdLanguage = await this.languageService.createLanguage(language);
      res.status(201).json(createdLanguage);
    } catch (error) {
      res.status(500).json({ message: "Error creating language" });
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const languages = await this.languageService.getLanguages();
      res.status(200).json(languages);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving languages" });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const language = await this.languageService.getLanguageById(id);
      if (!language) res.status(404).json({ message: "Language not found" });
      res.status(200).json(language);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving language" });
    }
  }
}
