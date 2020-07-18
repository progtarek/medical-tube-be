import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
} from 'class-validator';

export class ReadUsersDTO {
  @IsOptional()
  @IsNumber()
  page: number;

  @IsOptional()
  @IsNumber()
  limit: number;

  @IsOptional()
  @IsString()
  sortBy: string;

  @IsOptional()
  @IsIn([1, -1])
  sortOrder: 1 | -1;

  @IsOptional()
  @IsString()
  search: string;

  @IsNotEmpty()
  @IsIn(['ADMIN', 'USER'])
  role: 'ADMIN' | 'USER';
}
