import { useRef, useState } from "react";
import { useAppDispatch, type AppState } from "../../../store/store";
import * as AuthModel from "../domain/model/auth-model";
import { LoginFormHandler } from "../domain/form/login-form-handler";
import { loginUserAction } from "../actions/login-user.action";
import { useSelector } from "react-redux";

export const useLoginForm = () => {
    function updateField<K extends keyof AuthModel.LoginForm>(
        key: K, value: AuthModel.LoginForm[K]
    ) {
        const newForm = loginForm.current.updateField(form, key, value);
        setForm(newForm);

        const validation = loginForm.current.validate(newForm);
        setErrors(validation.errors);
    }

    function isSubmittable() {
        return loginForm.current.isSubmittable(form);
    }

    function submit(){
        dispatch(loginUserAction(form))
    }



    const dispatch = useAppDispatch();
    const loginForm = useRef(new LoginFormHandler());
    const [form, setForm] = useState<AuthModel.LoginForm>({
        email: "",
        password: ""
    })

    const [errors, setErrors] = useState<Partial<Record<keyof AuthModel.LoginForm, string >>>({});
    const networkError = useSelector((state: AppState) => state.auth.error);
    return {
        form,
        updateField,
        isSubmittable: isSubmittable(),
        submit,
        errors,
        networkError
    }
}