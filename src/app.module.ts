import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShrinkEntity } from './entities/shrink.entity';
import { LoggerService } from './logger/logger.service';
import { HashGenerator } from './helpers/hash-generator';
import { AppRepository } from './app.repository';
import { ShrinkerModule } from './shrinker/shrinker.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forFeature([ShrinkEntity]),
    DatabaseModule,
    ShrinkerModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppRepository, LoggerService, HashGenerator],
})
export class AppModule {}
