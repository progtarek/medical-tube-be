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
  Delete,
} from '@nestjs/common';
import { CategoriesService } from '../../services/categories/categories.service';
import { Category } from 'src/db/schemas/category.schema';
import { CategoryDTO } from '../../DTO/category.dto';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/core/guards/role.guard';
import { ReadManyQueryDTO } from 'src/core/DTO/read-many-query.dto';

@UseGuards(AuthGuard())
@Controller('categories')
export class CategoriesController {
  constructor(private categoryService: CategoriesService) {}

  @Get('')
  async findAll(
    @Query(ValidationPipe) query: ReadManyQueryDTO,
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
    return this.categoryService.createCategory(category);
  }

  @Patch(':_id')
  @UseGuards(new RoleGuard())
  async updateCategory(
    @Body(ValidationPipe) category: CategoryDTO,
    @Param('_id') _id: string,
  ): Promise<Category> {
    return this.categoryService.updateCategory(_id, category);
  }

  @Delete(':_id')
  @UseGuards(new RoleGuard())
  async deleteCategory(@Param('_id') _id: string) {
    return this.categoryService.deleteCategory(_id);
  }
}
