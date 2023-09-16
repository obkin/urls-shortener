import { IsString } from 'class-validator';

export class ShortUrlDto {
  @IsString({ message: 'incorrect URL from user' })
  urlHash: string;
}
