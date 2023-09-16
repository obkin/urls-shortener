import { Injectable } from '@nestjs/common';
import { ShrinkEntity } from '../entities/shrink.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserUrlDto } from './dto/user-url.dto';
import { HashGenerator } from '../helpers/hash-generator';

@Injectable()
export class ShrinkerRepository {
  constructor(
    @InjectRepository(ShrinkEntity) private readonly urlRepository: Repository<ShrinkEntity>,
    private readonly hashGeneartor: HashGenerator,
  ) {}

  async create(userUrl: UserUrlDto): Promise<ShrinkEntity> {
    return await this.urlRepository.save({
      fullUrl: userUrl.fullUrl,
      shortUrl: this.hashGeneartor.generate(),
      clicked: 0,
    });
  }

  async findShortUrl(shortUserUrl: string): Promise<ShrinkEntity | null> {
    return this.urlRepository.findOne({
      where: {
        shortUrl: shortUserUrl,
      },
    });
  }

  async findFullUrl(fullUserUrl: string): Promise<ShrinkEntity | null> {
    return this.urlRepository.findOne({
      where: {
        fullUrl: fullUserUrl,
      },
    });
  }
}
