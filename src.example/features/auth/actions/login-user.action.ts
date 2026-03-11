import type { Dependencies } from "../../../store/dependencies";
import type { AppDispatch, AppGetState } from "../../../store/store";
import * as AuthModel from "../domain/model/auth-model";
import { authSlice } from "../store/auth.slice";

export const loginUserAction = (form: AuthModel.LoginForm) => async (
    dispatch: AppDispatch,
    _: AppGetState,
    dependencies: Dependencies
) => {
    try {
        dispatch(authSlice.actions.loginUserLoading());
        const result = await dependencies.loginGateway.login(form);
        // AuthService.saveToken(result.token) // A SUPPRIMER 
        dispatch(authSlice.actions.loginUserSuccess(result));
    } catch (error) {
        let message = "Une erreur est survenue";
        if(error instanceof Error){
            message = error.message
        }

        dispatch(authSlice.actions.loginUserError(message))
    }
}