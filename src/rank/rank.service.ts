import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RankDto } from 'src/dto/rank.dto';
import { Rank } from 'src/models/rank';

@Injectable()
export class RankService {
  constructor(
    @InjectModel(Rank)
    private readonly rankModel: typeof Rank,
  ){}

  async createRank(rankDto : any){
    await this.rankModel.create(rankDto)
  }

  async updateRank(rankDto : any,rankId : string){
    await this.rankModel.update(rankDto,{where:{id : rankId}})
  }
}
