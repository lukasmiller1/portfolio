export type ProjectType = "game" | "script" | "bot" | "website" | "other";

export interface Project {
  _id: string;
  name: string;
  description: string;
  source: string;
  price: number;
  image?: string | null;
  video?: string | null;
  type: ProjectType;
}

export interface ProjectsApiResponse {
  projects: Project[];
}
