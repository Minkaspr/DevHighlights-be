"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const api_response_1 = require("./api-response");
const error_helper_1 = require("./error-helper");
function errorHandler(res, error) {
    if (error instanceof Error) {
        if ("statusCode" in error) {
            return (0, api_response_1.errorResponse)(res, error.message, error.statusCode);
        }
    }
    return (0, api_response_1.errorResponse)(res, "Internal Server Error: " + (0, error_helper_1.getErrorMessage)(error), 500);
}
