import { Injectable , Controller , Get , Param , Body , Response , Post , Put} from "@nestjs/common";
import { StoreService } from "./store.service";
import { StoreDto } from "src/dto/store.dto";
@Controller('store')
export class StoreController {
    constructor(private readonly storeService: StoreService){}

    @Get()
    async GetStore(){
        const data = this.storeService.getStore()
        return data
    }

    @Post() 
    async registerStore(@Body() body : StoreDto){
        const data = await this.storeService.registerStore(body)
        return data
    }

    @Put('/:id')
    async updateStore(@Body() body : StoreDto , @Param() param : any){
        await this.storeService.updateStore(body,param.id)
    }
}