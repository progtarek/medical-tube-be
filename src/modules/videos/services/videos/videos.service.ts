import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReadManyQueryDto } from 'src/modules/messages/dto/readManyQuery.dto';
import { Video } from 'src/db/schemas/video.schema';

@Injectable()
export class VideosService {
  constructor(@InjectModel(Video) private readonly videoModel) {}

  async readAll(query: ReadManyQueryDto): Promise<Video[]> {
    const videos = await this.videoModel.paginate(
      {},
      {
        ...query,
      },
    );

    return videos;
  }
}
