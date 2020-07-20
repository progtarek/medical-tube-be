import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Get,
  Query,
  UseGuards,
  Patch,
  Param,
} from '@nestjs/common';
import { CategoriesService } from '../../services/categories/categories.service';
import { Category } from 'src/db/schemas/category.schema';
import { CategoryDTO } from '../../DTO/category.dto';
import { ReadManyQueryDto } from 'src/modules/messages/dto/readManyQuery.dto';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/core/guards/role.guard';

@UseGuards(AuthGuard())
@Controller('categories')
export class CategoriesController {
  constructor(private categoryService: CategoriesService) {}

  @Get('')
  async findAll(
    @Query(ValidationPipe) query: ReadManyQueryDto,
  ): Promise<Category[]> {
    return this.categoryService.readAll(query);
  }

  @Get(':_id')
  @UseGuards(new RoleGuard())
  async findCategory(@Param('_id') _id: string): Promise<Category> {
    return this.categoryService.findCategory(_id);
  }

  @Post('')
  @UseGuards(new RoleGuard())
  async createCategory(
    @Body(ValidationPipe) category: CategoryDTO,
  ): Promise<Category> {
    return await this.categoryService.createCategory(category);
  }

  @Patch(':_id')
  @UseGuards(new RoleGuard())
  async updateCategory(
    @Body(ValidationPipe) category: CategoryDTO,
    @Param('_id') _id: string,
  ): Promise<Category> {
    return await this.categoryService.updateCategory(_id, category);
  }
}
