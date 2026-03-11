import type { ProjectsModel } from "../../model/projects.model";

export interface IFetchProjects {
    fetch(): Promise<ProjectsModel.Project[]>;
}