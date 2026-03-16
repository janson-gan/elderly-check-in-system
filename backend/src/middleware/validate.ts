import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";
import logger from "../config/logger";

// This is to check the incoming request body is valid

// The validate take in Zod as input type
const validate = (schema: ZodType) => {
  // Return express middleware function
  return (req: Request, res: Response, next: NextFunction): void => {
    // To validate the request body against the schema
    const result = schema.safeParse(req.body);
    // If result fail the validation
    if (!result.success) {
      // Collect all issues into field and message
      const errors = result.error.issues.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));
      logger.warn(`Validation failed: ${JSON.stringify(errors)}`);

      // Response with status code of 400 bad request and JSON error message response
      // and stop the process
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
      return;
    }
    // If validation is successful store the request body into result data
    // and proceed to next middleware or route handler
    req.body = result.data;
    next();
  };
};

export default validate;
