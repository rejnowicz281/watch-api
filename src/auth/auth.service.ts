import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp(
    email: string,
    pass: string,
  ): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const hashedPass = await bcrypt.hash(pass, 10);

    const newUser = await this.userService
      .create({
        email,
        password: hashedPass,
      })
      .catch(() => {
        throw new UnauthorizedException('Email already exists');
      });

    const tokens = await this.getTokens(newUser._id.toString(), email);

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  async signIn(
    email: string,
    pass: string,
  ): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const user = await this.userService.findByEmail(email);

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const compare = await bcrypt.compare(pass, user.password);

    if (!compare) throw new UnauthorizedException('Invalid credentials');

    const tokens = await this.getTokens(user._id.toString(), email);

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

  async getAccessToken(userId: string, email?: string, name?: string) {
    return this.jwtService.signAsync(
      {
        sub: userId,
        name,
        email,
      },
      {
        secret: process.env.ACCESS_TOKEN_SECRET,
        expiresIn: '15m',
      },
    );
  }

  async getTokens(userId: string, email?: string, name?: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.getAccessToken(userId, email, name),
      this.getRefreshToken(userId),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async validateUser(id: string) {
    const user = await this.userService.findById(id);

    if (!user) return null;

    const { password, ...result } = user.toObject();

    return result;
  }
}
