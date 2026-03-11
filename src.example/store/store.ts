import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import type { Dependencies } from "./dependencies";
import { authSlice } from "../features/auth/store/auth.slice";
import { projectListSlice } from "../features/projects/slice/project-list.slice";
import { analyticsSlice } from "../features/analytics/store/analytics.slice";
import { dashboardSlice } from "../features/dashboard/store/dashboard.slice";

const reducers = combineReducers({
    auth: authSlice.reducer,
    projects: projectListSlice.reducer,
    analytics: analyticsSlice.reducer,
    dashboard: dashboardSlice.reducer
});

export type AppStore = ReturnType<typeof createStore>;
export type AppState = ReturnType<typeof reducers>;
export type AppDispatch = AppStore["dispatch"];
export type AppGetState = AppStore["getState"];


export const createStore = (config: {
    dependencies: Dependencies;
}) => {
    const store = configureStore({
        reducer: reducers,
        devTools: true,
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware({
                thunk: {
                    extraArgument: config.dependencies,
                }
            })
        }
    })

    return store;
}

export const useAppDispatch = () => useDispatch<AppDispatch>();