import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true }
}, { timestamps: true });

const user = model('User', UserSchema);
export default user;
