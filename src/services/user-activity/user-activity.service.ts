import { Injectable, BadRequestException } from '@nestjs/common';
import { UserActivityRepository } from 'src/mongo/repository/user-activity.repository';
import { isNull } from 'util';
import { ImageUploadDto } from 'src/domain/media/image-upload.dto';
import { MediaComment } from 'src/domain/media/media-comments.dto';
import { readFileSync } from 'fs';
import { Media } from 'src/mongo/schemas/media.schema';
import { UserService } from '../user/user.service';
import { LikeOrDislikeDto } from 'src/domain/media/like-dislike.dto';
import { PostCommentDto } from 'src/domain/media/post-comment.dto';

@Injectable()
export class UserActivityService {
    constructor(
        private readonly userActivityRepository: UserActivityRepository,
        private readonly userService: UserService) {
    }

    async postImage(userId: string, filename: string, description: string) {

        if (isNull(userId) || userId === '') { throw new BadRequestException('The UserId can\'t be null'); }

        const user = await this.userService.getUserById(userId);
        if (isNull(user)) { throw new BadRequestException('An user with the given UserId was not found '); }

        const imageUploadDto: ImageUploadDto = new ImageUploadDto(
            userId,
            user.userName,
            filename,
        );

        if (!isNull(description) && description !== '') {
            imageUploadDto.mediaComments.push(
                new MediaComment(userId, user.userName, description),
            );
        }

        await this.userActivityRepository.insert(imageUploadDto);

        return 'Posted!: ' + filename;
    }

    async getRecentImages(index: number) {
        if (isNull(index)) { index = 0; }

        const recentUploadedImages = await this.userActivityRepository.getPaged(index);

        const encodedImages = this.convertImagesToBase64(recentUploadedImages);

        return encodedImages;
    }

    convertImagesToBase64(imagesDto: Media[]) {

        return Promise.all(imagesDto.map(imgObj => {

            return { ...imgObj, imgEncoded: readFileSync('../4tech2019-backend-images/' + imgObj.filename, 'base64') };

        }));
    }

    async likeOrDislikePost(likeOrDislikeDto: LikeOrDislikeDto) {

        const post = await this.userActivityRepository.getById(likeOrDislikeDto.postId);
        if (isNull(post)) { throw new BadRequestException('A Post with the given PostId could not be found'); }

        if (post.likes.map(x => x.toString()).includes(likeOrDislikeDto.userId)) {
            post.likes = post.likes.filter(x => x.toString() !== likeOrDislikeDto.userId);
        } else {
            post.likes = post.likes.concat(likeOrDislikeDto.userId);
        }

        await this.userActivityRepository.update(post);

        return 'Activity successfully liked/disliked!';
    }

    async postComment(postCommentDto: PostCommentDto) {

        const post = await this.userActivityRepository.getById(postCommentDto.postId);
        if (isNull(post)) { throw new BadRequestException('A Post with the given PostId could not be found'); }

        const user = await this.userService.getUserById(postCommentDto.userId);
        if (isNull(user)) { throw new BadRequestException('An user with the given UserId was not found '); }

        post.mediaComments = post.mediaComments.concat(new MediaComment(postCommentDto.userId, user.userName, postCommentDto.comment));

        await this.userActivityRepository.update(post);

        return 'Comment successfully added to Activity';

    }

}
