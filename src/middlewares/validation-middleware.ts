import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { errorDetailsResponse } from "../utils/api-response";


export const validateRequest = (customMessage = "Validation error") => (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Lista plana de errores
    /* const formattedErrors = errors.array().map(err => {
      if (err.type === "field") {
        return { field: err.path, message: err.msg }; 
      }
      return { field: "unknown", message: err.msg };
    }); */

    // Agrupando errores por campo
    const formattedErrors = errors.array().reduce((acc, err) => {
      if (err.type === "field") {
        if (!acc[err.path]) acc[err.path] = []; 
        acc[err.path].push(err.msg);
      }
      return acc;
    }, {} as Record<string, string[]>);
    errorDetailsResponse(res, formattedErrors, customMessage, 400);
    return;
  }
  next();
};
