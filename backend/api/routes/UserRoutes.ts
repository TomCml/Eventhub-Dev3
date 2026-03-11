import { Router } from "express";
import { AuthMiddleware } from "../middlewares";
import { register, login, getProfile, logout } from "../controllers/UserControllers";

const router = Router();

// POST /users/register - Inscription
router.post("/register", register);

// POST /users/login - Connexion
router.post("/login", login);

// GET /users/profile - Profil (protégé)
router.get("/profile", AuthMiddleware, getProfile);

// GET /users/logout - Déconnexion
router.post("/logout", AuthMiddleware, logout);

export default router as Router;
