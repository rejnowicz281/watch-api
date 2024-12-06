import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Response } from 'express';
import { Strategy } from 'passport-jwt';
import { RefreshTokenPayload } from 'src/lib/types/jwt';
import { refreshTokenExtractor } from 'src/lib/utils/jwt.utilts';
import { AuthService } from '../auth.service';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: refreshTokenExtractor,
      secretOrKey: process.env.REFRESH_TOKEN_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req: Response, payload: RefreshTokenPayload) {
    const user = await this.authService.validateUser(payload.sub);

    if (!user) throw new Error('Invalid User');

    return user;
  }
}
