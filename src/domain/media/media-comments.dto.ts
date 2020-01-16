import * as mongoose from 'mongoose';

export class MediaComment {
    constructor(userId: string, userName: string, comment: string) {
        this.userId = userId; // mongoose.Types.ObjectId(userId);
        this.userName = userName;
        this.comment = comment;
    }

    readonly userId: string; // mongoose.Schema.Types.ObjectId;
    readonly userName: string;
    readonly comment: string;
}
