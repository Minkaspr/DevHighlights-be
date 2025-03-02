import { Request, Response } from "express";
import { TechnologyService } from "./technology.service";

export class TechnologyController {
  private technologyService: TechnologyService;

  constructor() {
    this.technologyService = new TechnologyService();
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { name } = req.body;
      const technology = await this.technologyService.createTechnology(name);
      res.status(201).json(technology);
    } catch (error) {
      res.status(500).json({ message: "Error creating technology" });
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const technologies = await this.technologyService.getTechnologies();
      res.status(200).json(technologies);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving technologies" });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const technology = await this.technologyService.getTechnologyById(id);
      if (!technology) {
        res.status(404).json({ message: "Technology not found" });
      } else {
        res.status(200).json(technology);
      }
    } catch (error) {
      res.status(500).json({ message: "Error retrieving technology" });
    }
  }
}
