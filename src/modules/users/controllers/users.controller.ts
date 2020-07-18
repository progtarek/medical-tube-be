import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from 'src/modules/auth/dto/create-user.dto';
import { User } from 'src/db/schemas/user.schema';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('')
  async register(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<User> {
    return await this.userService.register(createUserDto);
  }
}
