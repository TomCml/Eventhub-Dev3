import axios from "axios";
import type { ProjectsModel } from "../model/projects.model";
import type { IFetchProjects } from "./interfaces/fetch-projects.interface";

export class FetchProjectsApi implements IFetchProjects {
    async fetch(): Promise<ProjectsModel.Project[]> {
        try {
            const response = await axios.get(
                "http://localhost:8000/projects", {
                    withCredentials: true,
                }
            );

            if(!response.data.success) {
                throw new Error(response.data.error?.message || "Erreur inconnue");
            }

            return response.data.data;
        } catch (error) {
            if(error instanceof Error) {
                throw new Error(error.message);
            }

            throw new Error("Une erreur inattendue est survenue");
        }
    }
}