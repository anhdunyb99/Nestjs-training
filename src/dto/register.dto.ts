import { IsNotEmpty , MinLength , MaxLength } from "class-validator";

export class RegisterDto {
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    username : string;

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    password : string;

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(50)
    email : string

    @IsNotEmpty()
    firstName : string;

    @IsNotEmpty()
    lastName : string;

    @IsNotEmpty()
    phoneNumber : string;

    @IsNotEmpty()
    point : number


}