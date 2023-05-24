import { IsNotEmpty, IsNumber, MaxLength, Min, MinLength } from "class-validator";

export class RankDto {
    @IsNotEmpty()
    @MaxLength(20)
    rank : string

    @IsNumber()
    @Min(0)
    point : number
}