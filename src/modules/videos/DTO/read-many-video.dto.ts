import { IsString, IsIn, IsOptional } from 'class-validator';

export class ReadManyVideosDTO {
  @IsOptional()
  @IsString()
  page: number;

  @IsOptional()
  @IsString()
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

  @IsOptional()
  @IsString()
  category: string;
}
