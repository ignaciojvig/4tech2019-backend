import { IsNotEmpty } from 'class-validator';

export class PostCommentDto {

    @IsNotEmpty()
    readonly userId: string;

    @IsNotEmpty()
    readonly postId: string;

    @IsNotEmpty()
    readonly comment: string;

}
