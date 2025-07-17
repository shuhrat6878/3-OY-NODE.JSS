import { Schema, model } from 'mongoose';

const SubscriptionSchema = new Schema({
  follower_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  followee_id: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

const sub = model('Subscription', SubscriptionSchema);
export default sub;
