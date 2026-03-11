import { produce } from "immer";
import * as AuthModel from "../model/auth-model";
import { RegisterSchema } from "../schema/register-schema";


type ValidationError = Partial<Record<keyof AuthModel.RegisterForm, string>>;

export class RegisterFormHandler {
    updateField<K extends keyof AuthModel.RegisterForm>(
        form: AuthModel.RegisterForm, key: K, value: AuthModel.RegisterForm[K]
    ) {
        return produce(form, (draft) => {
            draft[key] = value
        });
    }

    isSubmittable(form: AuthModel.RegisterForm): boolean {
        return Object.values(form).every(value => value.trim().length > 0);
    }

    validate(form: AuthModel.RegisterForm): {
        isValid: boolean;
        errors: ValidationError
    } {
        const result = RegisterSchema.safeParse(form);

        if (result.success) {
            return {
                isValid: true,
                errors: {}
            };
        }
        const fieldErrors = result.error.formErrors.fieldErrors;


        const errors = Object.fromEntries(Object.entries(fieldErrors).map(([key, value]) => [key, value?.[0]])) as ValidationError;

        //         { email: ["email invalide"], firstname: ["min 2 caractères"]} 


        //         [
        //             ["email", ["email invalide"]], 
        //             ["firstname", ["min 2 caractères"]]
        //         ]

        //         [
        //             ["email", "Email invalide"], 
        //             ["firstname", "2 caractères"],
        //     ]
        // // fromEntries => Construit un objet à partir d'un tableau
        //         {email: "email invalide", firstname: "2 caractères"}
        return {
            isValid: false,
            errors
        }
    }
}

