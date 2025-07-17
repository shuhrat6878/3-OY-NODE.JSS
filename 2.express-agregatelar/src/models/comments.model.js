import { Schema, model } from 'mongoose';

const CommentSchema = new Schema({
  video_id: { type: Schema.Types.ObjectId, ref: 'Video', required: true },
  user_id:  { type: Schema.Types.ObjectId, ref: 'User', required: true },
  text:     { type: String, required: true },
  likes:    { type: Number, default: 0 }
}, { timestamps: true });

const comm = model('Comment', CommentSchema);
export default comm;
