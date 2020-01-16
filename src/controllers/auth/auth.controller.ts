import { Request, Controller, Post, UseGuards, Get, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/services/auth/auth.service';
import { LoginViewModel } from 'src/domain/view-model/login/login.viewmodel';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() login: LoginViewModel) {
        return this.authService.login(login);
    }

}
