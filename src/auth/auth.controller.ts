import { BadRequestException, 
    Body, Controller, 
    Get, HttpCode, HttpStatus, 
    NotFoundException, Post, 
    Req, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/models/user.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './register.dto';
import { Tokens } from './types';
import { AuthService } from './auth.service';
import { LoginDto } from './Dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { AtGuard } from 'src/common/at.guard';
import { RtGuard } from 'src/common/rt.guard';
import { GetCurrentUser, GetCurrentUserId, Public } from 'src/common/decorators';

@Controller()
export class AuthController {

    constructor(
        private authService: AuthService,
    ){}


    @Public()
    @Post('register')
    @HttpCode(HttpStatus.CREATED) //custom code status 200
    async register(@Body() body: RegisterDto): Promise<Tokens> {
        console.log(body);

         return this.authService.register(body);
    }

    

    @Public()
    @Post('login')
    @HttpCode(HttpStatus.OK)
    async loginUser(@Body() login: LoginDto): Promise<Tokens>{
        // console.log(login)
       return this.authService.loginUser(login);
    }

    @UseGuards(AtGuard)
    @Post('logout')
    @HttpCode(HttpStatus.OK)
    logout(@GetCurrentUser('sub') id: number) {

        // console.log(id)
        return this.authService.logout(id);
        
    }

    @Public()
    @UseGuards(RtGuard)
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    refreshToken(
        @GetCurrentUserId() 
        id: number, 
    @GetCurrentUser() refreshToken: string) 
    {
        // console.log({
        //     id,
        //     refreshToken
        // }))
        return this.authService.refreshToken(id, refreshToken);
        

    }
}
