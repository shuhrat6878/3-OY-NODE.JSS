import Subscription from '../models/subscriptions.model.js';

export class SubscriptionController {
    async getTopBloggers(req, res) {
        try {
            const topBloggers = await Subscription.aggregate([
                {
                    $group: {
                        _id: '$followee_id',
                        totalFollowers: { $sum: 1 }
                    }
                },
                {
                    $sort: { totalFollowers: -1 }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: '_id',
                        foreignField: '_id',
                        as: 'blogger'
                    }
                },
                {
                    $unwind: '$blogger'
                },
                {
                    $project: {
                        _id: 0,
                        userId: '$blogger._id',
                        name: '$blogger.name',
                        totalFollowers: 1
                    }
                }
            ]);
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: topBloggers
            });
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal server error'
            });
        }
    }


    async subscribe(req, res) {
        try {
            const { follower_id, followee_id } = req.body;

            if (follower_id === followee_id) {
                return res.status(400).json({
                    statusCode: 400,
                    message: "You cannot subscribe to yourself"
                });
            }

            const existing = await Subscription.findOne({ follower_id, followee_id });
            if (existing) {
                return res.status(400).json({
                    statusCode: 400,
                    message: "Already subscribed"
                });
            }

            const subscription = await Subscription.create({ follower_id, followee_id });

            return res.status(201).json({
                statusCode: 201,
                message: 'success',
                data: subscription
            });
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal server error'
            });
        }
    }

    async unsubscribe(req, res) {
        try {
            const { follower_id, followee_id } = req.body;

            const sub = await Subscription.findOneAndDelete({ follower_id, followee_id });

            if (!sub) {
                return res.status(404).json({
                    statusCode: 404,
                    message: "Subscription not found"
                });
            }

            return res.status(200).json({
                statusCode: 200,
                message: "Unsubscribed successfully",
                data: {}
            });
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal server error'
            });
        }
    }

    async getFollowers(req, res) {
        try {
            const { userId } = req.params;
            const followers = await Subscription.find({ followee_id: userId }).populate('follower_id', 'username');
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: followers
            });
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal server error'
            });
        }
    }

    async getFollowing(req, res) {
        try {
            const { userId } = req.params;
            const following = await Subscription.find({ follower_id: userId }).populate('followee_id', 'username');
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: following
            });
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal server error'
            });
        }
    }
}
