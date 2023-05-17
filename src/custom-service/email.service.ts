import { Injectable , UseFilters , BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { createTransport } from 'nodemailer';
import { google } from 'googleapis';
import * as dotenv from 'dotenv'
import { generateOtp } from 'src/common-function/common-function';
import { Store } from 'src/models/store';
import { Op } from 'sequelize';
import { HttpExceptionFilter } from 'src/https/execption.filter';
dotenv.config()

@Injectable()
@UseFilters(HttpExceptionFilter)
export class EmailService {
    private transporter: any;

    constructor(
        @InjectModel(Store)
        private readonly storeModel: typeof Store,
    ) {
        const OAuth2 = google.auth.OAuth2;

        // Configure the OAuth2 credentials
        const oauth2Client = new OAuth2(
            process.env.GMAIL_CLIENT_ID,
            process.env.GMAIL_CLIENT_SECRET,
            'https://developers.google.com/oauthplayground'
        );

        // Generate the OAuth2 access token
        oauth2Client.setCredentials({
            refresh_token: process.env.GMAIL_REFRESH_TOKEN,
        });
        /* sad */
        // Create a Nodemailer transporter using SMTP with OAuth2
        this.transporter = createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'dungtestemail@gmail.com',
                clientId: process.env.GMAIL_CLIENT_ID,
                clientSecret: process.env.GMAIL_CLIENT_SECRET,
                refreshToken: process.env.GMAIL_REFRESH_TOKEN,
                accessToken: oauth2Client.getAccessToken(),
            },
        });
    }

    async sendEmail(to: string, storeId: string) {
        try {
            // check mã xác thực cũ còn hiệu lực không
            const now = new Date();
            const condition = await this.storeModel.findOne({ where : {
                id : storeId,
                otp_exprise : {
                    [Op.gt] : now
                }
            }})
            if(condition){
                throw new BadRequestException(`Sau ${(Math.floor(condition.otp_exprise.getTime() / 1000))-(Math.floor(now.getTime() / 1000))} giây có thể gửi lại OTP`)
            }
            // good 
            //generate new otp
            const newOtp = generateOtp()
            const subject = 'Mã xác minh cho email đăng ký cửa hàng';
            const text = `Mã xác minh của bạn là ${newOtp}`
            const mailOptions = {
                from: 'dungtestemail@gmail.com',
                to,
                subject,
                text,
            };

            await this.transporter.sendMail(mailOptions);
            const expireDate = new Date();
            expireDate.setMinutes(expireDate.getMinutes() + 3); // Thời gian hiệu lực: 3 phút
            await this.storeModel.update({ otp: newOtp, otp_exprise: expireDate }, { where: { id: storeId } })
        } catch (error) {
            console.error('Failed to send email:', error);
        }
    }
}
