import { IsEmail } from "class-validator";

export class UserUpdateDto {
    id?:number;

    @IsEmail()
    email?:string;
    
    password?:string;
    
    retypedPasswords?:string;

    hashedRt?:string;
}