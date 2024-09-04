import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './auth.controller';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  async createAccessToken(user) {
    const payload = { sub: user.userId, username: user.username };
    return await this.jwtService.signAsync(payload);
  }

  async signUp(signupDto: SignupDto) {
    // check if username already exists
    const usernameExists =
      (await this.usersService.findUserByUsername(signupDto.username)).length >
      0;

    if (usernameExists) {
      throw new BadRequestException('username already exists');
    }

    // check if email already exists
    const emailExists =
      (await this.usersService.findUserByEmail(signupDto.email)).length > 0;

    if (emailExists) {
      throw new BadRequestException('email already exists');
    }

    //hash password
    const hashedPassword = await this.hashPassword(signupDto.password);
    signupDto.password = hashedPassword;

    // add user to user table
    const user = await this.usersService.createUser(signupDto);

    return await this.createAccessToken(user); // Replace with actual JWT token generation logic
  }
}
