import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { UserPayload } from "../domain/entities/User";
import { getEnvVariable } from "./utils";

export const generateSalt = async () => {
    return bcrypt.genSalt();
}

export const hashPassword = async (password: string, salt: string) => {
    return bcrypt.hash(password, salt)
}


export const isValidPassword = async (
    enteredPassword: string,
    savedPassword: string,
    salt: string
) => {
    return await hashPassword(enteredPassword, salt) === savedPassword
}

export const generateSignature = (payload: UserPayload) => {
    const SECRET_KEY = getEnvVariable("JWT_SECRET");
    return jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });
}

export const validateSignature = (req: any) => {
    let signature = req.cookies?.token;
    if (!signature) {
        signature = req.get("Authorization");
    }
    
    if (signature) {
        const token = signature.startsWith("Bearer ") ? signature.split(" ")[1] : signature;
        const payload = jwt.verify(token, getEnvVariable("JWT_SECRET")) as UserPayload;
        req.user = payload;
        return true;
    }
    return false;
}


//Merci Bocar