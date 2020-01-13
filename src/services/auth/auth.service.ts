import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService) { }

    async login(user: any): Promise<any> {
        const payload = await this.userService.findUser(user.userLogin, user.password);

        if (!payload) { throw new BadRequestException('Incorrect Credentials!'); }

        return {
            access_token: this.jwtService.sign(payload),
            _id: payload._id,
        };
    }

}
