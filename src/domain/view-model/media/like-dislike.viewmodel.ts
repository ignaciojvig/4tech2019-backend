import { IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LikeOrDislikeViewModel {

    @ApiProperty({ description: 'UserId from the User that\'s liking or disliking a media', minLength: 24, maxLength: 24 })
    @IsNotEmpty()
    @Length(24)
    readonly userId: string;

    @ApiProperty({ description: 'MediaId from the Media that\'s being liked or disliked by an user', minLength: 24, maxLength: 24 })
    @IsNotEmpty()
    @Length(24)
    readonly mediaId: string;

}
