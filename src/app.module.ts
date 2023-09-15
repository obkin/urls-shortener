import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShortUrlEntity } from './entities/short-url.entity';
import { LoggerService } from './logger/logger.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forFeature([ShortUrlEntity]),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService, LoggerService],
})
export class AppModule {}
