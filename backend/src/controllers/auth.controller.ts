import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import pool from "../config/db";
import logger from "../config/logger";
import { RegisterInput, LoginInput } from "../types/validation";
import { JwtPayload } from "../types/auth.types";

//==============================================================
// REGISTER
//==============================================================
export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password, role, first_name, last_name, phone }: RegisterInput =
    req.body;

  try {
    // Check if email already exists
    const exisitingUser = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email],
    );
    if (exisitingUser.rows.length > 0) {
      res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });
      return;
    }
    // Hash the password
    const saltRounds = 12;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    // Insert new user into database
    const newUser = await pool.query(
      `INSERT INTO users (email, password, role, first_name, last_name, phone) 
      VALUES ($1, $2, $3, $4, $5, $6) 
      Returning id, email, role, first_name, last_name, phone, created_at`,
      [email, hashPassword, role, first_name, last_name, phone],
    );

    const user = newUser.rows[0];

    if (role === "senior") {
      await pool.query(`INSERT INTO seniors (user_id) VALUES ($1)`, [user.id]);

      // Create default reminder at 9am
      const seniorRecord = await pool.query(
        "SELECT id FROM seniors WHERE user_id = $1",
        [user.id],
      );

      await pool.query(
        `INSERT INTO reminders (senior_id, reminder_time, grace_period_minutes)
        VALUES ($1, '09:00:00', 60)`,
        [seniorRecord.rows[0].id],
      );

      logger.info(`Senior profile created for user: ${email}`);
    }
    // Generate JWT token
    const payload: JwtPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const secret = process.env.JWT_SECRET as Secret;
    const options: SignOptions = {
      expiresIn: (process.env.JWT_EXPIRES_IN ||
        "7d") as SignOptions["expiresIn"],
    };

    const token = jwt.sign(payload, secret, options);

    logger.info(`New user registered: ${email} as ${role}`);

    // Send response
    res.status(201).json({
      success: true,
      message: "Account created successfully",
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
      },
    });
  } catch (error) {
    logger.error(`Registration error: ${error}`);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//===========================================================
// LOGIN
//===========================================================

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password }: LoginInput = req.body;

  try {
    // Find user by email
    const result = await pool.query(
      `SELECT id, email, password, role, first_name, last_name, phone, is_active FROM users WHERE email = $1`,
      [email],
    );

    if (result.rows.length === 0) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
      return;
    }

    const user = result.rows[0];

    // Check if account is active
    if (!user.is_active) {
      res.status(403).json({
        success: false,
        message: "Your account has been deactivate. Please contact support.",
      });
      return;
    }

    // Compare password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      logger.warn(`Failed login attempt for email: ${email}`);
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
      return;
    }

    // Generate JWT token
    const payload: JwtPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const secret = process.env.JWT_SECRET as Secret;
    const options: SignOptions = {
      expiresIn: (process.env.JWT_EXPIRES_IN ||
        "7d") as SignOptions["expiresIn"],
    };

    const token = jwt.sign(payload, secret, options);

    logger.info(`User logged in: ${email}`);

    // Send response
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.LastName,
        phone: user.phone,
      },
    });
  } catch (error) {
    logger.error(`Login error: ${error}`);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//===========================================================
// GET CURRENT USER
//===========================================================

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.userId;
    const result = await pool.query(
      `SELECT id, email, role, first_name, last_name, phone, is_active, created_at FROM users WHERE id = $1`,
      [userId],
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        suceess: false,
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      user: result.rows[0],
    });
  } catch (error) {
    logger.error(`Get current user error: ${error}`);
    res.status(500).json({
      succes: false,
      message: "Internal server error",
    });
  }
};
