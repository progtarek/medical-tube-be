import { Module } from '@nestjs/common';
import { VideosService } from './services/videos/videos.service';
import { VideosController } from './controllers/videos/videos.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Video } from 'src/db/schemas/video.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypegooseModule.forFeature([Video]), AuthModule],
  providers: [VideosService],
  controllers: [VideosController],
})
export class VideosModule {}
