import {
  UnauthorizedException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './auth.controller';
import { LogInDto } from './auth.controller';

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
    const usernameExists = (
      await this.usersService.findUserByUsername(signupDto.username)
    )?.username;

    if (usernameExists) {
      throw new BadRequestException('username already exists');
    }

    // check if email already exists
    const emailExists = (
      await this.usersService.findUserByEmail(signupDto.email)
    )?.email;

    if (emailExists) {
      throw new BadRequestException('email already exists');
    }

    //hash password
    const hashedPassword = await this.hashPassword(signupDto.password);
    signupDto.password = hashedPassword;

    // add user to user table
    const user = await this.usersService.createUser(signupDto);

    return await this.createAccessToken(user);
  }

  async verifyPassword(enteredPassword: string, existingPassword: string) {
    return await bcrypt.compare(enteredPassword, existingPassword);
  }

  async logIn(logInDto: LogInDto) {
    const user = await this.usersService.findUserByUsername(logInDto.username);

    if (!user) {
      throw new UnauthorizedException('Check your username and password');
    }

    const passwordsMatch = await this.verifyPassword(
      logInDto.password,
      user.password,
    );

    if (!passwordsMatch) {
      throw new UnauthorizedException('Check your username and password');
    }

    return await this.createAccessToken(user);
  }

  async getProfileData(username: string) {
    const user = await this.usersService.findUserByUsername(username);

    return {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
    };
  }
}
