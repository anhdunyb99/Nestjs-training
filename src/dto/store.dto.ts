import { IsNotEmpty, MinLength, MaxLength , Min , Max , IsNumber } from "class-validator";

export class StoreDto {
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    name: string;

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    username: string;

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    password: string;

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(50)
    email: string
}

export class DiscountDto {
    @IsNumber()
    @Min(0)
    @Max(100)
    brozne_discount: number

    @IsNumber()
    @Min(0)
    @Max(100)
    silver_discount: number

    @IsNumber()
    @Min(0)
    @Max(100)
    gold_discount: number

    @IsNumber()
    @IsNumber()
    @Min(0)
    bronze_max_point: number;

    @IsNumber()
    @IsNumber()
    @Min(0)
    silver_max_point: number;

    @IsNumber()
    @IsNumber()
    @Min(0)
    gold_max_point: number;

    @IsNumber()
    @IsNumber()
    @Min(0)
    minium_money: number;
}

export class DefaultDto {
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    bronze_default_point : number;
  
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    silver_default_point : number;
  
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    gold_default_point : number;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    minium_money: number;
}