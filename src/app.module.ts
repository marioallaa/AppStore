import { join } from 'path';
import { Module } from '@nestjs/common';
import { DeliveryModule } from './delivery/delivery.module';
import { DeliveringModule } from './delivering/delivering.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import {UserModule} from './user/user.module';
import { AuthModule } from './auth/auth.module';

const getType = (envType: any) => {
  switch (envType) {
    case 'mysql':
    case 'mssql':
    case 'postgres':
    case 'mariadb':
    case 'mongodb':
      return envType;
    default:
      return 'mysql';
  }
};

getConnectionOptions();

console.log('process.env.TYPEORM_HOST', process.env.TYPEORM_HOST);
console.log('process.env.TYPEORM_PORT', process.env.TYPEORM_PORT);
console.log('Number.parseInt(process.env.TYPEORM_PORT)', Number.parseInt(process.env.TYPEORM_PORT || '3306', 10));
console.log('process.env.TYPEORM_USERNAME', process.env.TYPEORM_USERNAME);
console.log('process.env.TYPEORM_PASSWORD', process.env.TYPEORM_PASSWORD);
console.log('process.env.TYPEORM_DATABASE', __dirname + process.env.TYPEORM_DATABASE);
console.log('process.env.entities', process.env.TYPEORM_ENTITIES);

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: getType(process.env.TYPEORM_CONNECTION),
      host: process.env.TYPEORM_HOST || 'localhost',
      port: Number.parseInt(process.env.TYPEORM_PORT || '3306', 10),
      logging: true,
      username: process.env.TYPEORM_USERNAME || 'fx',
      password: process.env.TYPEORM_PASSWORD || '123',
      database: process.env.TYPEORM_DATABASE || 'fx',
      entities: [__dirname + process.env.TYPEORM_ENTITIES || '../**/*.entity{.ts,.js}'],
      synchronize: (process.env.TYPEORM_SYNCHRONIZE === 'true' || false),
    }),
      UserModule,
    DeliveryModule,
    DeliveringModule,
    AuthModule,
  ],
})
export class AppModule { }
