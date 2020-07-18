import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { User } from 'src/db/schemas/user.schema';
import { CreateUserDto } from 'src/modules/auth/dto/create-user.dto';
import { ReadUsersDTO } from '../DTOs/readUsers.dto';
import { Types } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private readonly userModel) {}

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

  async readAll(query: ReadUsersDTO): Promise<User[]> {
    const { role, ...rest } = query;
    const users = await this.userModel.paginate(
      { role },
      {
        select:
          'username email mobile gender role profilePictureUrl createdAt updatedAt  ',
        ...rest,
      },
    );

    return users;
  }

  async findOne(_id): Promise<User> {
    const user = await this.userModel
      .findById(Types.ObjectId(_id))
      .select(
        'username email mobile gender role profilePictureUrl createdAt updatedAt',
      );

    if (user) {
      return user;
    } else {
      throw new NotFoundException();
    }
  }
}
