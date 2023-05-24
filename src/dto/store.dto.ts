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

    caculate_point_type : string
}

export class PromotionDto {
    @IsNumber()
    @Min(0)
    @Max(100)
    discountRate: number

    @IsNumber()
    pointBonus: number
}

export class StoreLoginDto {
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    username : string

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    password : string
}

export class VerifyOtpDto {
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    otp : string

}

export class sendEmailDto {
    @IsNotEmpty()
    email : string

}