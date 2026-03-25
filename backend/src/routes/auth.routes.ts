import { Router } from "express";
import { register, login, getUser } from "../controllers/auth.controller";
import validate from "../middleware/validate";
import { registerSchema, loginSchema } from "../types/validation";
import authenticate from "../middleware/authenticate";
import authorise from "../middleware/authorise";

const router = Router();

// @route    POST /api/auth/register
// @desc     Register a new user
// @access   Public
router.post("/register", validate(registerSchema), register);

// @route    POST /api/auth/login
// @desc     Login user and return token
// @access   Public
router.post("/login", validate(loginSchema), login);

// @route    GET /api/auth/user
// @desc     Get current login user
// @access   Private
router.get("/user", authenticate, getUser);

// @route    GET /api/auth/admin-only
// @desc     Test admin only route
// @access   Admin only
router.get("/admin-only", authenticate, authorise("admin"), (req, res) => {
  res.json({
    success: true,
    message: `Welcome Admin ${req.user?.email}`,
  });
});

// @route    GET /api/auth/family-senior
// @desc     Test family and senior route
// @access   Family and senior
router.get(
  "/family-senior",
  authenticate,
  authorise("family", "senior"),
  (req, res) => {
    res.json({
      success: true,
      message: `Welcome ${req.user?.role} - ${req.user?.email}`,
    });
  },
);

export default router;
