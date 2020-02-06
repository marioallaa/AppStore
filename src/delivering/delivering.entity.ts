import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'delivering' })
export class Delivering {

  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  uuid: string;

  @Column('double')
  latitude: number;

  @Column('double')
  longitude: number;

  @Column({ type: 'date', nullable: true, name: 'created_at' })
  createdAt: string;

  @Column({ type: 'date', nullable: true, name: 'updated_at' })
  updatedAt: string;
}
