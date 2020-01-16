import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class UserViewModel {
    @ApiProperty({ description: 'Login used to access the application', minLength: 3, maxLength: 10 })
    @IsNotEmpty()
    @Length(3, 10)
    readonly userLogin: string;

    @ApiProperty({ description: 'User name', minLength: 3, maxLength: 20 })
    @IsNotEmpty()
    @Length(3, 20)
    readonly userName: string;

    @ApiProperty({ description: 'Password used to access the application', minLength: 3, maxLength: 10 })
    @IsNotEmpty()
    @Length(3, 10)
    readonly password: string;
}
