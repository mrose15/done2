import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Name } from './name.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Name)
    private namesRepository: Repository<Name>,
  ) {}

  async addName(name: string) {
    await this.namesRepository.save({ name });
    return await this.getNames();
  }

  async getNames(){
    // get all names from the database
    return await this.namesRepository.find();
  }
}

