import { IsNotEmpty, Length, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MediaCommentViewModel {
    constructor(userId: string, userName: string, comment: string) {
        this.userId = userId;
        this.userName = userName;
        this.comment = comment;
        this.timestamp = new Date();
    }

    @ApiProperty({ description: 'UserId from the User that\'s posting a comment', minLength: 24, maxLength: 24 })
    @IsNotEmpty()
    @Length(24)
    readonly userId: string;

    readonly userName: string;

    @ApiProperty({ description: 'MediaId from the Media that will receive a comment', minLength: 24, maxLength: 24 })
    @IsNotEmpty()
    @Length(24)
    readonly mediaId: string;

    @ApiProperty({ description: 'Comment written by the User to the Media', minLength: 1, maxLength: 50 })
    @IsNotEmpty()
    @Length(1, 50)
    readonly comment: string;

    readonly timestamp: Date;

}
