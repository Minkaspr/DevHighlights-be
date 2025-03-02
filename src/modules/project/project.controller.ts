import { Request, Response } from "express";
import { ProjectService } from "./project.service";
import { ICreateProjectDTO } from "./project-dto";
import { getErrorMessage } from "../../utils/errors-helper";

export class ProjectController {
  private projectService: ProjectService;

  constructor() {
    this.projectService = new ProjectService();
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const projectData: ICreateProjectDTO = req.body;

      if (!projectData.projectCode || !projectData.detailsUrl || !projectData.imageUrl) {
        res.status(400).json({ message: "Missing required fields" });
        return;
      }

      const project = await this.projectService.createProject(projectData);
      res.status(201).json(project);
    } catch (error) {
      res.status(500).json({ message: "Error creating project", error: getErrorMessage(error) });
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const { languageCode } = req.params;

      if (!languageCode) {
        res.status(400).json({ message: "Missing languageCode parameter" });
        return;
      }

      const projects = await this.projectService.getProjects(languageCode);
      res.status(200).json(projects);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving projects", error: getErrorMessage(error) });
    }
  }

  async getProjectWithLanguages(req: Request, res: Response): Promise<void> {
    try {
      const { projectCode } = req.params;
      const project = await this.projectService.getProjectWithLanguages(projectCode);
  
      if (!project) {
        res.status(404).json({ message: "Project not found" });
      }
  
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving project", error: getErrorMessage(error) });
    }
  }

  async getByCode(req: Request, res: Response): Promise<void> {
    try {
      const { languageCode, projectCode } = req.params;

      if (!languageCode || !projectCode) {
        res.status(400).json({ message: "Missing languageCode or projectCode parameter" });
        return;
      }

      const project = await this.projectService.getProjectByCode(projectCode, languageCode);
      if (!project) {
        res.status(404).json({ message: "Project not found" });
        return;
      }

      res.status(200).json(project);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving project", error: getErrorMessage(error) });
    }
  }
}
