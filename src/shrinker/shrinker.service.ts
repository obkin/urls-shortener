import { Injectable } from '@nestjs/common';
import { ShrinkEntity } from '../entities/shrink.entity';
import { UserUrlDto } from './dto/user-url.dto';
import { LoggerService } from '../logger/logger.service';
import { ShrinkerRepository } from './shrinker.repository';

@Injectable()
export class ShrinkerService {
  constructor(
    private readonly loggerService: LoggerService,
    private readonly shrinkerRepository: ShrinkerRepository,
  ) {}

  async createShrinker(createUserUrl: UserUrlDto): Promise<ShrinkEntity> {
    const res = await this.shrinkerRepository.findFullUrl(createUserUrl.fullUrl);
    if (!res) {
      this.loggerService.log(`[AppService] new URL (${createUserUrl.fullUrl}) saved`);
      return this.shrinkerRepository.create(createUserUrl);
    } else {
      this.loggerService.warn(`[AppService] such URL (${createUserUrl.fullUrl}) is already exist`);
      return res;
    }
  }

  async findFullUrl(shortUrlHash: string): Promise<ShrinkEntity> {
    const res = await this.shrinkerRepository.findShortUrl(shortUrlHash);
    return res;
  }
}
