import { IsNotEmpty } from 'class-validator';

export class CreateEntryDto {
  timerLength: number;

  timer: string;

  @IsNotEmpty()
  secondsPassed: number;

  note: string;
}
