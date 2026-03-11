import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import * as AuthModel from "../domain/model/auth-model"
export type AuthState = {
    status: "idle" | "loading" | "success" | "error";
    error: string | null;
    userId: string | null;
    isAuthenticated: boolean;
    user: AuthModel.User
}

const initialState: AuthState = {
    status: "idle",
    userId: null,
    error: null,
    isAuthenticated: false,
    user: {
        userId: "",
        email: "",
        role: "user"
    }

}

export const authSlice = createSlice({
    name: "auth",
    initialState, 
    reducers: {
        registerUserLoading: (state) =>  {
            state.status = "loading";
            state.error = null;
        }, 

        registerUserSuccess: (state, action: PayloadAction<{userId: string}>) => {
            state.status = "success";
            state.error = null;
            state.userId = action.payload.userId
        },

        registerUserError: (state, action: PayloadAction<string>) => {
            state.status = "error";
            state.error = action.payload
        },

        loginUserLoading: (state) => {
            state.status = "loading";
            state.error = null;
            state.user.email = "";
            state.user.role = "user";
            state.user.userId = "";
        },
        loginUserSuccess: (state, action: PayloadAction<AuthModel.User> ) => {
            state.status = "success";
            state.error = null;
            state.isAuthenticated = true;
            state.user.email = action.payload.email;
            state.user.role = action.payload.role;
            state.user.userId = action.payload.userId
        },
        loginUserError: (state, action: PayloadAction<string>) => {
            state.status = "error";
            state.error = action.payload;
            state.user.userId = "";
            state.user.email = "";
            state.user.role = "user";
        },

        logout: (state) =>{
            state.user.email = "";
            state.user.role = "user";
            state.user.userId = "";
            state.isAuthenticated = false;
            state.error = null;
            state.status = "idle";
        }, 

        hydrateAuth: (state, action: PayloadAction<AuthModel.User>) => {
            state.user.email = action.payload.email;
            state.user.role = action.payload.role;
            state.isAuthenticated = true;
            state.error = null;
            state.status = "success";
        }

    }
})