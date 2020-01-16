import { Controller, UseGuards, Post, UseInterceptors, UploadedFile, Req, Res, Body, Get, Param, Put } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserActivityService } from 'src/services/user-activity/user-activity.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { ParseParamPipe } from 'src/pipes/parse-param.pipe';
import { LikeOrDislikeDto } from 'src/domain/media/like-dislike.dto';
import { PostCommentDto } from 'src/domain/media/post-comment.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('user-activity')
export class UserActivityController {
    constructor(private readonly userActivityService: UserActivityService) { }

    @Get(':index')
    getRecentImages(
        @Param('index', new ParseParamPipe()) index: number) {
        return this.userActivityService.getRecentImages(index);
    }

    @Put('like-or-dislike')
    likeOrDislikePost(@Body() likeOrDislikeDto: LikeOrDislikeDto) {
        return this.userActivityService.likeOrDislikePost(likeOrDislikeDto);
    }

    @Put('comment-in-activity')
    postCommentInActivity(@Body() postCommentDto: PostCommentDto) {
        return this.userActivityService.postComment(postCommentDto);
    }

    @Post('upload')
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: '../4tech2019-backend-images/',
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
        }))
    postImage(
        @UploadedFile() file,
        @Body('userId') userId: string,
        @Body('description') description: string,
    ) {
        return this.userActivityService.postImage(userId, file.filename, description);
    }
}

export const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
};

export const editFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = extname(file.originalname);
    const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    callback(null, `${name}-${randomName}${fileExtName}`);
};
