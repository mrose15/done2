import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

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

  async signUp(signupDto) {
    // TODO: check if username already exists

    // TODO: check if email already exists

    //hash password
    const hashedPassword = await this.hashPassword(signupDto.password);
    signupDto.password = hashedPassword;

    // add user to user table
    const user = await this.usersService.createUser(signupDto);
    console.log('User created:', user);

    return await this.createAccessToken(user); // Replace with actual JWT token generation logic
  }
}
