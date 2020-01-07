import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { UserService } from './services/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { secretKey } from './services/auth/secretKey';
import { JwtStrategy } from './services/auth/jwt.strategy';
import { UserController } from './controllers/user/user.controller';

@Module({
  imports: [
    JwtModule.register(
      {
        secret: secretKey,
        signOptions: { expiresIn: '60m' }
      })
  ],
  controllers: [AuthController, UserController],
  providers: [AppService, AuthService, UserService, JwtStrategy],
})
export class AppModule { }
