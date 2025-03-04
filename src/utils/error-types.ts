export class UniqueConstraintError extends Error {
  statusCode: number;
  field: string;

  constructor(field: string, message?: string) {
    super(message || `The ${field} already exists`);
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
    super(`No ${resource} found. '${field}' value: '${value}'`);
    this.resource = resource;
    this.field = field;
    this.value = value;
    this.statusCode = 404;
  }
}

export class InternalServerError extends Error {
  statusCode: number;

  constructor(errorMessage?: string) {
    const message = "Internal Server Error" + (errorMessage ? `: ${errorMessage}` : "");
    super(message);
    this.statusCode = 500;
  }
}
