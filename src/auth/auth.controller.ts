import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { refreshTokenOptions } from 'src/lib/utils/jwt.utilts';
import { AuthService } from './auth.service';
import { GithubTokenDto } from './dto/github-token.dto';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { AccessTokenGuard } from './guards/access-token.guard';
import { GithubTokenGuard } from './guards/github-token.guard';
import { RefreshTokenGuard } from './guards/refresh-token.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async signUp(
    @Body() dto: SignUpDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.signUp(
      dto.email,
      dto.password,
    );

    res.cookie('refreshToken', refreshToken, refreshTokenOptions);

    return { accessToken };
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body() dto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.signIn(
      dto.email,
      dto.password,
    );

    res.cookie('refreshToken', refreshToken, refreshTokenOptions);

    return { accessToken };
  }

  @HttpCode(HttpStatus.OK)
  @Delete('logout')
  async signOut(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('refreshToken');
    return { message: 'Logout successful' };
  }

  @UseGuards(RefreshTokenGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(@Request() req, @Res({ passthrough: true }) res: Response) {
    const accessToken = await this.authService.getAccessToken(
      req.user._id,
      req.user.email,
      req.user.name,
    );
    return { accessToken };
  }

  @UseGuards(AccessTokenGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('github/token')
  async getGithubToken(@Body() dto: GithubTokenDto) {
    const params =
      '?client_id=' +
      process.env.GITHUB_CLIENT_ID +
      '&client_secret=' +
      process.env.GITHUB_CLIENT_SECRET +
      '&code=' +
      dto.code;

    const response = await fetch(
      'https://github.com/login/oauth/access_token' + params,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
      },
    );

    const responseData = await response.json();

    if (!responseData.access_token)
      throw new Error('Error retrieving Github Token');

    return { token: responseData.access_token };
  }

  @UseGuards(GithubTokenGuard)
  @Post('github/login')
  async githubLogin(@Request() req, @Res({ passthrough: true }) res: Response) {
    const { accessToken, refreshToken } = await this.authService.getTokens(
      req.user._id,
      req.user.email,
      req.user.name,
    );

    res.cookie('refreshToken', refreshToken, refreshTokenOptions);

    return { accessToken, username: req.user.name };
  }
}
