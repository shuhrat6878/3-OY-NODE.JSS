import Comment from '../models/comments.model.js';

export class CommentController {
    async createComment(req, res) {
        try {
            const comment = await Comment.create(req.body);
            return res.status(201).json({
                statusCode: 201,
                message: 'success',
                data: comment
            });
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal server error'
            });
        }
    }

    async getAllComments(_, res) {
        try {
            const comments = await Comment.find().populate('user_id', 'username').populate('video_id', 'title');
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: comments
            });
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal server error'
            });
        }
    }

    


    async getCommentsByVideo(req, res) {
        try {
            const comments = await Comment.find({ video_id: req.params.videoId }).populate('user_id', 'username');
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: comments
            });
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal server error'
            });
        }
    }

    async likeComment(req, res) {
        try {
            const comment = await Comment.findByIdAndUpdate(
                req.params.id,
                { $inc: { likes: 1 } },
                { new: true }
            );
            if (!comment) {
                return res.status(404).json({
                    statusCode: 404,
                    message: "not found"
                });
            }
            return res.status(200).json({
                statusCode: 200,
                message: "liked",
                data: comment
            });
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal server error'
            });
        }
    }

    async updateComment(req, res) {
        try {
            const comment = await Comment.findById(req.params.id);
            if (!comment) {
                return res.status(404).json({
                    statusCode: 404,
                    message: "not found"
                });
            }
            const updatedComment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: updatedComment
            });
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal server error'
            });
        }
    }

    async deleteComment(req, res) {
        try {
            const comment = await Comment.findById(req.params.id);
            if (!comment) {
                return res.status(404).json({
                    statusCode: 404,
                    message: "not found"
                });
            }
            await Comment.findByIdAndDelete(req.params.id);
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
}
