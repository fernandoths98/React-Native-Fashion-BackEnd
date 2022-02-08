import { Controller, Get, Param } from '@nestjs/common';
import {
  GetCurrentUser,
  GetCurrentUserId,
  Public,
} from 'src/common/decorators';
import { User } from './models/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Public()
  @Get()
  async all(): Promise<User[]> {
    return await this.userService.all(); //ini balikan isi dari return
  }

  // @Public()
  @Get('/users')
  async getUserById(@GetCurrentUser('sub') id) {
    console.log('Error :', id);

    return await this.userService.getUserById(id);

    //create table size (product one to many size)
  }

  
}
