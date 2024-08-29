import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  signUp(signupDto) {
    console.log('SIGN UP DTP', signupDto);
  }
}
