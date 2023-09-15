import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShortUrlEntity } from './entities/short-url.entity';
import { Repository } from 'typeorm';
import { UserUrlDto } from './entities/url.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(ShortUrlEntity) private readonly userRepository: Repository<ShortUrlEntity>,
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
      console.log('such URL is already exist');
    } else {
      const res = await this.userRepository.save({
        fullUrl: createUserUrl.fullUrl,
        shortUrl: 'http://null', // here you need some service that can make URL shorter
        clicked: 0,
      });
    }
  }

  findShortUrl(): void {}
}
