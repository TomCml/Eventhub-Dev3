import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import * as DashboardModel from "../model/dashboard.model";

export type DashboardState = {
    status: "idle" | "loading" | "success" | "error";
    data: DashboardModel.PageViewData[];
    error: string | null;
}

const initialState: DashboardState = {
    status: "idle",
    data: [],
    error: null
}

export const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        fetchViewsLoading: (state) => {
            state.status = "loading";
            state.error = null;
        },
        fetchViewsSuccess: (state, action: PayloadAction<DashboardModel.PageViewData[]>) => {
            state.status = "success";
            state.data = action.payload;
            state.error = null;
        },
        fetchViewsError: (state, action: PayloadAction<string>) => {
            state.status = "error";
            state.error = action.payload
        }
    }

})