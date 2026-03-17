import { Router } from "express";
import { register, login, getUser } from "../controllers/auth.controller";
import validate from "../middleware/validate";
import { registerSchema, loginSchema } from "../types/validation";
import authenticate from "../middleware/authenticate";

const router = Router();

// @route    Post /api/auth/register
// @desc     Register a new user
// @access   Public
router.post("/register", validate(registerSchema), register);

// @route    Post /api/auth/login
// @desc     Login user and return token
// @access   Public
router.post("/login", validate(loginSchema), login);

// @route    Get /api/auth/user
// @desc     Get current login user
// @access   Private
router.get("/user", authenticate, getUser);

export default router;
