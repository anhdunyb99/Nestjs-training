import { Injectable , Controller , Get , Param , Body , Response } from "@nestjs/common";
import { UserServie } from "./users.service";

@Controller('api')
export class UsersController {
    constructor(private readonly userService: UserServie){}
    /* sad */
    @Get('name')
    getUserName(@Param() params : any , @Response() res : any){
        let data = this.userService.getUserName()
        res.json({
            success : true,
            message : 'hello'
        })
    }
}