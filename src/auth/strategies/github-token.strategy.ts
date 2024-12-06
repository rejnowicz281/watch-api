import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Response } from 'express';
import * as Strategy from 'passport-github-token';
import { UserService } from 'src/user/user.service';

@Injectable()
export class GithubTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-github',
) {
  constructor(private userService: UserService) {
    super({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(
    req: Response,
    accessToken: string,
    refreshToken: string,
    profile: any,
  ) {
    const user = await this.userService.findByProvider(
      'https://www.github.com',
      profile.id,
    );

    if (user) {
      return user;
    } else {
      const newUser = await this.userService.create({
        provider: 'https://www.github.com',
        subject: profile.id,
        name: profile.username,
      });

      await newUser.save();

      return newUser;
    }
  }
}
