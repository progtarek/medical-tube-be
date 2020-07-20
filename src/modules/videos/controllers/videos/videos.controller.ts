import {
  Controller,
  UseGuards,
  Get,
  Query,
  ValidationPipe,
  Post,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { VideosService } from '../../services/videos/videos.service';
import { ReadManyQueryDto } from 'src/modules/messages/dto/readManyQuery.dto';
import { Video } from 'src/db/schemas/video.schema';
import { VideoDTO } from '../../DTO/video.dto';
import { RoleGuard } from 'src/core/guards/role.guard';

@Controller('videos')
@UseGuards(AuthGuard())
export class VideosController {
  constructor(private readonly videoService: VideosService) {}

  @Get('')
  async findAll(
    @Query(ValidationPipe) query: ReadManyQueryDto,
  ): Promise<Video[]> {
    return this.videoService.readAll(query);
  }

  @Post('')
  @UseGuards(new RoleGuard())
  async createOne(@Body(ValidationPipe) payload: VideoDTO): Promise<Video> {
    return this.videoService.createVideo(payload);
  }
}
