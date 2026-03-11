import { projectListSlice } from "../slice/project-list.slice";

export const fetchProjectsAction = () => async (
    dispatch: any,
    _: any,
    dependencies: any
) => {
    try {
        dispatch(projectListSlice.actions.fetchProjectsLoading());
        const result = await dependencies.fetchProjects.fetch();
        dispatch(projectListSlice.actions.fetchProjectsSuccess(result));
    } catch (error) {
        let message = "Une erreur est survenue";
        if (error instanceof Error) {
            message = error.message;
        }
        dispatch(projectListSlice.actions.fetchProjectsError(message));
    }
}