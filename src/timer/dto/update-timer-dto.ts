import { IsNotEmpty } from 'class-validator';

export class UpdateTimerDto {
  @IsNotEmpty()
  id: string;

  name?: string;
  length?: number;
}
