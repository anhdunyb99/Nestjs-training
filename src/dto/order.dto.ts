import { IsNotEmpty , MinLength , MaxLength, IsNumber } from "class-validator";

export class OrderDto {
    @IsNumber()
    
    total_money: number

    
}