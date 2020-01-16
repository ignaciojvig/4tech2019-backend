import { Controller, UseGuards, Post, UseInterceptors, UploadedFile, Req, Res, Body, Get, Param, Put } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserActivityService } from 'src/services/user-activity/user-activity.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { ParseParamPipe } from 'src/pipes/parse-param.pipe';
import { LikeOrDislikeViewModel } from 'src/domain/view-model/media/like-dislike.viewmodel';
import { MediaCommentViewModel } from 'src/domain/view-model/media/media-comment.viewmodel';

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
    likeOrDislikeMedia(@Body() likeOrDislike: LikeOrDislikeViewModel) {
        return this.userActivityService.likeOrDislikeMedia(likeOrDislike);
    }

    @Put('comment-in-activity')
    postCommentInActivity(@Body() postComment: MediaCommentViewModel) {
        return this.userActivityService.postComment(postComment);
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
