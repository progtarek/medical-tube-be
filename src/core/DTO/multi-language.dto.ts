import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class MultiLanguageDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(40)
  en: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(40)
  ar: string;
}
