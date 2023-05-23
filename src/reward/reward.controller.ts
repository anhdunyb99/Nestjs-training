import { Injectable , Controller , Get , Param , Body , Response , Post, Put , Delete , UsePipes, ValidationPipe , UseGuards, Request} from "@nestjs/common";
import { RewardService } from "./reward.service";
import { ExchangeDto, RewardDto } from "src/dto/reward.dto";
import { StorePermissionGuard, UserPermissionGuard } from "src/guard/guard";

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
    /* @UseGuards(StorePermissionGuard)
    @UseGuards(UserPermissionGuard) */
    async GetRewardByStoreId(@Param() param : any){
        const data = this.rewardService.getRewardByStoreId(param.storeId)
        return data
    }

    @Post('/:storeId')
    @UseGuards(StorePermissionGuard)
    async CreateReward(@Body() body : RewardDto, @Param() param : any,@Request() req){
        console.log(req.store);
        if(req.store.storeId != param.storeId){
            return 'You do not have permission'
        }
        const data = this.rewardService.createReward(body,param.storeId)
        return data 
    }

    @Put('/:storeId/:rewardId')
    @UseGuards(StorePermissionGuard)
    async UpdateReward(@Body() body : RewardDto, @Param() param : any,@Request() req){
        if(req.store.storeId != param.storeId){
            return 'You do not have permission'
        }
        await this.rewardService.updateReward(body,param.storeId,param.rewardId)
        return 'Update successfully'
    }

    @Delete('/:storeId/:rewardId')
    @UseGuards(StorePermissionGuard)
    async DeleteReward(@Param() param : any, @Request() req){
        if(req.store.storeId != param.storeId){
            return 'You do not have permission'
        }
        await this.rewardService.deleteReward(param.rewardId,param.storeId)
        return 'Delete successfully'
    }

    @Post('/exchange/:rewardId/:userId')
    @UseGuards(UserPermissionGuard)
    async ExchangeReward(@Body() body : ExchangeDto, @Param() param : any, @Request() req){
        if(param.userId != req.user.userId){
            return 'You do not have permission'
        }
        await this.rewardService.exchangeReward(body.quantity,param.userId,param.rewardId)
        return 'Exchange successfully'
    }

    @Get('/exchange/:userId')
    @UseGuards(UserPermissionGuard)
    async GetRewardByUserId(@Param() param : any, @Request() req){
        if(param.userId != req.user.userId){
            return 'You do not have permission'
        }
        const data = await this.rewardService.getRewardExchangeByUserId(param.userId)
        return data
    }
}

    