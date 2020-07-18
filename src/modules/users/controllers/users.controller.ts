import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Get,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from 'src/modules/auth/dto/create-user.dto';
import { User } from 'src/db/schemas/user.schema';
import { UsersService } from '../services/users.service';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/core/guards/role.guard';
import { ReadManyQueryDto } from 'src/modules/messages/dto/readManyQuery.dto';
import { ReadUsersDTO } from '../DTOs/readUsers.dto';

@Controller('users')
@UseGuards(new RoleGuard())
@UseGuards(AuthGuard())
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('')
  async createUser(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<User> {
    return await this.userService.createUser(createUserDto);
  }

  @Get('')
  async findAll(@Query(ValidationPipe) query: ReadUsersDTO): Promise<User[]> {
    return this.userService.readAll(query);
  }
}
