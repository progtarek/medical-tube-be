import { Controller, Post, Body } from '@nestjs/common';
import { AuthCredentialsDto } from '../../dto/auth-credentials.dto';
import { AuthService } from '../../services/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() authCredentialsDto: AuthCredentialsDto): Promise<any> {
    return this.authService.login(authCredentialsDto);
  }
}
