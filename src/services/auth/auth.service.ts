import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    async validateUser(userLogin: String, password: String): Promise<any> {
        const user = await this.userService.findUser(userLogin);

        if (user && user.password === password) {
            return user;
        }

        return null;
    }

    async login(user: any) {
        const payload = await this.validateUser(user.userLogin, user.password);

        if (!payload) {
            throw new UnauthorizedException("The given user doesn't exists!");
        }

        return {
            access_token: this.jwtService.sign(payload)
        };
    }

}
