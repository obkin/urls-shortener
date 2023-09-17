import { Module } from '@nestjs/common';
import { ShrinkerService } from './shrinker.service';
import { ShrinkerController } from './shrinker.controller';
import { ShrinkerRepository } from './shrinker.repository';
import { LoggerService } from '../logger/logger.service';
import { HashGenerator } from '../helpers/hash-generator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../database/database.module';
import { ShrinkEntity } from '../entities/shrink.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShrinkEntity]), DatabaseModule],
  providers: [ShrinkerService, LoggerService, ShrinkerRepository, HashGenerator],
  controllers: [ShrinkerController],
})
export class ShrinkerModule {}
