import { Schema, model } from 'mongoose';

const VideoSchema = new Schema({
  title:       { type: String, required: true },
  uploader_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  category:    { type: String },
  views:       { type: Number, default: 0 },
  likes:       { type: Number, default: 0 }
}, { timestamps: true });

const vide = model('Video', VideoSchema);
export default vide;
