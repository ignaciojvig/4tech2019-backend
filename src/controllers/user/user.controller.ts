import { Controller, Get, UseGuards, Param } from '@nestjs/common';
import { UserService } from 'src/services/user/user.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get('profile/:id')
    getUser(@Param('id') id) {
        return this.userService.getUserById(id);
    }
}
