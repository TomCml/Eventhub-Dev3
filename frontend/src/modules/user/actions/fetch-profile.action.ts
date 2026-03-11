import { hydrateProfile } from "../store/user.slice";
import type { AppDispatch, AppGetState } from "../../store/store";
import type { Dependencies } from "../../store/dependencies";
import { hydrateAuth, logout } from "../../authentification/store/auth.slice";

export const fetchProfileAction = () => async (
    dispatch: AppDispatch,
    _getState: AppGetState,
    dependencies: Dependencies
) => {
    try {
        const profile = await dependencies.userGateway.getProfile();
        dispatch(hydrateProfile(profile));
        dispatch(hydrateAuth());
    } catch (error) {
        console.error("Hydration failed, logging out", error);
        dispatch(logout());
    }
};
