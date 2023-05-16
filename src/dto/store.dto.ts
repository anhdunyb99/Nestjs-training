import { IsNotEmpty , MinLength , MaxLength } from "class-validator";

export class StoreDto {
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    name : string;

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



}