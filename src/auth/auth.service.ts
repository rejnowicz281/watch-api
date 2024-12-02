import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const user = await this.usersService.findOne(username);

    if (user?.password !== pass) throw new UnauthorizedException();

    const tokens = await this.getTokens(user.userId, user.username);

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  async getRefreshToken(userId: string) {
    return this.jwtService.signAsync(
      {
        sub: userId,
      },
      {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: '7d',
      },
    );
  }

  async getAccessToken(userId: string, username: string) {
    return this.jwtService.signAsync(
      {
        sub: userId,
        username,
      },
      {
        secret: process.env.ACCESS_TOKEN_SECRET,
        expiresIn: '15m',
      },
    );
  }

  async getTokens(userId: string, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.getAccessToken(userId, username),
      this.getRefreshToken(userId),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
