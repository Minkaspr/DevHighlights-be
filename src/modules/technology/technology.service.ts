import { TechnologyRepository } from "./technology.repository";
import { TechnologyEntity } from "./technology.entity";

export class TechnologyService {
  private technologyRepository = new TechnologyRepository();

  async createTechnology(name: string): Promise<TechnologyEntity> {
    return this.technologyRepository.createTechnology(name);
  }

  async getTechnologies(): Promise<TechnologyEntity[]> {
    return this.technologyRepository.getTechnologies();
  }

  async getTechnologyById(id: number): Promise<TechnologyEntity | null> {
    return this.technologyRepository.getTechnologyById(id);
  }
}