import {Body, Controller, Get, Request, Post, UseGuards} from '@nestjs/common';
import {FXUserDTO, LoginDto} from './user.dto';
import {UserService} from './user.service';
import {AuthGuard} from '@nestjs/passport';

@Controller('u')
export class UserController {

    constructor(
        private uSer: UserService,
    ) {
    }

    @Post('/register')
    async register(@Body() newUser: FXUserDTO) {
        if (await this.uSer.findUser(newUser.username)) {
            return {status: 1000, message: 'used username'};
        }
        console.log(newUser);
        return {status: 0, token: await this.uSer.createUser(newUser)};
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/whatsMyName')
    async whatsMyName(@Request() req) {
        return {
            status: 0,
            user: req.user,
        };
    }

    @Post('/login')
    async login(@Body() login: LoginDto) {
        console.log(login);
        const o: any = await this.uSer.validateUser(login);
        console.log(o);
        return {status: 0, token: o};
    }
}
