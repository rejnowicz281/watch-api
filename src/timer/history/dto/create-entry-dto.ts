import { IsNotEmpty } from 'class-validator';

export class CreateEntryDto {
  timerLength: number;

  timerId: string;

  @IsNotEmpty()
  secondsPassed: number;

  note: string;
}
