import { IsNotEmpty , MinLength , MaxLength, IsInt, IsNumber, Max, Min } from "class-validator";

export class RewardDto {
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    name : string;

    @IsNotEmpty()
    @IsInt()
    quantity : number;

    @IsNotEmpty()
    point : number;

    @IsNotEmpty()
    from_date : Date

    @IsNotEmpty()
    to_date : Date

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(100)
    description : string;

    url : string

    storeId : string
}

export class ExchangeDto {
    @IsNumber()
    @Min(0)
    @Max(100)
    quantity: number
}