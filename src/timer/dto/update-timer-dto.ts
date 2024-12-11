import { IsNotEmpty } from 'class-validator';

export class UpdateTimerDto {
  @IsNotEmpty()
  _id: string;

  name?: string;
  length?: number;
}
