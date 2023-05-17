import { IsNotEmpty , MinLength , MaxLength, IsInt } from "class-validator";

export class AdminDto {
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    username : string;

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    password : string;

    
}