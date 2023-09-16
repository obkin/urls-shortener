import { Injectable } from '@nestjs/common';
import { LoggerService } from './logger/logger.service';
import { ShortUrlEntity } from './entities/short-url.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserUrlDto } from './dto/user-url.dto';
import { HashGenerator } from './helpers/hash-generator';
import { ShortUrlDto } from './dto/short-url.dto';

@Injectable()
export class AppRepository {
  constructor(
    @InjectRepository(ShortUrlEntity) private readonly urlRepository: Repository<ShortUrlEntity>,
    private readonly hashGeneartor: HashGenerator,
  ) {}

  async create(userUrl: UserUrlDto): Promise<ShortUrlEntity> {
    return await this.urlRepository.save({
      fullUrl: userUrl.fullUrl,
      shortUrl: this.hashGeneartor.generate(),
      clicked: 0,
    });
  }

  async findShortUrl(shortUserUrl: string): Promise<ShortUrlEntity | null> {
    return this.urlRepository.findOne({
      where: {
        shortUrl: shortUserUrl,
      },
    });
  }

  async findFullUrl(fullUserUrl: string): Promise<ShortUrlEntity | null> {
    return this.urlRepository.findOne({
      where: {
        fullUrl: fullUserUrl,
      },
    });
  }
}
