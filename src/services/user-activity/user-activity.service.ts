import { Injectable, BadRequestException } from '@nestjs/common';
import { UserActivityRepository } from 'src/mongo/repository/user-activity.repository';
import { isNull } from 'util';
import { readFileSync } from 'fs';
import { Media } from 'src/mongo/schemas/media.schema';
import { UserService } from '../user/user.service';
import { ImageUploadDto } from 'src/domain/dto/media/image-upload.dto';
import { MediaCommentViewModel } from 'src/domain/view-model/media/media-comment.viewmodel';
import { LikeOrDislikeViewModel } from 'src/domain/view-model/media/like-dislike.viewmodel';
import { WebsocketGateway } from 'src/websocket/websocket.gateway';

@Injectable()
export class UserActivityService {
    constructor(
        private readonly userActivityRepository: UserActivityRepository,
        private readonly userService: UserService,
        private readonly websocketGateway: WebsocketGateway) {
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
                new MediaCommentViewModel(userId, user.userName, description),
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

    async likeOrDislikeMedia(likeOrDislike: LikeOrDislikeViewModel) {

        const media = await this.userActivityRepository.getById(likeOrDislike.mediaId);
        if (isNull(media)) { throw new BadRequestException('A Post with the given PostId could not be found'); }

        if (media.likes.includes(likeOrDislike.userId)) {
            media.likes = media.likes.filter(x => x !== likeOrDislike.userId);
        } else {
            media.likes = media.likes.concat(likeOrDislike.userId);
        }

        await this.userActivityRepository.update(media);

        const likeCount = media.likes.length.toString();
        this.websocketGateway.notifyConnectedClients(likeCount);

        return 'Activity successfully liked/disliked!';
    }

    async postComment(postCommentDto: MediaCommentViewModel) {

        const post = await this.userActivityRepository.getById(postCommentDto.mediaId);
        if (isNull(post)) { throw new BadRequestException('A Post with the given PostId could not be found'); }

        const user = await this.userService.getUserById(postCommentDto.userId);
        if (isNull(user)) { throw new BadRequestException('An user with the given UserId was not found '); }

        post.mediaComments = post.mediaComments.concat(new MediaCommentViewModel(postCommentDto.userId, user.userName, postCommentDto.comment));

        await this.userActivityRepository.update(post);

        return 'Comment successfully added to Activity';

    }

}
