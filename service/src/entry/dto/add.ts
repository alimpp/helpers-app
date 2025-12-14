import { IsBoolean, IsString, Length } from 'class-validator';

export class AddDto {
  @IsString()
  entry: string;

  @IsString()
  exit: string;

  @IsString()
  @Length(10, 300)
  caption: string;

  @IsBoolean()
  trash: boolean;
}
