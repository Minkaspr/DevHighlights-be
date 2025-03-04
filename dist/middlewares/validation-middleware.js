"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const express_validator_1 = require("express-validator");
const api_response_1 = require("../utils/api-response");
const validateRequest = (customMessage = "Validation error") => (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
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
                if (!acc[err.path])
                    acc[err.path] = [];
                acc[err.path].push(err.msg);
            }
            return acc;
        }, {});
        (0, api_response_1.errorDetailsResponse)(res, formattedErrors, customMessage, 400);
        return;
    }
    next();
};
exports.validateRequest = validateRequest;
