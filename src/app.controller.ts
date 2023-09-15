import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { UserUrlDto } from './entities/url.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  getFullUrl(@Body() createUserUrl: UserUrlDto): void {
    try {
      this.appService.createShortUrl(createUserUrl);
      console.log(createUserUrl);
    } catch (e) {
      console.log('[AppService] - some error: ', e.message);
    }
  }
}
