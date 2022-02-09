import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { UserUpdateDto } from 'src/auth/user-update.dto';
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
    // console.log('Error :', id);

    return await this.userService.getUserById(id);

    //create table size (product one to many size)
  }

  @Put('/users/update/:id')
  async updateUser(
    @GetCurrentUserId() id,
    @Body() userUpdateDto: UserUpdateDto,
  ): Promise<any> {
    return await this.userService.update(id);
  }
}
