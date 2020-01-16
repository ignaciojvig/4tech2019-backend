import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';
import { MediaCommentViewModel } from '../../view-model/media/media-comment.viewmodel';

export class ImageUploadDto {
    constructor(userId: string, userName: string, filename: string) {
        this.userId = userId;
        this.userName = userName;
        this.filename = filename;
        this.mediaComments = [];
    }

    readonly userId: string;

    readonly filename: string;

    readonly userName: string;

    readonly mediaComments: MediaCommentViewModel[];
}
