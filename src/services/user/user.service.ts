import { Injectable, BadRequestException, NotImplementedException } from '@nestjs/common';
import { UserRepository } from 'src/mongo/repository/user.repository';
import { User } from 'src/mongo/schemas/user.schema';
import { UserDto } from 'src/domain/user/user.dto';

@Injectable()
export class UserService {

    constructor(private readonly userRepository: UserRepository) {
    }

    async getAllUsers(): Promise<User[] | undefined> {
        return await this.userRepository.get();
    }

    async getUserById(id: string): Promise<User | undefined> {
        const user = await this.userRepository.getById(id);
        if (user) { return user; }

        throw new BadRequestException(`There's no user with id ${id}`);
    }

    async findUser(userLogin: string, password: string): Promise<User | undefined> {
        return await this.userRepository.getByLogin(userLogin, password);
    }

    async createUser(newUser: UserDto): Promise<string> {

        const alreadyExistingUser = await this.userRepository.getByLogin(newUser.userLogin, newUser.password);

        if (alreadyExistingUser) {
            throw new BadRequestException('This username already exists!');
        }

        await this.userRepository.create(newUser);

        return 'User successfully created!';
    }

    async updateUser(updateUser: UserDto, id: string): Promise<string> {
        await this.userRepository.update(updateUser, id);

        return 'User successfully updated!';
    }

    async deleteUser(id: string): Promise<string> {
        await this.userRepository.delete(id);

        return 'User successfully deleted!';
    }
}
