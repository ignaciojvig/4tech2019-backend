import { Injectable } from '@nestjs/common';
import { User } from 'src/models/user';

@Injectable()
export class UserService {
    private readonly users: User[];

    constructor() {
        this.users = [
            { userId: 1, userLogin: 'John', userName: "John Johnisson", password: '123' },
            { userId: 2, userLogin: 'Smith', userName: "Smith Smithsson", password: 'aaa' }
        ]
    }

    async getUserById(id: String): Promise<User | undefined> {
        const parsedId = Number(id);
        const user = this.users.find(user => user.userId === parsedId);
        if (user) { return user; }
        else return null;
    }

    async findUser(userLogin: String): Promise<User | undefined> {
        // Simulando conexão com o mongo
        return this.users.find(user => user.userLogin === userLogin);
    }
}
