import { Body, Controller, Get , Param , Post, Request , Response , Put, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import { RankService } from './rank.service';
import { RankDto } from 'src/dto/rank.dto';
import { AdminPermissionGuard } from 'src/guard/guard';

@Controller('rank')
@UsePipes(new ValidationPipe())
export class RankController {
  constructor(private readonly rankService: RankService) {}

  @Post()
  @UseGuards(AdminPermissionGuard)
  async CreateRank(@Body() body : RankDto){
    await this.rankService.createRank(body)
    return 'Create rank successfully'
  }

  @Put('/:id')
  @UseGuards(AdminPermissionGuard)
  async UpdateRank(@Body() body : RankDto,@Param() param : any){
    await this.rankService.updateRank(body,param.id)
  }
}


