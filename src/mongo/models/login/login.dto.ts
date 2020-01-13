import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class LoginDto {

    @ApiProperty({ description: 'Login used to access the application' })
    @IsNotEmpty()
    @Length(3, 10)
    readonly userLogin: string;

    @ApiProperty({ description: 'Password used to access the application' })
    @IsNotEmpty()
    @Length(3, 10)
    readonly password: string;
}
