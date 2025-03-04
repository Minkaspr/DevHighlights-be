import { Response } from "express";

const apiResponse = (
  res: Response,
  { status, message, data, errors }: any,
  statusCode: number = 200
) => {
  const response = Object.fromEntries(
    Object.entries({ status, message, data, errors })
      .filter(([_, v]) => v !== undefined && v !== null)
  );

  return res.status(statusCode).json(response);
};

export const dataResponse = (res: Response, data: any, message = "Data sent successfully", statusCode = 200) => {
  return apiResponse(res, { status: "success", message, data }, statusCode);
};

export const errorDetailsResponse = (res: Response, errors: any, message = "There was a problem with the request", statusCode = 400) => {
  return apiResponse(res, { status: "error", message, errors }, statusCode);
};

export const successResponse = (res: Response, message = "Operation successful", statusCode = 200) => {
  return apiResponse(res, { status: "success", message }, statusCode);
};

export const errorResponse = (res: Response, message = "There was a problem with the request", statusCode = 400) => {
  return apiResponse(res, { status: "error", message }, statusCode);
};
