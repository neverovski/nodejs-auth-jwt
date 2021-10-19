import { FullRefreshToken, RefreshToken } from '../auth.type';

export interface ITokenService {
  generateAccessToken(body: Pick<RefreshToken, 'userId'>): string;
  generateRefreshToken(
    body: Omit<RefreshToken, 'jwtid' | 'expiredAt'>,
  ): Promise<string>;
  update(query: FullRefreshToken, body: RefreshToken): Promise<void>;
}