export enum HttpStatus {
  OK = 200,
  Created = 201,
  NoContent = 204,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  Conflict = 409,
  UnprocessableEntity = 422,
  InternalServerError = 500,
}

export enum MessageCode {
  BAD_REQUEST = 'BAD_REQUEST',
  DB_ERROR = 'DB_ERROR',
  DELETE_ERROR = 'DELETE_ERROR',
  EMAIL_ALREADY_TAKEN = 'EMAIL_ALREADY_TAKEN',
  EMPTY_BODY = 'EMPTY_BODY',
  EXTERNAL = 'EXTERNAL',
  FORBIDDEN = 'FORBIDDEN',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  NOT_FOUND = 'NOT_FOUND',
  OK = 'OK',
  REFRESH_TOKEN_EXPIRED = 'REFRESH_TOKEN_EXPIRED',
  REFRESH_TOKEN_VERIFY = 'REFRESH_TOKEN_VERIFY',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  TOKEN_MALFORMED = 'TOKEN_MALFORMED',
  TOKEN_NOT_PROVIDED = 'TOKEN_NOT_PROVIDED',
  TOKEN_VERIFY = 'TOKEN_VERIFY',
  UNPROCESSABLE_ENTITY = 'UNPROCESSABLE_ENTITY',
}
