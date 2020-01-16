import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Media } from '../schemas/media.schema';
import { ImageUploadDto } from 'src/domain/dto/media/image-upload.dto';

@Injectable()
export class UserActivityRepository {
    constructor(@InjectModel('Media') private readonly mediaSchema: Model<Media>) {
    }

    async getById(id: string): Promise<Media> {
        return await this.mediaSchema
            .findOne({ _id: id })
            .select()
            .lean();
    }

    async getPaged(index: number): Promise<Media[]> {
        return await this.mediaSchema
            .find()
            .sort({ timestamp: -1 })
            .skip(index)
            .limit(10)
            .lean();
    }

    async insert(imageUploadDto: ImageUploadDto): Promise<Media> {
        const newUser = this.mediaSchema(imageUploadDto);
        return await newUser.save();
    }

    async update(updateActivity: Media): Promise<Media> {
        const updatedActivity = await this.mediaSchema.findOneAndUpdate({ _id: updateActivity._id }, updateActivity);
        return await updatedActivity.save();
    }

}
