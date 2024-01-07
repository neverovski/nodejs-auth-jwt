import type { Request as ExpressRequest } from 'express';

import { PlatformName, TokenType } from '@common/enums';
import { Context } from '@common/types';

export type AuthLogin = { email: Email; password: Password };
export type AuthLogout = { userId: Id };
export type AuthPlatform = { platform: PlatformName; token: string };
export type AuthRefreshToken = { refreshToken: Token };

export type AuthForgotPasswordByEmail = { email: Email };
export type AuthResetPasswordByEmail = AuthForgotPasswordByEmail & {
  password: Password;
  token: Token;
};

export type AuthVerifyEmail = { token: Token };

export type AuthToken = {
  accessToken: Token;
  refreshToken: Token;
  type: TokenType;
};

export type AuthCtx = Context;

export type AuthLoginRequest = ExpressRequest<unknown, unknown, AuthLogin>;
export type AuthLogoutRequest = ExpressRequest;
export type AuthPlatformRequest = ExpressRequest<
  unknown,
  unknown,
  AuthPlatform
>;
export type AuthRefreshTokenRequest = ExpressRequest<
  unknown,
  unknown,
  AuthRefreshToken
>;
export type AuthForgotPasswordByEmailRequest = ExpressRequest<
  unknown,
  unknown,
  AuthForgotPasswordByEmail
>;
export type AuthResetPasswordByEmailRequest = ExpressRequest<
  unknown,
  unknown,
  AuthResetPasswordByEmail
>;

//email/verify - GET send link to email
//email/verify/{token} - GET
//email/resend - GET
