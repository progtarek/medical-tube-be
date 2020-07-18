import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { User } from 'src/db/schemas/user.schema';
import { ReturnModelType } from '@typegoose/typegoose';
import { AuthCredentialsDto } from '../../dto/auth-credentials.dto';
import { JwtPayloadDto } from '../../dto/jwt-payload.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
    private jwtService: JwtService,
  ) {}

  async login(authCredentials: AuthCredentialsDto): Promise<{ token: string }> {
    const { username, password } = authCredentials;
    const user = await this.userModel.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const jwtPayload: JwtPayloadDto = { username: user.username };
    const token = await this.jwtService.sign(jwtPayload);
    return { token };
  }
}
