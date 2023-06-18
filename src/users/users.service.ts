import { Injectable } from '@nestjs/common';
import { User } from './users.model';
import { createUserDto, userModelDto } from './dto/create-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private UserRepository: Model<User>) {}

  async getAllUsers() {
    const users = await this.UserRepository.find();
    return users;
  }

  async createUser(dto: userModelDto) {
    const user = await this.UserRepository.create(dto);
    return user;
  }

  async getUserByEmail(email: string) {
    const user = this.UserRepository.findOne({ email });

    return user;
  }
}
