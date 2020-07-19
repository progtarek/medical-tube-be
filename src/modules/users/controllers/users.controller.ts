import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Get,
  Query,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { CreateUserDto } from 'src/modules/auth/dto/create-user.dto';
import { User } from 'src/db/schemas/user.schema';
import { UsersService } from '../services/users.service';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/core/guards/role.guard';
import { ReadUsersDTO } from '../DTOs/readUsers.dto';

@Controller('users')
@UseGuards(new RoleGuard())
@UseGuards(AuthGuard())
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('')
  async findAll(@Query(ValidationPipe) query: ReadUsersDTO): Promise<User[]> {
    return this.userService.readAll(query);
  }

  @Get(':_id')
  async findOne(@Param('_id') _id: string): Promise<User> {
    return this.userService.findOne(_id);
  }

  @Post('')
  async createUser(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<User> {
    return await this.userService.createUser(createUserDto);
  }

  @Delete(':_id')
  @HttpCode(204)
  async deleteOne(@Param('_id') _id: string) {
    return this.userService.deleteOne(_id);
  }
}
