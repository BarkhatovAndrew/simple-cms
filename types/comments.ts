import { ObjectId } from 'bson';

export interface IComment {
  _id: ObjectId;
  postId: ObjectId;
  name: string;
  text: string;
  replyId?: ObjectId | null;
  date: Date | string;
}
