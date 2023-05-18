import { Injectable , Controller , Get , Param , Body , Response , Post, Put , Delete , UsePipes, ValidationPipe , UseGuards} from "@nestjs/common";
import { RewardService } from "./reward.service";
import { ExchangeDto, RewardDto } from "src/dto/reward.dto";
import { StorePermissionGuard, UserPermissionGuard } from "src/auth/guard/guard";

@Controller('reward')
@UsePipes(new ValidationPipe())
export class RewardController {
    constructor(private readonly rewardService: RewardService) { }

    @Get()
    async GetAllReward(){
        const data = this.rewardService.getAllReward()
        return data
    }

    @Get('/:storeId')
    @UseGuards(StorePermissionGuard)
    async GetRewardByStoreId(@Param() param : any){
        const data = this.rewardService.getRewardByStoreId(param.storeId)
        return data
    }

    @Post('/:storeId')
    @UseGuards(StorePermissionGuard)
    async CreateReward(@Body() body : RewardDto, @Param() param : any){
        const data = this.rewardService.createReward(body,param.storeId)
        return data 
    }

    @Put('/:storeId/:rewardId')
    @UseGuards(StorePermissionGuard)
    async UpdateReward(@Body() body : RewardDto, @Param() param : any){
        await this.rewardService.updateReward(body,param.storeId,param.rewardId)
        return 'Update successfully'
    }

    @Delete('/:storeId/:rewardId')
    @UseGuards(StorePermissionGuard)
    async DeleteReward(@Param() param : any){
        await this.rewardService.deleteReward(param.rewardId,param.storeId)
        return 'Delete successfully'
    }

    @Post('/exchange/:rewardId/:userId')
    @UseGuards(UserPermissionGuard)
    async ExchangeReward(@Body() body : ExchangeDto, @Param() param : any){
        console.log(body);
        
        await this.rewardService.exchangeReward(body.quantity,param.userId,param.rewardId)
    }

    @Get('/exchange/:userId')
    @UseGuards(UserPermissionGuard)
    async GetRewardByUserId(@Param() param : any){
        const data = await this.rewardService.getRewardExchangeByUserId(param.userId)
        return data
    }
}

    