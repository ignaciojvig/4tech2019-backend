import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { secretKey } from './services/auth/secretKey';
import { JwtStrategy } from './services/auth/jwt.strategy';
import { UserController } from './controllers/user/user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './mongo/schemas/user.schema';
import { UserService } from './services/user/user.service';
import { UserRepository } from './mongo/repository/user.repository';
import { MulterModule } from '@nestjs/platform-express';
import * as mongoose from 'mongoose';
import { UserActivityController } from './controllers/user-activity/user-activity.controller';
import { UserActivityService } from './services/user-activity/user-activity.service';
import { MediaSchema } from './mongo/schemas/media.schema';
import { UserActivityRepository } from './mongo/repository/user-activity.repository';
import { WebsocketGateway } from './websocket/websocket.gateway';

// Enabling Mongo Debug
mongoose.set('debug', true);
// ---

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/admin', { useNewUrlParser: true, useUnifiedTopology: true }),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Media', schema: MediaSchema },
    ]),
    JwtModule.register({ secret: secretKey, signOptions: { expiresIn: '600m' } }),
    MulterModule.register(),
  ],
  controllers: [AuthController, UserController, UserActivityController],
  providers: [AuthService, UserService, UserActivityService, JwtStrategy, UserActivityRepository, UserRepository, WebsocketGateway],
})
export class AppModule { }
