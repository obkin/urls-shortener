import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShortUrlEntity } from './entities/short-url.entity';
import { Repository } from 'typeorm';
import { UserUrlDto } from './entities/user-url.dto';
import { LoggerService } from './logger/logger.service';
import { HashGenerator } from './helpers/hash-generator';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(ShortUrlEntity) private readonly userRepository: Repository<ShortUrlEntity>,
    private readonly loggerService: LoggerService,
    private readonly hashGeneartor: HashGenerator,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async createShortUrl(createUserUrl: UserUrlDto): Promise<void> {
    const shortUrlExist = await this.userRepository.findOne({
      where: {
        fullUrl: createUserUrl.fullUrl,
      },
    });

    if (shortUrlExist) {
      this.loggerService.error(`[AppService] such URL (${createUserUrl.fullUrl}) is already exist`);
    } else {
      const res = await this.userRepository.save({
        fullUrl: createUserUrl.fullUrl,
        shortUrl: this.hashGeneartor.generate(),
        clicked: 0, // (for future) count how many times this URL was used
      });
      this.loggerService.log(`[AppService] new URL (${createUserUrl.fullUrl}) saved`);
    }
  }

  findShortUrl(): void {}
}
