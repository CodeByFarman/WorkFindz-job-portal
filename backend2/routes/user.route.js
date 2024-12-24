import express from "express";
import { login, logout, register, updateProfile, getAllUsers } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import protect from "../middlewares/authMiddleware.js";

 
const router = express.Router();

router.route("/register").post(register);
router.route("/get").get(getAllUsers);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/profile/update").put(isAuthenticated,updateProfile);

export default router;

