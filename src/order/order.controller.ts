import { Injectable , Controller ,UsePipes ,ValidationPipe, Get , Param , Body , Response , Post , UseGuards} from "@nestjs/common";
import { OrderService } from "./order.service";
import { StorePermissionGuard, UserPermissionGuard } from "src/guard/guard";
import { OrderDto } from "src/dto/order.dto";


@Controller('order')
@UsePipes(new ValidationPipe())
export class OrderController {
    constructor(private readonly orderService: OrderService) { }

    @Get()
    async GetOrder () {
        await this.orderService.getOrder()
    }
    @UseGuards(StorePermissionGuard)
    @Post('/:userId/:storeId') 
    async CreateOrder (@Body() body : OrderDto, @Param() param : any) {
        await this.orderService.createOrder(param.userId,param.storeId,body.total_money)
        return 'Order successfully'
    }
    
}