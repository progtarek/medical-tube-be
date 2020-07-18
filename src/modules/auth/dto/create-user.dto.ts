import {
  Matches,
  MinLength,
  MaxLength,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  IsEnum,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsNotEmpty()
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

  @IsNotEmpty()
  @IsEnum(['ADMIN', 'USER'], { message: 'role should be admin or user' })
  role: 'ADMIN' | 'USER';
}
