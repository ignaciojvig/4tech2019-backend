import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class LoginViewModel {

    @ApiProperty({ description: 'Login used to access the application', maxLength: 10, minLength: 3 })
    @IsNotEmpty()
    @Length(3, 10)
    readonly userLogin: string;

    @ApiProperty({ description: 'Password used to access the application', maxLength: 10, minLength: 3 })
    @IsNotEmpty()
    @Length(3, 10)
    readonly password: string;
}
