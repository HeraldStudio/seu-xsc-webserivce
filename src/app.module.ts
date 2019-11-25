import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { MongooseModule } from '@nestjs/mongoose';

const mongooseModule = MongooseModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    uri: configService.mongodbUri,
    useNewUrlParser: true,
    useUnifiedTopology: true
  }),
  inject: [ConfigService],
});

@Module({
  imports: [ConfigModule, mongooseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
