
    export type Role = "admin" | "participant" | "user";

    export type User = {
        userId: string,
        email: string,
        role:Role;
    }

    export type LoginForm = {
        email: string;
        password: string;
    }

    export type RegisterForm = {
        email: string; 
        password: string;
        firstname: string;
        lastname: string;
        role: Role;
    }

    export type TokenPayload = {
        userId: string;
        role: Role;
        email: string;
    }
