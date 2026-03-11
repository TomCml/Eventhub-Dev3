import type { Dependencies } from "../../../store/dependencies";
import type { AppDispatch, AppGetState } from "../../../store/store";
import { dashboardSlice } from "../store/dashboard.slice";

export const fetchViewsPerPage = () => async (
    dispatch: AppDispatch,
    _: AppGetState,
    dependencies: Dependencies
) => {
    try {
        dispatch(dashboardSlice.actions.fetchViewsLoading());
        const data = await dependencies.dashboardQuery.fetchViewsPerPage();
        dispatch(dashboardSlice.actions.fetchViewsSuccess(data))
    } catch (error) {
        let message = "Erreur dashboard";
        if(error instanceof Error) {
            message = error.message;
        }
        dispatch(dashboardSlice.actions.fetchViewsError(message))
    }
}