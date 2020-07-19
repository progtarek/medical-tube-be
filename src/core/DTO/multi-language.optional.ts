import { MinLength, MaxLength, IsString } from 'class-validator';

export class MultiLanguageOptionalDTO {
  @IsString()
  @MinLength(4)
  @MaxLength(500)
  en: string;

  @IsString()
  @MinLength(4)
  @MaxLength(500)
  ar: string;
}
