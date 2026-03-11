import type { IRegisterGateway } from "./interfaces/register-user-gateway.interface";
import * as AuthModel from "../domain/model/auth-model";
import axios from "axios";

export class RegisterUserApi implements IRegisterGateway {
    async register(payload: AuthModel.RegisterForm): Promise<{ userId: string }> {
        try {
            const response = await axios.post("http://localhost:8000/auth/register", payload);

            if(!response.data.success){
                throw new Error(response.data.error?.message || "Erreur inconnue");
            }
            return response.data.data;

        } catch (error) {
            if(axios.isAxiosError(error) && error.response?.data.error.message){
                throw new Error(error.response.data.error.message)
            }

            throw new Error("Une erreur inattendue est survenue")
        }
    }
}