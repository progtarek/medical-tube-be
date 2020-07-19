import {
  Matches,
  MinLength,
  MaxLength,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  IsEnum,
  IsIn,
} from 'class-validator';

export class UpdateUserDTO {
  @IsOptional()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsOptional()
  @MinLength(8)
  @MaxLength(20)
  password: string;

  @IsOptional()
  @IsMobilePhone('ar-EG')
  mobile: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsOptional()
  @IsEnum(['MALE', 'FEMALE'])
  gender: 'MALE' | 'FEMALE';

  @IsOptional()
  @IsIn(['ADMIN', 'USER'], { message: 'role should be admin or user' })
  role: 'ADMIN' | 'USER';
}
