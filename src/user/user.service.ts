import {Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {FXUserEntity} from './user.entity';
import {FXUserDTO, LoginDto} from './user.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(FXUserEntity)
        private readonly userEntityRepository: Repository<FXUserEntity>,
        private readonly jwtService: JwtService,
    ) {
    }

    async validateUser(login: LoginDto) {
        const  u: any = await this.findUser(login.username);
        if (u && u.pass === login.pass) {
            return await this.login(u);
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.id };
        console.log(payload);
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async createUser(u: FXUserDTO) {
        const user: any = await this.userEntityRepository.save(u);
        return this.login(user);
    }

    public findUser(u: string) {
        return this.userEntityRepository.findOne({where: {username: u}});
    }

    public returnAllUsers() {
        return this.userEntityRepository.find();
    }

    public getDashboard() {
        return 'DASHBOARD';
    }
}
