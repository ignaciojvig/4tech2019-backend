import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/mongo/repository/user.repository';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService) { }

    async login(user: any): Promise<any> {
        const payload = await this.userRepository.getByLogin(user.userLogin, user.password);

        if (!payload) { throw new BadRequestException('Incorrect Credentials!'); }

        return {
            access_token: this.jwtService.sign(payload),
            _id: payload._id,
        };
    }

}
