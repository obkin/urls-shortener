import { Module } from '@nestjs/common';
import { ShrinkerService } from './shrinker.service';
import { ShrinkerController } from './shrinker.controller';
import { ShrinkerRepository } from './shrinker.repository';
import { LoggerService } from 'src/logger/logger.service';
import { HashGenerator } from 'src/helpers/hash-generator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database/database.module';
import { ShortUrlEntity } from 'src/entities/short-url.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShortUrlEntity]), DatabaseModule],
  providers: [ShrinkerService, LoggerService, ShrinkerRepository, HashGenerator],
  controllers: [ShrinkerController],
})
export class ShrinkerModule {}
