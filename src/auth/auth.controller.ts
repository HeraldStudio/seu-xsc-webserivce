import { Controller, Query, Get, Param } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
    @Get('/ids-auth')
    async idsAuth(@Query('ticket') ticket: string){
        return { access_token:(await this.authService.authWithIdsTicket(ticket)) };
    }

    @Get('/ids-auth/:wechatSession')
    async idsAuthWithWechatSession(@Query('ticket') ticket: string, @Param('wechatSession') wechatSession: string){

    }

    @Get('/wechat-auth')
    async wechatAuth(@Query('code') code: string){

    }
}
