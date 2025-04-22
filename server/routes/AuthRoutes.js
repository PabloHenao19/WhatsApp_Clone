import { Router } from "express";
import { checkUser, onBoardUser } from "../controllers/AuthController.js";

const router = Router();

// Verifica si un usuario existe por email
router.post("/check-user", checkUser);
// Registra un nuevo usuario
router.post("/onboard-user", onBoardUser);

export default router;