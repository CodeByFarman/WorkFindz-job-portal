import express from "express";
import { validateSession } from "../controllers/authController.js"; // Update path as needed

const router = express.Router();

router.get("/validate-session", validateSession);

export default router;
