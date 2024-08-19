import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  async addName(name: string) {
    console.log("Name: ", name);
    return { name };
  }

  async getNames(){
    return {};
  }
}
