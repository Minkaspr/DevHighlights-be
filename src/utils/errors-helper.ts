export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

export class UniqueConstraintError extends Error {
  statusCode: number;
  field: string;

  constructor(field: string, message?: string) {
    super(message || `El ${field} ya existe`);
    this.field = field;
    this.statusCode = 409;
  }
}

export class NotFoundError extends Error {
  statusCode: number;
  resource: string;
  field: string;
  value: string;

  constructor(resource: string, field: string, value: string) {
    super(`No se encontró ningún ${resource}. Valor de '${field}': '${value}'`);
    this.resource = resource;
    this.field = field;
    this.value = value;
    this.statusCode = 404;
  }
}

export class InternalServerError extends Error {
  statusCode: number;

  constructor(message = "Error interno del servidor") {
    super(message);
    this.statusCode = 500;
  }
}
