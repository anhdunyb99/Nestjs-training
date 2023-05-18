import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class LoginDto {
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    username : string

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    password : string
}