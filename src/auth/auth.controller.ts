import { BadRequestException, Body, Controller, Get, NotFoundException, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/models/user.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './register.dto';
import { Tokens } from './types';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {

    constructor(
        private authService: AuthService,
    ){}


    @Post('register')
    async register(@Body() body: RegisterDto): Promise<Tokens> {
         return this.authService.register(body);
    }

    @Post('login')
    async login(
        @Body('email') email: string,
        @Body('password') password: string) {

            const user = await this.authService.login({ email});

            if (!user) {
                throw new NotFoundException('User not found');
            }

            if (!await bcrypt.compare(password, user.password)) {
                throw new BadRequestException("Invalid Credentials")
            }

            return user;
    }

    @Post('test')
    test() {
        return ["Hello World!"];
    }

}
