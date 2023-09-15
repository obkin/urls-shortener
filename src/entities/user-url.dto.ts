import { IsString } from 'class-validator';

export class UserUrlDto {
  @IsString()
  fullUrl: string;
}
