import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import axios from 'axios';
import { parse as xmlParser } from 'fast-xml-parser';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from './auth.interface';
import { Model } from 'mongoose';
import * as moment from 'moment';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly config: ConfigService, 
        @InjectModel('Auth') private readonly authModel:Model<Auth>,
        private readonly jwtService:JwtService
        ) {}

    async authWithIdsTicket(ticket: string): Promise<string>{
        const validateUrl = `${this.config.idsValidatedUrl}?service=${this.config.idsAuthUrl}&ticket=${ticket}`;
        const res = await axios.get(validateUrl);
        const rawIdsData = xmlParser(res.data);
        try {
            let { "cas:uid":cardnum, "cas:cn":name } = rawIdsData["cas:serviceResponse"]["cas:authenticationSuccess"]["cas:attributes"];
            let record = await this.authModel.findOne({ cardnum });
            if(!record){
                record = new this.authModel({ cardnum, name })
            }
            record.lastAuthTime = moment().unix();
            await record.save();
            return this.jwtService.sign({ cardnum, name });
        } catch (e) {
            console.log(e)
            return null
        }
    }

    async authWithWechatCode(code: string): Promise<string>{
        return 'wechatSession'
    }

    async authWithIdsTicketAndWechatSession(ticket: string, wechatSession: string){
        
    }
}
