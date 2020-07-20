import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReadManyQueryDto } from 'src/modules/messages/dto/readManyQuery.dto';
import { Video } from 'src/db/schemas/video.schema';
import { VideoDTO } from '../../DTO/video.dto';
import { Category } from 'src/db/schemas/category.schema';
import { Types } from 'mongoose';

@Injectable()
export class VideosService {
  constructor(
    @InjectModel(Video) private readonly videoModel,
    @InjectModel(Category) private readonly categoryModel,
  ) {}

  async readAll(query: ReadManyQueryDto): Promise<Video[]> {
    const videos = await this.videoModel.paginate(
      {},
      {
        ...query,
      },
    );

    return videos;
  }

  async createVideo(payload: VideoDTO): Promise<Video> {
    const { category, ...rest } = payload;
    const found = await this.categoryModel.findById(Types.ObjectId(category));
    if (!found) {
      throw new NotFoundException('category does not exist');
    }
    const video = new this.videoModel({ category, ...rest });
    await video.save();
    return video;
  }
}
