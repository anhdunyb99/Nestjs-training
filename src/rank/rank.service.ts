import { Injectable , UseFilters , BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RankDto } from 'src/dto/rank.dto';
import { HttpExceptionFilter } from 'src/https/execption.filter';
import { Rank } from 'src/models/rank';

@Injectable()
@UseFilters(HttpExceptionFilter)
export class RankService {
  constructor(
    @InjectModel(Rank)
    private readonly rankModel: typeof Rank,
  ){}

  async createRank(rankDto : any){
    const condition = await this.rankModel.findOne({where : {rank : rankDto.rank}})
    if(condition){
      throw new BadRequestException(`Rank exist`)
    }
    await this.rankModel.create(rankDto)
  }

  async updateRank(rankDto : any,rankId : string){
    await this.rankModel.update(rankDto,{where:{id : rankId}})
  }
}
