import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

type SignupDto = {
  name: string;
  email: string;
  username: string;
  password: string;
};

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body() signupDto: SignupDto) {
    return this.authService.signUp(signupDto);
  }
}
