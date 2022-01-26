import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './register.dto';
import { Tokens } from './types';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(register: RegisterDto): Promise<Tokens> {
    if (register.password !== register.retypedPasswords) {
      throw new BadRequestException('Password do not match');
    }

    const {retypedPasswords, ...result} = register
    // const hashedPass = await bcrypt.hash(register.password, 12);
    const newUser = await this.userService.create(result);
    const tokens = await this.getTokens(newUser.id, newUser.email);
    await this.updateRtHash(newUser.id, tokens.refresh_tokens);

    return tokens
    // return this.userService.create({
    //     email: register.email,
    //     password: hashedPass,
    // })
  }

  async updateRtHash(id: number, rt: string) {
    const hash = await this.hashedPass(rt);
    await this.userService.update(id, rt)

  }

  hashedPass(data: string) {
    return bcrypt.hash(data, 10);
  }

  async getTokens(id: number, email: string) {
    const [at, rt] = await Promise.all([

        this.jwtService.signAsync(
            {
              sub: id,
              email,
            },
            {
              secret: 'at-secret',
              expiresIn: 60 * 15,
            },
          ),

          this.jwtService.signAsync(
            {
              sub: id,
              email,
            },
            {
              secret: 'rt-secret',
              expiresIn: 60 * 15,
            },
          )
    ]);

    return {
        access_tokens: at,
        refresh_tokens: rt, 
    }

  }

  async login(condition): Promise<any> {
    return await this.userService.login(condition);
  }
}
