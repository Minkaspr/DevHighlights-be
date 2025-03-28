export interface ProjectCreateRequestDTO {
  projectCode: string;
  detailsUrl: string;
  imageUrl: string;
  languages: {
    code: string;
    title: string;
    description: string;
  }[];
  technologies: string[];
}
