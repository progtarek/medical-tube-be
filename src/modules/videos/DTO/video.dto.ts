import {
  IsNotEmpty,
  ValidateNested,
  IsDefined,
  IsNotEmptyObject,
  IsObject,
  IsString,
  IsUrl,
} from 'class-validator';
import { Type } from 'class-transformer';
import { MultiLanguageOptionalDTO } from 'src/core/DTO/multi-language.optional';
import { MultiLanguageDTO } from 'src/core/DTO/multi-language.dto';

export class VideoDTO {
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => MultiLanguageDTO)
  name!: MultiLanguageDTO;

  @ValidateNested({ message: 'description must consist of en and ar' })
  @Type(() => MultiLanguageOptionalDTO)
  description!: MultiLanguageOptionalDTO;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  url!: string;

  @IsNotEmpty()
  @IsString()
  category!: string;
}
