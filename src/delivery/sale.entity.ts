import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'sales' })
export class Sale {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', name: 'uuid' })
  public uuid: string;

  @Column({ type: 'varchar', name: 'invoice_no' })
  public invoiceNo: string;

  @Column({ type: 'varchar', name: 'serial_no' })
  public serialNo: string;

  @Column({ type: 'int', name: 'user_id' })
  public userId: number;

  @Column({ type: 'int', name: 'warehouse_id' })
  public warehouseId: number;

  @Column({ type: 'varchar', name: 'agent_fullname' })
  public agentFullname: string;

  @Column({ type: 'int', name: 'client_id' })
  public clientId: number;

  @Column({ type: 'int', name: 'order_id' })
  public orderId: number;

  @Column({ type: 'date', nullable: true })
  public date: string;

  @Column({ type: 'varchar', name: 'notes' })
  public notes: string;

  @Column({ type: 'varchar', name: 'payment_method' })
  public paymentMethod: string;

  @Column({ type: 'double', name: 'discount' })
  public discount: number;

  @Column({ type: 'double', name: 'value' })
  public value: number;

  @Column({ type: 'double', name: 'debt' })
  public debt: number;

  @Column({ type: 'varchar', name: 'latitude' })
  public latitude: string;

  @Column({ type: 'varchar', name: 'longitude' })
  public longitude: string;

  @Column({ type: 'tinyint', name: 'is_active' })
  public isActive: boolean;

  @Column({ type: 'int', name: 'status_id' })
  public statusId: number;

  @Column({ type: 'int', name: 'invoice_status_id' })
  public invoiceStatusId: number;

  @Column({ type: 'int', name: 'delivery_status_id' })
  public deliveryStatusId: number;

  @Column({ type: 'date', nullable: true, name: 'created_at' })
  public createdAt: string;

  @Column({ type: 'date', nullable: true, name: 'updated_at' })
  public updatedAt: string;
}
