import { Project } from "./project.model";

export interface ProjectResponse {
    error: boolean;
    data: Project[];
}
