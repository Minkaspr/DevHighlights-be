import { IProjectTechnology } from "./project-technology.entity";
import { ProjectTechnologyRepository } from "./project-technology.repository";

export class ProjectTechnologyService {
  private repository: ProjectTechnologyRepository;

  constructor() {
    this.repository = new ProjectTechnologyRepository();
  }

  async createProjectTechnologies(technologies: IProjectTechnology[], tx?: any) {
    return await this.repository.createMany(technologies, tx);
  }

  async getTechnologiesByProjectId(projectId: number) {
    const technologies = await this.repository.findTechnologiesByProjectId(projectId);
    return technologies.map(t => t.technology.name);
  }
}