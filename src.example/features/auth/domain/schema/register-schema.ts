import { z } from "zod";

export const RegisterSchema = z.object({
    email: z.string().email("Email invalide"),
    password: z.string().min(6, "Minimum 6 caractères"),
    firstname: z.string().min(2, "Le prénom est requis"),
    lastname: z.string().min(2, "Le nom est requis"),
    role: z.enum(["admin", "participant", "user"], {
        errorMap: () => ({message: "Le rôle est requis" })
    })
})

export type RegisterFormSchema = z.infer<typeof RegisterSchema>;
