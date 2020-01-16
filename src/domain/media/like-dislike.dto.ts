import { IsNotEmpty } from 'class-validator';

export class LikeOrDislikeDto {

    @IsNotEmpty()
    readonly userId: string;

    @IsNotEmpty()
    readonly postId: string;

}
