import { Response } from "express";
import { errorResponse } from "./api-response";
import { getErrorMessage } from "./error-helper";

export function errorHandler(res: Response, error: unknown) {
  if (error instanceof Error) {
    if ("statusCode" in error) {
      return errorResponse(res, error.message, (error as any).statusCode);
    }
  }

  return errorResponse(res, "Internal Server Error: " + getErrorMessage(error), 500);
}