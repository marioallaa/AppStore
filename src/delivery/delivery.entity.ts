import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'deliveries' })
export class Delivery {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'int', name: 'user_id' })
  public userId: number;

  @Column({ type: 'int', name: 'delivery_user_id' })
  public deliveryUserId: number;

  @Column({ type: 'varchar', name: 'delivering_uuid' })
  public deliveringUuid: string;

  @Column({ type: 'int', name: 'invoice_id' })
  public invoiceId: number;

  @Column({ type: 'date', nullable: true })
  public date: string;

  @Column({ type: 'time', nullable: true })
  public time: string;

  @Column({ type: 'int', name: 'status_id' })
  public statusId: number;

  @Column({ type: 'date', nullable: true, name: 'created_at' })
  public createdAt: string;

  @Column({ type: 'date', nullable: true, name: 'updated_at' })
  public updatedAt: string;
}
