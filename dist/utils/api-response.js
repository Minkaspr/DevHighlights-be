"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.successResponse = exports.errorDetailsResponse = exports.dataResponse = void 0;
const apiResponse = (res, { status, message, data, errors }, statusCode = 200) => {
    const response = Object.fromEntries(Object.entries({ status, message, data, errors })
        .filter(([_, v]) => v !== undefined && v !== null));
    return res.status(statusCode).json(response);
};
const dataResponse = (res, data, message = "Data sent successfully", statusCode = 200) => {
    return apiResponse(res, { status: "success", message, data }, statusCode);
};
exports.dataResponse = dataResponse;
const errorDetailsResponse = (res, errors, message = "There was a problem with the request", statusCode = 400) => {
    return apiResponse(res, { status: "error", message, errors }, statusCode);
};
exports.errorDetailsResponse = errorDetailsResponse;
const successResponse = (res, message = "Operation successful", statusCode = 200) => {
    return apiResponse(res, { status: "success", message }, statusCode);
};
exports.successResponse = successResponse;
const errorResponse = (res, message = "There was a problem with the request", statusCode = 400) => {
    return apiResponse(res, { status: "error", message }, statusCode);
};
exports.errorResponse = errorResponse;
