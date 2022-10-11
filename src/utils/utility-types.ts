import { JSONSchema7 } from 'json-schema';
import { FindOneOptions } from 'typeorm';

export type OptionCtx<T> = Pick<
  FindOneOptions<T>,
  'where' | 'order' | 'relations'
>;

export type JWTPayload = {
  email: string;
  role: string;
  sub: number;
  userId: number;
};

export enum TokenType {
  BEARER = 'Bearer',
}

export enum LoggerType {
  DB = 'DB',
  HTTP = 'Http',
  QUEUE = 'Queue',
  SERVER = 'Server',
}

export enum Role {
  ANONYMOUS = 'anonymous',
  USER = 'user',
}

export type LoggerCtxInfo = {
  error?: Error | any;
  info?: string | any;
  message: string;
  type?: LoggerType;
};

export type LoggerCtxError = Required<
  Pick<LoggerCtxInfo, 'message' | 'error'>
> &
  Pick<LoggerCtxInfo, 'type'>;

export enum PostgresErrorCode {
  CheckViolation = '23514',
  ForeignKeyViolation = '23503',
  NotNullViolation = '23502',
  UniqueViolation = '23505',
}

export enum SocialNetwork {
  APPLE = 'apple',
  FACEBOOK = 'facebook',
  GITHUB = 'github',
  GOOGLE = 'google',
}

export type FacebookConfig = {
  fields: string;
  url: string;
};

export type AppleConfig = {
  url: string;
};

export type GoogleConfig = {
  clientId: string;
};

export type GitHubConfig = {
  url: string;
};

export type OptionStringSchema = {
  maxLength?: number;
  minLength?: number;
};

export type OptionNumberSchema = {
  maximum?: number;
  minimum?: number;
};

export interface JSONSchemaCustom extends JSONSchema7 {
  consumes?: string[];
  properties?: {
    [key: string]: JSONSchemaCustom | boolean;
  };
  transform?: string[];
}

export type RangeType = {
  max?: number | string | Date;
  min?: number | string | Date;
};
