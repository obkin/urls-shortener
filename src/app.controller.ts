import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { UserUrlDto } from './entities/user-url.dto';
import { LoggerService } from './logger/logger.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly loggerService: LoggerService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  getFullUrl(@Body() createUserUrl: UserUrlDto): void {
    try {
      this.appService.createShortUrl(createUserUrl);
      // console.log(createUserUrl); // console.log
    } catch (e) {
      console.log('[AppService] - error: ', e.message);
    }
  }
}
