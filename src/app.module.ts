import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { secretKey } from './services/auth/secretKey';
import { JwtStrategy } from './services/auth/jwt.strategy';
import { UserController } from './controllers/user/user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './mongo/models/user/user.schema';
import { UserService } from './services/user/user.service';
import { UserRepository } from './mongo/repository/user.repository';
import * as mongoose from 'mongoose';

// Enabling Mongo Debug
mongoose.set('debug', true);
// ---

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/'),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({ secret: secretKey, signOptions: { expiresIn: '600m' } }),
  ],
  controllers: [AuthController, UserController],
  providers: [AppService, AuthService, UserService, JwtStrategy, UserRepository],
})
export class AppModule { }
