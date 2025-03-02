"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerError = exports.NotFoundError = exports.UniqueConstraintError = void 0;
exports.getErrorMessage = getErrorMessage;
function getErrorMessage(error) {
    if (error instanceof Error)
        return error.message;
    return String(error);
}
class UniqueConstraintError extends Error {
    constructor(field, message) {
        super(message || `El ${field} ya existe`);
        this.field = field;
        this.statusCode = 409;
    }
}
exports.UniqueConstraintError = UniqueConstraintError;
class NotFoundError extends Error {
    constructor(resource, field, value) {
        super(`No se encontró ningún ${resource}. Valor de '${field}': '${value}'`);
        this.resource = resource;
        this.field = field;
        this.value = value;
        this.statusCode = 404;
    }
}
exports.NotFoundError = NotFoundError;
class InternalServerError extends Error {
    constructor(message = "Error interno del servidor") {
        super(message);
        this.statusCode = 500;
    }
}
exports.InternalServerError = InternalServerError;
