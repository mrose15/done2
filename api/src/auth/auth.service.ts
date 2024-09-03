import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async hashPassword(password: string) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  async signUp(signupDto) {
    // TODO: check if username already exists

    // TODO: check if email already exists

    //hash password
    const hashedPassword = await this.hashPassword(signupDto.password);
    signupDto.password = hashedPassword;

    // add user to user table
    this.usersService.createUser(signupDto);
    return 'fake token'; // Replace with actual JWT token generation logic
  }
}
