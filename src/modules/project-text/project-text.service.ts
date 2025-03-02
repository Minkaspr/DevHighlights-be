import { IProjectText } from "./project-text.entity";
import { ProjectTextRepository } from "./project-text.repository";

export class ProjectTextService {
  private repository: ProjectTextRepository;

  constructor() {
    this.repository = new ProjectTextRepository();
  }

  async createProjectTexts(texts: IProjectText[], tx?: any) {
    return await this.repository.createMany(texts, tx);
  }

  async getAllTextsByProjectId(projectId: number) {
    return await this.repository.getAllByProjectId(projectId);
  }

  async getTextByProjectIdAndLanguageId(projectId: number, languageId: number) {
    return await this.repository.getByProjectIdAndLanguageId(projectId, languageId);
  }
}