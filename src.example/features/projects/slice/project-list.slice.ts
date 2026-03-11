import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ProjectsModel } from "../model/projects.model";

export type ProjectListState = {
    status: "idle" | "loading" | "success" | "error";
    projects: ProjectsModel.Project[];
    error: string | null;
}

const initialState: ProjectListState = {
    status: "idle",
    projects: [],
    error: null,
}

export const projectListSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {
        fetchProjectsLoading: (state) => {
            state.status = "loading";
            state.error = null;
            state.projects = [];
        },
        fetchProjectsError: (state, action: PayloadAction<string>) => {
            state.status = "error";
            state.error = action.payload;
            state.projects = [];
        },
        fetchProjectsSuccess: (state, action: PayloadAction<ProjectsModel.Project[]>) => {
            state.projects = action.payload;
            state.status = "success";
            state.error = null;
        },
    }
})