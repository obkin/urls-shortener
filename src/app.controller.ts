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
  async createShortUrl(@Body() createUserUrl: UserUrlDto): Promise<void> {
    try {
      await this.appService.createShortUrl(createUserUrl);
    } catch (e) {
      this.loggerService.error('[AppController] error: ', e.message);
    }
  }

  @Get(':hash')
  @Redirect()
  async getFullUrl(@Param('hash') hash: string): Promise<void> {
    try {
      const { fullUrl } = await this.appService.findFullUrl(hash);
      console.log(fullUrl);
    } catch (e) {
      this.loggerService.error('[AppController] error: ', e.message);
    }
  }
}
