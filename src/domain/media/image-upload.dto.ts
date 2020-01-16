import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';
import { MediaComment } from 'src/domain/media/media-comments.dto';

export class ImageUploadDto {
    constructor(userId: string, userName: string, filename: string) {
        this.userId = userId;
        this.userName = userName;
        this.filename = filename;
        this.mediaComments = [];
    }

    @ApiProperty({ description: 'Id from the User which uploaded a image' })
    @IsNotEmpty()
    readonly userId: string;

    @ApiProperty({ description: 'Current name of the uploaded file' })
    @IsNotEmpty()
    readonly filename: string;

    readonly userName: string;

    readonly mediaComments: MediaComment[];
}
