import { ProjectRepository } from "./project.repository";
import { ProjectTextService } from "../project-text/project-text.service";
import { ProjectTechnologyService } from "../project-technology/project-technology.service";
import { PrismaClient } from "@prisma/client";
import { ICreateProjectDTO } from "./project-dto";
import { IProject } from "./project.entity";
import { LanguageService } from "../language/language.service";
import { TechnologyService } from "../technology/technology.service";
import { IProjectText } from "../project-text/project-text.entity";
import { IProjectTechnology } from "../project-technology/project-technology.entity";
import { getErrorMessage } from "../../utils/errors-helper";

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

  async createProject(data: ICreateProjectDTO) {
    try {
      return await prisma.$transaction(async (tx) => {
        const projectData: IProject = {
          projectCode: data.projectCode,
          detailsUrl: data.detailsUrl,
          imageUrl: data.imageUrl
        };
        const project = await this.projectRepository.create(projectData, tx);
  
        const projectTexts: IProjectText[] = await Promise.all(
          data.languages.map(async (lang: any) => {
            const language = await this.languageService.getLanguageByCode(lang.languageCode);
            if (!language) {
              throw new Error(`Language with code ${lang.languageCode} not found`);
            }
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
            if (!technology) throw new Error(`Technology '${techName}' not found`);
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
      console.error("Error creating project:", getErrorMessage(error));
      throw new Error("Failed to create project. Transaction rolled back.");
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
      technologies: project.technologies.map(t => t.technology.name) // Devolvemos solo los nombres de las tecnologías
    }));
  }

  async getProjectWithLanguages(projectCode: string) {
    const project = await this.projectRepository.getProjectWithLanguages(projectCode);
  
    if (!project) return null;
  
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
    if (!project) return null;

    // Obtener el ID del idioma a partir del código
    const language = await this.languageService.getLanguageByCode(languageCode);
    if (!language) return null; // Si el idioma no existe, devolvemos null

    // Obtener las tecnologías usando el servicio correspondiente
    const technologies = await this.projectTechnologyService.getTechnologiesByProjectId(project.id);

    // Obtener los textos en base al idioma
    const text = await this.projectTextService.getTextByProjectIdAndLanguageId(project.id, language.id as number);

    return {
      id: project.id,
      projectCode: project.projectCode,
      detailsUrl: project.detailsUrl,
      imageUrl: project.imageUrl,
      texts: text ? { title: text.title, description: text.description } : null, // Convertimos texts en objeto
      technologies, // Aquí ya es un array de nombres de tecnologías
    };
  }
}
