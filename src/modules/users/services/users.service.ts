import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  UseGuards,
} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { User } from 'src/db/schemas/user.schema';
import { ReturnModelType } from '@typegoose/typegoose';
import { CreateUserDto } from 'src/modules/auth/dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
@UseGuards(AuthGuard())
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = new this.userModel(createUserDto);
    try {
      await user.save();
      delete user.password;
      return user;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('User already exists');
      } else {
        throw new InternalServerErrorException('Internal server error');
      }
    }
  }
}
