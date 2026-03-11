
import type { Dependencies } from "../../../store/dependencies";
import type { AppDispatch, AppGetState } from "../../../store/store";
import * as AuthModel from "../domain/model/auth-model";
import { authSlice } from "../store/auth.slice";

export const registerUserAction = (form: AuthModel.RegisterForm) => async (
    dispatch: AppDispatch,
    getState: AppGetState,
    dependencies: Dependencies
) => {
    try {
        dispatch(authSlice.actions.registerUserLoading());
        const result = await dependencies.registerGateway.register(form);
        dispatch(authSlice.actions.registerUserSuccess(result));
    } catch (error) {
        let message = "Une erreur est survenue";
        if(error instanceof Error) {
            message = error.message
        }
        dispatch(authSlice.actions.registerUserError(message))
    }
}