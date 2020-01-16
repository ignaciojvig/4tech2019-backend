import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { MediaComment } from '../../domain/media/media-comments.dto';

export interface Media extends Document {
    readonly _id: mongoose.Schema.Types.ObjectId;
    readonly userId: mongoose.Schema.Types.ObjectId;
    readonly userName: string;
    readonly filename: string;
    mediaComments: MediaComment[];
    likes: mongoose.Schema.Types.ObjectId[];
    readonly timestamp: Date;
}

const MediaCommentSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    userName: String,
    comment: String,
    timestamp: {
        type: Date,
        default: Date.now(),
    },
});

export const MediaSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    userName: String,
    filename: String,
    likes: [mongoose.Schema.Types.ObjectId],
    timestamp: {
        type: Date,
        default: Date.now(),
    },
    mediaComments: [MediaCommentSchema],
});
