import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserUrlDto } from './dto/user-url.dto';
import { LoggerService } from '../logger/logger.service';
import { ShrinkerService } from './shrinker.service';
import { ShortUrlDto } from './dto/short-url.dto';

@Controller('shrinker')
export class ShrinkerController {
  constructor(
    private readonly shrinkerService: ShrinkerService,
    private readonly loggerService: LoggerService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async createShortUrl(@Body() createUserUrl: UserUrlDto): Promise<void> {
    try {
      await this.shrinkerService.createShortUrl(createUserUrl);
    } catch (e) {
      this.loggerService.error('[AppController] error: ', e.message);
    }
  }

  @Get(':hash')
  async getFullUrl(@Param('hash') hash: string, @Res() res): Promise<void> {
    try {
      const { fullUrl } = await this.shrinkerService.findFullUrl(hash);
      console.log(fullUrl); // console.log
      return res.redirect(HttpStatus.MOVED_PERMANENTLY, fullUrl);
    } catch (e) {
      this.loggerService.error('[AppController] error: ', e.message);
    }
  }
}
