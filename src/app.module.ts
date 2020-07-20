import { UsersModule } from './modules/users/users.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { MessagesModule } from './modules/messages/messages.module';
import { VideosModule } from './modules/videos/videos.module';
import { CategoriesModule } from './modules/categories/categories.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('DATABASE_URI'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    MessagesModule,
    VideosModule,
    CategoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
