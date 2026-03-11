import type { ILoginGateway } from "./interfaces/login-user-gateway.interface";
import * as AuthModel from "../domain/model/auth-model"
import axios from "axios";

export class LoginUserApi implements ILoginGateway {
    async login(payload: AuthModel.LoginForm): Promise<AuthModel.User> {
        try {
            const response = await axios.post("http://localhost:8000/auth/login", payload, {
                withCredentials: true,
            });

            if(!response.data.success){
                throw new Error(response.data.error?.message || "Erreur inconnue");
            }

            return response.data.data.user
        } catch (error) {
          if(axios.isAxiosError(error) && error.response?.data?.error?.message){
            throw new Error(error.response.data.error.message)
          }  
          throw new Error("Une erreur inattendue est survenue");
        }
    }
}