import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Entry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  entry: string;

  @Column()
  exit: string;

  @Column()
  caption: string;

  @Column()
  submiter: string;

  @Column()
  trash: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
