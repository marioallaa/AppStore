import {Module} from '@nestjs/common';
import {UserController} from './user.controller';
import {UserService} from './user.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {FXUserEntity} from './user.entity';
import {JwtModule} from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport';
import {JwtStrategy} from './jwt.strategys';

@Module({
    imports: [
        TypeOrmModule.forFeature([FXUserEntity]),
        PassportModule,
        JwtModule.register({
            secret: 'omigoshgr8m8',
            signOptions: {expiresIn: '9999999s'},
        })],
    controllers: [UserController],
    providers: [UserService, JwtStrategy],
    exports: [UserService],
})
export class UserModule {
}
