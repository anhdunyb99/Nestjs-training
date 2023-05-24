import { Body, Controller, Get , Param , Post, Request , Response , Put} from '@nestjs/common';
import { RankService } from './rank.service';
import { RankDto } from 'src/dto/rank.dto';

@Controller('rank')
export class RankController {
  constructor(private readonly rankService: RankService) {}

  @Post()
  async CreateRank(@Body() body : RankDto){
    await this.rankService.createRank(body)
    return 'Create rank successfully'
  }

  @Put('/:id')
  async UpdateRank(@Body() body : RankDto,@Param() param : any){
    await this.rankService.updateRank(body,param.id)
  }
}


