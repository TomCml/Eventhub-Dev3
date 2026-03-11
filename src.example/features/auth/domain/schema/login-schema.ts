import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string().email("Email invalide"),
    password: z.string().min(6, "Minimum 6 caractères"),

})

export type LoginFormSchema = z.infer<typeof LoginSchema>;
