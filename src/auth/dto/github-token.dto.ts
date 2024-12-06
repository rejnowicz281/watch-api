import { IsNotEmpty } from 'class-validator';

export class GithubTokenDto {
  @IsNotEmpty()
  code: string;
}
