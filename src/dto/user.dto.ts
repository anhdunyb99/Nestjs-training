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

export class SendOtpDto {
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    phoneNumber : string

}

export class VerifySmsOtpDto {
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    otp : string

}