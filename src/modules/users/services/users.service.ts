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
import { UpdateUserDTO } from '../DTOs/update-users.dto';

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

  async deleteOne(_id: string) {
    const user = await this.userModel.findById(Types.ObjectId(_id));

    if (user) {
      await user.remove();
      return;
    } else {
      throw new NotFoundException();
    }
  }

  async updateOne(_id: string, payload: UpdateUserDTO): Promise<User> {
    let user = await this.userModel.findOneAndUpdate(
      { _id: Types.ObjectId(_id) },
      { ...payload },
      { new: true },
    );
    if (user) {
      user = { ...user.toJSON() };
      delete user.password;
      return user;
    } else {
      throw new NotFoundException();
    }
  }
}
