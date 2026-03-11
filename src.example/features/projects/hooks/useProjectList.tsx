import { useSelector } from "react-redux";
import { useAppDispatch, type AppState } from "../../../store/store"
import type { ProjectsModel } from "../model/projects.model";
import { fetchProjectsAction } from "../actions/fetch-projects.action";
import { useEffect } from "react";

export const useProjectList = () => {

    const dispatch = useAppDispatch();
    
    useEffect(() => {
        dispatch(fetchProjectsAction());
    }, [dispatch]);

    const projects: ProjectsModel.Project[] = useSelector((state: AppState) => state.projects.projects);

    return {
        projects
    };
}