import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { UserDto } from '../../domain/user/user.dto';

@Injectable()
export class UserRepository {
    constructor(@InjectModel('User') private readonly userSchema: Model<User>) {
    }

    async get(): Promise<User[]> {
        return await this.userSchema
            .find()
            .select({ __v: false, userLogin: false, password: false })
            .lean();
    }

    async getById(id: string): Promise<User> {
        return await this.userSchema
            .findOne({ _id: id })
            .select({ __v: false, userLogin: false, password: false })
            .lean();
    }

    async getByLogin(userLogin: string, password: string): Promise<User> {
        return await this.userSchema
            // tslint:disable-next-line:object-literal-shorthand
            .findOne({ userLogin: userLogin, password: password })
            .select({ __v: false, userLogin: false, userName: false, password: false })
            .lean();
    }

    async create(userDto: UserDto): Promise<User> {
        const newUser = this.userSchema(userDto);
        return await newUser.save();
    }

    async update(updateUser: UserDto, id: string): Promise<User> {
        const updatedUser = await this.userSchema.findOneAndUpdate({ _id: id }, updateUser);
        return await updatedUser.save();
    }

    async delete(id: string): Promise<User> {
        return await this.userSchema.deleteOne({ _id: id });
    }

}
