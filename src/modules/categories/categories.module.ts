import { Module } from '@nestjs/common';
import { CategoriesController } from './controllers/categories/categories.controller';
import { CategoriesService } from './services/categories/categories.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { Category } from 'src/db/schemas/category.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypegooseModule.forFeature([Category]), AuthModule],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
