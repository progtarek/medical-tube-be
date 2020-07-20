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
}
