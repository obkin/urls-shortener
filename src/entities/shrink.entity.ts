import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ShrinkEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullUrl: string;

  @Column()
  shortUrl: string;

  @Column()
  clicked: number;
}
