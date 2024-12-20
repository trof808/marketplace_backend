import { DecimalColumn } from '../../shared/columnDecorators/DecimalColumn';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  title: string;

  @Column('text')
  description?: string;

  @DecimalColumn()
  price: number;

  @Column('text')
  currency: string;

  @DecimalColumn()
  availableCount: number;

  @Column({ nullable: true })
  category_id?: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
