import { Request, Response, NextFunction } from "express";
import logger from "../config/logger";
import { Role } from "../types/auth.types";

const authorise = (...roles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    // Check if user exists on request
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Access denied. Not Authenticated.",
      });
      return;
    }

    // Check user login role is in allow roles
    if (!roles.includes(req.user.role)) {
      logger.warn(
        `Unauthorised access attempt by ${req.user.email}
            with role ${req.user.role} on route requiring ${roles.join(", ")}`,
      );
      res.status(403).json({
        success: false,
        message: `Access denied. Required role: ${roles.join(" or ")}.`,
      });
      return;
    }
    next();
  };
};

export default authorise;
