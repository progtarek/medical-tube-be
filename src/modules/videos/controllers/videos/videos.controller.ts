import {
  Controller,
  UseGuards,
  Get,
  Query,
  ValidationPipe,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { VideosService } from '../../services/videos/videos.service';
import { Video } from 'src/db/schemas/video.schema';
import { VideoDTO } from '../../DTO/video.dto';
import { RoleGuard } from 'src/core/guards/role.guard';
import { ReadManyVideosDTO } from '../../DTO/read-many-video.dto';

@Controller('videos')
@UseGuards(AuthGuard())
export class VideosController {
  constructor(private readonly videoService: VideosService) {}

  @Get('')
  async findAll(
    @Query(ValidationPipe) query: ReadManyVideosDTO,
  ): Promise<Video[]> {
    return this.videoService.readAll(query);
  }

  @Get(':_id')
  async readVideo(@Param('_id') _id: string): Promise<Video> {
    return this.videoService.readVideo(_id);
  }

  @Post('')
  @UseGuards(new RoleGuard())
  async createVideo(@Body(ValidationPipe) payload: VideoDTO): Promise<Video> {
    return this.videoService.createVideo(payload);
  }

  @Patch(':_id')
  @UseGuards(new RoleGuard())
  async updateVideo(
    @Body(ValidationPipe) payload: VideoDTO,
    @Param('_id') _id: string,
  ): Promise<Video> {
    return this.videoService.updateVideo(_id, payload);
  }

  @Delete(':_id')
  @UseGuards(new RoleGuard())
  async deleteVideo(@Param('_id') _id: string) {
    return this.videoService.deleteVideo(_id);
  }
}
