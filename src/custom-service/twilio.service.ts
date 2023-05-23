import { Injectable , UseFilters , BadRequestException , ForbiddenException} from '@nestjs/common';
import { InjectModel  } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { User } from 'src/models/user';
import { Twilio } from 'twilio';
import * as dotenv from 'dotenv'
import { HttpExceptionFilter } from 'src/https/execption.filter';
import { generateOtp } from 'src/common-function/common-function';
dotenv.config()

/* const account_sid = process.env.ACCOUNT_SID  */
@Injectable()
@UseFilters(HttpExceptionFilter)

export class SmsService {
  private twilioClient: Twilio;
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {
    this.twilioClient = new Twilio(process.env.ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

  }

  async sendOtp(data: string , userId : string) {
    // check ma otp cu con hieu luc khong
    const now = new Date()
    const condition = await this.userModel.findOne({ where : {
      id : userId,
      expriseDate : {
        [Op.gt] : now
      }
    }})
    if(condition){
      throw new ForbiddenException(`Sau ${(Math.floor(condition.expriseDate.getTime() / 1000))-(Math.floor(now.getTime() / 1000))} giây có thể gửi lại OTP`)
    }

    const otp = generateOtp(); // Your OTP generation logic
    const phoneNumber = `+${data}`;
    const message = `Your OTP is: ${otp}`;
    this.twilioClient.messages
      .create({
        body: message,
        from: '+12707173288',
        to: phoneNumber,
      })
      .then((message) => console.log('SMS sent successfully:', message.sid))
      .catch((error) => console.error('Error sending SMS:', error));

  const expireDate = new Date();
  expireDate.setMinutes(expireDate.getMinutes() + 3); // Thời gian hiệu lực: 3 phút


    await this.userModel.update({otp : otp,expriseDate : expireDate}, {where : {id : userId}})
  }


  async verifyOtp(data : string,userId : string){
    const now = new Date()
    const otp = await this.userModel.findOne({
      where : {
        otp : data,
        id : userId,
        expriseDate : {
          [Op.gt] : now
        }
      }
    })
    console.log('otp',otp);
    
    if(otp){
      const result = await this.userModel.update({ isActive: true }, { where: { id: userId } });
    } else {
      throw new BadRequestException(`Invalid otp`)
    }
  }
}
