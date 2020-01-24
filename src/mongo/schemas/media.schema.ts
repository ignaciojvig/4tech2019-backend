import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { MediaCommentViewModel } from 'src/domain/view-model/media/media-comment.viewmodel';

export interface Media extends Document {
    readonly _id: mongoose.Schema.Types.ObjectId;
    readonly userId: string;
    readonly userName: string;
    readonly filename: string;
    mediaComments: MediaCommentViewModel[];
    likes: string[];
    readonly timestamp: Date;
}

const MediaCommentSchema = new mongoose.Schema({
    userId: String,
    userName: String,
    comment: String,
    timestamp: Date,
});

export const MediaSchema = new mongoose.Schema({
    userId: String,
    userName: String,
    filename: String,
    likes: [String],
    timestamp: Date,
    mediaComments: [MediaCommentSchema],
});
