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

@Controller('shrinker')
export class ShrinkerController {
  constructor(
    private readonly shrinkerService: ShrinkerService,
    private readonly loggerService: LoggerService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async createShortUrl(@Body() createUserUrl: UserUrlDto): Promise<string> {
    try {
      const res = await this.shrinkerService.createShrinker(createUserUrl);
      return `http://localhost:3000/shrinker/${res.shortUrl}`;
    } catch (e) {
      this.loggerService.error('[AppController] error: ', e.message);
    }
  }

  @Get(':hash')
  async getFullUrl(@Param('hash') hash: string, @Res() res): Promise<void> {
    try {
      const result = await this.shrinkerService.findFullUrl(hash);
      if (result) {
        return res.redirect(HttpStatus.MOVED_PERMANENTLY, result.fullUrl);
      } else {
        return res.redirect(HttpStatus.MOVED_PERMANENTLY, 'https://en.wikipedia.org/wiki/HTTP_404'); // here sould be 404 page
      }
    } catch (e) {
      this.loggerService.error('[AppController] error: ', e.message);
    }
  }
}
