import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupDto } from 'src/auth/auth.controller';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findUserByUsername(username: string) {
    return await this.usersRepository.findBy({ username });
  }

  async findUserByEmail(email: string) {
    return await this.usersRepository.findBy({ email });
  }

  async createUser(user: SignupDto) {
    return await this.usersRepository.save({ ...user });
  }
}
