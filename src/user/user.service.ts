import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserUpdateDto } from 'src/auth/user-update.dto';
import { Repository } from 'typeorm';
import { User } from './models/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ){
    }

    async all(): Promise<User[]> {
        return this.userRepository.find();
    }

    async create(data: any): Promise<User> {
        return this.userRepository.save(data);
    }

    async login(condition): Promise<User> {
        return await this.userRepository.findOne(condition);
    }

    async update(id, rt): Promise<any> {
        return await this.userRepository.update(id, rt);
    }
}
