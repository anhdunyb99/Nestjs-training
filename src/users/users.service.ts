import { Injectable , UseFilters , BadGatewayException , BadRequestException , UnauthorizedException} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { LoginDto } from "src/dto/user.dto";
import { HttpExceptionFilter } from "src/https/execption.filter";
import { User } from "src/models/user";
import * as jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
dotenv.config()
@Injectable()
@UseFilters(HttpExceptionFilter)
export class UserService {
    constructor(
        @InjectModel(User)
        private readonly userModel: typeof User,
    ) { }

    async login(loginDto : LoginDto){
        if(!loginDto.username || !loginDto.password){
            throw new BadRequestException(`Invalid username or password`)
        }

        const condition = await this.userModel.findOne({where : {username : loginDto.username,password : loginDto.password}})
        
        if(condition.isActive === true){
            const accessToken = jwt.sign(
                { userId: condition.id }, // ve sau thay = id cua user vua tao
                process.env.ACCESS_TOKEN,
                { expiresIn: '10h' }
            )
    
            const refreshToken = jwt.sign(
                { userId: condition.id },
                process.env.REFRESH_TOKEN, { expiresIn: '7d' }
            );

            await this.userModel.update({refresh_token : refreshToken},{where : {id : condition.id}})
            return accessToken
        } else {
            throw new UnauthorizedException(`Your account is not active yet`)
        }
        
    }

    async Register(registerDto: any) {
        if (!registerDto.username || !registerDto.password) {
            throw new BadRequestException(`Invalid username or password`)
        }
        /* asd */
        // check trung ten
        const condition = await this.userModel.findOne({
            where: {
                username: registerDto.username
            }
        })

        if (condition) {
            throw new BadRequestException(`Username exist`)
        }
        

        await this.userModel.create(registerDto)
        return 'Otp has been sent'
    }
}