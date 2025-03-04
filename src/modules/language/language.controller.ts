import { Request, Response } from "express";
import { LanguageService } from "./language.service";
import { LanguageEntity } from "./language.entity";
import { dataResponse } from "../../utils/api-response";
import { errorHandler } from "../../utils/error-handler";

export class LanguageController {
  private languageService = new LanguageService();

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { code, name } = req.body;
      const language: Omit<LanguageEntity, "id"> = { code, name };
      const createdLanguage = await this.languageService.createLanguage(language);
      //res.status(201).json(createdLanguage);
      dataResponse(res, createdLanguage, "Language created successfully", 201);
    } catch (error) {
      //res.status(500).json({ message: "Error creating language" });
      //errorResponse(res, "Error creating language " + getErrorMessage(error), 500);
      errorHandler(res, error);
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const languages = await this.languageService.getLanguages();
      //res.status(200).json(languages);
      dataResponse(res, languages, "Languages retrieved successfully");
    } catch (error) {
      //res.status(500).json({ message: "Error retrieving languages" });
      //errorResponse(res, "Error retrieving languages " + getErrorMessage(error), 500);
      errorHandler(res, error);
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const language = await this.languageService.getLanguageById(id);
      /* if (!language) {
        //res.status(404).json({ message: "Language not found" });
        errorResponse(res, "Language not found", 404);
      } */
      //res.status(200).json(language);
      dataResponse(res, language, "Language retrieved successfully");
    } catch (error) {
      //res.status(500).json({ message: "Error retrieving language" });
      //errorResponse(res, "Error retrieving language " + getErrorMessage(error), 500);
      errorHandler(res, error);
    }
  }
}
