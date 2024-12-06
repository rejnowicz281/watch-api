import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GithubTokenGuard extends AuthGuard('jwt-github') {}
