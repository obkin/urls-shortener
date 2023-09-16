import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShortUrlEntity } from './entities/short-url.entity';
import { Repository } from 'typeorm';
import { UserUrlDto } from './dto/user-url.dto';
import { LoggerService } from './logger/logger.service';
import { HashGenerator } from './helpers/hash-generator';
import { ShortUrlDto } from './dto/short-url.dto';
import { AppRepository } from './app.repository';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(ShortUrlEntity) private readonly urlRepository: Repository<ShortUrlEntity>,
    private readonly loggerService: LoggerService,
    private readonly hashGeneartor: HashGenerator,
    private readonly appRepository: AppRepository,
  ) {}

  async createShortUrl(createUserUrl: UserUrlDto): Promise<void> {
    const res = await this.appRepository.findFullUrl(createUserUrl.fullUrl);
    if (!res) {
      this.appRepository.create(createUserUrl);
      this.loggerService.log(`[AppService] new URL (${createUserUrl.fullUrl}) saved`);
    } else {
      this.loggerService.error(`[AppService] such URL (${createUserUrl.fullUrl}) is already exist`);
    }
  }

  async findFullUrl(shortUrlHash: string): Promise<any> {
    const res = await this.appRepository.findShortUrl(shortUrlHash);
  }
}
