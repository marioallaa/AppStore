import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class FXUserEntity {

    @PrimaryGeneratedColumn()
     id: number;

    @Column({type: 'varchar', unique: true, nullable: false})
    public username: string;

    @Column({type: 'varchar', default: null})
    name: string;

    @Column({type: 'varchar',  default: null})
    lastname: string;

    @Column({type: 'varchar'})
    pass: string;

    @Column({type: 'varchar'})
    email: string;

    @Column({type: 'varchar'})
    phone: string;

    @Column({type: 'bool', default: null})
    admin: boolean;

    @Column({type: 'int', default: null})
    otherSettingsId: number;

}
