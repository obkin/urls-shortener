import { Injectable } from '@nestjs/common';
import { ShortUrlEntity } from '../entities/short-url.entity';
import { UserUrlDto } from './dto/user-url.dto';
import { LoggerService } from '../logger/logger.service';
import { ShrinkerRepository } from './shrinker.repository';
import { ShortUrlDto } from './dto/short-url.dto';

@Injectable()
export class ShrinkerService {
  constructor(
    private readonly loggerService: LoggerService,
    private readonly shrinkerRepository: ShrinkerRepository,
  ) {}

  async createShortUrl(createUserUrl: UserUrlDto): Promise<void> {
    const res = await this.shrinkerRepository.findFullUrl(createUserUrl.fullUrl);
    if (!res) {
      this.shrinkerRepository.create(createUserUrl);
      this.loggerService.log(`[AppService] new URL (${createUserUrl.fullUrl}) saved`);
    } else {
      this.loggerService.error(`[AppService] such URL (${createUserUrl.fullUrl}) is already exist`);
    }
  }

  async findFullUrl(shortUrlHash: string): Promise<ShortUrlEntity> {
    const res = await this.shrinkerRepository.findShortUrl(shortUrlHash);
    return res;
  }
}
