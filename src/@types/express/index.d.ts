type UserPayload = {
  email?: string;
  firstName?: string;
  isEmailConfirmed: boolean;
  lastName?: string;
  userId: number;
};

type JwtPayload = {
  jti: string;
  sub: number;
  typ: string;
} & UserPayload;

type UserSession = {
  browser?: string;
  domain?: string;
  engine?: string;
  ip?: string | null;
  os?: string;
  userAgent?: string;
};

type PayloadContext = {
  user: UserPayload;
  userSession?: UserSession;
};

declare namespace Express {
  export interface Request {
    params: any;
    raw: any;
    user: UserPayload;
    userSession?: UserSessionCtx;
  }
}
