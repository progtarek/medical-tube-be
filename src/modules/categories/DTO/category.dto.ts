import {
  ValidateNested,
  IsDefined,
  IsNotEmptyObject,
  IsObject,
} from 'class-validator';
import { Type } from 'class-transformer';
import { MultiLanguageOptionalDTO } from 'src/core/DTO/multi-language.optional';
import { MultiLanguageDTO } from 'src/core/DTO/multi-language.dto';

export class CategoryDTO {
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => MultiLanguageDTO)
  name!: MultiLanguageDTO;

  @ValidateNested({ message: 'description must consist of en and ar' })
  @Type(() => MultiLanguageOptionalDTO)
  description!: MultiLanguageOptionalDTO;
}
