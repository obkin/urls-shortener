import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Redirect,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { UserUrlDto } from './dto/user-url.dto';
import { LoggerService } from './logger/logger.service';
import { ShortUrlDto } from './dto/short-url.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly loggerService: LoggerService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe())
  createShortUrl(@Body() createUserUrl: UserUrlDto): void {
    try {
      this.appService.createShortUrl(createUserUrl);
    } catch (e) {
      this.loggerService.error('[AppController] error: ', e.message);
    }
  }

  @Get(':hash')
  @Redirect()
  getFullUrl(@Param('hash') hash: string): void {
    try {
      this.appService.findFullUrl(hash);
    } catch (e) {
      this.loggerService.error('[AppController] error: ', e.message);
    }
    console.log(hash);
  }
}
