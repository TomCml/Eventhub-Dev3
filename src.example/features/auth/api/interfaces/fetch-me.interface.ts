import * as AuthModel from "../../domain/model/auth-model";
export interface IFetchMeInterface{
    fetchMe(): Promise<AuthModel.User>;
}