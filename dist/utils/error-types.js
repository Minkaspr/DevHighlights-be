"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerError = exports.NotFoundError = exports.UniqueConstraintError = void 0;
class UniqueConstraintError extends Error {
    constructor(field, message) {
        super(message || `The ${field} already exists`);
        this.field = field;
        this.statusCode = 409;
    }
}
exports.UniqueConstraintError = UniqueConstraintError;
class NotFoundError extends Error {
    constructor(resource, field, value) {
        super(`No ${resource} found. '${field}' value: '${value}'`);
        this.resource = resource;
        this.field = field;
        this.value = value;
        this.statusCode = 404;
    }
}
exports.NotFoundError = NotFoundError;
class InternalServerError extends Error {
    constructor(errorMessage) {
        const message = "Internal Server Error" + (errorMessage ? `: ${errorMessage}` : "");
        super(message);
        this.statusCode = 500;
    }
}
exports.InternalServerError = InternalServerError;
