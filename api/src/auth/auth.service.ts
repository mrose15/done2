import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  signUp(signupDto) {
    //return signupDto;
    console.log('Signup:', signupDto);
    return 'fake token'; // Replace with actual JWT token generation logic
  }
}
