import Video from '../models/videoo.model.js';

export class VideoController {
    async createVideo(req, res) {
        try {
            const video = await Video.create(req.body);
            return res.status(201).json({
                statusCode: 201,
                message: 'success',
                data: video
            });
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal server error'
            });
        }
    }

    async getAllVideos(_, res) {
        try {
            const videos = await Video.find().populate('uploader_id', 'username email');
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: videos
            });
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal server error'
            });
        }
    }

    async getVideoById(req, res) {
        try {
            const video = await Video.findById(req.params.id).populate('uploader_id', 'username email');
            if (!video) {
                return res.status(404).json({
                    statusCode: 404,
                    message: "not found"
                });
            }
            return res.status(200).json({
                statusCode: 200,
                message: "success",
                data: video
            });
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal server error'
            });
        }
    }

    async getVideoStatistics(req, res) {
        try {
            const stats = await Video.aggregate([
                {
                    $lookup: {
                        from: 'comments',
                        localField: '_id',
                        foreignField: 'video_id',
                        as: 'comments'
                    }
                },
                {
                    $project: {
                        title: 1,
                        totalLikes: '$likes',
                        commentsCount: { $size: '$comments' }
                    }
                }
            ]);
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: stats
            });
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal server error'
            });
        }
    }

    async getPopularCategories(req, res) {
        try {
            const result = await Video.aggregate([
                {
                    $group: {
                        _id: '$category',
                        totalVideos: { $sum: 1 },
                        totalViews: { $sum: '$views' }
                    }
                },
                {
                    $sort: { totalViews: -1 }  
                }
            ]);

            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: result
            });
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal server error'
            });
        }
    }



    async updateVideo(req, res) {
        try {
            const video = await Video.findById(req.params.id);
            if (!video) {
                return res.status(404).json({
                    statusCode: 404,
                    message: "not found"
                });
            }
            const updatedVideo = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true });
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: updatedVideo
            });
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal server error'
            });
        }
    }

    async deleteVideo(req, res) {
        try {
            const video = await Video.findById(req.params.id);
            if (!video) {
                return res.status(404).json({
                    statusCode: 404,
                    message: "not found"
                });
            }
            await Video.findByIdAndDelete(req.params.id);
            return res.status(200).json({
                statusCode: 200,
                message: 'deleted successfully',
                data: {}
            });
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal server error'
            });
        }
    }

    async incrementViews(req, res) {
        try {
            const video = await Video.findByIdAndUpdate(
                req.params.id,
                { $inc: { views: 1 } },
                { new: true }
            );
            if (!video) {
                return res.status(404).json({
                    statusCode: 404,
                    message: "not found"
                });
            }
            return res.status(200).json({
                statusCode: 200,
                message: "view incremented",
                data: video
            });
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal server error'
            });
        }
    }

    async likeVideo(req, res) {
        try {
            const video = await Video.findByIdAndUpdate(
                req.params.id,
                { $inc: { likes: 1 } },
                { new: true }
            );
            if (!video) {
                return res.status(404).json({
                    statusCode: 404,
                    message: "not found"
                });
            }
            return res.status(200).json({
                statusCode: 200,
                message: "liked",
                data: video
            });
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal server error'
            });
        }
    }
}
