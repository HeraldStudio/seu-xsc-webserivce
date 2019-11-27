import { Module, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigService } from '../config/config.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthSchema } from './auth.scheme';

const config = new ConfigService()

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: config.jwtSecret,
      signOptions: { expiresIn: '3h' },
    }),
    MongooseModule.forFeature([{ name: 'Auth', schema: AuthSchema }])
  ],
  providers: [AuthService, JwtStrategy],
  exports: [ AuthService ],
  controllers: [AuthController]
})
export class AuthModule {}
