import { Injectable, BadRequestException, NotImplementedException } from '@nestjs/common';
import { UserRepository } from 'src/mongo/repository/user.repository';
import { User } from 'src/mongo/schemas/user.schema';
import { UserViewModel } from 'src/domain/view-model/user/user.viewmodel';

@Injectable()
export class UserService {

    constructor(private readonly userRepository: UserRepository) {
    }

    async getAllUsers(): Promise<User[] | undefined> {
        return await this.userRepository.get();
    }

    async getUserById(id: string): Promise<User | undefined> {
        const user = await this.userRepository.getById(id);

        if (!user) {
            throw new BadRequestException(`There's no user with id ${id}`);
        }

        return user;
    }

    async createUser(newUser: UserViewModel): Promise<User> {

        const alreadyExistingUser = await this.userRepository.getByLogin(newUser.userLogin, newUser.password);

        if (alreadyExistingUser) {
            throw new BadRequestException('This username already exists!');
        }

        return await this.userRepository.create(newUser);
    }

    async updateUser(updateUser: UserViewModel, id: string): Promise<string> {
        await this.userRepository.update(updateUser, id);

        return 'User successfully updated!';
    }

    async deleteUser(id: string): Promise<string> {
        await this.userRepository.delete(id);

        return 'User successfully deleted!';
    }
}
