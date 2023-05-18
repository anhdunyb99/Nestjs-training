import { Injectable , Controller ,UsePipes ,ValidationPipe, Get , Param , Body , Response , Post , UseGuards} from "@nestjs/common";
import { OrderService } from "./order.service";
import { UserPermissionGuard } from "src/auth/guard/guard";


@Controller('order')
@UsePipes(new ValidationPipe())
export class OrderController {
    constructor(private readonly orderService: OrderService) { }

    @Get()
    async GetOrder () {
        await this.orderService.getOrder()
    }
    @UseGuards(UserPermissionGuard)
    @Post('/:userId/:storeId') 
    async CreateOrder (@Body() body : any, @Param() param : any) {
        await this.orderService.createOrder(param.userId,param.storeId,body.total_money)
        return 'Order successfully'
    }
    
}