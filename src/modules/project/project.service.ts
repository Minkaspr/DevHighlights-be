import { ProjectRepository } from "./project.repository";
import { ProjectTextService } from "../project-text/project-text.service";
import { ProjectTechnologyService } from "../project-technology/project-technology.service";
import { PrismaClient } from "@prisma/client";
import { ProjectCreateRequestDTO } from "./project-dto";
import { IProject } from "./project.entity";
import { LanguageService } from "../language/language.service";
import { TechnologyService } from "../technology/technology.service";
import { IProjectText } from "../project-text/project-text.entity";
import { IProjectTechnology } from "../project-technology/project-technology.entity";
import { InternalServerError, NotFoundError, UniqueConstraintError } from "../../utils/error-types";
import { getErrorMessage } from "../../utils/error-helper";

const prisma = new PrismaClient();

export class ProjectService {
  private projectRepository: ProjectRepository;
  private projectTextService: ProjectTextService;
  private projectTechnologyService: ProjectTechnologyService;
  private languageService: LanguageService;
  private technologyService: TechnologyService;

  constructor() {
    this.projectRepository = new ProjectRepository();
    this.projectTextService = new ProjectTextService();
    this.projectTechnologyService = new ProjectTechnologyService();
    this.languageService = new LanguageService();
    this.technologyService = new TechnologyService();
  }

  async createProject(data: ProjectCreateRequestDTO) {
    try {
      const existingProject = await this.projectRepository.getByCode(data.projectCode);
      if (existingProject) {
        throw new UniqueConstraintError("projectCode");
      }

      return await prisma.$transaction(async (tx) => {
        const projectData: IProject = {
          projectCode: data.projectCode,
          detailsUrl: data.detailsUrl,
          imageUrl: data.imageUrl
        };
        const project = await this.projectRepository.create(projectData, tx);
  
        const projectTexts: IProjectText[] = await Promise.all(
          data.languages.map(async (lang) => {
            const language = await this.languageService.getLanguageByCode(lang.code);
            if (!language) throw new NotFoundError("language", "code", lang.code);
            return {
              projectId: project.id,
              languageId: language.id as number,
              title: lang.title,
              description: lang.description
            };
          })
        );
  
        await this.projectTextService.createProjectTexts(projectTexts, tx);
  
        const projectTechnologies: IProjectTechnology[] = await Promise.all(
          data.technologies.map(async (techName) => {
            const technology = await this.technologyService.getTechnologyByName(techName);
            if (!technology) throw new NotFoundError("technology", "technologyName", techName);
            return {
              projectId: project.id,
              technologyId: technology.id as number,
            };
          })
        );
  
        await this.projectTechnologyService.createProjectTechnologies(projectTechnologies, tx);
  
        return project;
      });
    } catch (error) {
      if (error instanceof NotFoundError || error instanceof UniqueConstraintError) {
        throw error;
      }
      throw new InternalServerError(getErrorMessage(error));
    }
  }

  async getProjects(languageCode: string) {
    const projects = await this.projectRepository.getAll(languageCode);

    return projects.map(project => ({
      id: project.id,
      projectCode: project.projectCode,
      detailsUrl: project.detailsUrl,
      imageUrl: project.imageUrl,
      texts: project.texts.length > 0 
      ? { 
          title: project.texts[0].title,
          description: project.texts[0].description
        }
      : null, 
      technologies: project.technologies.map(t => t.technology.name)
    }));
  }

  async getProjectWithLanguages(projectCode: string) {
    const project = await this.projectRepository.getProjectWithLanguages(projectCode);
    if (!project) throw new NotFoundError("project", "projectCode", projectCode);
  
    return {
      projectCode: project.projectCode,
      detailsUrl: project.detailsUrl,
      imageUrl: project.imageUrl,
      languages: project.texts.map(text => ({
        languageCode: text.language.code,
        title: text.title,
        description: text.description,
      })),
      technologies: project.technologies.map(t => t.technology.name),
    };
  }

  async getProjectByCode(projectCode: string, languageCode: string) {
    const project = await this.projectRepository.getByCode(projectCode);
    if (!project) throw new NotFoundError("project", "projectCode", projectCode);

    const language = await this.languageService.getLanguageByCode(languageCode);
    if (!language) throw new NotFoundError("language", "languageCode", languageCode);

    const technologies = await this.projectTechnologyService.getTechnologiesByProjectId(project.id);

    const text = await this.projectTextService.getTextByProjectIdAndLanguageId(project.id, language.id as number);

    return {
      id: project.id,
      projectCode: project.projectCode,
      detailsUrl: project.detailsUrl,
      imageUrl: project.imageUrl,
      texts: text ? { title: text.title, description: text.description } : null, 
      technologies, 
    };
  }
}
