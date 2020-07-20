import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Category } from 'src/db/schemas/category.schema';
import { CategoryDTO } from '../../DTO/category.dto';
import { ReadManyQueryDto } from 'src/modules/messages/dto/readManyQuery.dto';
import { Types } from 'mongoose';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category) private readonly categoryModel) {}

  async createCategory(payload: CategoryDTO): Promise<Category> {
    const exist = await this.categoryModel.findOne({
      $or: [{ 'name.en': payload.name.en }, { 'name.ar': payload.name.ar }],
    });
    if (exist) {
      throw new ConflictException('Category already exists');
    } else {
      const category = new this.categoryModel(payload);
      await category.save();
      return category;
    }
  }

  async updateCategory(_id: string, payload: CategoryDTO): Promise<Category> {
    const exist = await this.categoryModel.findOne({
      $or: [{ 'name.en': payload.name.en }, { 'name.ar': payload.name.ar }],
      _id: { $ne: Types.ObjectId(_id) },
    });
    if (exist) {
      throw new ConflictException('Category already exists');
    } else {
      const category = await this.categoryModel.findOneAndUpdate(
        {
          _id: Types.ObjectId(_id),
        },
        {
          ...payload,
        },
      );
      return category;
    }
  }

  async readAll(query: ReadManyQueryDto): Promise<Category[]> {
    const categories = await this.categoryModel.paginate(
      {},
      {
        ...query,
      },
    );

    return categories;
  }
}
