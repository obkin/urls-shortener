import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { LoggerService } from './logger/logger.service';
import { HashGenerator } from './helpers/hash-generator';
import { AppRepository } from './app.repository';
import { ShrinkerModule } from './shrinker/shrinker.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ShrinkerModule],
  controllers: [AppController],
  providers: [AppService, AppRepository, LoggerService, HashGenerator],
})
export class AppModule {}
