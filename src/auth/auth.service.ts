import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './register.dto';
import { Tokens } from './types';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './Dto/login.dto';

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
    const hashedPass = await bcrypt.hash(register.password, 12);

    console.log(register.password);

    const newUser = await this.userService.create({
          email: register.email,
          password: hashedPass,
      });
    const tokens = await this.getTokens(newUser.id, newUser.email);
    await this.updateRtHash(newUser.id, tokens.refresh_tokens);

    return tokens
  }

  async loginUser(login: LoginDto): Promise<Tokens> {
    const getUser = await this.userService.findUser(
      login.email)

    if (!getUser) {
      
      throw new ForbiddenException("User not Found")
    }

    // console.log("getUser", getUser)
    // console.log("password", login.password)
    const checkedPassword = await bcrypt.compare(login.password, getUser.password)

    // console.log("checkedPassword", checkedPassword)

    if (!checkedPassword) {
      throw new ForbiddenException("Password not Found")
    }

    const tokens = await this.getTokens(getUser.id, getUser.email);
    await this.updateRtHash(getUser.id, tokens.refresh_tokens);

    return tokens

  }

  async logout(idUser: number) {
    await this.userService.update({id: idUser, hashedRt:null});
  }

  async refreshToken(id: number, rt: string) {
    const getUser = await this.userService.getUserById(id)

    if (!getUser) {
      throw new ForbiddenException("Access denied");
    }
    const rtMatches = await bcrypt.compare(rt, getUser.hashedRt)

    if (rtMatches) {
      throw new ForbiddenException("Refresh Token not matches");
    }

    const tokens = await this.getTokens(getUser.id, getUser.email);
    await this.updateRtHash(getUser.id, tokens.refresh_tokens);

    return tokens
  }

  async updateRtHash(id: number, rt: string) {
    const hash = await this.hashedPass(rt);
    await this.userService.update({id: id, hashedRt: hash});

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
              expiresIn: 60 * 60 * 24 * 7,
            },
          )
    ]);

    return {
        access_tokens: at,
        refresh_tokens: rt, 
    }

  }
}
