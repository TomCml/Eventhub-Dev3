
import { authSlice } from "../store/auth.slice";

export const fetchMeAction = () => async (
    dispatch: any,
    _: any,
    dependencies: any
) => {
    try {
        const result = await dependencies.fetchMe.fetchMe()
        dispatch(authSlice.actions.hydrateAuth(result))
    } catch {
        dispatch(authSlice.actions.logout())
    }
}