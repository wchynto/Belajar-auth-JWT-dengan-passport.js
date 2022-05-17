import express from "express";
import { register, login, verify } from "../controller/user_controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/verify", verify);

export default router;
