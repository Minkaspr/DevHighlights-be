import { Request, Response } from "express";
import { TechnologyService } from "./technology.service";
import { dataResponse } from "../../utils/api-response";
import { errorHandler } from "../../utils/error-handler";

export class TechnologyController {
  private technologyService: TechnologyService;

  constructor() {
    this.technologyService = new TechnologyService();
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { name } = req.body;
      const technology = await this.technologyService.createTechnology(name);
      //res.status(201).json(technology);
      dataResponse(res, technology, "Technology created successfully", 201);
    } catch (error) {
      //res.status(500).json({ message: "Error creating technology" });
      //errorResponse(res, "Error creating technology " + getErrorMessage(error), 500);
      errorHandler(res, error);
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const technologies = await this.technologyService.getTechnologies();
      //res.status(200).json(technologies);
      dataResponse(res, technologies, "Technologies retrieved successfully");
    } catch (error) {
      //res.status(500).json({ message: "Error retrieving technologies" });
      //errorResponse(res, "Error retrieving technologies " + getErrorMessage(error), 500);
      errorHandler(res, error);
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const technology = await this.technologyService.getTechnologyById(id);
      dataResponse(res, technology, "Technology retrieved successfully");
    } catch (error) {
      //res.status(500).json({ message: "Error retrieving technology" });
      //errorResponse(res, "Error retrieving technology " + getErrorMessage(error), 500);
      errorHandler(res, error);
    }
  }
}
