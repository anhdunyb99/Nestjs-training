import { IsNotEmpty , MinLength , MaxLength } from "class-validator";

export class RegisterDto {
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    name : string;

    @IsNotEmpty()
    age : number;


}