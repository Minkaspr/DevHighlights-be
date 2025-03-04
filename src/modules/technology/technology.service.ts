import { TechnologyRepository } from "./technology.repository";
import { TechnologyEntity } from "./technology.entity";
import { NotFoundError } from "../../utils/error-types";

export class TechnologyService {
  private technologyRepository = new TechnologyRepository();

  async createTechnology(name: string): Promise<TechnologyEntity> {
    return this.technologyRepository.createTechnology(name);
  }

  async getTechnologies(): Promise<TechnologyEntity[]> {
    return this.technologyRepository.getTechnologies();
  }

  async getTechnologyById(id: number): Promise<TechnologyEntity | null> {
    const technology = await this.technologyRepository.getTechnologyById(id);
    if(!technology) throw new NotFoundError("technology", "id", id.toString());
    return technology;
    //return this.technologyRepository.getTechnologyById(id);
  }

  async getTechnologyByName(name: string): Promise<TechnologyEntity | null> {
    return this.technologyRepository.getTechnologyByName(name);
  }
}