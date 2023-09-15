import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ShortUrlEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullUrl: string;

  @Column()
  shortUrl: string;

  @Column()
  clicked: number;
}
