import { Controller, Get, UseGuards, Param, Post, Body, Put, Delete, BadRequestException } from '@nestjs/common';
import { UserService } from 'src/services/user/user.service';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from 'src/domain/user/user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @UseGuards(AuthGuard('jwt'))
    @Get('/')
    getAllUsers() {
        return this.userService.getAllUsers();
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    getUser(@Param('id') id: string) {
        return this.userService.getUserById(id);
    }

    @Post()
    insertUser(@Body() newUser: UserDto) {
        return this.userService.createUser(newUser);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    updateUser(@Body() updateUser: UserDto, @Param('id') id: string) {
        return this.userService.updateUser(updateUser, id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    deleteUser(@Param('id') id: string) {
        return this.userService.deleteUser(id);
    }

}
