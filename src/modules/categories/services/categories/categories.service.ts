import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Category } from 'src/db/schemas/category.schema';
import { CategoryDTO } from '../../DTO/category.dto';
import { Types } from 'mongoose';
import { Video } from 'src/db/schemas/video.schema';
import { ReadManyQueryDTO } from 'src/core/DTO/read-many-query.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category) private readonly categoryModel,
    @InjectModel(Video) private readonly videoModel,
  ) {}

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

  async findCategory(_id: string): Promise<Category> {
    const category = await this.categoryModel.findById(Types.ObjectId(_id));
    if (!category) {
      throw new NotFoundException('Category does not exist');
    }
    return category;
  }

  async updateCategory(_id: string, payload: CategoryDTO): Promise<Category> {
    await this.findCategory(_id);
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
        {
          new: true,
        },
      );
      return category;
    }
  }

  async readAll(query: ReadManyQueryDTO): Promise<Category[]> {
    const categories = await this.categoryModel.paginate(
      {},
      {
        ...query,
      },
    );

    return categories;
  }

  async deleteCategory(_id: string) {
    const category = await this.categoryModel.findById(Types.ObjectId(_id));
    if (!category) {
      throw new NotFoundException('Category does not exist');
    }
    const videosCount = await this.videoModel.countDocuments({
      category: Types.ObjectId(_id),
    });
    if (videosCount) {
      throw new BadRequestException(
        'Can not delete category associated with video',
      );
    }
    await category.remove();
    return;
  }
}
