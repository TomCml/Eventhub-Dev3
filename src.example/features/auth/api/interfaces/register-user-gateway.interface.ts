import * as AuthModel from "../../domain/model/auth-model";

export interface IRegisterGateway {
    register(payload: AuthModel.RegisterForm): Promise<{userId: string}>;
}