import { Injectable } from '@nestjs/common';
import { ShortUrlEntity } from '../entities/short-url.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserUrlDto } from '../dto/user-url.dto';
import { HashGenerator } from '../helpers/hash-generator';

@Injectable()
export class ShrinkerRepository {
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
