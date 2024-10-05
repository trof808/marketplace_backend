import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PromoCode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column()
  discount_type: 'percentage' | 'fixed';

  @Column('decimal')
  discount_value: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
