import { Request, Response } from "express";
import { ProjectService } from "./project.service";
import { ProjectCreateRequestDTO } from "./project-dto";
import { dataResponse, successResponse } from "../../utils/api-response";
import { errorHandler } from "../../utils/error-handler";

export class ProjectController {
  private projectService: ProjectService;

  constructor() {
    this.projectService = new ProjectService();
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const projectData: ProjectCreateRequestDTO  = req.body;

      const project = await this.projectService.createProject(projectData);
      //res.status(201).json(project);
      successResponse(res, "Project created", 204);
    } catch (error) {
      //res.status(500).json({ message: "Error creating project", error: getErrorMessage(error) });
      //errorResponse(res, "Error creating project" + getErrorMessage(error), 500);
      errorHandler(res, error);
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const { languageCode } = req.params;
      const sortOrder = req.query.sortOrder === "asc" ? "asc" : "desc";

      const projects = await this.projectService.getProjects(languageCode, sortOrder);
      //res.status(200).json(projects);
      dataResponse(res, projects, "Projects retrieved successfully");
    } catch (error) {
      // res.status(500).json({ message: "Error retrieving projects", error: getErrorMessage(error) });
      //errorResponse(res, "Error retrieving projects " + getErrorMessage(error), 500);
      errorHandler(res, error);
    }
  }

  async getProjectWithLanguages(req: Request, res: Response): Promise<void> {
    try {
      const { projectCode } = req.params;
      const project = await this.projectService.getProjectWithLanguages(projectCode);

      //res.json(project);
      dataResponse(res, project, "Project retrieved successfully");
    } catch (error) {
      //res.status(500).json({ message: "Error retrieving project", error: getErrorMessage(error) });
      //errorResponse(res, "Error retrieving project " + getErrorMessage(error), 500);
      errorHandler(res, error);
    }
  }

  async getByCode(req: Request, res: Response): Promise<void> {
    try {
      const { languageCode, projectCode } = req.params;
      const project = await this.projectService.getProjectByCode(projectCode, languageCode);

      //res.status(200).json(project);
      dataResponse(res, project, "Project retrieved successfully");
    } catch (error) {
      //res.status(500).json({ message: "Error retrieving project", error: getErrorMessage(error) });
      //errorResponse(res, "Error retrieving project " + getErrorMessage(error), 500);
      errorHandler(res, error);
    }
  }
}
