import { useRef, useState } from "react";
import * as AuthModel from "../domain/model/auth-model";
import { RegisterFormHandler } from "../domain/form/register-form-handler";
import { useAppDispatch, type AppState } from "../../../store/store";
import { registerUserAction } from "../actions/register-user.action";
import { useSelector } from "react-redux";

export const useRegisterForm = () => {
    function updateField<K extends keyof AuthModel.RegisterForm>(
        key: K, value: AuthModel.RegisterForm[K]
    ) { 
        const newForm = registerForm.current.updateField(form, key, value);
        setForm(newForm)

        const validation = registerForm.current.validate(newForm);
        setErrors(validation.errors)
    }

    function isSubmittable() {
        return registerForm.current.isSubmittable(form)
    }

    function submit() { 
        dispatch(registerUserAction(form))
    }

    const dispatch = useAppDispatch();
    const [errors, setErrors] = useState<Partial<Record<keyof AuthModel.RegisterForm, string>>>({})
    const networkError = useSelector((state: AppState) => state.auth.error)
    const registerForm = useRef(new RegisterFormHandler());
    const [form, setForm] = useState<AuthModel.RegisterForm>({
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        role: "admin"
    })


    return {
        form,
        updateField,
        isSubmittable: isSubmittable(),
        submit,
        errors,
        networkError
    }

}