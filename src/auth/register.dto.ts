import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class RegisterDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Length(8)
    password: string;

    @IsNotEmpty()
    @Length(8)
    retypedPasswords: string;
}